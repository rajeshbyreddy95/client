import React, { useState } from 'react';
import axios from 'axios';
import { Eye, EyeOff } from 'lucide-react';

const SignUp = ({ darkMode = true }) => {
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    name: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});
  const [serverMessage, setServerMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: '' });
    setServerMessage('');
  };

  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.email) newErrors.email = 'Email is required';
    else if (!emailRegex.test(formData.email)) newErrors.email = 'Invalid email format';
    if (!formData.username) newErrors.username = 'Username is required';
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    if (!formData.confirmPassword) newErrors.confirmPassword = 'Confirm Password is required';
    else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    console.log(formData);
    
    try {
      const response = await axios.post(
        'https://movierecomendation-gilt.vercel.app/api/auth/signup',
        formData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      setServerMessage(response.data.message);
      setFormData({
        email: '',
        username: '',
        name: '',
        password: '',
        confirmPassword: '',
      });
    } catch (error) {
      const errorMsg = error.response?.data?.message || 'Failed to sign up. Please try again.';
      setServerMessage(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(!showConfirmPassword);

  return (
    <div
      className={`min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden ${
        darkMode ? 'bg-gray-900' : 'bg-gray-100'
      }`}
    >
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-purple-900 to-blue-900 animate-gradient-bg opacity-80"></div>
      <div className="absolute inset-0 backdrop-blur-sm"></div>

      <div className="relative max-w-md w-full space-y-8 bg-white/10 dark:bg-gray-800/20 backdrop-blur-lg rounded-2xl shadow-2xl p-8 sm:p-10 animate-slide-up z-10">
        <div className="text-center">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Join CineFlix
          </h2>
          <p className="mt-2 text-sm text-gray-300">
            Sign up to dive into a world of movies and shows!
          </p>
        </div>

        {serverMessage && (
          <div
            className={`text-center p-4 rounded-lg animate-fade-in ${
              serverMessage.includes('success')
                ? 'bg-green-500/20 text-green-300'
                : 'bg-red-500/20 text-red-300'
            }`}
          >
            {serverMessage}
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-6">
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-200">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className={`mt-1 block w-full px-4 py-3 border ${
                  errors.email ? 'border-red-500' : 'border-gray-600'
                } bg-gray-800/30 text-white rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 placeholder-gray-400`}
                placeholder="you@example.com"
                aria-invalid={errors.email ? 'true' : 'false'}
                aria-describedby={errors.email ? 'email-error' : undefined}
              />
              {errors.email && (
                <p id="email-error" className="mt-1 text-xs text-red-400 animate-fade-in">
                  {errors.email}
                </p>
              )}
            </div>

            {/* Username */}
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-200">
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                value={formData.username}
                onChange={handleChange}
                className={`mt-1 block w-full px-4 py-3 border ${
                  errors.username ? 'border-red-500' : 'border-gray-600'
                } bg-gray-800/30 text-white rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 placeholder-gray-400`}
                placeholder="moviebuff123"
                aria-invalid={errors.username ? 'true' : 'false'}
                aria-describedby={errors.username ? 'username-error' : undefined}
              />
              {errors.username && (
                <p id="username-error" className="mt-1 text-xs text-red-400 animate-fade-in">
                  {errors.username}
                </p>
              )}
            </div>

            {/* Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-200">
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                className={`mt-1 block w-full px-4 py-3 border ${
                  errors.name ? 'border-red-500' : 'border-gray-600'
                } bg-gray-800/30 text-white rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 placeholder-gray-400`}
                placeholder="John Doe"
                aria-invalid={errors.name ? 'true' : 'false'}
                aria-describedby={errors.name ? 'name-error' : undefined}
              />
              {errors.name && (
                <p id="name-error" className="mt-1 text-xs text-red-400 animate-fade-in">
                  {errors.name}
                </p>
              )}
            </div>

            {/* Password */}
            <div className="relative">
              <label htmlFor="password" className="block text-sm font-medium text-gray-200">
                Password
              </label>
              <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={handleChange}
                className={`mt-1 block w-full px-4 py-3 border ${
                  errors.password ? 'border-red-500' : 'border-gray-600'
                } bg-gray-800/30 text-white rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 placeholder-gray-400 pr-10`}
                placeholder="••••••••"
                aria-invalid={errors.password ? 'true' : 'false'}
                aria-describedby={errors.password ? 'password-error' : undefined}
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-3 top-10 text-gray-400 hover:text-gray-200 focus:outline-none"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
              {errors.password && (
                <p id="password-error" className="mt-1 text-xs text-red-400 animate-fade-in">
                  {errors.password}
                </p>
              )}
            </div>

            {/* Confirm Password */}
            <div className="relative">
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-200">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                value={formData.confirmPassword}
                onChange={handleChange}
                className={`mt-1 block w-full px-4 py-3 border ${
                  errors.confirmPassword ? 'border-red-500' : 'border-gray-600'
                } bg-gray-800/30 text-white rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 placeholder-gray-400 pr-10`}
                placeholder="••••••••"
                aria-invalid={errors.confirmPassword ? 'true' : 'false'}
                aria-describedby={errors.confirmPassword ? 'confirmPassword-error' : undefined}
              />
              <button
                type="button"
                onClick={toggleConfirmPasswordVisibility}
                className="absolute right-3 top-10 text-gray-400 hover:text-gray-200 focus:outline-none"
                aria-label={showConfirmPassword ? 'Hide confirm password' : 'Show confirm password'}
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
              {errors.confirmPassword && (
                <p id="confirmPassword-error" className="mt-1 text-xs text-red-400 animate-fade-in">
                  {errors.confirmPassword}
                </p>
              )}
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-md text-base font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 ${
                loading ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'
              }`}
            >
              {loading ? (
                <svg className="animate-spin h-6 w-6 mr-3 text-white" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                </svg>
              ) : (
                'Create Account'
              )}
            </button>
          </div>
        </form>

        <p className="mt-4 text-center text-sm text-gray-300">
          Already have an account?{' '}
          <a href="/login" className="font-semibold text-blue-400 hover:text-blue-300 transition-colors">
            Log in
          </a>
        </p>
      </div>

      <style>
        {`
          @keyframes slide-up {
            from { opacity: 0; transform: translateY(30px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-slide-up {
            animation: slide-up 0.8s ease-out;
          }
          @keyframes fade-in {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          .animate-fade-in {
            animation: fade-in 0.5s ease-out;
          }
          @keyframes gradient-bg {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
          .animate-gradient-bg {
            background-size: 200% 200%;
            animation: gradient-bg 15s ease infinite;
          }
        `}
      </style>
    </div>
  );
};

export default SignUp;