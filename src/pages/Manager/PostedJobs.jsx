import { useState, useEffect } from 'react';
import Table from '../../components/Table';

const PostedJobs = () => {
    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        // Retrieve jobs from LocalStorage
        const savedJobs = JSON.parse(localStorage.getItem('jobs')) || [];
        setJobs(savedJobs);
    }, []);

    const updateJobStatus = (index, status) => {
        const updatedJobs = jobs.map((job, i) => {
            if (i === index) {
                return { ...job, status };
            }
            return job;
        });

        setJobs(updatedJobs);
        localStorage.setItem('jobs', JSON.stringify(updatedJobs));
    };

    const handleAccept = (index) => {
        console.log(`Job at index ${index} accepted.`);
        updateJobStatus(index, 'Accepted');
    };

    const handleReject = (index) => {
        console.log(`Job at index ${index} rejected.`);
        updateJobStatus(index, 'Rejected');
    };

    const handleDelete = (index) => {
        const updatedJobs = jobs.filter((_, i) => i !== index);
        setJobs(updatedJobs);
        localStorage.setItem('jobs', JSON.stringify(updatedJobs));
    };

    return (
        <div className="bg-white p-8 rounded shadow-lg w-full mx-auto">
            <h1 className="text-2xl font-bold mb-6">Posted Jobs</h1>
            {jobs.length > 0 ? (
                <Table data={jobs} handleAccept={handleAccept} handleReject={handleReject} handleDelete={handleDelete} />
            ) : (
                <p>No jobs posted yet.</p>
            )}
        </div>
    );
};

export default PostedJobs;
