
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authApi } from '../../services/authService';
import { User, UserRole } from '../../types';

interface LoginProps {
  setUser: (u: User) => void;
}

const Login: React.FC<LoginProps> = ({ setUser }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await authApi.login({ email, password });
      const userRes = await authApi.getUser();
      const user = userRes.data;
      setUser(user);
      
      if (user.role === UserRole.SUPER_ADMIN) navigate('/admin/reviews/moderation');
      else if (user.role === UserRole.SCHOOL_ADMIN) navigate('/school-admin/profile');
      else navigate('/schools');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-12 bg-white p-8 rounded-lg shadow-md">
      <div className="mb-6 flex items-center justify-between">
         <button onClick={() => navigate(-1)} className="text-secondary text-sm flex items-center gap-1 hover:underline">
           &larr; Back
         </button>
         <h1 className="text-2xl font-bold text-secondary">Login</h1>
      </div>
      
      {error && <div className="bg-warning/10 text-warning p-3 rounded mb-4 text-sm font-medium">{error}</div>}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-textDark mb-1">Email Address</label>
          <input 
            type="email" 
            required 
            className="w-full border p-2 rounded focus:ring-2 focus:ring-primary outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-textDark mb-1">Password</label>
          <input 
            type="password" 
            required 
            className="w-full border p-2 rounded focus:ring-2 focus:ring-primary outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button 
          disabled={loading}
          className="w-full bg-primary text-secondary font-bold py-3 rounded-lg hover:bg-yellow-500 transition shadow-sm disabled:opacity-50"
        >
          {loading ? 'Logging in...' : 'Sign In'}
        </button>
      </form>
      
      <div className="mt-6 text-center text-sm text-textLight">
        Don't have an account? <Link to="/register" className="text-secondary font-semibold hover:underline">Register here</Link>
      </div>
    </div>
  );
};

export default Login;
