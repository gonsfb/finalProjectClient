import { useState } from 'react';
import axios from '../api/axios';
import { useNavigate } from 'react-router-dom';

const TemplateBuilder = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [customFields, setCustomFields] = useState([]);
  const navigate = useNavigate();

  // Function to handle adding a new custom field
  const addField = (type) => {
    setCustomFields([...customFields, { type, question: '', state: true }]);
  };

  // Function to handle input changes for custom fields
  const handleFieldChange = (index, key, value) => {
    const updatedFields = [...customFields];
    updatedFields[index][key] = value;
    setCustomFields(updatedFields);
  };

  // Function to remove a field
  const removeField = (index) => {
    const updatedFields = customFields.filter((_, i) => i !== index);
    setCustomFields(updatedFields);
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        '/templates',
        { title, description, customFields },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      // Redirect to 'My Page' or wherever needed after template creation
      navigate('/mypage');
    } catch (error) {
      console.error('Error creating template:', error);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Create a New Template</h1>

      <form onSubmit={handleSubmit}>
        {/* Template Title */}
        <div className="mb-4">
          <label className="block text-lg font-semibold">Template Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        {/* Template Description */}
        <div className="mb-4">
          <label className="block text-lg font-semibold">Template Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border rounded"
            required
          ></textarea>
        </div>

        {/* Custom Fields */}
        <div className="mb-4">
          <h2 className="text-lg font-semibold mb-2">Custom Fields</h2>

          {customFields.map((field, index) => (
            <div key={index} className="mb-4 border p-4 rounded-lg">
              <label className="block text-lg font-semibold mb-2">
                {field.type.charAt(0).toUpperCase() + field.type.slice(1)} Question
              </label>
              <input
                type="text"
                value={field.question}
                onChange={(e) => handleFieldChange(index, 'question', e.target.value)}
                className="w-full p-2 border rounded"
                placeholder="Enter your question"
                required
              />
              <button
                type="button"
                onClick={() => removeField(index)}
                className="mt-2 text-red-500 hover:underline"
              >
                Remove Field
              </button>
            </div>
          ))}

          {/* Buttons to add different types of custom fields */}
          <button type="button" onClick={() => addField('string')} className="mr-2 bg-blue-500 text-white p-2 rounded">
            Add String Field
          </button>
          <button type="button" onClick={() => addField('text')} className="mr-2 bg-blue-500 text-white p-2 rounded">
            Add Text Field
          </button>
          <button type="button" onClick={() => addField('integer')} className="mr-2 bg-blue-500 text-white p-2 rounded">
            Add Integer Field
          </button>
          <button type="button" onClick={() => addField('checkbox')} className="mr-2 bg-blue-500 text-white p-2 rounded">
            Add Checkbox Field
          </button>
        </div>

        {/* Submit Button */}
        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
          Create Template
        </button>
      </form>
    </div>
  );
};

export default TemplateBuilder;
