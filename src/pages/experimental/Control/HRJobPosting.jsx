import React, { useState, useEffect, useMemo } from 'react';
import {
  Box,
  Button,
  Typography,
  Popover,
  TextField,
  Modal,
  Backdrop,
  Fade,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import RestoreIcon from '@mui/icons-material/Restore';

import { CheckCircle, Cancel } from '@mui/icons-material';
import { useTable, usePagination } from 'react-table';
import axios from 'axios';
import moment from 'moment';
import Sidebar from '../../../components/Experimental/Sidebar'; // Assuming Sidebar component
import Navbar from '../../../components/Experimental/Navbar'; // Assuming Navbar component
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const HRJobPostingPage = () => {
  const [jobPostings, setJobPostings] = useState([]);
  const [selectedJobPosting, setSelectedJobPosting] = useState(null);
  const [isPostJobModalOpen, setIsPostJobModalOpen] = useState(false);
  const [deadlineAnchorEl, setDeadlineAnchorEl] = useState(null);
  const [selectedDeadline, setSelectedDeadline] = useState(null);
  const [pageSize] = useState(5);

  useEffect(() => {
    fetchJobPostings();
  }, []);

  const fetchJobPostings = async () => {
    try {
      const response = await axios.get('http://localhost:5000/jobs');
      setJobPostings(response.data);
    } catch (error) {
      console.error('Error fetching job postings:', error);
    }
  };

  const handlePostJob = async () => {
    if (!selectedJobPosting || !selectedDeadline) {
      alert('Please select a deadline before posting the job.');
      return;
    }

    try {
      const updatedJobPosting = {
        ...selectedJobPosting,
        posted: true,
        deadline: moment(selectedDeadline).toISOString(),
      };

      await axios.patch(`http://localhost:5000/jobs/${selectedJobPosting.id}`, updatedJobPosting);

      fetchJobPostings();
      handleClosePostJobModal();
    } catch (error) {
      console.error('Error posting job:', error);
    }
  };

  const handleRetractJob = async (jobId) => {
    try {
      await axios.patch(`http://localhost:5000/jobs/${jobId}`, {
        posted: false,
        deadline: null,
      });

      fetchJobPostings();
    } catch (error) {
      console.error('Error retracting job:', error);
    }
  };

  const handleClickOpenPostJobModal = (job) => {
    setSelectedJobPosting(job);
    setIsPostJobModalOpen(true);
  };

  const handleClosePostJobModal = () => {
    setIsPostJobModalOpen(false);
    setSelectedJobPosting(null);
    setSelectedDeadline(null);
    setDeadlineAnchorEl(null);
  };

  const handleDeadlineClick = (event) => {
    setDeadlineAnchorEl(event.currentTarget);
  };

  const handleDateChange = async (date) => {
    setSelectedDeadline(date);
    setDeadlineAnchorEl(null);

    if (selectedJobPosting) {
      const updatedJobPosting = {
        ...selectedJobPosting,
        deadline: moment(date).toISOString(),
      };
      
      try {
        await axios.patch(`http://localhost:5000/jobs/${selectedJobPosting.id}`, updatedJobPosting);
        fetchJobPostings();
      } catch (error) {
        console.error('Error updating deadline:', error);
      }
    }
  };

  const columns = useMemo(
    () => [
      {
        Header: 'Title',
        accessor: 'title',
        Cell: ({ value }) => (
          <div className="truncate" title={value}>
            {value}
          </div>
        ),
        width: 200,
      },
      {
        Header: 'Department',
        accessor: 'department',
        Cell: ({ value }) => (
          <div className="truncate" title={value}>
            {value}
          </div>
        ),
        width: 150,
      },
      {
        Header: 'Location',
        accessor: 'location',
        Cell: ({ value }) => (
          <div className="truncate" title={value}>
            {value}
          </div>
        ),
        width: 150,
      },
      {
        Header: 'Description',
        accessor: 'description',
        Cell: ({ value }) => (
          <div className="truncate" title={value} style={{ width: '300px' }}>
            {value}
          </div>
        ),
        width: 300,
      },
      {
        Header: 'Type',
        accessor: 'type',
        Cell: ({ value }) => (
          <div className="truncate" title={value}>
            {value}
          </div>
        ),
        width: 120,
      },
      {
        Header: 'Posted',
        accessor: 'posted',
        Cell: ({ value }) => (
          value ? <CheckCircle className="text-green-500" /> : <Cancel className="text-red-500" />
        ),
        disableSortBy: true,
        width: 100,
      },
      {
        Header: 'Deadline',
        accessor: 'deadline',
        Cell: ({ value }) => (
          <TextField
            value={value ? moment(value).format('YYYY-MM-DD') : ''}
            onClick={handleDeadlineClick}
            variant="outlined"
            size="small"
            InputProps={{ readOnly: true }}
            className="cursor-pointer"
          />
        ),
        width: 200,
      },
      {
        Header: 'Actions',
        accessor: 'actions',
        Cell: ({ row }) => (
          row.original.posted ? (
            <Button
              variant="outlined"
              className="bg-red-500 hover:bg-red-700 text-white"
              onClick={() => handleRetractJob(row.original.id)}
              endIcon={<RestoreIcon />}

            >
              Retract
            </Button>
          ) : (
            <Button
              variant="outlined"
              className="bg-green-500 hover:bg-green-700 text-white"
              onClick={() => handleClickOpenPostJobModal(row.original)}
              endIcon={<SendIcon />}
            >
              Post Job
            </Button>
          )
        ),
        width: 150,
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow, state, gotoPage } = useTable(
    {
      columns,
      data: jobPostings,
      initialState: {
        pageIndex: 0,
        pageSize: pageSize,
      },
    },
    usePagination
  );

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-[6] flex flex-col">
        <Navbar />
        <div className="flex-1 p-6 bg-gray-300">
          <div className='shadow-black shadow-md'>
          <div className="bg-white rounded-lg shadow-md p-4">
            <Typography variant="h4" component="h1" className="text-center text-gray-800 mb-6">
              Job Postings
            </Typography>
            <div className="overflow-x-auto">
              <table {...getTableProps()} className="min-w-full divide-y divide-gray-200">
                <thead>
                  {headerGroups.map(headerGroup => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                      {headerGroup.headers.map(column => (
                        <th {...column.getHeaderProps()} style={{ width: column.width }} className="px-6 py-3 bg-white text-black">
                          {column.render('Header')}
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody {...getTableBodyProps()} className="bg-white divide-y divide-gray-200">
                  {rows.slice(state.pageIndex * pageSize, state.pageIndex * pageSize + pageSize).map(row => {
                    prepareRow(row);
                    return (
                      <tr {...row.getRowProps()}>
                        {row.cells.map(cell => (
                          <td
                            {...cell.getCellProps()}
                            className="px-6 py-4 whitespace-nowrap"
                            style={{
                              width: cell.column.width,
                              cursor: 'default',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                            }}
                          >
                            <div className="truncate" title={cell.value}>
                              {cell.render('Cell')}
                            </div>
                          </td>
                        ))}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              <div className="flex justify-between items-center mt-4">
                <button
                  onClick={() => state.pageIndex > 0 && gotoPage(state.pageIndex - 1)}
                  className="px-4 py-2 bg-accent text-white rounded hover:bg-blue-500 active:bg-blue-600"
                >
                  Previous
                </button>
                <span className="text-gray-600">
                  Page {state.pageIndex + 1} of {Math.ceil(jobPostings.length / pageSize)}
                </span>
                <button
                  onClick={() => state.pageIndex < Math.ceil(jobPostings.length / pageSize) - 1 && gotoPage(state.pageIndex + 1)}
                  className="px-4 py-2 bg-accent text-white rounded hover:bg-blue-500 active:bg-blue-600"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Popover
        open={Boolean(deadlineAnchorEl)}
        anchorEl={deadlineAnchorEl}
        onClose={() => setDeadlineAnchorEl(null)}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <Calendar
          onChange={handleDateChange}
          value={selectedDeadline || new Date()}
        />
      </Popover>

      <Modal
        open={isPostJobModalOpen}
        onClose={handleClosePostJobModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
        >
        <Fade in={isPostJobModalOpen}>
          <div className="absolute inset-0 flex items-center justify-center p-4">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
              <Typography variant="h6" className="mb-4">
                Post Job Confirmation
              </Typography>
              <Typography className="mb-4">
                Are you sure you want to post this job?
              </Typography>
              <Box className="flex justify-end space-x-4 mt-2">
                <Button variant="outlined" color="primary" onClick={handlePostJob}>
                  Yes
                </Button>
                <Button variant="outlined" color="error" onClick={handleClosePostJobModal}>
                  No
                </Button>
              </Box>
            </div>
          </div>
        </Fade>
      </Modal>
    </div>
        </div>
  );
};

export default HRJobPostingPage;
