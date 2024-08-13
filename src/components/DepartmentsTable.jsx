import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';

const DepartmentsTable = () => {
  const [departments, setDepartments] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [newDepartment, setNewDepartment] = useState({
    name: '',
    status: 'Active',
    positionOpen: false,
  });
  const [actionType, setActionType] = useState('');

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
    { field: 'id', headerName: <strong>ID</strong>, width: 90 },
    { field: 'name', headerName: <strong>Department Name</strong>, width: 400 },
    { field: 'status', headerName: <strong>Status</strong>, width: 200 },
    {
      field: 'action',
      headerName: <strong>Action</strong>,
      width: 300,
      renderCell: (params) => (
        <div className="flex h-[50px] items-center gap-2">
          <button
            className="px-4 py-2 text-sm font-semibold text-blue-600 border border-blue-600 rounded hover:bg-blue-600 hover:text-white active:bg-blue-800 active:text-white"
            onClick={() => openModal(params.row, 'edit')}
          >
            Change
          </button>
          <button
            className="px-4 py-2 text-sm font-semibold text-red-600 border border-red-600 rounded hover:bg-red-600 hover:text-white  active:bg-red-800 active:text-white"
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
      <div className="mb-4 flex justify-start">
        <button
          className="px-4 py-2 font-semibold bg-accent text-white rounded hover:bg-blue-500"
          onClick={() => openModal(null, 'add')}
        >
          Add Department
        </button>
      </div>
      <div className="relative w-min h-[500px] bg-white border border-gray-200 rounded-lg shadow overflow-y-auto">
        <DataGrid rows={departments} columns={columns} pageSize={10} />
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
                  onChange={(e) => {
                    if (isEditing) {
                      setSelectedDepartment({
                        ...selectedDepartment,
                        name: e.target.value,
                      });
                    } else {
                      setNewDepartment({
                        ...newDepartment,
                        name: e.target.value,
                      });
                    }
                  }}
                />
              </div>
              {actionType === 'add' && (
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Status
                  </label>
                  <div className="flex items-center gap-4">
                    <label>
                      <input
                        type="radio"
                        value="Active"
                        checked={newDepartment.status === 'Active'}
                        onChange={() =>
                          setNewDepartment({
                            ...newDepartment,
                            status: 'Active',
                          })
                        }
                      />
                      <span className="ml-2">Active</span>
                    </label>
                    <label>
                      <input
                        type="radio"
                        value="Inactive"
                        checked={newDepartment.status === 'Inactive'}
                        onChange={() =>
                          setNewDepartment({
                            ...newDepartment,
                            status: 'Inactive',
                          })
                        }
                      />
                      <span className="ml-2">Inactive</span>
                    </label>
                  </div>
                </div>
              )}
              {actionType === 'edit' && (
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Status
                  </label>
                  <div className="flex items-center gap-4">
                    <label>
                      <input
                        type="radio"
                        value="Active"
                        checked={selectedDepartment?.status === 'Active'}
                        onChange={() =>
                          setSelectedDepartment({
                            ...selectedDepartment,
                            status: 'Active',
                          })
                        }
                      />
                      <span className="ml-2">Active</span>
                    </label>
                    <label>
                      <input
                        type="radio"
                        value="Inactive"
                        checked={selectedDepartment?.status === 'Inactive'}
                        onChange={() =>
                          setSelectedDepartment({
                            ...selectedDepartment,
                            status: 'Inactive',
                          })
                        }
                      />
                      <span className="ml-2">Inactive</span>
                    </label>
                  </div>
                </div>
              )}
            </form>
            <div className="flex justify-center gap-4">
              <button
                className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
                onClick={closeModal}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                onClick={() => {
                  if (actionType === 'add') {
                    handleAddDepartment();
                  } else if (actionType === 'edit') {
                    handleEditDepartment();
                  }
                }}
              >
                {isEditing ? 'Save Changes' : 'Add Department'}
              </button>
            </div>
          </div>
        </div>
      )}

      {confirmationOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
            <h2 className="text-xl font-bold mb-4">
              {actionType === 'delete' ? 'Confirm Deletion' : 'Confirm Change'}
            </h2>
            <p className="mb-4">
              {actionType === 'delete'
                ? `Are you sure you want to delete the department '${selectedDepartment?.name}'?`
                : `Are you sure you want to save changes to department '${selectedDepartment?.name}'?
`}
            </p>
            <div className="flex justify-center gap-4">
              <button
                className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
                onClick={closeConfirmation}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-red-600 text-white rounded hover
"
                onClick={() => {
                  if (actionType === 'delete') {
                    handleDeleteDepartment();
                  }
                  closeConfirmation();
                }}
              >
                {actionType === 'delete' ? 'Delete' : 'Save Changes'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DepartmentsTable;
