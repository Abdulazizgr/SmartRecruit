import React from 'react';


import DashboardIcon from '@mui/icons-material/Dashboard';
import SettingsAccessibilityIcon from '@mui/icons-material/SettingsAccessibility';
import DepartmentIcon from '@mui/icons-material/Business';
import EmployeeIcon from '@mui/icons-material/People';
import ApplicantsIcon from '@mui/icons-material/PersonAdd';
import JobPostingIcon from '@mui/icons-material/Work';
import NotificationIcon from '@mui/icons-material/Notifications';
import SettingsIcon from '@mui/icons-material/Settings';
import ProfileIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { EmojiEvents } from '@mui/icons-material';

const Sidebar = () => {
  return (
    <div className=" flex-1 min-h-screen bg-[white] border-r-[0.5px] border-r-[rgba(230,227,227)] border-solid">
      {/* TOP */}
      <div className=" h-[50px] flex items-center justify-center">
        <span className="text-[19px] font-[bold] text-[#6439ff]">IE-Network</span>
      </div>
      <hr className='h-0 border-[0.5px] border-solid border-[rgba(230,227,227)]'/>
      {/* CENTER */}
      <div className="pl-5">
        <ul className='m-0 p-0'>
          <p className='text-[10px] font-[bold] text-[#999] mt-[15px] mb-2.5'>MAIN</p>
          <li className='flex items-center cursor-pointer p-[5px] hover:bg-[#ece8ff]'>
            <DashboardIcon className='text-lg text-[#7451f8]'/>
            <span className='text-[13px] font-semibold text-[#888] ml-2.5'>Dashboard</span>
          </li>
          <li className='flex items-center cursor-pointer p-[5px] hover:bg-[#ece8ff]'>
            <SettingsAccessibilityIcon className='text-lg text-[#7451f8]' />
            <span className='text-[13px] font-semibold text-[#888] ml-2.5'>Attendance</span>
          </li>
          <li className='flex items-center cursor-pointer p-[5px] hover:bg-[#ece8ff]'>
            <CalendarTodayIcon className='text-lg text-[#7451f8]'/>
            <span className='text-[13px] font-semibold text-[#888] ml-2.5'>Calendar</span>
          </li>

          <p className='text-[10px] font-[bold] text-[#999] mt-[15px] mb-2.5'>Management</p>
          <li className='flex items-center cursor-pointer p-[5px] hover:bg-[#ece8ff]'>
            <DepartmentIcon className='text-lg text-[#7451f8]' />
            <span className='text-[13px] font-semibold text-[#888] ml-2.5'>Department</span>
          </li>
          <li className='flex items-center cursor-pointer p-[5px] hover:bg-[#ece8ff]'>
            <EmployeeIcon className='text-lg text-[#7451f8]'/>
            <span className='text-[13px] font-semibold text-[#888] ml-2.5'>Employee</span>
          </li>
          <li className='flex items-center cursor-pointer p-[5px] hover:bg-[#ece8ff]'>
            <ApplicantsIcon className='text-lg text-[#7451f8]'/>
            <span className='text-[13px] font-semibold text-[#888] ml-2.5'>Applicants</span>
          </li>
          <li className='flex items-center cursor-pointer p-[5px] hover:bg-[#ece8ff]'>
            <JobPostingIcon className='text-lg text-[#7451f8]'/>
            <span className='text-[13px] font-semibold text-[#888] ml-2.5'>Job Posting</span>
          </li>
          <li className='flex items-center cursor-pointer p-[5px] hover:bg-[#ece8ff]'>
            <EmojiEvents className='text-lg text-[#7451f8]'/>
            <span className='text-[13px] font-semibold text-[#888] ml-2.5'>Award</span>
          </li>
          <li className='flex items-center cursor-pointer p-[5px] hover:bg-[#ece8ff]'>
            <NotificationIcon className='text-lg text-[#7451f8]'/>
            <span className='text-[13px] font-semibold text-[#888] ml-2.5'>Notification</span>
          </li>

          <p className='text-[10px] font-[bold] text-[#999] mt-[15px] mb-2.5'>Account</p>
          <li className='flex items-center cursor-pointer p-[5px] hover:bg-[#ece8ff]'>
            <SettingsIcon className='text-lg text-[#7451f8]'/>
            <span className='text-[13px] font-semibold text-[#888] ml-2.5'>Settings</span>
          </li>
          <li className='flex items-center cursor-pointer p-[5px] hover:bg-[#ece8ff]'>
            <ProfileIcon className='text-lg text-[#7451f8]'/>
            <span className='text-[13px] font-semibold text-[#888] ml-2.5'>Profile</span>
          </li>
          <li className='flex items-center cursor-pointer p-[5px] hover:bg-[#ece8ff]'>
            <LogoutIcon className='text-lg text-[#7451f8]'/>
            <span className='text-[13px] font-semibold text-[#888] ml-2.5'>Logout</span>
          </li>
        </ul>
      </div>
      {/* BOTTOm */}
  
    </div>
  );
};

export default Sidebar;
