import { useState } from 'react';
import axiosInstance from '../api/axios';
import { useNavigate, Link } from 'react-router-dom'; // Import Link for navigation

const RegisterPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });
    const [message, setMessage] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);
    const [isLoading, setIsLoading] = useState(false); // Loading state
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Basic validation for email
        if (!formData.email.includes('@')) {
            setMessage('Please enter a valid email.');
            setIsSuccess(false);
            return;
        }

        setIsLoading(true); // Start loading
        try {
            await axios.post('/users/register', formData);
            setIsSuccess(true);
            setMessage('Registration successful!');
            setFormData({ name: '', email: '', password: '' });

            // Redirect after a few seconds
            setTimeout(() => navigate('/login'), 2000);
        } catch (error) {
            console.error('Registration error:', error);
            setMessage('Registration failed. Please try again.');
            setIsSuccess(false);
        } finally {
            setIsLoading(false); // End loading
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
            {/* Home Button */}
            <div className="absolute top-0 left-0 p-4">
                <Link to="/" className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
                    Home
                </Link>
            </div>

            <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-xs">
                <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>
                
                {/* Display success or error message */}
                {message && (
                    <div className={`mb-4 p-3 rounded ${isSuccess ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {message}
                    </div>
                )}

                {/* User Inputs */}
                <input
                    type="text"
                    placeholder="Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="shadow appearance-none border rounded w-full py-2 px-3 mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="shadow appearance-none border rounded w-full py-2 px-3 mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="shadow appearance-none border rounded w-full py-2 px-3 mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                />

                {/* Submit Button */}
                <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full flex items-center justify-center"
                    disabled={isLoading}
                >
                    {isLoading ? 'Registering...' : 'Register'}
                </button>

                {/* Already have an account link */}
                <p className="mt-4 text-center">
                    Already have an account?{' '}
                    <Link to="/login" className="text-blue-500 hover:underline">Log in here</Link>.
                </p>
            </form>
        </div>
    );
};

export default RegisterPage;

