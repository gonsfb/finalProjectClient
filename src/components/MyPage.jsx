import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axiosInstance from '../api/axios';

const MyPage = () => {
  const [myTemplates, setMyTemplates] = useState([]);
  const [myForms, setMyForms] = useState([]);
  const navigate = useNavigate();

  // Fetch templates created by the user
  useEffect(() => {
    const fetchMyTemplates = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('/templates/mine', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setMyTemplates(response.data);
      } catch (error) {
        console.error('Error fetching my templates:', error);
      }
    };

    // Fetch forms the user has responded to
    const fetchMyForms = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('/forms/mine', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setMyForms(response.data);
      } catch (error) {
        console.error('Error fetching my forms:', error);
      }
    };

    fetchMyTemplates();
    fetchMyForms();
  }, []);

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between mb-6">
        <h1 className="text-3xl font-bold">My Page</h1>
        {/* Home button to navigate to Dashboard */}
        <button
          onClick={() => navigate('/dashboard')}
          className="bg-gray-500 hover:bg-gray-700 text-white px-4 py-2 rounded"
        >
          Home
        </button>
      </div>

      {/* Button to Create New Template */}
      <div className="mb-6">
        <button
          onClick={() => navigate('/TemplateBuilder')}
          className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          Create New Template
        </button>
      </div>

      {/* List of Created Templates */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">My Created Templates</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {myTemplates.length > 0 ? (
            myTemplates.map((template) => (
              <div key={template.id} className="border p-4 rounded-lg">
                <h3 className="font-bold">{template.title}</h3>
                <p>{template.description}</p>
                <div className="mt-2">
                  {/* View and Edit/Delete Options */}
                  <Link
                    to={`/templates/${template.id}`}
                    className="text-blue-500 hover:underline mr-4"
                  >
                    View
                  </Link>
                  <button
                    onClick={() => navigate(`/edit-template/${template.id}`)}
                    className="text-yellow-500 hover:underline mr-4"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => navigate(`/delete-template/${template.id}`)}
                    className="text-red-500 hover:underline"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>No templates created yet.</p>
          )}
        </div>
      </section>

      {/* List of Forms the User has Responded To */}
      <section>
        <h2 className="text-2xl font-bold mb-4">My Forms</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {myForms.length > 0 ? (
            myForms.map((form) => (
              <div key={form.id} className="border p-4 rounded-lg">
                <h3 className="font-bold">Form for {form.template?.title}</h3>
                <p>{form.template?.description}</p>
                <div className="mt-2">
                  {/* View and Edit/Delete Options */}
                  <Link to={`/forms/${form.id}`} className="text-blue-500 hover:underline mr-4">
                    View
                  </Link>
                  <button
                    onClick={() => navigate(`/edit-form/${form.id}`)}
                    className="text-yellow-500 hover:underline mr-4"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => navigate(`/delete-form/${form.id}`)}
                    className="text-red-500 hover:underline"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>No forms filled yet.</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default MyPage;
