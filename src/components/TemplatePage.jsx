import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../api/axios';

const TemplatePage = () => {
  const { id } = useParams();
  const [template, setTemplate] = useState(null);

  // Fetch the template details on load
  useEffect(() => {
    const fetchTemplate = async () => {
      try {
        const response = await axios.get(`/templates/${id}`);
        setTemplate(response.data);
      } catch (error) {
        console.error('Error fetching template:', error);
      }
    };

    fetchTemplate();
  }, [id]);

  // Function to dynamically render questions based on their state
  const renderQuestions = () => {
    if (!template) return null;

    const customQuestions = [];
    // Dynamically check all the custom fields
    Object.keys(template).forEach((key) => {
      if (key.includes('state') && template[key]) {
        // If the field is a state field and is set to true, find the corresponding question
        const questionKey = key.replace('_state', '_question');
        if (template[questionKey]) {
          customQuestions.push(
            <div
              key={questionKey}
              className="bg-white shadow-md rounded-lg p-4 mb-4 border border-gray-200"
            >
              <h3 className="font-semibold text-lg text-blue-600">
                {questionKey
                  .replace('_', ' ')
                  .replace('custom', 'Custom')
                  .replace('_question', '')}
              </h3>
              <p className="text-gray-700">{template[questionKey]}</p>
            </div>
          );
        }
      }
    });

    return customQuestions;
  };

  if (!template) {
    return <div className="text-center mt-10 text-gray-600">Loading...</div>;
  }

  return (
    <div className="container mx-auto p-6">
      {/* Template Title */}
      <h1 className="text-4xl font-bold text-blue-700 mb-6 text-center">
        {template.title}
      </h1>

      <div className="bg-gray-100 shadow-lg rounded-lg p-8 mb-8 border border-gray-300">
        {/* Template Description */}
        <p className="text-xl mb-4 text-gray-800">
          <strong>Description:</strong> {template.description}
        </p>

        {/* Creation Time */}
        <p className="text-lg mb-4 text-gray-700">
          <strong>Created At:</strong>{' '}
          {new Date(template.createdAt).toLocaleString()}
        </p>
      </div>

      {/* Custom Questions Section */}
      <div className="bg-white shadow-lg rounded-lg p-6 border border-gray-200">
        <h2 className="text-2xl font-semibold text-blue-700 mb-6 text-center">
          Custom Questions
        </h2>
        {renderQuestions().length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {renderQuestions()}
          </div>
        ) : (
          <p className="text-gray-600">No custom questions available.</p>
        )}
      </div>
    </div>
  );
};

export default TemplatePage;
