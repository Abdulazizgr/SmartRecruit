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

  return (
    <div className="flex">
      <Sidebar setSelectedMenu={setSelectedMenu} />
      <div className="flex-[6]">
        <Navbar />
        {selectedMenu === 'dashboard' && (
          <>
            <div className="flex gap-5 p-5">
              <Widgets type="employee"/>
              <Widgets type="department"/>
              <Widgets type="open-position"/>
              <Widgets type="attendance"/>
            </div>
            <div className="flex gap-5 p-5">
              <Featured/>
              <Chart/>
            </div>
            <div className="shadow-[2px_4px_10px_1px_rgba(201,201,201,0.47)] m-5 p-5">
              <div className="font-medium text-[gray] mb-[15px]">Recent Applicants</div>
              <Table />
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
              <Table 
                data={jobPostings} 
              />
            ) : (
              <p>No accepted job postings found.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard2;
