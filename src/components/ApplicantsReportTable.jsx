import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import {
  DataGrid,
  useGridApiContext,
  useGridSelector,
  GridToolbarExport,
  GridToolbarContainer,
} from '@mui/x-data-grid';
import axios from 'axios';
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';

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
    <GridToolbarContainer
      style={{ justifyContent: 'flex-start', backgroundColor: '#f0f4ff' }}
    >
      <GridToolbarExport style={{ color: 'blue' }} />{' '}
      {/* Custom color and position */}
    </GridToolbarContainer>
  );
};

const ApplicantReportTable = () => {
  const [data, setData] = useState([]);
  const [selectedApplicant, setSelectedApplicant] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [paginationModel, setPaginationModel] = useState({
    pageSize: 10,
    page: 0,
  });
  const [gridHeight, setGridHeight] = useState('auto');
  const [loading, setLoading] = useState(false);
  const [fullCoverLetterModalOpen, setFullCoverLetterModalOpen] =
  useState(false);

  useEffect(() => {
    if (loading) {
      const rowHeight = 52; // Approximate height of each row in pixels
      const headerHeight = 56; // Height of the header
      const toolbarHeight = 56; // Height of the toolbar (if using one)
      const totalHeight =
        headerHeight +
        toolbarHeight +
        rowHeight * paginationModel.pageSize +
        100;

      setGridHeight(`${totalHeight}px`);

      setTimeout(() => {
        setLoading(false);
      }, 100); // Adjust delay as needed
    }
  }, [loading, paginationModel.pageSize]);

  useEffect(() => {
    fetchData();
  }, [paginationModel]);

  const handlePaginationModelChange = (newPaginationModel) => {
    setLoading(true);
    setPaginationModel(newPaginationModel);
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:5000/applicants');
      console.log('Fetched data:', response.data); // Debug log
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
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
    { field: 'id', headerName:<strong>ID</strong>, width: 100, sortable: false },
    { field: 'firstName', headerName:<strong>First Name</strong> , width: 150 },
    { field: 'lastName', headerName:<strong>Last Name</strong> , width: 150 },
    { field: 'email', headerName:<strong>Email</strong> , width: 250 },
    { field: 'jobPosition', headerName:<strong>Job Position</strong>, width: 280 },
    { field: 'departmentId', headerName:<strong>Department ID</strong> , width: 150 },
    { field: 'dateApplied', headerName:<strong>Date Applied</strong> , width: 150 },
    { field: 'status', headerName:<strong>Status</strong> , width: 150 },
    {
      field: 'action',
      headerName:<strong>Action</strong> ,
      width: 140,
      renderCell: (params) => (
        <button
          className="px-3 py-1 text-sm font-semibold text-blue-600 border border-blue-600 rounded hover:bg-blue-600 hover:text-white"
          onClick={() => {
            if (params.row) {
              openModal(params.row);
            } else {
              console.error('No row data available');
            }
          }}
        >
          View
        </button>
      ),
    },
  ];

  return (
    <div
      className="relative bg-white border border-gray-200 rounded-lg shadow overflow-y-auto" 
      style={{ height: gridHeight }}
    >
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
        <div className="w-min">
          <StyledDataGrid
            rows={data}
            columns={columns}
            paginationModel={paginationModel}
            onPaginationModelChange={handlePaginationModelChange}
            pageSizeOptions={[10, 25, 50]}
            components={{
              Pagination: CustomPagination,
            }}
            style={{ fontSize: 16, width: '100%' }}
            slots={{ toolbar: CustomToolbar }}
          />
        </div>
      )}

      {modalOpen && selectedApplicant && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/2 max-w-3xl relative">
            <h2 className="text-2xl font-bold mb-4">Applicant Details</h2>
            <div className="space-y-4">
              <p>
                <strong>First Name:</strong> {selectedApplicant.firstName || 'N/A'}
              </p>
              <p>
                <strong>Last Name:</strong> {selectedApplicant.lastName || 'N/A'}
              </p>
              <p>
                <strong>Email:</strong> {selectedApplicant.email || 'N/A'}
              </p>
              <p>
                <strong>Job Position:</strong> {selectedApplicant.jobPosition || 'N/A'}
              </p>
              <p>
                <strong>Department ID:</strong> {selectedApplicant.departmentId || 'N/A'}
              </p>
              <p>
                <strong>Date Applied:</strong>{' '}
                {new Date(selectedApplicant.dateApplied).toLocaleDateString()}
              </p>
              <p>
                <strong>Stage:</strong>{' '}
                {selectedApplicant.stage
                  ? selectedApplicant.stage
                  : 'Not Yet Assigned'}
              </p>
              <p>
                <strong>Date Processed:</strong>{' '}
                {selectedApplicant.dateProcessed
                  ? new Date(
                      selectedApplicant.dateProcessed
                    ).toLocaleDateString()
                  : 'Not Processed'}
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
                <strong>Test Rating:</strong> {selectedApplicant.testRating || 'Not Yet'}
              </p>
              <p>
                <strong>Interview Rating:</strong> {selectedApplicant.interviewRating || 'Not Yet'}
              </p>
              <p>
                <strong>Total Score:</strong> {selectedApplicant.totalScore || 'Not Yet'}
              </p>
              <p>
                <strong>Candidate Status:</strong> {selectedApplicant.candidateStatus || 'Not Yet'}
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

export default ApplicantReportTable;
