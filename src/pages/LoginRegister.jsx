import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginRegister = ({ onSkip }) => {
  const [isRegistering, setIsRegistering] = useState(true);
  const navigate = useNavigate();

  const toggleForm = () => {
    setIsRegistering(!isRegistering);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const email = formData.get('email');
    const password = formData.get('password');

    if (isRegistering) {
      const fullName = formData.get('fullName');
      console.log('Registering:', { fullName, email, password });
      // Add your registration logic here
    } else {
      console.log('Logging in:', { email, password });
      // Navigate to the library page after logging in
      navigate('/library'); // Example navigation after login
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-6">Login/Register</h1>
        <h2 className="text-xl font-semibold text-center mb-6">
          {isRegistering ? 'Registration' : 'Login'}
        </h2>

        <form onSubmit={handleSubmit}>
          {isRegistering && (
            <div className="mb-4">
              <label className="block mb-1 text-sm font-medium">Full Name</label>
              <input
                type="text"
                name="fullName"
                placeholder="Full Name"
                className="w-full px-4 py-2 border rounded-lg"
                required
              />
            </div>
          )}

          <div className="mb-4">
            <label className="block mb-1 text-sm font-medium">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="w-full px-4 py-2 border rounded-lg"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1 text-sm font-medium">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="w-full px-4 py-2 border rounded-lg"
              required
            />
          </div>

          {isRegistering && (
            <div className="mb-6">
              <label className="block mb-1 text-sm font-medium">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                className="w-full px-4 py-2 border rounded-lg"
                required
              />
            </div>
          )}

          <button
            type="submit"
            className="w-full py-2 bg-teal-500 text-white rounded-lg font-semibold hover:bg-teal-600"
          >
            {isRegistering ? 'Register' : 'Login'}
          </button>
        </form>

        <p className="mt-4 text-center text-sm">
          {isRegistering ? 'Already registered?' : 'New user?'}{' '}
          <span onClick={toggleForm} className="text-teal-500 cursor-pointer">
            {isRegistering ? 'Login' : 'Register'}
          </span>
        </p>

        <div className="mt-6 text-center">
          <button
            onClick={onSkip}
            className="text-gray-500 hover:text-blue-600 text-sm"
          >
            Skip
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginRegister;
