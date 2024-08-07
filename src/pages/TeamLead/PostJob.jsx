import { useState } from 'react';
import axios from 'axios';

const PostJob = () => {
    const [title, setTitle] = useState('');
    const [department, setDepartment] = useState('');
    const [location, setLocation] = useState('');
    const [description, setDescription] = useState('');
    const [responsibilities, setResponsibilities] = useState(['']);
    const [requirements, setRequirements] = useState(['']);
    const [preferredSkills, setPreferredSkills] = useState(['']);
    const [type, setType] = useState('');

    const handleArrayChange = (setter, index, value) => {
        setter(prev => {
            const newArray = [...prev];
            newArray[index] = value;
            return newArray;
        });
    };

    const addArrayItem = (setter) => {
        setter(prev => [...prev, '']);
    };

    const removeArrayItem = (setter, index) => {
        setter(prev => prev.filter((_, i) => i !== index));
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
            setType('');
        } catch (error) {
            console.error('Error posting job:', error);
        }
    };

    return (
        <div className="bg-white p-8 rounded shadow-lg w-full max-w-2xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">Post a Job</h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <div>
                    <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900">Job Title</label>
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
                    <label htmlFor="department" className="block mb-2 text-sm font-medium text-gray-900">Department</label>
                    <input
                        type="text"
                        id="department"
                        value={department}
                        onChange={(e) => setDepartment(e.target.value)}
                        placeholder="Department"
                        required
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    />
                </div>
                <div>
                    <label htmlFor="location" className="block mb-2 text-sm font-medium text-gray-900">Location</label>
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
                    <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900">Description</label>
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
                    <label htmlFor="responsibilities" className="block mb-2 text-sm font-medium text-gray-900">Responsibilities</label>
                    {responsibilities.map((item, index) => (
                        <div key={index} className="flex items-center gap-2">
                            <textarea
                                id={`responsibilities-${index}`}
                                value={item}
                                onChange={(e) => handleArrayChange(setResponsibilities, index, e.target.value)}
                                placeholder="Responsibility"
                                required
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            />
                            <button type="button" onClick={() => removeArrayItem(setResponsibilities, index)} className="text-red-500 hover:text-red-700">Remove</button>
                        </div>
                    ))}
                    <button type="button" onClick={() => addArrayItem(setResponsibilities)} className="text-blue-500 hover:text-blue-700">Add Responsibility</button>
                </div>
                <div>
                    <label htmlFor="requirements" className="block mb-2 text-sm font-medium text-gray-900">Requirements</label>
                    {requirements.map((item, index) => (
                        <div key={index} className="flex items-center gap-2">
                            <textarea
                                id={`requirements-${index}`}
                                value={item}
                                onChange={(e) => handleArrayChange(setRequirements, index, e.target.value)}
                                placeholder="Requirement"
                                required
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            />
                            <button type="button" onClick={() => removeArrayItem(setRequirements, index)} className="text-red-500 hover:text-red-700">Remove</button>
                        </div>
                    ))}
                    <button type="button" onClick={() => addArrayItem(setRequirements)} className="text-blue-500 hover:text-blue-700">Add Requirement</button>
                </div>
                <div>
                    <label htmlFor="preferredSkills" className="block mb-2 text-sm font-medium text-gray-900">Preferred Skills</label>
                    {preferredSkills.map((item, index) => (
                        <div key={index} className="flex items-center gap-2">
                            <textarea
                                id={`preferredSkills-${index}`}
                                value={item}
                                onChange={(e) => handleArrayChange(setPreferredSkills, index, e.target.value)}
                                placeholder="Preferred Skill"
                                required
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            />
                            <button type="button" onClick={() => removeArrayItem(setPreferredSkills, index)} className="text-red-500 hover:text-red-700">Remove</button>
                        </div>
                    ))}
                    <button type="button" onClick={() => addArrayItem(setPreferredSkills)} className="text-blue-500 hover:text-blue-700">Add Preferred Skill</button>
                </div>
                <div>
                    <label htmlFor="type" className="block mb-2 text-sm font-medium text-gray-900">Job Type</label>
                    <select
                        id="type"
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                        required
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    >
                        <option value="">Select Job Type</option>
                        <option value="Full-time">Full-time</option>
                        <option value="Part-time">Part-time</option>
                        <option value="Remote">Remote</option>
                    </select>
                </div>
                <button
                    type="submit"
                    className="text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:outline-none focus:ring-cyan-700 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center"
                >
                    Post Job
                </button>
            </form>
        </div>
    );
};

export default PostJob;
