import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import TaskList from '../components/TaskList';
import TaskForm from '../components/TaskForm';
import SearchBar from '../components/SearchBar';
import Pagination from '../components/Pagination';
import { motion } from 'framer-motion';
import { 
  LogOut, 
  LayoutDashboard, 
  CheckCircle, 
  Circle, 
  AlertCircle,
  PlusCircle,
  User,
  Menu,
  X
} from 'lucide-react';
import toast from 'react-hot-toast';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalTasks, setTotalTasks] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [loading, setLoading] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showTaskForm, setShowTaskForm] = useState(true); // always show, but we can toggle if needed

  const fetchTasks = async (page = 1, search = '', status = '') => {
    setLoading(true);
    try {
      const res = await api.get('/tasks', { params: { page, limit: 6, search, status } });
      setTasks(res.data.tasks);
      setTotalPages(res.data.totalPages);
      setTotalTasks(res.data.total);
      setCurrentPage(res.data.currentPage);
    } catch (err) {
      console.error(err);
      toast.error('Failed to load tasks');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks(currentPage, searchTerm, statusFilter);
  }, [currentPage, searchTerm, statusFilter]);

  const handleTaskCreated = () => {
    fetchTasks(1, searchTerm, statusFilter);
    setCurrentPage(1);
  };
  const handleTaskUpdated = () => fetchTasks(currentPage, searchTerm, statusFilter);
  const handleTaskDeleted = () => fetchTasks(1, searchTerm, statusFilter);
  const handleSearch = (term) => { setSearchTerm(term); setCurrentPage(1); };
  const handleFilterChange = (e) => { setStatusFilter(e.target.value); setCurrentPage(1); };

  const completedCount = tasks.filter(t => t.status === 'completed').length;
  const pendingCount = tasks.filter(t => t.status === 'pending').length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100">
      {/* Modern Navbar */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-200/50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo & Brand */}
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r bg-blue-500 p-2 rounded-xl shadow-md">
                <LayoutDashboard className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-blue-500 bg-clip-text text-transparent">
                TaskFlow
              </span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              <div className="flex items-center space-x-2 bg-blue-500/80 px-3 py-1.5 rounded-full">
                <User className="h-4 w-4 text-white" />
                <span className="text-sm font-medium text-white">{user?.name}</span>
              </div>
              <button
                onClick={logout}
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-blue-700 hover:bg-gray-100 transition-all duration-200"
              >
                <LogOut size={18} />
                <span>Logout</span>
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg text-gray-600 hover:bg-gray-100"
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="md:hidden border-t border-gray-200 py-4 space-y-3"
            >
              <div className="flex items-center space-x-2 px-2 py-2 bg-gray-50 rounded-lg">
                <User className="h-4 w-4 text-gray-500" />
                <span className="text-sm font-medium text-gray-700">{user?.name}</span>
              </div>
              <button
                onClick={logout}
                className="flex items-center gap-2 w-full px-2 py-2 text-left text-gray-700 hover:bg-gray-50 rounded-lg transition"
              >
                <LogOut size={18} />
                <span>Logout</span>
              </button>
            </motion.div>
          )}
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Banner */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
            Good {new Date().getHours() < 12 ? 'Morning' : new Date().getHours() < 18 ? 'Afternoon' : 'Evening'}, {user?.name?.split(' ')[0]} 👋
          </h1>
          <p className="text-gray-500 mt-1">Here's your task overview for today</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="glass-card p-5 flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Total Tasks</p>
              <p className="text-2xl font-bold text-gray-800">{totalTasks}</p>
            </div>
            <div className="bg-indigo-100 p-3 rounded-xl">
              <LayoutDashboard className="h-6 w-6 text-indigo-600" />
            </div>
          </div>
          <div className="glass-card p-5 flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Completed</p>
              <p className="text-2xl font-bold text-green-600">{completedCount}</p>
            </div>
            <div className="bg-green-100 p-3 rounded-xl">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
          </div>
          <div className="glass-card p-5 flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Pending</p>
              <p className="text-2xl font-bold text-amber-600">{pendingCount}</p>
            </div>
            <div className="bg-amber-100 p-3 rounded-xl">
              <AlertCircle className="h-6 w-6 text-amber-600" />
            </div>
          </div>
          <div className="glass-card p-5 flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Completion Rate</p>
              <p className="text-2xl font-bold text-purple-600">
                {totalTasks === 0 ? 0 : Math.round((completedCount / totalTasks) * 100)}%
              </p>
            </div>
            <div className="bg-purple-100 p-3 rounded-xl">
              <Circle className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </div>

        {/* Task Creation Card */}
        <div className="glass-card p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-800">Create New Task</h2>
            <PlusCircle className="h-5 w-5 text-blue-500" />
          </div>
          <TaskForm onTaskCreated={handleTaskCreated} />
        </div>

        {/* Filters & Search */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div className="flex-1 w-full md:w-auto">
            <SearchBar onSearch={handleSearch} />
          </div>
          <div className="flex gap-3 w-full md:w-auto">
            <select
              value={statusFilter}
              onChange={handleFilterChange}
              className="px-4 py-2 rounded-xl border border-gray-200 bg-white/70 backdrop-blur-sm focus:ring-2 focus:ring-indigo-500 outline-none text-gray-700"
            >
              <option value="">All Tasks</option>
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </div>

        {/* Task Grid / Loading / Empty State */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="animate-pulse glass-card h-40"></div>
            ))}
          </div>
        ) : tasks.length === 0 ? (
          <div className="glass-card p-12 text-center">
            <div className="flex flex-col items-center">
              <div className="bg-gray-100 p-4 rounded-full mb-4">
                <LayoutDashboard className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-medium text-gray-700">No tasks yet</h3>
              <p className="text-gray-500 mt-1">Create your first task using the form above.</p>
            </div>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <TaskList tasks={tasks} onUpdate={handleTaskUpdated} onDelete={handleTaskDeleted} />
          </motion.div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-10 flex justify-center">
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;