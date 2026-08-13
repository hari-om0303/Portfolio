import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { FaLock, FaEnvelope, FaSignInAlt, FaShieldAlt } from 'react-icons/fa';

const Login = () => {
  const { user, login } = useAuth();
  const { theme } = useTheme();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Get active user (state or validated localStorage fallback)
  const activeUser = user || (() => {
    try {
      const storedUser = localStorage.getItem('adminUser');
      if (storedUser && storedUser !== 'null' && storedUser !== 'undefined') {
        const parsed = JSON.parse(storedUser);
        if (parsed && typeof parsed === 'object' && parsed.token) return parsed;
      }
    } catch (e) {}
    return null;
  })();

  // If already logged in, redirect to admin immediately
  useEffect(() => {
    if (activeUser) {
      navigate('/admin');
    }
  }, [activeUser, navigate]);

  const onSubmit = async (data) => {
    setLoading(true);
    const result = await login(data.email, data.password);
    setLoading(false);

    if (result.success) {
      toast.success('Logged in successfully!');
      navigate('/admin');
    } else {
      toast.error(result.message || 'Invalid email or password.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center pt-24 pb-12 grid-bg dark:grid-bg-light transition-colors duration-300">
      <div className="max-w-md w-full px-6 relative z-10">
        
        {/* Glow ambient background circle */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-accent-primary/20 to-accent-secondary/20 opacity-30 blur-3xl" />
        
        <div className="p-8 rounded-3xl bg-white dark:bg-zinc-900/30 border border-slate-100 dark:border-zinc-900 shadow-2xl relative">
          
          {/* Lock header */}
          <div className="flex flex-col items-center text-center mb-8">
            <span className="p-4 rounded-2xl bg-accent-primary/10 text-accent-primary flex items-center justify-center mb-4">
              <FaLock className="w-6 h-6" />
            </span>
            <h2 className="text-2xl font-extrabold tracking-tight text-slate-800 dark:text-white">
              Admin CMS Login
            </h2>
            <p className="text-xs text-slate-500 mt-2">
              Authentication required to update portfolio data.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Email input */}
            <div className="flex flex-col space-y-1.5">
              <label htmlFor="email" className="text-xs font-bold text-slate-600 dark:text-slate-300 flex items-center space-x-1.5">
                <FaEnvelope className="w-3.5 h-3.5" />
                <span>Admin Email</span>
              </label>
              <input
                id="email"
                type="email"
                placeholder="hariomgupta0303@gmail.com"
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email address',
                  },
                })}
                className="px-4 py-3 rounded-xl border border-slate-200 dark:border-zinc-800 bg-slate-50 dark:bg-zinc-900/50 text-sm text-slate-800 dark:text-slate-200 focus:outline-none focus:border-accent-primary transition-colors"
              />
              {errors.email && (
                <span className="text-xs text-red-500 font-semibold">{errors.email.message}</span>
              )}
            </div>

            {/* Password input */}
            <div className="flex flex-col space-y-1.5">
              <label htmlFor="password" className="text-xs font-bold text-slate-600 dark:text-slate-300 flex items-center space-x-1.5">
                <FaLock className="w-3.5 h-3.5" />
                <span>Password</span>
              </label>
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                {...register('password', { required: 'Password is required' })}
                className="px-4 py-3 rounded-xl border border-slate-200 dark:border-zinc-800 bg-slate-50 dark:bg-zinc-900/50 text-sm text-slate-800 dark:text-slate-200 focus:outline-none focus:border-accent-primary transition-colors"
              />
              {errors.password && (
                <span className="text-xs text-red-500 font-semibold">{errors.password.message}</span>
              )}
            </div>

            {/* Shield rate limiting details */}
            <div className="flex items-center space-x-1.5 p-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-800/20 text-[10px] text-slate-400 border border-slate-200/50 dark:border-zinc-800/50 mt-1">
              <FaShieldAlt className="text-accent-secondary w-3.5 h-3.5 flex-shrink-0" />
              <span>Brute-force protection enabled. Max 10 attempts per 15 minutes.</span>
            </div>

            {/* Submit button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center space-x-2 py-3.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-accent-primary to-accent-secondary hover:shadow-lg hover:shadow-accent-primary/20 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 disabled:scale-100 transition-all duration-300"
            >
              <FaSignInAlt className="w-4 h-4" />
              <span>{loading ? 'Authenticating...' : 'Sign In'}</span>
            </button>
          </form>
          
        </div>
      </div>
    </div>
  );
};

export default Login;
