// src/components/UnderConstruction.jsx
import React from 'react';
import Navbar from '../../components/Experimental/Navbar';
import Sidebar from '../../components/Experimental/Sidebar';
import { NavLink } from 'react-router-dom';

const UnderConstruction = () => {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-[6]">
        <Navbar />
        <div className="p-4 flex flex-col lg:flex-row">
          <div className="flex-1 lg:mr-4 h-full">
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
              <div className="text-center p-8 bg-white rounded-lg shadow-lg">
                <h1 className="text-4xl font-bold text-gray-800 mb-4">
                  🚧 Under Construction 🚧
                </h1>
                <p className="text-lg text-gray-600 mb-8">
                  We're working hard to bring you this page. Stay tuned!
                </p>
                <div className="mt-4">
                  <NavLink
                    to="/dashboard_2/Home"
                    className="bg-blue-500 text-white px-6 py-2 rounded-full shadow hover:bg-blue-600"
                  >
                    Go Back Home
                  </NavLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UnderConstruction;
