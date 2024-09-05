import React, { useState } from 'react';

const Table = ({ data = [], handleAccept, handleReject, handleDelete, handlePost }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [rowsPerPage, setRowsPerPage] = useState(5); // State for rows per page
  const [currentPage, setCurrentPage] = useState(1); // State for current page
  const [statusFilter, setStatusFilter] = useState('All'); // State for status filter

  const openModal = (job) => {
    setSelectedJob(job);
    setModalOpen(true);
  };

  const closeModal = () => {
    setSelectedJob(null);
    setModalOpen(false);
  };

  // Handle Rows Per Page Change
  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setCurrentPage(1); // Reset to first page when rows per page changes
  };

  // Handle Page Change
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  // Handle Status Filter Change
  const handleStatusFilterChange = (event) => {
    setStatusFilter(event.target.value);
    setCurrentPage(1); // Reset to first page when filter changes
  };

  // Filter data based on status
  const filteredData =
  statusFilter === 'All'
    ? data
    : data.filter(
        (job) => job.status && job.status.toLowerCase() === statusFilter.toLowerCase()
      );

  // Pagination Logic
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const currentData = filteredData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <div className="flex justify-between items-center mb-4">
        {/* Rows Per Page Selection */}
        <div className="flex items-center space-x-2">
          <span>Rows per page:</span>
          <select
            value={rowsPerPage}
            onChange={handleRowsPerPageChange}
            className="p-1 border border-gray-300 rounded"
          >
            {[5, 10, 50].map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>
        </div>

        {/* Status Filter */}
        <div className="flex items-center space-x-2">
          <span>Filter by Status:</span>
          <select
            value={statusFilter}
            onChange={handleStatusFilterChange}
            className="p-1 border border-gray-300 rounded"
          >
            {['All', 'Accepted', 'Rejected', 'Pending'].map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>
      </div>

      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">#</th>
            <th scope="col" className="px-6 py-3">Job Title</th>
            <th scope="col" className="px-6 py-3">Description</th>
            <th scope="col" className="px-6 py-3">Location</th>
            <th scope="col" className="px-6 py-3">Department</th>
            <th scope="col" className="px-6 py-3">Type</th>
            <th scope="col" className="px-6 py-3">Status</th>
            <th scope="col" className="px-6 py-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentData.length > 0 ? (
            currentData.map((job, index) => (
              <tr
                key={index}
                className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {(currentPage - 1) * rowsPerPage + index + 1}
                </th>
                <td className="px-6 py-4">{job.title}</td>
                <td className="px-6 py-4 break-words max-w-xs">{job.description}</td>
                <td className="px-6 py-4">{job.location}</td>
                <td className="px-6 py-4">{job.department}</td>
                <td className="px-6 py-4">{job.type}</td>
                <td className="px-6 py-4">
                  <span className={job.status === 'Accepted' ? 'text-green-500' : 'text-red-500'}>
                    {job.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex mt-4">
                    <button
                      onClick={() => openModal(job)}
                      className="text-white bg-blue-500 hover:bg-blue-600 font-medium rounded-lg text-sm px-3 py-1 mr-2"
                    >
                      View
                    </button>
                    {handlePost && (
                      <button
                        onClick={() => handlePost(job)}
                        className="text-white bg-blue-500 hover:bg-blue-600 font-medium rounded-lg text-sm px-3 py-1 mr-2"
                      >
                        Post
                      </button>
                    )}
                    {handleAccept && handleReject && (
                      <>
                        <button
                          onClick={() => handleAccept(job.id)}
                          className="text-white bg-green-500 hover:bg-green-600 font-medium rounded-lg text-sm px-3 py-1 mr-2"
                        >
                          Accept
                        </button>
                        <button
                          onClick={() => handleReject(job.id)}
                          className="text-white bg-red-500 hover:bg-red-600 font-medium rounded-lg text-sm px-3 py-1 mr-2"
                        >
                          Reject
                        </button>
                      </>
                    )}
                    {handleDelete && (
                      <button
                        onClick={() => handleDelete(job.id)}
                        className="text-white bg-gray-500 hover:bg-gray-600 font-medium rounded-lg text-sm px-3 py-1"
                      >
                        Delete
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8" className="text-center py-4">No data available</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
        >
          Next
        </button>
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
    </div>
  );
};

export default Table;
