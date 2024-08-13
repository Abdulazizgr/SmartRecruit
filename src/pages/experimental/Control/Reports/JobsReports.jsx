import React from 'react'
import Sidebar from '../../../../components/Experimental/Sidebar'
import Navbar from '../../../../components/Experimental/Navbar'

const JobsReports = () => {
  return (
    <div className="flex min-h-screen">
    <Sidebar />
    <div className="flex-[6]">
      <Navbar/> {/* Pass props */}
      <div className="p-4 flex flex-col lg:flex-row">
        <div className="flex-1 lg:mr-4 h-full">
         <div>Jobs Reports</div> {/* Pass searchTerm */}
        </div>
      </div>
    </div>
  </div>
  )
}

export default JobsReports