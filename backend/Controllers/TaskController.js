const auth = require('../middleware/auth');
const Task = require('../models/Task');

const getTasks= async (req, res) => {
  const { page = 1, limit = 5, search = '', status = '' } = req.query;
  const query = { userId: req.user.id };

  if (search) {
    query.$or = [
      { title: { $regex: search, $options: 'i' } },
      { description: { $regex: search, $options: 'i' } }
    ];
  }
  if (status && (status === 'pending' || status === 'completed')) {
    query.status = status;
  }

  try {
    const total = await Task.countDocuments(query);
    const tasks = await Task.find(query)
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    res.json({
      tasks,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

const postTasks= async (req, res) => {
  const { title, description } = req.body;
  if (!title) return res.status(400).json({ msg: 'Title is required' });

  try {
    const newTask = new Task({
      title,
      description,
      userId: req.user.id
    });
    const task = await newTask.save();
    res.json(task);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};


const singleTask= async (req, res) => {
  const { title, description, status } = req.body;
  try {
    let task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ msg: 'Task not found' });
    if (task.userId.toString() !== req.user.id)
      return res.status(401).json({ msg: 'Not authorized' });

    task.title = title || task.title;
    task.description = description !== undefined ? description : task.description;
    if (status) task.status = status;

    await task.save();
    res.json(task);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

const deleteTask= async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ msg: 'Task not found' });
    if (task.userId.toString() !== req.user.id)
      return res.status(401).json({ msg: 'Not authorized' });

    await task.deleteOne();
    res.json({ msg: 'Task removed' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};


const toggleTask= async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ msg: 'Task not found' });
    if (task.userId.toString() !== req.user.id)
      return res.status(401).json({ msg: 'Not authorized' });

    task.status = task.status === 'pending' ? 'completed' : 'pending';
    await task.save();
    res.json(task);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

module.exports = {getTasks,postTasks,singleTask,deleteTask,toggleTask};