import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import {
  DataGrid,
  gridPageCountSelector,
  gridPageSelector,
  useGridApiContext,
  useGridSelector,
  GridToolbarExport,GridToolbarContainer
} from '@mui/x-data-grid';
import axios from 'axios';

import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import NotificationDep from './NotificationDep';

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
const DepartmentsTable = () => {
  const [departments, setDepartments] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [notification, setNotification] = useState({ message: '', type: '' });
  const [newDepartment, setNewDepartment] = useState({
    name: '',
    status: 'Active',
    positionOpen: false,
  });
  const [actionType, setActionType] = useState('');
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
    fetchDepartments();
  }, []);

  const fetchDepartments = async () => {
    try {
      const response = await axios.get('http://localhost:5000/departments');
      setDepartments(response.data);
    } catch (error) {
      console.error('Error fetching departments:', error);
    }
  };

  const handleAddDepartment = async () => {
    if (newDepartment.name.trim() === '') {
      alert('Department name cannot be empty');
      return;
    }

    const departmentToAdd = {
      ...newDepartment,
      dateFormed: new Date().toISOString().split('T')[0],
    };

    try {
      const response = await axios.post(
        'http://localhost:5000/departments',
        departmentToAdd
      );
      setDepartments([...departments, response.data]);
      setNotification({
        message: 'Department added successfully!',
        type: 'success',
      });
      closeModal();
    } catch (error) {
      console.error('Error adding department:', error);
    }
  };

  const handleEditDepartment = async () => {
    if (selectedDepartment.name.trim() === '') {
      alert('Department name cannot be empty');
      return;
    }

    try {
      const response = await axios.patch(
        `http://localhost:5000/departments/${selectedDepartment.id}`,
        selectedDepartment
      );
      setDepartments(
        departments.map((dept) =>
          dept.id === selectedDepartment.id ? response.data : dept
        )
      );
      setNotification({
        message: 'Department updated successfully!',
        type: 'update',
      });
      closeModal();
    } catch (error) {
      console.error('Error editing department:', error);
    }
  };

  const handleDeleteDepartment = async () => {
    try {
      await axios.delete(
        `http://localhost:5000/departments/${selectedDepartment.id}`
      );
      setDepartments(
        departments.filter((dept) => dept.id !== selectedDepartment.id)
      );
      setNotification({
        message: 'Department deleted successfully!',
        type: 'delete',
      });
      closeConfirmation();
    } catch (error) {
      console.error('Error deleting department:', error);
    }
  };
  const openModal = (department = null, action = '') => {
    setIsEditing(!!department);
    setSelectedDepartment(
      department || { name: '', status: 'Active', positionOpen: false }
    );
    setNewDepartment(
      department || { name: '', status: 'Active', positionOpen: false }
    );
    setActionType(action);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedDepartment(null);
    setNewDepartment({ name: '', status: 'Active', positionOpen: false });
  };

  const openConfirmation = (action = '') => {
    setActionType(action);
    setConfirmationOpen(true);
  };

  const closeConfirmation = () => {
    setConfirmationOpen(false);
  };

  const columns = [
    {
      field: 'id',
      headerName: <strong className="text-base">ID</strong>,
      width: 200,
    },
    {
      field: 'name',
      headerName: <strong className="text-base">Department Name</strong>,
      width: 600,
    },
    {
      field: 'status',
      headerName: <strong className="text-base">Status</strong>,
      width: 300,
    },
    {
      field: 'action',
      headerName: <strong className="text-base">Action</strong>,
      width: 340,
      renderCell: (params) => (
        <div className="flex h-[50px] items-center gap-2">
          <button
            className="px-4 py-2 text-sm font-semibold text-blue-600 border border-blue-600 rounded hover:bg-blue-600 hover:text-white active:bg-blue-800 active:text-white"
            onClick={() => openModal(params.row, 'edit')}
          >
            Change
          </button>
          <button
            className="px-4 py-2 text-sm font-semibold text-red-600 border border-red-600 rounded hover:bg-red-600 hover:text-white active:bg-red-800 active:text-white"
            onClick={() => {
              setSelectedDepartment(params.row);
              openConfirmation('delete');
            }}
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="p-4">
      {notification.message && (
        <NotificationDep
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification({ message: '', type: '' })}
        />
      )}
      <div className="mb-4 flex justify-start">
        <button
          className="px-4 py-2 font-semibold bg-accent text-white rounded hover:bg-blue-500"
          onClick={() => openModal(null, 'add')}
        >
          Add Department
        </button>
      </div>
      <div className="relative  bg-white border border-gray-200 rounded-lg shadow overflow-y-auto" style={{ height: gridHeight }}>
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
        <div className='w-min'>
        <StyledDataGrid
          rows={departments}
          columns={columns}
          paginationModel={paginationModel}
          onPaginationModelChange={handlePaginationModelChange}
          pageSizeOptions={[5, 25, 50]}
          components={{
            Pagination: CustomPagination,
          }}
          style={{ fontSize: 16, width: '100%' }}
          slots={{ toolbar: CustomToolbar}}
        />
      </div>
      )}
    </div>
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/2 max-w-3xl">
            <h2 className="text-2xl font-bold mb-4">
              {isEditing ? 'Edit Department' : 'Add Department'}
            </h2>
            <form>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  className="mt-1 p-2 w-full border border-gray-300 rounded"
                  value={
                    isEditing
                      ? selectedDepartment?.name || ''
                      : newDepartment.name
                  }
                  onChange={(e) =>
                    isEditing
                      ? setSelectedDepartment({
                          ...selectedDepartment,
                          name: e.target.value,
                        })
                      : setNewDepartment({
                          ...newDepartment,
                          name: e.target.value,
                        })
                  }
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Status
                </label>
                <div className="mt-1 flex space-x-4">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="status"
                      value="Active"
                      checked={
                        isEditing
                          ? selectedDepartment?.status === 'Active'
                          : newDepartment.status === 'Active'
                      }
                      onChange={(e) =>
                        isEditing
                          ? setSelectedDepartment({
                              ...selectedDepartment,
                              status: e.target.value,
                            })
                          : setNewDepartment({
                              ...newDepartment,
                              status: e.target.value,
                            })
                      }
                      className="form-radio"
                    />
                    <span className="ml-2">Active</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="status"
                      value="Inactive"
                      checked={
                        isEditing
                          ? selectedDepartment?.status === 'Inactive'
                          : newDepartment.status === 'Inactive'
                      }
                      onChange={(e) =>
                        isEditing
                          ? setSelectedDepartment({
                              ...selectedDepartment,
                              status: e.target.value,
                            })
                          : setNewDepartment({
                              ...newDepartment,
                              status: e.target.value,
                            })
                      }
                      className="form-radio"
                    />
                    <span className="ml-2">Inactive</span>
                  </label>
                </div>
              </div>

              <div className="flex justify-center space-x-4">
                <button
                  type="button"
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                  onClick={
                    isEditing ? handleEditDepartment : handleAddDepartment
                  }
                >
                  {isEditing ? 'Save Changes' : 'Add Department'}
                </button>
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
                  onClick={closeModal}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {confirmationOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3 max-w-lg">
            <h2 className="text-2xl font-bold mb-4">Confirmation</h2>
            <p className="mb-4">
              Are you sure you want to{' '}
              {actionType === 'delete' ? 'delete' : 'change'} this department?
            </p>
            <div className="flex justify-center space-x-4">
              <button
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                onClick={
                  actionType === 'delete' ? handleDeleteDepartment : null
                }
              >
                Confirm
              </button>
              <button
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
                onClick={closeConfirmation}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DepartmentsTable;
