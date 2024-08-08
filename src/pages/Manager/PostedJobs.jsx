import { useState, useEffect } from 'react';
import axios from 'axios';
import Table from '../../components/Table';

const PostedJobs = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get('http://localhost:5000/jobs');
        setJobs(response.data);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    };

    fetchJobs();
  }, []);

  const updateJobStatus = async (id, status) => {
    try {
      const updatedJob = jobs.find(job => job.id === id);
      if (!updatedJob) return;
      
      const newJob = { ...updatedJob, status };
      await axios.put(`http://localhost:5000/jobs/${id}`, newJob);

      const updatedJobs = jobs.map(job =>
        job.id === id ? newJob : job
      );
      setJobs(updatedJobs);
    } catch (error) {
      console.error('Error updating job status:', error);
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
    } catch (error) {
      console.error('Error deleting job:', error);
    }
  };

  return (
    <div className="bg-white p-8 rounded shadow-lg w-full mx-auto">
      <h1 className="text-2xl font-bold mb-6">Posted Jobs</h1>
      {jobs.length > 0 ? (
        <Table
          data={jobs}
          handleAccept={handleAccept}
          handleReject={handleReject}
          handleDelete={handleDelete}
        />
      ) : (
        <p>No jobs posted yet.</p>
      )}
    </div>
  );
};

export default PostedJobs;
