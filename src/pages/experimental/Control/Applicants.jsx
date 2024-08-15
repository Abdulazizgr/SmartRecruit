import React, { useState } from 'react';
import Sidebar from '../../../components/Experimental/Sidebar';
import Navbar from '../../../components/Experimental/Navbar';
import ApplicantsTable from '../../../components/ApplicantsTable';

const Applicants = () => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-[6]">
        <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} /> {/* Pass props */}
        <div className="p-4 flex flex-col lg:flex-row bg-gray-300">
          <div className="flex-1 lg:mr-4 h-full">
            <ApplicantsTable searchTerm={searchTerm} /> {/* Pass searchTerm */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Applicants;
