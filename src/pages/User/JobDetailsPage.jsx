import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const JobDetailsPage = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/jobs/${id}`) // Fetch the specific job by ID
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setJob(data);
      })
      .catch((error) => {
        console.error('Error fetching job data:', error);
        setError(error.toString());
      });
  }, [id]);

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!job) {
    return <p>Loading...</p>;
  }

  // Ensure responsibilities, requirements, and preferredSkills are arrays
  const responsibilities = Array.isArray(job.responsibilities)
    ? job.responsibilities
    : job.responsibilities.split('\n');
  const requirements = Array.isArray(job.requirements)
    ? job.requirements
    : job.requirements.split('\n');
  const preferredSkills = Array.isArray(job.preferredSkills)
    ? job.preferredSkills
    : job.preferredSkills.split('\n');
  const type = Array.isArray(job.type) ? job.type : job.type.split('\n');

  return (
    <section id="job" className="bg-[#F9FAFB] py-12">
      <button
        type="button"
        className="uppercase py-2 px-2 rounded-lg bg-[#071952] border-2 border-transparent text-white text-md ml-4 hover:bg-[#088395]"
        onClick={() => (window.location.href = '/')}
      >
        Back to Home
      </button>
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center text-[#071952] mb-8">
          {job.title}
        </h2>
        <div className="bg-white shadow-lg rounded-lg p-6">
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-[#071952] mb-2">
              Department
            </h3>
            <p className="text-gray-600">{job.department}</p>
          </div>
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-[#071952] mb-2">
              Location
            </h3>
            <p className="text-gray-600">{job.location}</p>
          </div>
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-[#071952] mb-2">
              Job Description
            </h3>
            <p className="text-gray-600">{job.description}</p>
          </div>
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-[#071952] mb-2">
              Job Responsibilities
            </h3>
            <ul className="list-disc pl-5 text-gray-600">
              {responsibilities.map((responsibility, index) => (
                <li key={index}>{responsibility}</li>
              ))}
            </ul>
          </div>
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-[#071952] mb-2">
              Minimum Requirements
            </h3>
            <ul className="list-disc pl-5 text-gray-600">
              {requirements.map((requirement, index) => (
                <li key={index}>{requirement}</li>
              ))}
            </ul>
          </div>
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-[#071952] mb-2">
              Preferred Skills
            </h3>
            <ul className="list-disc pl-5 text-gray-600">
              {preferredSkills.map((skill, index) => (
                <li key={index}>{skill}</li>
              ))}
            </ul>
          </div>
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-[#071952] mb-2">Type</h3>
            <ul className="list-disc pl-5 text-gray-600">
              {type.map((type, index) => (
                <li key={index}>{type}</li>
              ))}
            </ul>
          </div>
          <div className="text-center">
            <Link
              to={`/application-form`}
              className="uppercase py-2 px-4 rounded-lg bg-[#071952] border-2 border-transparent text-[#EBF4F6] text-md mr-4 hover:bg-[#088395] scroll-smooth"
            >
              Apply
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default JobDetailsPage;
