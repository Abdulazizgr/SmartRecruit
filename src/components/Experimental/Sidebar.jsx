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
  Assessment as ReportIcon,
} from '@mui/icons-material';

const Sidebar = ({ setSelectedMenu }) => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`min-h-screen bg-white border-r border-gray-300 transition-all duration-300 ${isOpen ? 'flex-1 w-64' : 'w-25'}`}>
      {/* TOP */}
      <div className='flex items-center justify-between p-4'>
        <span className='text-xl font-bold text-primary'>{isOpen && 'Sidebar'}</span>
        <MenuIcon className='cursor-pointer' onClick={toggleSidebar} />
      </div>
      {/* MIDDLE */}
      <div className='flex flex-col p-4'>
        <ul className='space-y-2'>
          <li className='flex items-center cursor-pointer p-2 hover:bg-purple-100' onClick={() => setSelectedMenu('dashboard')}>
            <DashboardIcon className='text-lg text-accent' />
            {isOpen && <span className='text-sm font-semibold text-primary ml-2.5'>Dashboard</span>}
          </li>
          <li className='flex items-center cursor-pointer p-2 hover:bg-purple-100' onClick={() => setSelectedMenu('accessibility')}>
            <SettingsAccessibilityIcon className='text-lg text-accent' />
            {isOpen && <span className='text-sm font-semibold text-primary ml-2.5'>Accessibility</span>}
          </li>
          <li className='flex items-center cursor-pointer p-2 hover:bg-purple-100' onClick={() => setSelectedMenu('department')}>
            <DepartmentIcon className='text-lg text-accent' />
            {isOpen && <span className='text-sm font-semibold text-primary ml-2.5'>Department</span>}
          </li>
          <li className='flex items-center cursor-pointer p-2 hover:bg-purple-100' onClick={() => setSelectedMenu('employee')}>
            <EmployeeIcon className='text-lg text-accent' />
            {isOpen && <span className='text-sm font-semibold text-primary ml-2.5'>Candidates</span>}
          </li>
          <li className='flex items-center cursor-pointer p-2 hover:bg-purple-100' onClick={() => setSelectedMenu('applicants')}>
            <ApplicantsIcon className='text-lg text-accent' />
            {isOpen && <span className='text-sm font-semibold text-primary ml-2.5'>Applicants</span>}
          </li>
          <li className='flex items-center cursor-pointer p-2 hover:bg-purple-100' onClick={() => setSelectedMenu('jobPostings')}>
            <JobPostingIcon className='text-lg text-accent' />
            {isOpen && <span className='text-sm font-semibold text-primary ml-2.5'>Job Posting</span>}
          </li>
          <li className='flex items-center cursor-pointer p-2 hover:bg-purple-100' onClick={() => setSelectedMenu('award')}>
            <ReportIcon className='text-lg text-accent' />
            {isOpen && <span className='text-sm font-semibold text-primary ml-2.5'>Report</span>}
          </li>
          <li className='flex items-center cursor-pointer p-2 hover:bg-purple-100' onClick={() => setSelectedMenu('notification')}>
            <NotificationIcon className='text-lg text-accent' />
            {isOpen && <span className='text-sm font-semibold text-primary ml-2.5'>Notification</span>}
          </li>
          <p className={`text-xs font-bold text-gray-500 ${isOpen ? 'mt-4 mb-2.5' : 'mt-4 mb-1'}`}>Account</p>
          <li className='flex items-center cursor-pointer p-2 hover:bg-purple-100' onClick={() => setSelectedMenu('settings')}>
            <SettingsIcon className='text-lg text-accent' />
            {isOpen && <span className='text-sm font-semibold text-primary ml-2.5'>Settings</span>}
          </li>
          <li className='flex items-center cursor-pointer p-2 hover:bg-purple-100' onClick={() => setSelectedMenu('profile')}>
            <ProfileIcon className='text-lg text-accent' />
            {isOpen && <span className='text-sm font-semibold text-primary ml-2.5'>Profile</span>}
          </li>
          <li className='flex items-center cursor-pointer p-2 hover:bg-purple-100' onClick={() => setSelectedMenu('logout')}>
            <LogoutIcon className='text-lg text-accent' />
            {isOpen && <span className='text-sm font-semibold text-primary ml-2.5'>Logout</span>}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
