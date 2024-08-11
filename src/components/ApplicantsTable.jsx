import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ApplicantsTable = ({ searchTerm }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/applicants');
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const filteredData = searchTerm
    ? data.filter((item) =>
        `${item.firstName} ${item.lastName} ${item.jobPosition}`
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      )
    : data;

  // Function to accept an applicant
  const handleAccept = async (id) => {
    try {
      const updatedApplicant = {
        status: 'Accepted',
        stage: 'UnderReview',
        testRating: null,
        interviewRating: null,
        dateProcessed: new Date().toISOString(),
      };

      const response = await axios.patch(`http://localhost:5000/applicants/${id}`, updatedApplicant);

      if (response.status === 200) {
        updateLocalData(id, updatedApplicant);
      } else {
        console.error('Failed to update status');
      }
    } catch (error) {
      console.error('Error accepting applicant:', error);
    }
  };

  // Function to reject an applicant
  const handleReject = async (id) => {
    try {
      const updatedApplicant = {
        status: 'Rejected',
        stage: 'Rejected',
        testRating: null,
        interviewRating: null,
        dateProcessed: new Date().toISOString(),
      };

      const response = await axios.patch(`http://localhost:5000/applicants/${id}`, updatedApplicant);

      if (response.status === 200) {
        updateLocalData(id, updatedApplicant);
      } else {
        console.error('Failed to update status');
      }
    } catch (error) {
      console.error('Error rejecting applicant:', error);
    }
  };

  // Function to retract (set to pending) an applicant
  const handleRetract = async (id) => {
    try {
      const updatedApplicant = {
        status: 'Pending',
        stage: null,
        testRating: null,
        interviewRating: null,
        dateProcessed: null,
      };

      const response = await axios.patch(`http://localhost:5000/applicants/${id}`, updatedApplicant);

      if (response.status === 200) {
        updateLocalData(id, updatedApplicant);
      } else {
        console.error('Failed to update status');
      }
    } catch (error) {
      console.error('Error retracting applicant:', error);
    }
  };

  // Function to update the local state after a successful update
  const updateLocalData = (id, updatedApplicant) => {
    setData((prevData) =>
      prevData.map((applicant) =>
        applicant.id === id ? { ...applicant, ...updatedApplicant } : applicant
      )
    );
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 100, sortable: false },
    { field: 'firstName', headerName: 'First Name', width: 150 },
    { field: 'lastName', headerName: 'Last Name', width: 150 },
    { field: 'jobPosition', headerName: 'Job Position', width: 200 },
    { field: 'dateApplied', headerName: 'Date Applied', width: 150 },
    {
      field: 'status',
      headerName: 'Status',
      width: 150,
      renderCell: (params) => {
        let statusColor = 'text-gray-600';
        if (params.row.status === 'Pending') statusColor = 'text-yellow-500';
        else if (params.row.status === 'Accepted') statusColor = 'text-green-500';
        else if (params.row.status === 'Rejected') statusColor = 'text-red-500';

        return <span className={statusColor}>{params.row.status}</span>;
      },
    },
    {
      field: 'action',
      headerName: 'Action',
      width: 350,
      renderCell: (params) => (
        <div className="flex items-center gap-2">
          <Link to={`/applicant/${params.row.id}`} className="text-blue-500">
            <button className="px-3 py-1 text-sm font-semibold text-blue-600 border border-blue-600 rounded hover:bg-blue-600 hover:text-white">
              View
            </button>
          </Link>
          <button
            className="px-3 py-1 text-sm font-semibold text-green-600 border border-green-600 rounded hover:bg-green-600 hover:text-white"
            onClick={() => handleAccept(params.row.id)}
            disabled={params.row.status === 'Accepted'}
          >
            Accept
          </button>
          <button
            className="px-3 py-1 text-sm font-semibold text-red-600 border border-red-600 rounded hover:bg-red-600 hover:text-white"
            onClick={() => handleReject(params.row.id)}
            disabled={params.row.status === 'Rejected'}
          >
            Reject
          </button>
          <button
            className="px-3 py-1 text-sm font-semibold text-orange-600 border border-orange-600 rounded hover:bg-orange-600 hover:text-white"
            onClick={() => handleRetract(params.row.id)}
            disabled={params.row.status === 'Pending'}
          >
            Retract
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="w-full h-[500px] bg-white border border-gray-200 rounded-lg shadow overflow-y-auto">
      <DataGrid
        rows={filteredData}
        columns={columns}
        pageSize={15} // Set default page size to 15
        rowsPerPageOptions={[15]} // Fix the page size to 15
        pagination
        disableSelectionOnClick
        autoHeight={false} // Disable autoHeight to enable scrolling
      />
    </div>
  );
};

export default ApplicantsTable;
