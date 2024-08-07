import React, { useState } from 'react';
import {
  Dashboard as DashboardIcon,
  SettingsAccessibility as SettingsAccessibilityIcon,
  Business as DepartmentIcon,
  People as EmployeeIcon,
  PersonAdd as ApplicantsIcon,
  Work as JobPostingIcon,
  Notifications as NotificationIcon,
  Settings as SettingsIcon,
  AccountCircle as ProfileIcon,
  Logout as LogoutIcon,
  CalendarToday as CalendarTodayIcon,
  EmojiEvents,
  KeyboardDoubleArrowRight as MenuIcon,
} from '@mui/icons-material';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={` min-h-screen bg-white border-r border-gray-300 transition-all duration-300 ${isOpen ? 'flex-1 w-64' : 'w-25'}`}>
      {/* TOP */}
      <div className="h-12 flex items-center justify-between p-2">
      <img
              src="../../../public/assets/IElogo.png"
              alt='profile-picture'
              className='w-[30px] h-[30px] bg-transparent rounded-sm'
            />
        {isOpen && <span className="text-2xl font-bold text-accent">HR-Admin</span>}
        <MenuIcon 
          onClick={toggleSidebar} 
          className={`cursor-pointer text-accent transition-transform duration-300 ${isOpen ? '' : 'rotate-180'}`} 
        />
      </div>
      <hr className='border-gray-300' />
      {/* CENTER */}
      <div className={` overflow-y-auto h-[calc(100vh-50px)] ${isOpen ? 'pl-4' : 'pl-2'}`}>
        <ul className='m-0 p-0 '>
          <p className={`text-xs font-bold text-gray-500 ${isOpen ? 'mt-4 mb-2.5' : 'mt-4 mb-1'}`}>Main</p>
          <li className='flex items-center cursor-pointer p-2 hover:bg-purple-100 '>
            <DashboardIcon className='text-lg text-accent' />
            {isOpen && <span className='text-sm font-semibold text-primary ml-2.5'>Dashboard</span>}
          </li>
          <li className='flex items-center cursor-pointer p-2 hover:bg-purple-100'>
            <SettingsAccessibilityIcon className='text-lg text-accent' />
            {isOpen &&  <span className='text-sm font-semibold text-primary ml-2.5'>Attendance</span>}
          </li>
          <li className='flex items-center cursor-pointer p-2 hover:bg-purple-100'>
            <CalendarTodayIcon className='text-lg text-accent' />
            {isOpen &&   <span className='text-sm font-semibold text-primary ml-2.5'>Calendar</span>}
          </li>
          <p className={`text-xs font-bold text-gray-500 ${isOpen ? 'mt-4 mb-2.5' : 'mt-4 mb-1'} `} >Control</p>
          <li className='flex items-center cursor-pointer p-2 hover:bg-purple-100'>
            <DepartmentIcon className='text-lg text-accent' />
            {isOpen &&    <span className='text-sm font-semibold text-primary ml-2.5'>Department</span>}
          </li>
          <li className='flex items-center cursor-pointer p-2 hover:bg-purple-100'>
            <EmployeeIcon className='text-lg text-accent' />
            {isOpen &&   <span className='text-sm font-semibold text-primary ml-2.5'>Employee</span> }
          </li>
          <li className='flex items-center cursor-pointer p-2 hover:bg-purple-100'>
            <ApplicantsIcon className='text-lg text-accent' />
            {isOpen &&    <span className='text-sm font-semibold text-primary ml-2.5'>Applicants</span>}
          </li>
          <li className='flex items-center cursor-pointer p-2 hover:bg-purple-100'>
            <JobPostingIcon className='text-lg text-accent' />
            {isOpen &&  <span className='text-sm font-semibold text-primary ml-2.5'>Job Posting</span>}
          </li>
          <li className='flex items-center cursor-pointer p-2 hover:bg-purple-100'>
            <EmojiEvents className='text-lg text-accent' />
            {isOpen &&  <span className='text-sm font-semibold text-primary ml-2.5'>Award</span>}
          </li>
          <li className='flex items-center cursor-pointer p-2 hover:bg-purple-100'>
            <NotificationIcon className='text-lg text-accent' />
            {isOpen &&  <span className='text-sm font-semibold text-primary ml-2.5'>Notification</span>}
          </li>
          <p className={`text-xs font-bold text-gray-500 ${isOpen ? 'mt-4 mb-2.5' : 'mt-4 mb-1'}`}>Account</p>
          <li className='flex items-center cursor-pointer p-2 hover:bg-purple-100'>
            <SettingsIcon className='text-lg text-accent' />
            {isOpen &&    <span className='text-sm font-semibold text-primary ml-2.5'>Settings</span>}
          </li>
          <li className='flex items-center cursor-pointer p-2 hover:bg-purple-100'>
            <ProfileIcon className='text-lg text-accent' />
            {isOpen &&     <span className='text-sm font-semibold text-primary ml-2.5'>Profile</span>}
          </li>
          <li className='flex items-center cursor-pointer p-2 hover:bg-purple-100'>
            <LogoutIcon className='text-lg text-accent' />
            {isOpen &&  <span className='text-sm font-semibold text-primary ml-2.5'>Logout</span>}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;


