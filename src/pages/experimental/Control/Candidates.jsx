import React, { useState } from 'react';
import Sidebar from '../../../components/Experimental/Sidebar';
import Navbar from '../../../components/Experimental/Navbar';
import CandidatesTable from '../../../components/CandidatesTable'; // Import the CandidatesTable component

const Candidates = () => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-[6]">
        <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} /> {/* Pass props */}
        <div className="p-4 flex flex-col lg:flex-row">
          <div className="flex-1 lg:mr-4 h-full">
            <CandidatesTable searchTerm={searchTerm} /> {/* Pass searchTerm */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Candidates;
