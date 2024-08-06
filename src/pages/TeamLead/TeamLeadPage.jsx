import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

const TeamLeadPage = () => {
    const navigate = useNavigate();
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

    const handlePostJob = () => {
        navigate('/post-job');
    };

    return (
        <section className="bg-white">
            <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
                <div className="mr-auto place-self-center lg:col-span-7">
                    <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-5xl">
                        Welcome, Team Lead.
                    </h1>
                    <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl">
                        How are you doing? You can post a job or see the status of the job you posted previously.
                    </p>
                    <button
                        onClick={handlePostJob}
                        className="mr-10 inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-white rounded-lg bg-palette-700 hover:bg-cyan-800 focus:ring-4 focus:ring-primary-300"
                    >
                        Post a Job
                    </button>
                </div>
                <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
                    <img src="src/assets/TeamLeadpage.png" alt="TeamLead illustration" className="max-w-sm max-h-sm" />
                </div>
            </div>
            <div className="mt-8 bg-white p-8 rounded shadow-lg w-full mx-auto">
                <h1 className="text-2xl font-bold mb-6">Job Status</h1>
                {jobs.length > 0 ? (
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">#</th>
                                <th scope="col" className="px-6 py-3">Job Title</th>
                                <th scope="col" className="px-6 py-3">Department</th>
                                <th scope="col" className="px-6 py-3">Location</th>
                                <th scope="col" className="px-6 py-3">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {jobs.map((job, index) => (
                                <tr key={job.id} className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                                    <td className="px-6 py-4">{index + 1}</td>
                                    <td className="px-6 py-4">{job.title}</td>
                                    <td className="px-6 py-4">{job.department}</td>
                                    <td className="px-6 py-4">{job.location}</td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center px-3 py-1 text-xs font-medium ${job.status === 'Accepted' ? 'text-green-800 bg-green-100 dark:bg-green-900 dark:text-green-300' : job.status === 'Rejected' ? 'text-red-800 bg-red-100 dark:bg-red-900 dark:text-red-300' : 'text-gray-800 bg-gray-100 dark:bg-gray-900 dark:text-gray-300'} rounded-full`}>
                                            {job.status || 'Pending'}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p className="text-center text-gray-500">No jobs posted yet.</p>
                )}
            </div>
        </section>
    );
};

export default TeamLeadPage;
