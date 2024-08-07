import React, { useState, useEffect } from 'react';
import Sidebar from '../../../components/Experimental/Sidebar';
import Navbar from '../../../components/Experimental/Navbar';
import Widgets from '../../../components/Experimental/Widgets';
import Featured from '../../../components/Experimental/featured/Featured';
import Chart from '../../../components/Experimental/chart/Chart';
import Table from '../../../components/Table';

const Dashboard2 = () => {
  const [selectedMenu, setSelectedMenu] = useState('dashboard');
  const [jobPostings, setJobPostings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  useEffect(() => {
    const fetchJobPostings = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch('http://localhost:5000/jobs');
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        const acceptedJobs = data.filter(job => job.status === 'Accepted');
        setJobPostings(acceptedJobs);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (selectedMenu === 'jobPostings') {
      fetchJobPostings();
    }
  }, [selectedMenu]);

  const handlePost = (job) => {
    setSelectedJob(job);
    setIsPopupOpen(true);
  };

  const handleSubmit = async () => {
    if (window.confirm(`Are you sure you want to post the job with application deadlines from ${startDate} to ${endDate}?`)) {
      try {
        const response = await fetch(`http://localhost:5000/jobs/${selectedJob.id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            status: 'Posted',
            startDate,
            endDate,
          }),
        });
        if (!response.ok) throw new Error('Failed to post job');
        const updatedJob = await response.json();
        setJobPostings(prevJobs => prevJobs.map(job => job.id === updatedJob.id ? updatedJob : job));
        setIsPopupOpen(false);
        setStartDate('');
        setEndDate('');
      } catch (error) {
        console.error('Error posting job:', error);
        alert('Failed to post job. Please try again.');
      }
    }
  };

  return (
    <div className="flex">
      <Sidebar setSelectedMenu={setSelectedMenu} />
      <div className="flex-[6]">
        <Navbar />
        {selectedMenu === 'dashboard' && (
          <>
            <div className="flex gap-5 p-5">
              <Widgets type="employee" />
              <Widgets type="department" />
              <Widgets type="open-position" />
              <Widgets type="attendance" />
            </div>
            <div className="flex gap-5 p-5">
              <Featured />
              <Chart />
            </div>
            <div className="shadow-[2px_4px_10px_1px_rgba(201,201,201,0.47)] m-5 p-5">
              <div className="font-medium text-[gray] mb-[15px]">Recent Applicants</div>
              <Table data={jobPostings} handlePost={handlePost} />
            </div>
          </>
        )}
        {selectedMenu === 'jobPostings' && (
          <div className="m-5 p-5">
            <div className="font-medium text-[gray] mb-[15px]">Accepted Job Postings</div>
            {loading ? (
              <p>Loading...</p>
            ) : error ? (
              <p>Error: {error}</p>
            ) : jobPostings.length > 0 ? (
              <Table data={jobPostings} handlePost={handlePost} />
            ) : (
              <p>No accepted job postings found.</p>
            )}
          </div>
        )}
      </div>

      {isPopupOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg">
            <h2 className="text-xl font-bold mb-4">Set Application Deadline</h2>
            <div className="mb-4">
              <label className="block text-gray-700">Start Date</label>
              <input
                type="date"
                className="w-full p-2 border rounded"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">End Date</label>
              <input
                type="date"
                className="w-full p-2 border rounded"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
            <div className="flex justify-end">
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
                onClick={() => setIsPopupOpen(false)}
              >
                Cancel
              </button>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded"
                onClick={handleSubmit}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard2;
