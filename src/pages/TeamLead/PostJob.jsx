import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const PostJob = () => {
  const [title, setTitle] = useState('');
  const [department, setDepartment] = useState('');
  const [departments, setDepartments] = useState([]);
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [responsibilities, setResponsibilities] = useState(['']);
  const [requirements, setRequirements] = useState(['']);
  const [preferredSkills, setPreferredSkills] = useState(['']);
  const [keySuggestions, setKeySuggestions] = useState(['']);
  const [type, setType] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch departments from JSON server
    const fetchDepartments = async () => {
      try {
        const response = await axios.get('http://localhost:5000/departments');
        setDepartments(response.data);
      } catch (error) {
        console.error('Error fetching departments:', error);
      }
    };

    fetchDepartments();
  }, []);

  const handleArrayChange = (setter, index, value) => {
    setter((prev) => {
      const newArray = [...prev];
      newArray[index] = value;
      return newArray;
    });
  };

  const addArrayItem = (setter) => {
    setter((prev) => [...prev, '']);
  };

  const removeArrayItem = (setter, index) => {
    setter((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newJob = {
      title,
      department,
      location,
      description,
      responsibilities,
      requirements,
      preferredSkills,
      keySuggestions,
      type,
    };

    try {
      await axios.post('http://localhost:5000/jobs', newJob);
      // Reset form fields
      setTitle('');
      setDepartment('');
      setLocation('');
      setDescription('');
      setResponsibilities(['']);
      setRequirements(['']);
      setPreferredSkills(['']);
      setKeySuggestions(['']);
      setType('');
    } catch (error) {
      console.error('Error posting job:', error);
    }
  };

  return (
    <div className="bg-white p-8 rounded shadow-lg w-full max-w-2xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Post a Job</h1>
        <Link to="/Postjobs" className="text-blue-500 hover:text-blue-700">
          Go Back
        </Link>
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <div>
          <label
            htmlFor="title"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Job Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Job Title"
            required
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          />
        </div>
        <div>
          <label
            htmlFor="department"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Department
          </label>
          <select
            id="department"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            required
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          >
            <option value="">Select Department</option>
            {departments.map((dept) => (
              <option key={dept.id} value={dept.name}>
                {dept.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label
            htmlFor="location"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Location
          </label>
          <input
            type="text"
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Location"
            required
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          />
        </div>
        <div>
          <label
            htmlFor="description"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
            required
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          />
        </div>
        <div>
          <label
            htmlFor="responsibilities"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Responsibilities
          </label>
          {responsibilities.map((item, index) => (
            <div key={index} className="flex items-center gap-2 mb-2">
              <textarea
                id={`responsibilities-${index}`}
                value={item}
                onChange={(e) =>
                  handleArrayChange(setResponsibilities, index, e.target.value)
                }
                placeholder="Responsibility"
                required
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 h-10 resize-none"
              />
              <button
                type="button"
                onClick={() => removeArrayItem(setResponsibilities, index)}
                className="text-red-500 hover:text-red-700"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => addArrayItem(setResponsibilities)}
            className="text-blue-500 hover:text-blue-700"
          >
            Add Responsibility
          </button>
        </div>
        <div>
          <label
            htmlFor="requirements"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Requirements
          </label>
          {requirements.map((item, index) => (
            <div key={index} className="flex items-center gap-2 mb-2">
              <textarea
                id={`requirements-${index}`}
                value={item}
                onChange={(e) =>
                  handleArrayChange(setRequirements, index, e.target.value)
                }
                placeholder="Requirement"
                required
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 h-10 resize-none"
              />
              <button
                type="button"
                onClick={() => removeArrayItem(setRequirements, index)}
                className="text-red-500 hover:text-red-700"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => addArrayItem(setRequirements)}
            className="text-blue-500 hover:text-blue-700"
          >
            Add Requirement
          </button>
        </div>
        <div>
          <label
            htmlFor="preferredSkills"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Preferred Skills
          </label>
          {preferredSkills.map((item, index) => (
            <div key={index} className="flex items-center gap-2 mb-2">
              <textarea
                id={`preferredSkills-${index}`}
                value={item}
                onChange={(e) =>
                  handleArrayChange(setPreferredSkills, index, e.target.value)
                }
                placeholder="Preferred Skill"
                required
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 h-10 resize-none"
              />
              <button
                type="button"
                onClick={() => removeArrayItem(setPreferredSkills, index)}
                className="text-red-500 hover:text-red-700"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => addArrayItem(setPreferredSkills)}
            className="text-blue-500 hover:text-blue-700"
          >
            Add Preferred Skill
          </button>
        </div>
        <div>
          <label
            htmlFor="keySuggestions"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Key Suggestions
          </label>
          {keySuggestions.map((item, index) => (
            <div key={index} className="flex items-center gap-2 mb-2">
              <textarea
                maxLength={5}
                id={`keySuggestions-${index}`}
                value={item}
                onChange={(e) =>
                  handleArrayChange(setKeySuggestions, index, e.target.value)
                }
                placeholder="Key Suggestion"
                required
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 h-10 resize-none"
              />
              <button
                type="button"
                onClick={() => removeArrayItem(setKeySuggestions, index)}
                className="text-red-500 hover:text-red-700"
              >
                Remove
              </button>
            </div>
          ))}
          {keySuggestions.length < 3 && (
            <button
              type="button"
              onClick={() => addArrayItem(setKeySuggestions)}
              className="text-blue-500 hover:text-blue-700"
            >
              Add Key Suggestion
            </button>
          )}
        </div>
        <div>
          <label
            htmlFor="type"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Type
          </label>
          <select
            id="type"
            value={type}
            onChange={(e) => setType(e.target.value)}
            required
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          >
            <option value="">Select Type</option>
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
            <option value="Contract">Contract</option>
          </select>
        </div>
        <button
          type="submit"
          className="text-white bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        >
          Request Job
        </button>
      </form>
    </div>
  );
};

export default PostJob;
