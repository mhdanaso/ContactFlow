import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const handleChange = (event) => {
  const { name, value } = event.target;

  setFormData({
    ...formData,
    [name]: value,
  });
};
  const handleSubmit = async (event) => {
  event.preventDefault();

  setLoading(true);
  setError('');

  try {
    const response = await fetch(
      'http://localhost:5000/api/auth/login',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      setError(data.message || 'Login failed');
      return;
    }

    localStorage.setItem('token', data.token);
    navigate('/dashboard');
  } catch (error) {
    setError('Unable to connect to the server. Please try again.');
  } finally {
    setLoading(false);
  }
};

  return (
    <main className="min-h-screen bg-[#f5f5f7] px-6 py-10">
      <div className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-md flex-col justify-center">

        {/* Brand */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-black text-xl font-semibold text-white shadow-sm">
            C
          </div>

          <h1 className="text-5xl font-semibold tracking-[-0.03em] text-[#1d1d1f]">
            Welcome back.
          </h1>

          <p className="mt-3 text-[17px] text-[#6e6e73]">
            Sign in to continue to ContactFlow.
          </p>
        </motion.div>

        {/* Form */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="space-y-5"
        >
          <div>
            <label className="mb-2 block text-sm font-medium text-[#1d1d1f]">
              Email
            </label>

            <input
              type="email"
              placeholder="name@example.com"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full rounded-xl border border-[#d2d2d7] bg-white px-4 py-3.5 text-[17px] text-[#1d1d1f] outline-none transition focus:border-[#0071e3] focus:ring-4 focus:ring-[#0071e3]/10"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-[#1d1d1f]">
              Password
            </label>

            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full rounded-xl border border-[#d2d2d7] bg-white px-4 py-3.5 text-[17px] text-[#1d1d1f] outline-none transition focus:border-[#0071e3] focus:ring-4 focus:ring-[#0071e3]/10"
            />
          </div>

          <motion.button
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="mt-3 w-full rounded-xl bg-[#1d1d1f] py-3.5 text-[17px] font-medium text-white transition hover:bg-[#2c2c2e]"
          >
            {loading ? 'Signing in...' : 'Sign in'}
          </motion.button>
        </motion.form>

        {/* Register */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-8 text-center text-[15px] text-[#6e6e73]"
        >
          New to ContactFlow?{' '}
          <Link
            to="/register"
            className="font-medium text-[#1d1d1f] underline decoration-[#86868b]/40 underline-offset-4 hover:decoration-[#1d1d1f]"
          >
            Create an account
          </Link>
        </motion.p>

      </div>
    </main>
  );
}

export default Login;