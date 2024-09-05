import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ManagerPage = () => {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [filter, setFilter] = useState('All');
  const [selectedJob, setSelectedJob] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

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

  const handleSeePostedJob = () => {
    navigate('/see-posted-job'); // Example navigation to a see posted job page
  };

  const handleSeeHistory = () => {
    navigate('/see-history'); // Example navigation to a history page
  };

  const filteredJobs = jobs.filter(job => filter === 'All' || job.status === filter);

  const openModal = (job) => {
    setSelectedJob(job);
    setModalOpen(true);
  };

  const closeModal = () => {
    setSelectedJob(null);
    setModalOpen(false);
  };

  return (
    <section className="bg-white">
      <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
        <div className="mr-auto place-self-center lg:col-span-7">
          <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-5xl">
            Welcome, Manager.
          </h1>
          <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl">
            You can see posted jobs or view your history from here.
          </p>
          <button
            onClick={handleSeePostedJob}
            className="mr-10 inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-white rounded-lg bg-palette-700 hover:bg-cyan-800 focus:ring-4 focus:ring-primary-300"
          >
            See Posted Job
          </button>
          {/* <button
              onClick={handleSeeHistory}
              className="mr-10 inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-white border bg-palette-700 hover:bg-cyan-800 border-gray-300 rounded-lg focus:ring-4 focus:ring-gray-100"
            >
              See History
            </button> */}
        </div>
        <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
          <img src="src/assets/Managerpage.png" alt="Manager illustration" className="max-w-sm max-h-sm" />
        </div>
      </div>

      {/* History Section */}
      <div className="bg-white p-8 rounded shadow-lg w-full mx-auto mt-8">
        <h2 className="text-2xl font-bold mb-6">History of Job Posts</h2>
        <div className="mb-4">
          <label htmlFor="filter" className="mr-2">Filter by status:</label>
          <select
            id="filter"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="p-2 border rounded"
          >
            <option value="All">All</option>
            <option value="Accepted">Accepted</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>
        {filteredJobs.length > 0 ? (
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">#</th>
                <th scope="col" className="px-6 py-3">Job Title</th>
                <th scope="col" className="px-6 py-3">Description</th>
                <th scope="col" className="px-6 py-3">Department</th>
                <th scope="col" className="px-6 py-3">Skills</th>
                <th scope="col" className="px-6 py-3">Type</th>
                <th scope="col" className="px-6 py-3">Status</th>
                <th scope="col" className="px-6 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredJobs.map((job, index) => (
                <tr key={index} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                  <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {index + 1}
                  </th>
                  <td className="px-6 py-4">{job.title}</td>
                  <td className="px-6 py-4 break-words max-w-xs">{job.description}</td>
                  <td className="px-6 py-4">{job.department}</td>
                  <td className="px-6 py-4 break-words max-w-xs">{job.preferredSkills}</td>
                  <td className="px-6 py-4">{job.type}</td>
                  <td className="px-6 py-4">
                    <span className={`text-sm font-medium ${job.status === 'Accepted' ? 'text-green-500' : 'text-red-500'}`}>
                      {job.status || 'Pending'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button
          className="px-3 py-1 text-sm font-semibold text-blue-600 border border-blue-600 rounded hover:bg-blue-600 hover:text-white"
          onClick={() => {
            if (job) {
              openModal(job);
            } else {
              console.error('No row data available');
            }
          }}
        >
          View
        </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No job history available.</p>
        )}
      </div>

      {/* Modal */}
      {modalOpen && selectedJob && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/2 max-w-3xl relative">
            <h2 className="text-2xl font-bold mb-4">Job Details</h2>
            <div className="space-y-4">
              <p>
                <strong>Job Title:</strong> {selectedJob.title}
              </p>
              <p>
                <strong>Department:</strong> {selectedJob.department}
              </p>
              <p>
                <strong>Location:</strong> {selectedJob.location}
              </p>
              <p>
                <strong>Description:</strong> {selectedJob.description}
              </p>
              <p>
                <strong>Requirements:</strong>
                <ul className="list-disc list-inside">
                  {selectedJob.requirements.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </p>
              <p>
                <strong>Responsibilities:</strong>
                <ul className="list-disc list-inside">
                  {selectedJob.responsibilities.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </p>
              <p>
                <strong>Preferred Skills:</strong>
                <ul className="list-disc list-inside">
                  {selectedJob.preferredSkills.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </p>
              <p>
              <strong>Deadline:</strong> {selectedJob.deadline || 'Not Yet Assigned'}
              </p>
            </div>
            <div className="mt-6 flex justify-end space-x-2">
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
              >
                Go Back
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ManagerPage;
