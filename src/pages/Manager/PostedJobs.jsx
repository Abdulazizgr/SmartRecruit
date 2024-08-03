import { useState, useEffect } from 'react';
import Table from '../../components/Table';

const PostedJobs = () => {
    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        // Retrieve jobs from LocalStorage
        const savedJobs = JSON.parse(localStorage.getItem('jobs')) || [];
        setJobs(savedJobs);
    }, []);

    const handleAccept = (index) => {
        console.log(`Job at index ${index} accepted.`);
        // Add logic for accepting the job here
    };

    const handleReject = (index) => {
        console.log(`Job at index ${index} rejected.`);
        // Add logic for rejecting the job here
    };
    return (
        <div className="bg-white p-8 rounded shadow-lg w-full mx-auto">
            <h1 className="text-2xl font-bold mb-6">Posted Jobs</h1>
            {jobs.length > 0 ? (
                <Table data={jobs} handleAccept={handleAccept} handleReject={handleReject} />
            ) : (
                <p>No jobs posted yet.</p>
            )}
        </div>
    );
};

export default PostedJobs;
