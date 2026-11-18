import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';
import { TasksProvider } from './context/TasksContext';
import About from './pages/About';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import Login from './pages/Login';
import Pomodoro from './pages/Pomodoro';
import Tasks from './pages/Tasks';

export default function App() {
  return (
    <AuthProvider>
      <TasksProvider>
        <BrowserRouter>
          <Header />
          <main className="container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/sobre" element={<About />} />
              <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
              <Route path="/tarefas" element={<ProtectedRoute><Tasks /></ProtectedRoute>} />
              <Route path="/pomodoro" element={<ProtectedRoute><Pomodoro /></ProtectedRoute>} />
              <Route path="*" element={<p className="empty">Página não encontrada.</p>} />
            </Routes>
          </main>
        </BrowserRouter>
      </TasksProvider>
    </AuthProvider>
  );
}
