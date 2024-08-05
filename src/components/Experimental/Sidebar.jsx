import React from 'react';
import './sidebar.scss';

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

const Sidebar = () => {
  return (
    <div className="sidebar">
      {/* TOP */}
      <div className="top">
        <span className="logo">IE-Network</span>
      </div>
      <hr />
      {/* CENTER */}
      <div className="center">
        <ul>
          <p className='title'>MAIN</p>
          <li>
            <DashboardIcon className='icon'/>
            <span>Dashboard</span>
          </li>
          <li>
            <SettingsAccessibilityIcon className='icon' />
            <span>Attendance</span>
          </li>
          <li>
            <CalendarTodayIcon className='icon'/>
            <span>Calendar</span>
          </li>

          <p className='title'>Management</p>
          <li>
            <DepartmentIcon className='icon' />
            <span>Department</span>
          </li>
          <li>
            <EmployeeIcon className='icon'/>
            <span>Employee</span>
          </li>
          <li>
            <ApplicantsIcon className='icon'/>
            <span>Applicants</span>
          </li>
          <li>
            <JobPostingIcon className='icon'/>
            <span>Job Posting</span>
          </li>
          <li>
            <NotificationIcon className='icon'/>
            <span>Notification</span>
          </li>

          <p className='title'>Account</p>
          <li>
            <SettingsIcon className='icon'/>
            <span>Settings</span>
          </li>
          <li>
            <ProfileIcon className='icon'/>
            <span>Profile</span>
          </li>
          <li>
            <LogoutIcon className='icon'/>
            <span>Logout</span>
          </li>
        </ul>
      </div>
      {/* BOTTOm */}


      <div className="bottom">
        <div className="colorOption"></div>
        <div className="colorOption"></div>
      </div>
    </div>
  );
};

export default Sidebar;
