import React, { useState, useEffect, useMemo } from 'react';
import {
  Avatar,
  Box,
  Button,
  Typography,
  Popover,
  TextField,
  Modal,
  Backdrop,
  Fade,
} from '@mui/material';
import { DataGrid, gridClasses } from '@mui/x-data-grid';
import { grey, blue, green, red } from '@mui/material/colors';
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
  const [pageSize, setPageSize] = useState(5);

  useEffect(() => {
    fetchJobPostings();
  }, []);

  const fetchJobPostings = async () => {
    try {
      const response = await axios.get(
        'http://localhost:5000/jobs' || './db.json'
      ); // Adjust URL if needed
      setJobPostings(response.data);
    } catch (error) {
      console.error('Error fetching job postings:', error);
      // Handle error, e.g., show error message to user
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

      await axios.patch(
        `http://localhost:5000/jobs/${selectedJobPosting.id}` ||
          `./db.json/${selectedJobPosting.id}`,
        updatedJobPosting
      ); // Adjust URL if needed

      fetchJobPostings();
      handleClosePostJobModal();
    } catch (error) {
      console.error('Error posting job:', error);
      // Handle error, e.g., show error message to user
    }
  };

  const handleRetractJob = async (jobId) => {
    try {
      await axios.patch(
        `http://localhost:5000/jobs/${jobId}` || `./db.json/${jobId}`,
        {
          posted: false,
          deadline: null,
        }
      ); // Adjust URL if needed

      fetchJobPostings();
    } catch (error) {
      console.error('Error retracting job:', error);
      // Handle error, e.g., show error message to user
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

  const handleDateChange = (date) => {
    setSelectedDeadline(date);
    setDeadlineAnchorEl(null);
  };

  const columns = useMemo(
    () => [
      { field: 'title', headerName: 'Title', width: 200, editable: true },
      { field: 'department', headerName: 'Department', width: 150 },
      { field: 'location', headerName: 'Location', width: 150, editable: true },
      { field: 'description', headerName: 'Description', width: 300 },
      { field: 'type', headerName: 'Type', width: 120, editable: true },
      {
        field: 'posted',
        headerName: 'Posted',
        width: 100,
        type: 'boolean',
        editable: true,
        cellClassName: (params) =>
          params.value ? 'posted-true' : 'posted-false',
      },
      {
        field: 'deadline',
        headerName: 'Deadline',
        width: 200,
        renderCell: (params) => (
          <TextField
            value={
              params.row.deadline
                ? moment(params.row.deadline).format('YYYY-MM-DD')
                : ''
            }
            onClick={handleDeadlineClick}
            variant="outlined"
            InputProps={{ readOnly: true }}
          />
        ),
      },
      {
        field: 'actions',
        headerName: 'Actions',
        type: 'actions',
        renderCell: (params) =>
          params.row.posted ? (
            <Button
              variant="contained"
              color="secondary"
              onClick={() => handleRetractJob(params.row.id)}
              sx={{
                backgroundColor: red[500],
                '&:hover': { backgroundColor: red[700] },
              }}
            >
              Retract
            </Button>
          ) : (
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleClickOpenPostJobModal(params.row)}
              sx={{
                backgroundColor: green[500],
                '&:hover': { backgroundColor: green[700] },
              }}
            >
              Post Job
            </Button>
          ),
      },
    ],
    [selectedJobPosting, selectedDeadline]
  );

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-[6]">
        <Navbar />
        <div className="p-4">
          <Box sx={{ height: 600, width: '77%' }}>
            <Typography
              variant="h4"
              component="h4"
              sx={{ textAlign: 'center', mt: 3, mb: 3 }}
            >
              Job Postings
            </Typography>
            <DataGrid
              disableColumnResize
              columns={columns}
              rows={jobPostings}
              getRowId={(row) => row.id}
              pageSize={pageSize}
              onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
              getRowSpacing={(params) => ({
                top: params.isFirstVisible ? 0 : 5,
                bottom: params.isLastVisible ? 0 : 5,
              })}
              sx={{
                [`& .${gridClasses.row}`]: {
                  bgcolor: (theme) =>
                    theme.palette.mode === 'light' ? grey[200] : grey[900],
                },
                '& .MuiDataGrid-columnHeader': {
                  backgroundColor: blue[200],
                  color: 'white',
                  boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
                },
                '& .MuiDataGrid-cell': {
                  color: '#333',
                },
                '& .posted-true': {
                  backgroundColor: green[100],
                  color: green[900],
                },
                '& .posted-false': {
                  backgroundColor: red[100],
                  color: red[900],
                },
              }}
            />
          </Box>
          <Popover
            open={Boolean(deadlineAnchorEl)}
            anchorEl={deadlineAnchorEl}
            onClose={() => setDeadlineAnchorEl(null)}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
          >
            <Calendar
              onChange={handleDateChange}
              value={selectedDeadline}
              minDate={new Date()}
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
              <Box
                sx={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: 400,
                  bgcolor: 'background.paper',
                  border: '2px solid #000',
                  boxShadow: 24,
                  p: 4,
                  borderRadius: 2,
                }}
              >
                <Typography variant="h6" component="h2">
                  Post Job
                </Typography>
                <Typography sx={{ mt: 2 }}>
                  Are you sure you want to post the job titled "
                  {selectedJobPosting?.title}"?
                </Typography>
                <Box
                  sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}
                >
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handlePostJob}
                    sx={{ mr: 1 }}
                  >
                    Yes, Post
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={handleClosePostJobModal}
                  >
                    Cancel
                  </Button>
                </Box>
              </Box>
            </Fade>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default HRJobPostingPage;
