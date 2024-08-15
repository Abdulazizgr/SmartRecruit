import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import {
  DataGrid,
  gridPageCountSelector,
  gridPageSelector,
  useGridApiContext,
  useGridSelector,
  GridToolbarExport,
  GridToolbarContainer,
} from '@mui/x-data-grid';
import axios from 'axios';
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';

// Custom StyledDataGrid
const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
  border: 0,
  color:
    theme.palette.mode === 'light'
      ? 'rgba(0,0,0,.85)'
      : 'rgba(255,255,255,0.85)',
  fontFamily: [
    '-apple-system',
    'BlinkMacSystemFont',
    '"Segoe UI"',
    'Roboto',
    '"Helvetica Neue"',
    'Arial',
    'sans-serif',
    '"Apple Color Emoji"',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"',
  ].join(','),
  WebkitFontSmoothing: 'auto',
  letterSpacing: 'normal',
  '& .MuiDataGrid-columnsContainer': {
    backgroundColor: theme.palette.mode === 'light' ? '#fafafa' : '#1d1d1d',
  },
  '& .MuiDataGrid-iconSeparator': {
    display: 'none',
  },
  '& .MuiDataGrid-columnHeader, .MuiDataGrid-cell': {
    borderRight: `1px solid ${
      theme.palette.mode === 'light' ? '#f0f0f0' : '#303030'
    }`,
  },
  '& .MuiDataGrid-columnsContainer, .MuiDataGrid-cell': {
    borderBottom: `1px solid ${
      theme.palette.mode === 'light' ? '#f0f0f0' : '#303030'
    }`,
  },
  '& .MuiDataGrid-cell': {
    color:
      theme.palette.mode === 'light'
        ? 'rgba(0,0,0,.85)'
        : 'rgba(255,255,255,0.65)',
  },
  '& .MuiPaginationItem-root': {
    borderRadius: 0,
  },
}));

// Custom Pagination component
const CustomPagination = () => {
  const apiRef = useGridApiContext();
  const page = useGridSelector(apiRef, gridPageSelector);
  const pageCount = useGridSelector(apiRef, gridPageCountSelector);
  return (
    <Pagination
      color="primary"
      variant="outlined"
      shape="rounded"
      page={page + 1}
      count={pageCount}
      renderItem={(props) => <PaginationItem {...props} disableRipple />}
      onChange={(event, value) => apiRef.current.setPage(value - 1)}
    />
  );
};

