import { useState } from 'react';
import api from '../services/api';
import { PlusCircle } from 'lucide-react';
import toast from 'react-hot-toast';

const TaskForm = ({ onTaskCreated }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return toast.error('Title is required');
    await api.post('/tasks', { title, description });
    setTitle('');
    setDescription('');
    toast.success('Task added!');
    onTaskCreated();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        placeholder="What needs to be done?"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="input-modern"
      />
      <textarea
        placeholder="Description (optional)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        rows="2"
        className="input-modern"
      />
      <button type="submit" className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-3 rounded-xl">
        <PlusCircle size={20} /> Add Task
      </button>
    </form>
  );
};

export default TaskForm;