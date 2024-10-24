import { useState } from 'react';
import axiosInstance from '../api/axios';
import { useNavigate, Link } from 'react-router-dom'; // Import Link for navigation

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [isSuccess, setIsSuccess] = useState(false); // Add success state
    const navigate = useNavigate();

    // Inside LoginPage.jsx after a successful login
const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/users/login', { email, password });
      const token = response.data.token;
      if (token) {
        localStorage.setItem('token', token); // Store token
        navigate('/dashboard'); // Redirect to dashboard
      }
    } catch (error) {
      console.error('Login error:', error);
      setMessage('Login failed. Please check your credentials.');
    }
  };
  

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            {/* Home Button */}
            <div className="absolute top-0 left-0 p-4">
                <Link to="/" className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
                    Home
                </Link>
            </div>

            <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-xs">
                <h2 className="text-2xl font-bold mb-4">Login</h2>

                {/* Display success or error message */}
                {message && (
                    <p className={`mb-4 ${isSuccess ? 'text-green-500' : 'text-red-500'}`}>{message}</p>
                )}

                {/* Email Input */}
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="shadow appearance-none border rounded w-full py-2 px-3 mb-3"
                    required
                />

                {/* Password Input */}
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="shadow appearance-none border rounded w-full py-2 px-3 mb-3"
                    required
                />

                {/* Submit Button */}
                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full">
                    Log In
                </button>

                {/* Don't have an account? Register here link */}
                <p className="mt-4">
                    Don’t have an account?{' '}
                    <Link to="/register" className="text-blue-500 hover:underline">Register here</Link>.
                </p>
            </form>

            {/* Optional success alert */}
            {isSuccess && (
                <div className="bg-green-500 text-white px-4 py-3 rounded mt-6" role="alert">
                    <span className="block sm:inline">Login successful! Redirecting...</span>
                </div>
            )}
        </div>
    );
};

export default LoginPage;
