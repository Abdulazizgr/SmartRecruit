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

const JobReportTable = () => {
  const [data, setData] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [paginationModel, setPaginationModel] = useState({
    pageSize: 10,
    page: 0,
  });
  const [gridHeight, setGridHeight] = useState('auto');
  const [loading, setLoading] = useState(false);

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
      const response = await axios.get('http://localhost:5000/jobs');
      console.log('Fetched data:', response.data); // Debug log
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };
  

  const openModal = (job) => {
    setSelectedJob(job);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedJob(null);
  };

  const truncateDescription = (description) => {
    const words = description.split(' ');
    return words.length > 10
      ? words.slice(0, 10).join(' ') + '...'
      : description;
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 100, sortable: false },
    { field: 'title', headerName: 'Job Title', width: 250 },
    { field: 'department', headerName: 'Department', width: 300 },
    { field: 'location', headerName: 'Location', width: 180 },
    {
      field: 'description',
      headerName: 'Description',
      width: 350,
      renderCell: (params) => {
        const description = params.row ? params.row.description : '';
        return <span>{truncateDescription(description)}</span>;
      },
    },
    
    { field: 'type', headerName: 'Type', width: 150 },
    { field: 'status', headerName: 'Status', width: 150 },
    
    {
      field: 'action',
      headerName: 'Action',
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
      className="relative  bg-white border border-gray-200 rounded-lg shadow overflow-y-auto" style={{ height: gridHeight }}>
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

export default JobReportTable;