const CustomToolbar = () => {
  return (
    <GridToolbarContainer style={{ justifyContent: 'flex-start', backgroundColor: '#f0f4ff' }}>
      <GridToolbarExport style={{ color: 'blue' }} /> {/* Custom color and position */}
    </GridToolbarContainer>
  );
};
const ApplicantsTable = ({ searchTerm }) => {
  const [data, setData] = useState([]);
  const [selectedApplicant, setSelectedApplicant] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [fullCoverLetterModalOpen, setFullCoverLetterModalOpen] =
    useState(false);
    const [paginationModel, setPaginationModel] = useState({
      pageSize: 5,
      page: 0,
    });
    const [gridHeight, setGridHeight] = useState('auto');
    const [loading, setLoading] = useState(false);
  
    useEffect(() => {
      if (loading) {
        // Calculate the height based on the number of rows (pageSize)
        const rowHeight = 52; // Approximate height of each row in pixels
        const headerHeight = 56; // Height of the header
        const toolbarHeight = 56; // Height of the toolbar (if using one)
        const totalHeight = headerHeight + toolbarHeight + rowHeight * paginationModel.pageSize +40;
  
        // Set the calculated height
        setGridHeight(`${totalHeight}px`);
  
        // Stop loading after a short delay
        setTimeout(() => {
          setLoading(false);
        }, 100); // Adjust delay as needed
      }
    }, [loading, paginationModel.pageSize]);
  
    const handlePaginationModelChange = (newPaginationModel) => {
      setLoading(true); // Trigger loading state
      setPaginationModel(newPaginationModel); // Update pagination model
    };
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

  const handleAccept = async (id) => {
    try {
      const updatedApplicant = {
        status: 'Accepted',
        stage: 'UnderReview',
        testRating: null,
        interviewRating: null,
        dateProcessed: new Date().toISOString(),
      };

      const response = await axios.patch(
        `http://localhost:5000/applicants/${id}`,
        updatedApplicant
      );

      if (response.status === 200) {
        updateLocalData(id, updatedApplicant);
      } else {
        console.error('Failed to update status');
      }
    } catch (error) {
      console.error('Error accepting applicant:', error);
    }
  };

  const handleReject = async (id) => {
    try {
      const updatedApplicant = {
        status: 'Rejected',
        stage: 'Rejected',
        testRating: null,
        interviewRating: null,
        dateProcessed: new Date().toISOString(),
      };

      const response = await axios.patch(
        `http://localhost:5000/applicants/${id}`,
        updatedApplicant
      );

      if (response.status === 200) {
        updateLocalData(id, updatedApplicant);
      } else {
        console.error('Failed to update status');
      }
    } catch (error) {
      console.error('Error rejecting applicant:', error);
    }
  };

  const handleRetract = async (id) => {
    try {
      const updatedApplicant = {
        status: 'Pending',
        stage: null,
        testRating: null,
        interviewRating: null,
        dateProcessed: null,
      };

      const response = await axios.patch(
        `http://localhost:5000/applicants/${id}`,
        updatedApplicant
      );

      if (response.status === 200) {
        updateLocalData(id, updatedApplicant);
      } else {
        console.error('Failed to update status');
      }
    } catch (error) {
      console.error('Error retracting applicant:', error);
    }
  };

  const updateLocalData = (id, updatedApplicant) => {
    setData((prevData) =>
      prevData.map((applicant) =>
        applicant.id === id ? { ...applicant, ...updatedApplicant } : applicant
      )
    );
  };

  const openModal = (applicant) => {
    setSelectedApplicant(applicant);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedApplicant(null);
  };

  const openFullCoverLetterModal = () => {
    setFullCoverLetterModalOpen(true);
  };

  const closeFullCoverLetterModal = () => {
    setFullCoverLetterModalOpen(false);
  };

  const columns = [
    { field: 'id', headerName:<strong className='text-base'>ID</strong> , width: 100, sortable: false },
    { field: 'firstName', headerName:<strong className='text-base'>First Name</strong> , width: 150 },
    { field: 'lastName', headerName:<strong className='text-base'>Last Name</strong> , width: 150 },
    { field: 'jobPosition', headerName:<strong className='text-base'>Job Position</strong> , width: 200 },
    { field: 'dateApplied', headerName:<strong className='text-base'>Date Applied</strong> , width: 150 },
    {
      field: 'status',
      headerName: <strong className='text-base'>Status</strong>,
      width: 150,
      renderCell: (params) => {
        let statusColor = 'text-gray-600';
        if (params.row.status === 'Pending') statusColor = 'text-yellow-500';
        else if (params.row.status === 'Accepted')
          statusColor = 'text-green-500';
        else if (params.row.status === 'Rejected') statusColor = 'text-red-500';

        return <span className={statusColor}>{params.row.status}</span>;
      },
    },
    {
      field: 'action',
      headerName: <strong className='text-base'>Action</strong>,
      width: 350,
      renderCell: (params) => (
        <div className="flex items-center gap-2">
          <button
            className="px-3 py-1 text-sm font-semibold text-blue-600 border border-blue-600 rounded hover:bg-blue-600 hover:text-white"
            onClick={() => openModal(params.row)}
          >
            View
          </button>
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
    <div className="relative w-min bg-white border border-gray-200 rounded-lg shadow overflow-y-auto">
    {loading ? (
      <div className="flex justify-center items-center h-full">
        <div className="animate-spin text-blue-500">
          <svg
            className="w-8 h-8"
            fill="none"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            ></path>
          </svg>
        </div>
      </div>
    ) : (
    <StyledDataGrid
    rows={filteredData}
    columns={columns}
    paginationModel={paginationModel}
    onPaginationModelChange={handlePaginationModelChange}
    pageSizeOptions={[5, 10, 25]}
    components={{
      Pagination: CustomPagination,
    }}
    style={{ fontSize: 16, width: '100%' }}
    slots={{ toolbar: CustomToolbar}}
  />
)}
      {modalOpen && selectedApplicant && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/2 max-w-3xl relative">
            <h2 className="text-2xl font-bold mb-4">Applicant Details</h2>
            <div className="space-y-4">
              <p>
                <strong>First Name:</strong> {selectedApplicant.firstName}
              </p>
              <p>
                <strong>Last Name:</strong> {selectedApplicant.lastName}
              </p>
              <p>
                <strong>Email:</strong> {selectedApplicant.email}
              </p>
              <div className="relative group">
                <p
                  className="truncate cursor-pointer"
                  onClick={openFullCoverLetterModal}
                >
                  <strong>Cover Letter:</strong>{' '}
                  {selectedApplicant.coverLetter.substring(0, 100)}
                  {selectedApplicant.coverLetter.length > 100 ? '...' : ''}
                </p>
              </div>
              <p>
                <strong>Job Position:</strong> {selectedApplicant.jobPosition}
              </p>
              <p>
                <strong>Stage:</strong>{' '}
                {selectedApplicant.stage
                  ? selectedApplicant.stage
                  : 'Not Yet Assigned'}
              </p>
              <p>
                <strong>Date Applied:</strong>{' '}
                {new Date(selectedApplicant.dateApplied).toLocaleDateString()}
              </p>
              <p>
                <strong>Date Processed:</strong>{' '}
                {selectedApplicant.dateProcessed
                  ? new Date(
                      selectedApplicant.dateProcessed
                    ).toLocaleDateString()
                  : 'Not Processed'}
              </p>
            </div>
            <button
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              onClick={closeModal}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {fullCoverLetterModalOpen && selectedApplicant && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/2 max-w-3xl relative">
            <button
              className="absolute top-4 right-4 text-blue-600 hover:text-blue-800"
              onClick={closeFullCoverLetterModal}
            >
              Go Back
            </button>
            <h2 className="text-2xl font-bold mb-4">Cover Letter</h2>
            <div className="whitespace-pre-wrap">
              {selectedApplicant.coverLetter}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ApplicantsTable;
