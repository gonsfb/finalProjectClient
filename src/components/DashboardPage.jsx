import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axiosInstance from '../api/axios'; // Use the axiosInstance

const DashboardPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [latestTemplates, setLatestTemplates] = useState([]);
  const [popularTemplates, setPopularTemplates] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');  // For search input
  const [searchResults, setSearchResults] = useState([]);  // For storing search results
  const [isSearching, setIsSearching] = useState(false); // Track if searching
  const [searchError, setSearchError] = useState('');  // To store any search error
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove the token on logout
    navigate('/login');
  };

  // Fetch latest and popular templates on load
  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        // Fetch latest templates (public route)
        const latestResponse = await axiosInstance.get('/templates');
        setLatestTemplates(latestResponse.data.slice(0, 6));

        // Fetch popular templates (requires token for authentication)
        const popularResponse = await axiosInstance.get('/templates/popular');
        setPopularTemplates(popularResponse.data.slice(0, 5));
      } catch (error) {
        console.error('Error fetching templates:', error);
      }
    };
    fetchTemplates();
  }, []);

  // Handle Search Submission
  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return; // Prevent empty searches

    setIsSearching(true); // Set searching state
    setSearchError(''); // Clear any previous errors

    try {
      const response = await axiosInstance.get(`/templates/search?query=${searchQuery}`);
      setSearchResults(response.data); // Store search results
      if (response.data.length === 0) {
        setSearchError('No results found for your query.'); // Show no results message
      }
    } catch (error) {
      console.error('Search error:', error);
      setSearchError('An error occurred while searching. Please try again.');
    } finally {
      setIsSearching(false); // End searching state
    }
  };

  return (
    <div className="container mx-auto p-6">
      {/* Header Section */}
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Templates</h1>

        {/* Hamburger Menu for logged-in users */}
        <div className="relative">
          <button onClick={toggleMenu} className="text-blue-500 hover:text-blue-700">
            ☰
          </button>
          {isMenuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg">
              <Link
                to="/MyPage"
                className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
              >
                My Page
              </Link>
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </header>

      {/* Search Bar */}
      <div className="mb-8">
        <form className="flex" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search templates..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)} // Update searchQuery
            className="w-full p-4 border rounded-l-lg"
          />
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white p-4 rounded-r-lg"
            disabled={isSearching} // Disable button when searching
          >
            {isSearching ? 'Searching...' : 'Search'}
          </button>
        </form>
      </div>

      {/* Display Search Results if Available */}
      {searchResults.length > 0 && (
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Search Results</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {searchResults.map((template) => (
              <div key={template.id} className="border p-4 rounded-lg shadow-sm">
                <h3 className="font-bold text-lg">{template.title}</h3>
                <p>{template.description}</p>
                <p className="text-gray-600">Author: {template.author.name}</p>
                <Link to={`/templates/${template.id}`} className="text-blue-500 hover:underline">
                  View Template
                </Link>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Show error message if search failed or no results */}
      {searchError && (
        <p className="text-red-500 text-center mb-6">{searchError}</p>
      )}

      {/* Latest Templates Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Latest Templates</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {latestTemplates.map((template) => (
            <div key={template.id} className="border p-4 rounded-lg shadow-sm">
              <h3 className="font-bold text-lg">{template.title}</h3>
              <p>{template.description}</p>
              <p className="text-gray-600">Author: {template.author.name}</p>
              <Link to={`/templates/${template.id}`} className="text-blue-500 hover:underline">
                View Template
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Popular Templates Section */}
      <section>
        <h2 className="text-2xl font-bold mb-6">Top 5 Most Popular Templates</h2>
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-200">
            <tr>
              <th className="py-2 px-4 text-left">#</th>
              <th className="py-2 px-4 text-left">Title</th>
              <th className="py-2 px-4 text-left">Description</th>
              <th className="py-2 px-4 text-left">Author</th>
              <th className="py-2 px-4 text-left">Number of Forms</th>
            </tr>
          </thead>
          <tbody>
            {popularTemplates.map((template, index) => (
              <tr key={template.id} className="border-t">
                <td className="py-2 px-4">{index + 1}</td>
                <td className="py-2 px-4">
                  <Link to={`/templates/${template.id}`} className="text-blue-500 hover:underline">
                    {template.title}
                  </Link>
                </td>
                <td className="py-2 px-4">{template.description}</td>
                <td className="py-2 px-4">{template.author.name}</td>
                <td className="py-2 px-4">{template.Forms.length}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default DashboardPage;
