import React from 'react';

const Navbar = () => {
  return (
    <header className="h-24 bg-[#141929] sm:h-20 flex items-center sticky top-0 w-full z-50">
      <div className="container mx-auto px-6 flex items-center justify-between">
        <div className="flex items-center w-60 p-3 text-white">
          <div className="flex items-center gap-2 px-1 py-3 rounded-xl cursor-pointer">
            <img
              src="./assets/IElogo.png"
              className="w-3/12 object-contain"
              alt="Logo"
            />
            <span className="text-lg italic font-bold relative top-3">
              Solutions
            </span>
          </div>
        </div>
        <nav className="font-sen text-[#EBF4F6] uppercase text-lg lg:flex items-center hidden">
          <a href="#" className="py-2 px-6 hover:text-[#37B7C3]">
            Home
          </a>
          <a href="#works" className="py-2 px-6 hover:text-[#37B7C3]">
            About
          </a>
          <a href="#job-listings" className="py-2 px-6 hover:text-[#37B7C3]">
            Open Positions
          </a>
          <a href="#contact" className="py-2 px-6 hover:text-[#37B7C3]">
            Contact
          </a>
        </nav>
        <button className="lg:hidden flex flex-col ml-4">
          <span className="w-6 h-1 bg-[#EBF4F6]  mb-1"></span>
          <span className="w-6 h-1 bg-[#EBF4F6]  mb-1"></span>
          <span className="w-6 h-1 bg-[#EBF4F6]  mb-1"></span>
        </button>
      </div>
    </header>
  );
};

export default Navbar;
