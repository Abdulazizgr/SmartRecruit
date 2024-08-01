import { useState, useEffect } from 'react';

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
        <div className="bg-white p-8 rounded shadow-lg w-full max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">Posted Jobs</h1>
            {jobs.length > 0 ? (
                <table className="w-full border-collapse border border-gray-200">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border p-2 text-left">#</th>
                            <th className="border p-2 text-left">Job Title</th>
                            <th className="border p-2 text-left">Description</th>
                            <th className="border p-2 text-left">Location</th>
                            <th className="border p-2 text-left">Deadline</th>
                            <th className="border p-2 text-left">Requirements</th>
                            <th className="border p-2 text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {jobs.map((job, index) => (
                            <tr key={index} className="bg-white">
                                <td className="border p-2">{index + 1}</td>
                                <td className="border p-2">{job.title}</td>
                                <td className="border p-2 break-words max-w-xs">{job.description}</td>
                                <td className="border p-2">{job.location}</td>
                                <td className="border p-2">{job.deadline}</td>
                                <td className="border p-2 break-words max-w-xs">{job.requirements}</td>
                                <td className="border p-2">
                                    <div className='flex mt-4'>
                                        <button
                                            onClick={() => handleAccept(index)}
                                            className="text-white bg-green-500 hover:bg-green-600 font-medium rounded-lg text-sm px-3 py-1 mr-4"
                                        >
                                            Accept
                                        </button>
                                        <button
                                            onClick={() => handleReject(index)}
                                            className="text-white bg-red-500 hover:bg-red-600 font-medium rounded-lg text-sm px-3 py-1"
                                        >
                                            Reject
                                        </button>

                                    </div>   

                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No jobs posted yet.</p>
            )}
        </div>
    );
};

export default PostedJobs;
