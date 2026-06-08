const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');

const {getTasks,postTasks,singleTask,deleteTask,toggleTask} = require('../Controllers/TaskController');

router.get('/', auth, getTasks);

router.post('/', auth, postTasks);

router.put('/:id', auth, singleTask);

router.delete('/:id', auth, deleteTask);

router.patch('/:id/toggle', auth, toggleTask);

module.exports = router;