import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const OpenPositions = () => {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 3;

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const result = await axios.get('http://localhost:5000/jobs');
        const postedJobs = result.data.filter((job) => job.posted === true);
        setJobs(postedJobs);
        setFilteredJobs(postedJobs);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    };

    const fetchDepartments = async () => {
      try {
        const result = await axios.get('http://localhost:5000/departments');
        setDepartments(result.data);
      } catch (error) {
        console.error('Error fetching departments:', error);
      }
    };

    fetchJobs();
    fetchDepartments();

    const interval = setInterval(() => {
      fetchJobs();
      fetchDepartments();
    }, 60000); // Fetch data every minute

    return () => clearInterval(interval);
  }, []);

  const filterJobs = (category) => {
    if (category === 'all') {
      setFilteredJobs(jobs);
    } else {
      const filtered = jobs.filter((job) => job.department === category);
      setFilteredJobs(filtered);
    }
    setCurrentPage(1); // Reset to first page when filtering
  };

  const handleDropdownChange = (event) => {
    const category = event.target.value;
    setSelectedCategory(category);
    filterJobs(category);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);
  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);

  // Calculate pagination range
  const pageNumbers = [];
  let startPage = Math.max(1, currentPage - 2);
  let endPage = Math.min(totalPages, currentPage + 2);

  if (totalPages > 5) {
    if (currentPage <= 3) {
      endPage = 5;
    } else if (currentPage + 2 >= totalPages) {
      startPage = totalPages - 4;
    }
  }

  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <section id="job-listings" className="py-12 bg-blue-50">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-6 text-[#071952]">
          Open Positions
        </h2>
        <div className="flex justify-center mb-8">
          <select
            className="px-4 py-2 bg-[#071952] text-white rounded shadow-md focus:outline-none"
            value={selectedCategory}
            onChange={handleDropdownChange}
          >
            <option value="all">All</option>
            {departments.map((department) => (
              <option key={department.id} value={department.name}>
                {department.name}
              </option>
            ))}
          </select>
        </div>
        <div
          id="job-listings"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mx-12"
        >
          {currentJobs.length > 0 ? (
            currentJobs.map((job) => (
              <div
                key={job.id}
                className="bg-white shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105"
              >
                <div className="flex items-center p-4 border-b border-gray-200">
                  <img
                    className="w-16 h-16 object-cover"
                    src="public/assets/IElogo.png"
                    alt={job.company}
                  />
                  <div className="ml-4">
                    <h3 className="text-xl font-semibold text-[#071952]">
                      {job.company}
                    </h3>
                    <span className="text-sm text-[#37B7C3]">
                      {job.location}
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-2xl font-medium text-[#071952] mb-2">
                    {job.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    {job.description}
                  </p>
                  <div className="flex flex-wrap mb-2">
                    {job.keySuggestions?.map((skill, index) => (
                      <span
                        key={index}
                        className="bg-[#37B7C3] text-white text-xs font-medium px-2 py-1 rounded-full mr-2 mb-2"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                  <div className="text-sm text-[#37B7C3] mb-4">
                    Deadline: {new Date(job.deadline).toLocaleDateString()}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-[#071952]">
                      {job.type}
                    </span>
                    <Link
                      to={`/job-details/${job.id}`}
                      className="text-[#37B7C3] font-medium hover:text-[#088395] transition duration-300"
                    >
                      Show Details
                    </Link>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div
              id="no-jobs-card"
              className="bg-white shadow-lg rounded-lg overflow-hidden text-center p-6 mx-auto max-w-sm"
            >
              <h3 className="text-2xl font-semibold mb-4 text-[#071952]">
                No Open Jobs
              </h3>
              <p className="text-gray-600">
                There are currently no open positions in the selected category.
                Please check back later.
              </p>
            </div>
          )}
        </div>
        {filteredJobs.length > 0 && (
          <div className="flex justify-center mt-8">
            <nav className="flex items-center space-x-2">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-[#071952] text-white rounded-md disabled:opacity-50"
              >
                Previous
              </button>
              {pageNumbers.map((pageNumber) => (
                <button
                  key={pageNumber}
                  onClick={() => handlePageChange(pageNumber)}
                  className={`px-4 py-2 rounded-md ${
                    pageNumber === currentPage
                      ? 'bg-[#071952] text-white'
                      : 'bg-white text-[#071952]'
                  }`}
                >
                  {pageNumber}
                </button>
              ))}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-4 py-2 bg-[#071952] text-white rounded-md disabled:opacity-50"
              >
                Next
              </button>
            </nav>
          </div>
        )}
      </div>
    </section>
  );
};

export default OpenPositions;
