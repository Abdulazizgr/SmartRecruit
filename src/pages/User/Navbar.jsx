import React from 'react';

const Navbar = () => {
  return (
    <header className="h-24 bg-[#141929] sm:h-20 flex items-center  sticky w-full">
      <div className="container mx-auto px-6 flex items-center justify-between">
        <div className="flex bg-primary flex-col bg-a w-60 p-3 text-white ">
          <div className="shadow-sm flex items-center gap-2 px-1 py-3 rounded-xl hover:shadow-2xl cursor-pointer">
            <img src="/assets/IElogo.png" className="w-3/12 object-contain" />
            <span className="relative text-background top-3 text-lg text-white-900 italic font-bold ">
              Solutions
            </span>
          </div>
        </div>

        <div className="flex items-center">
          <nav className="font-sen text-[#EBF4F6] uppercase text-lg lg:flex items-center hidden">
            <a href="#" className="py-2 px-6 flex hover:text-[#37B7C3]">
              Home
            </a>
            <a href="#" className="py-2 px-6 flex hover:text-[#37B7C3]">
              About
            </a>
            <a href="#" className="py-2 px-6 flex hover:text-[#37B7C3]">
              Open Positions
            </a>
            <a href="#" className="py-2 px-6 flex hover:text-[#37B7C3]">
              Contact
            </a>
          </nav>
          <button className="lg:hidden flex flex-col ml-4">
            <span className="w-6 h-1 bg-#071952 mb-1"></span>
            <span className="w-6 h-1 bg-#071952 mb-1"></span>
            <span className="w-6 h-1 bg-#071952 mb-1"></span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
