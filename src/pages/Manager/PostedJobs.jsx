import { useState, useEffect } from 'react';
import axios from 'axios';
import Table from '../../components/Table';

const PostedJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState('');

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get('http://localhost:5000/jobs');
        setJobs(response.data);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        setNotification(''); // Clear notification after 3 seconds
      }, 3000);

      return () => clearTimeout(timer); // Clear timer on component unmount or when notification changes
    }
  }, [notification]);

  const updateJobStatus = async (id, status) => {
    try {
      const updatedJob = jobs.find(job => job.id === id);
      if (!updatedJob) return;

      const newJob = { ...updatedJob, status };
      await axios.put(`http://localhost:5000/jobs/${id}`, newJob);

      const updatedJobs = jobs.map(job => (job.id === id ? newJob : job));
      setJobs(updatedJobs);
      setNotification(`Job ${status.toLowerCase()} successfully!`);
    } catch (error) {
      console.error('Error updating job status:', error);
      setNotification('Error updating job status.');
    }
  };

  const handleAccept = (id) => {
    updateJobStatus(id, 'Accepted');
  };

  const handleReject = (id) => {
    updateJobStatus(id, 'Rejected');
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/jobs/${id}`);

      const updatedJobs = jobs.filter(job => job.id !== id);
      setJobs(updatedJobs);
      setNotification('Job deleted successfully!');
    } catch (error) {
      console.error('Error deleting job:', error);
      setNotification('Error deleting job.');
    }
  };

  // Filter jobs based on search term
  const filteredJobs = jobs.filter((job) =>
    job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white p-8 rounded shadow-lg w-full mx-auto">
      <h1 className="text-3xl font-semibold mb-8 text-center text-gray-800">Posted Jobs</h1>

      {/* Job Status Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
        <div className="flex flex-col items-center bg-green-50 p-6 rounded-lg shadow hover:shadow-lg transition-shadow duration-200">
          <p className="text-xl font-bold text-green-600">Accepted Jobs</p>
          <p className="text-2xl font-semibold text-green-700 mt-2">{jobs.filter(job => job.status === 'Accepted').length}</p>
        </div>
        <div className="flex flex-col items-center bg-red-50 p-6 rounded-lg shadow hover:shadow-lg transition-shadow duration-200">
          <p className="text-xl font-bold text-red-600">Rejected Jobs</p>
          <p className="text-2xl font-semibold text-red-700 mt-2">{jobs.filter(job => job.status === 'Rejected').length}</p>
        </div>
        <div className="flex flex-col items-center bg-blue-50 p-6 rounded-lg shadow hover:shadow-lg transition-shadow duration-200">
          <p className="text-xl font-bold text-blue-600">Posted Jobs</p>
          <p className="text-2xl font-semibold text-blue-700 mt-2">{jobs.filter(job => job.posted === true).length}</p>
        </div>
      </div>

      {/* Search Input */}
      <div className="relative mb-8">
        <input
          type="text"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Search jobs by title or department..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <svg
          className="w-6 h-6 absolute right-3 top-3 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-3.867-3.867a7.5 7.5 0 111.414-1.414L19 15l-4 4z"></path>
        </svg>
      </div>

      {/* Notification */}
      {notification && (
        <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg shadow-md">
          {notification}
        </div>
      )}

      {/* Loading Spinner */}
      {loading ? (
        <div className="flex justify-center items-center h-32">
          <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-16 w-16 animate-spin"></div>
        </div>
      ) : (
        <>
          {filteredJobs.length > 0 ? (
            <Table
              data={filteredJobs}
              handleAccept={handleAccept}
              handleReject={handleReject}
              handleDelete={handleDelete}
            />
          ) : (
            <p className="text-center text-gray-500">No jobs posted yet.</p>
          )}
        </>
      )}
    </div>
  );
};

export default PostedJobs;
