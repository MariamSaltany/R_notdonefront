
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authApi } from '../../services/authService';
import { User } from '../../types';

interface RegisterProps {
  setUser: (u: User) => void;
}

const Register: React.FC<RegisterProps> = ({ setUser }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    city: '',
    password: '',
    password_confirmation: '',
    terms: false
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.password_confirmation) {
      setError("Passwords don't match");
      return;
    }
    if (!formData.terms) {
       setError("Please agree to the Terms & Conditions");
       return;
    }

    setLoading(true);
    setError('');
    try {
      await authApi.register(formData);
      const userRes = await authApi.getUser();
      setUser(userRes.data);
      navigate('/schools');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Registration failed. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 bg-white p-8 rounded-lg shadow-md mb-20">
      <div className="mb-6 flex items-center justify-between">
         <button onClick={() => navigate(-1)} className="text-secondary text-sm hover:underline">&larr; Back</button>
         <h1 className="text-2xl font-bold text-secondary">Join Madrasati</h1>
      </div>

      {error && <div className="bg-warning/10 text-warning p-3 rounded mb-4 text-sm font-medium">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-textDark mb-1">Full Name *</label>
          <input 
            type="text" required
            className="w-full border p-2 rounded focus:ring-2 focus:ring-primary outline-none"
            onChange={(e) => setFormData({...formData, name: e.target.value})}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-textDark mb-1">Email Address *</label>
          <input 
            type="email" required
            className="w-full border p-2 rounded focus:ring-2 focus:ring-primary outline-none"
            onChange={(e) => setFormData({...formData, email: e.target.value})}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-textDark mb-1">Phone Number *</label>
          <input 
            type="tel" required
            className="w-full border p-2 rounded focus:ring-2 focus:ring-primary outline-none"
            onChange={(e) => setFormData({...formData, phone: e.target.value})}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-textDark mb-1">City/Area (Optional)</label>
          <input 
            type="text"
            className="w-full border p-2 rounded focus:ring-2 focus:ring-primary outline-none"
            onChange={(e) => setFormData({...formData, city: e.target.value})}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-textDark mb-1">Password *</label>
          <input 
            type="password" required
            className="w-full border p-2 rounded focus:ring-2 focus:ring-primary outline-none"
            onChange={(e) => setFormData({...formData, password: e.target.value})}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-textDark mb-1">Confirm Password *</label>
          <input 
            type="password" required
            className="w-full border p-2 rounded focus:ring-2 focus:ring-primary outline-none"
            onChange={(e) => setFormData({...formData, password_confirmation: e.target.value})}
          />
        </div>
        <div className="flex items-start gap-2 pt-2">
          <input 
            type="checkbox" required
            className="mt-1"
            onChange={(e) => setFormData({...formData, terms: e.target.checked})}
          />
          <span className="text-xs text-textLight">I agree to the Terms & Conditions and understand how my data is handled.</span>
        </div>
        <button 
          disabled={loading}
          className="w-full bg-primary text-secondary font-bold py-3 rounded-lg hover:bg-yellow-500 transition shadow-sm disabled:opacity-50 mt-4"
        >
          {loading ? 'Creating Account...' : 'Register Account'}
        </button>
      </form>

      <div className="mt-6 text-center text-sm text-textLight">
        Already have an account? <Link to="/login" className="text-secondary font-semibold hover:underline">Log in</Link>
      </div>
    </div>
  );
};

export default Register;
