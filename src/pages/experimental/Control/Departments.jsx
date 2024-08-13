import React from 'react'
import DepartmentsTable from '../../../components/DepartmentsTable'
import Navbar from '../../../components/Experimental/Navbar'
import Sidebar from '../../../components/Experimental/Sidebar'

const Departments = () => {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-[6]">
        <Navbar/> {/* Pass props */}
        <div className="p-4 flex flex-col lg:flex-row">
          <div className="flex-1 lg:mr-4 h-full m-1 shadow-bg-accent shadow-md">
            <DepartmentsTable/> {/* Pass searchTerm */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Departments