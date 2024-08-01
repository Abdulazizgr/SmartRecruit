import React from 'react';

const JobDetailsPage = ({ job }) => {
  // Sample job data, replace with actual data fetching logic
  const jobDetails = {
    title: 'Software Engineer',
    department: 'Engineering',
    location: 'New York, NY',
    description: 'Full job description',
  };

  return (
    <div className="bg-white py-10 px-5 md:px-20">
      <h2 className="text-3xl font-bold mb-4">{jobDetails.title}</h2>
      <p className="text-gray-700 mb-2">{jobDetails.department}</p>
      <p className="text-gray-700 mb-2">{jobDetails.location}</p>
      <p className="text-gray-600 mb-6">{jobDetails.description}</p>
      <button className="bg-blue-500 text-white py-2 px-6 rounded-full hover:bg-blue-700 transition duration-300">
        Apply
      </button>
    </div>
  );
};

export default JobDetailsPage;
