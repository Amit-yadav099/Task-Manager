import { useState } from 'react';
import api from '../services/api';
import { motion } from 'framer-motion';
import { Edit2, Trash2, CheckCircle, Circle, Save, X } from 'lucide-react';
import toast from 'react-hot-toast';

const TaskItem = ({ task, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);

  const toggleStatus = async () => {
    await api.patch(`/tasks/${task._id}/toggle`);
    toast.success(`Task marked as ${task.status === 'pending' ? 'completed' : 'pending'}`);
    onUpdate();
  };

  const deleteTask = async () => {
    if (window.confirm('Delete this task?')) {
      await api.delete(`/tasks/${task._id}`);
      toast.error('Task deleted');
      onDelete();
    }
  };

  const updateTask = async (e) => {
    e.preventDefault();
    await api.put(`/tasks/${task._id}`, { title, description });
    setIsEditing(false);
    toast.success('Task updated');
    onUpdate();
  };

  return (
    <motion.div
      variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
      className={`glass-card p-5 transition-all duration-200 hover:shadow-xl ${
        task.status === 'completed' ? 'border-l-8 border-l-green-500 opacity-80' : 'border-l-8 border-l-amber-500'
      }`}
    >
      {isEditing ? (
        <form onSubmit={updateTask} className="space-y-3">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="input-modern"
            required
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="2"
            className="input-modern"
          />
          <div className="flex gap-2">
            <button type="submit" className="btn-primary py-1.5 px-3 text-sm flex items-center gap-1">
              <Save size={16} /> Save
            </button>
            <button type="button" onClick={() => setIsEditing(false)} className="btn-secondary py-1.5 px-3 text-sm flex items-center gap-1">
              <X size={16} /> Cancel
            </button>
          </div>
        </form>
      ) : (
        <>
          <div className="flex justify-between items-start">
            <h3 className={`text-xl font-semibold ${task.status === 'completed' ? 'line-through text-gray-500' : 'text-gray-800'}`}>
              {task.title}
            </h3>
            <button onClick={toggleStatus} className="text-gray-500 hover:text-indigo-600 transition">
              {task.status === 'pending' ? <Circle size={22} /> : <CheckCircle size={22} className="text-green-500" />}
            </button>
          </div>
          {task.description && <p className="text-gray-600 mt-2 text-sm">{task.description}</p>}
          <div className="flex gap-3 mt-4">
            <button onClick={() => setIsEditing(true)} className="flex items-center gap-1 text-blue-500 hover:text-blue-800 text-sm">
              <Edit2 size={16} /> Edit
            </button>
            <button onClick={deleteTask} className="flex items-center gap-1 text-red-500 hover:text-red-700 text-sm">
              <Trash2 size={16} /> Delete
            </button>
          </div>
        </>
      )}
    </motion.div>
  );
};

export default TaskItem;