import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axiosInstance from '../api/axios';

const MainPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [noResults, setNoResults] = useState(false);
  const [latestTemplates, setLatestTemplates] = useState([]);
  const [popularTemplates, setPopularTemplates] = useState([]);

  // Fetch latest and popular templates on load
  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        // Fetch latest templates (public route)
        const latestResponse = await axiosInstance.get('/templates');
        setLatestTemplates(latestResponse.data.slice(0, 6));

        // Fetch popular templates (public route)
        const popularResponse = await axiosInstance.get('/templates/popular');
        setPopularTemplates(popularResponse.data.slice(0, 5));
      } catch (error) {
        console.error('Error fetching templates:', error);
      }
    };
    fetchTemplates();
  }, []);

  // Function to handle search
  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setIsSearching(true);
    setNoResults(false);

    try {
      const response = await axiosInstance.get(`/templates/search?query=${searchQuery}`);
      setSearchResults(response.data);
      setIsSearching(false);
      if (response.data.length === 0) {
        setNoResults(true);
      }
    } catch (error) {
      console.error('Search error:', error);
      setIsSearching(false);
    }
  };

  return (
    <div className="container mx-auto p-6">
      {/* Header Section */}
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Templates</h1>
        <div>
          {/* Link to the Register Page */}
          <Link to="/register" className="text-blue-500 hover:text-blue-700 mr-4">
            Register
          </Link>
          {/* Link to the Login Page */}
          <Link to="/login" className="text-blue-500 hover:text-blue-700">
            Login
          </Link>
        </div>
      </header>

      {/* Search Bar Section */}
      <section className="mb-8">
        <form onSubmit={handleSearch} className="flex justify-center mb-4">
          <input
            type="text"
            placeholder="Search templates..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-2/3 p-2 border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white p-4 rounded-r-lg"
          >
            Search
          </button>
        </form>
      </section>

      {/* Display Loading State */}
      {isSearching && <p className="text-center">Searching...</p>}

      {/* Display No Results Message */}
      {!isSearching && noResults && <p className="text-center text-red-500">No templates found.</p>}

      {/* Display Search Results */}
      <section>
        {!isSearching && searchResults.length > 0 && (
          <div>
            <h2 className="text-xl font-bold mb-4">Search Results</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
              {searchResults.map((template) => (
                <div key={template.id} className="p-4 border border-gray-200 rounded-lg shadow-lg bg-white hover:shadow-xl transition-shadow duration-300">
                  <h3 className="text-xl font-semibold text-gray-800">{template.title}</h3>
                  <p>{template.description}</p>
                  <p className="text-gray-600">Author: {template.author.name}</p>
                  <Link
                    to={`/templates/${template.id}`}
                    className="text-blue-500 hover:underline"
                  >
                    View Template
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

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

export default MainPage;
