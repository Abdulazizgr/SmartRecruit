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

  Assessment as ReportIcon, // Use ReportIcon for 'Reports'
  KeyboardDoubleArrowRight as MenuIcon,
  // Import a suitable icon for Candidates
  Group as CandidatesIcon, // Example: use GroupIcon for candidates
} from '@mui/icons-material';
import GroupsIcon from '@mui/icons-material/Groups';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      className={`min-h-screen bg-white border-r border-gray-300 transition-all duration-500 ${
        isOpen ? 'flex-1 w-64' : 'w-25'
      }`}
    >
      {/* TOP */}
      <div className="h-12 flex items-center justify-between p-2">
        <img
          src="/assets/IElogo.png"
          alt="profile-picture"
          className="w-[30px] h-[30px] bg-transparent rounded-sm"
        />
        {isOpen && (
          <span className="lg:text-xl font-bold text-accent sm:text-sm">
            HR-Admin
          </span>
        )}
        <MenuIcon
          onClick={toggleSidebar}
          className={`cursor-pointer text-accent transition-transform duration-500 ${
            isOpen ? '' : 'rotate-180'
          }`}
        />
      </div>
      <hr className="border-gray-300" />
      {/* CENTER */}
      <div
        className={`overflow-y-auto h-[calc(100vh-50px)] ${
          isOpen ? 'pl-4' : 'pl-2'
        }`}
      >
        <ul className="m-0 p-0">
          <p
            className={`text-xs font-bold text-gray-500 ${
              isOpen ? 'mt-4 mb-2.5' : 'mt-4 mb-1'
            }`}
          >
            Main
          </p>
          <NavItem
            to="/dashboard_2/Home"
            icon={<DashboardIcon className="text-lg text-accent mr-1" />}
            label="Dashboard"
            isOpen={isOpen}
          />
          <NavItem
            to="/dashboard_2/attendance"
            icon={<SettingsAccessibilityIcon className="text-lg text-accent mr-1" />}
            label="Attendance"
            isOpen={isOpen}
          />
          <NavItem
            to="/dashboard_2/calendar"
            icon={<CalendarTodayIcon className="text-lg text-accent mr-1" />}
            label="Calendar"
            isOpen={isOpen}
          />
          <p
            className={`text-xs font-bold text-gray-500 ${
              isOpen ? 'mt-4 mb-2.5' : 'mt-4 mb-1'
            }`}
          >
            Control
          </p>
          <NavItem
            to="/dashboard_2/departments"
            icon={<DepartmentIcon className="text-lg text-accent mr-1" />}
            label="Department"
            isOpen={isOpen}
          />
          <NavItem
            to="/dashboard_2/employees"
            icon={<GroupsIcon className="text-lg text-accent mr-1" />}
            label="Employees"
            isOpen={isOpen}
          />
          <NavItem
            to="/dashboard_2/applicants"
            icon={<ApplicantsIcon className="text-lg text-accent mr-1" />}
            label="Applicants"
            isOpen={isOpen}
          />
          <NavItem
            to="/dashboard_2/candidates"
            icon={<CandidatesIcon className="text-lg text-accent mr-1" />} // Updated icon for candidates
            label="Candidates"
            isOpen={isOpen}
          />
          <NavItem
            to="/dashboard_2/job-posting"
            icon={<JobPostingIcon className="text-lg text-accent mr-1" />}
            label="Job Posting"
            isOpen={isOpen}
          />
          <NavItem
            to="/dashboard_2/notifications"
            icon={<NotificationIcon className="text-lg text-accent mr-1" />}
            label="Notification"
            isOpen={isOpen}
          />
          <NavItem
            to="/dashboard_2/report"
            icon={<ReportIcon className="text-lg text-accent mr-1" />}
            label="Report"
            isOpen={isOpen}
          />
          <p
            className={`text-xs font-bold text-gray-500 ${
              isOpen ? 'mt-4 mb-2.5' : 'mt-4 mb-1'
            }`}
          >
            Account
          </p>
          <NavItem
            to="/dashboard_2/settings"
            icon={<SettingsIcon className="text-lg text-accent mr-1" />}
            label="Settings"
            isOpen={isOpen}
          />
          <NavItem
            to="/dashboard_2/profile"
            icon={<ProfileIcon className="text-lg text-accent mr-1" />}
            label="Profile"
            isOpen={isOpen}
          />
          <NavItem
            to="/dashboard_2/logout"
            icon={<LogoutIcon className="text-lg text-accent mr-1" />}
            label="Logout"
            isOpen={isOpen}
          />
        </ul>
      </div>
    </div>
  );
};

const NavItem = ({ to, icon, label, isOpen }) => (
  <li>
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center cursor-pointer p-2 rounded-lg mr-3 mb-1 transition-colors duration-300 ${
          isActive ? 'bg-blue-200 hover:bg-blue-200' : 'hover:bg-blue-100'
        }`
      }
    >
      {icon}
      {isOpen && (
        <span className={`text-sm text-primary`}>
          {label}
        </span>
      )}
    </NavLink>
  </li>
);

export default Sidebar;