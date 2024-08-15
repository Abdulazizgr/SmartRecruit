import React from 'react';
import DepartmentsTable from '../../../components/DepartmentsTable';
import Navbar from '../../../components/Experimental/Navbar';
import Sidebar from '../../../components/Experimental/Sidebar';

const Departments = () => {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-[6]">
        <Navbar />
        <div className="p-4 flex bg-gray-300 flex-col lg:flex-row">
          <div className="ml-5 bg-white rounded-md flex-1 lg:mr-5 h-full m-1 shadow-gray-900 shadow-md">
            <DepartmentsTable />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Departments;
