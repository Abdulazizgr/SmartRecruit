import { useState, useEffect } from 'react';

const PostedStatus = () => {
    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        // Retrieve jobs from LocalStorage
        const savedJobs = JSON.parse(localStorage.getItem('jobs')) || [];
        setJobs(savedJobs);
    }, []);

    return (
        <div className="bg-white p-8 rounded shadow-lg w-full mx-auto">
            <h1 className="text-2xl font-bold mb-6">Job Status</h1>
            {jobs.length > 0 ? (
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">#</th>
                            <th scope="col" className="px-6 py-3">Job Title</th>
                            <th scope="col" className="px-6 py-3">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {jobs.map((job, index) => (
                            <tr key={index} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {index + 1}
                                </th>
                                <td className="px-6 py-4">{job.title}</td>
                                <td className="px-6 py-4">
                                    <span className={`text-sm font-medium ${job.status === 'Accepted' ? 'text-green-500' : 'text-red-500'}`}>
                                        {job.status || 'Pending'}
                                    </span>
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

export default PostedStatus;
