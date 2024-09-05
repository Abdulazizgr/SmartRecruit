import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/HR/dashboard';
import Homepage from './pages/User/HomePage';
import ProtectedRoute from './routes/protectedRoute';
import { AuthProvider } from './auth/authContext';
import TeamLeadLogin from './pages/TeamLead/teamLeadLogin';
import ManagerLogin from './pages/Manager/ManagerLogin';
import HRLogin from './pages/HR/HRLogin';
import TeamLeadPage from './pages/TeamLead/TeamLeadPage';
import ManagerPage from './pages/Manager/ManagerPage';
import PostJob from './pages/TeamLead/PostJob';
// import PostedStatus from './pages/TeamLead/PostedStatus';
import PostedJobs from './pages/Manager/PostedJobs';
import JobDetailsPage from './pages/User/JobDetailsPage';
import ApplicationForm from './pages/User/ApplicationForm';
// import StatusHistory from './pages/Manager/StatusHistory';

// Jaefer Experimental
import Dashboard2 from './pages/experimental/DashBoard/Dashboard2';
// import Login from './pages/experimental/Login/Login';
import Calendar from './pages/experimental/DashBoard/Calendar';
import HRJobPostingPage from './pages/experimental/Control/HRJobPosting';
import Report from './pages/experimental/Control/Report';
import Applicants from './pages/experimental/Control/Applicants';
import Candidates from './pages/experimental/Control/Candidates';
import Departments from './pages/experimental/Control/Departments';
import JobsReports from './pages/experimental/Control/Reports/JobsReports';
import ApplicantsReport from './pages/experimental/Control/Reports/ApplicantsReport';
import UnderConstruction from './pages/HR/UnderConstruction';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/teamlead-login" element={<TeamLeadLogin />} />
          <Route path="/post-job" element={<PostJob />} />
          {/* <Route path='/posted-status' element={ <PostedStatus /> } /> */}

          <Route path="/manager-login" element={<ManagerLogin />} />
          <Route path="/see-posted-job" element={<PostedJobs />} />
          {/* <Route path='/see-history' element={ <StatusHistory /> } /> */}
          <Route path="/Postjobs" element={<TeamLeadPage />} />

          <Route path="/job-details/:id" element={<JobDetailsPage />} />
          <Route path="/application-form" element={<ApplicationForm />} />

          <Route path="/hr-login" element={<HRLogin />} />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/teamlead-page"
            element={
              <ProtectedRoute>
                <TeamLeadPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard_2"
            element={
              <ProtectedRoute>
                <Dashboard2 />
              </ProtectedRoute>
            }
          />
          <Route
            path="/manager-page"
            element={
              <ProtectedRoute>
                <ManagerPage />
              </ProtectedRoute>
            }
          />
          <Route path="/" element={<Homepage />} />
          
          {/* Jaefer Experimental version */}
          
          <Route path="/dashboard_2" element={<Dashboard2 />} />
          <Route path="/dashboard_2/home" element={<Dashboard2 />} />
          <Route path="/dashboard_2/calendar" element={<Calendar />} />
          <Route path="/dashboard_2/applicants" element={<Applicants />} />
          <Route path="/dashboard_2/candidates" element={ <Candidates /> } />
          <Route path="/dashboard_2/job-posting" element={<HRJobPostingPage />} />
          <Route path="/dashboard_2/report" element={ <Report /> } />
          <Route path="/dashboard_2/departments" element={ <Departments /> } />
          <Route path="/dashboard_2/reports/jobs" element={ <JobsReports /> } />
          <Route path="/dashboard_2/reports/applicants" element={ <ApplicantsReport /> } />
          <Route path="/dashboard_2/reports/employees" element={ <UnderConstruction /> } />
          <Route path="/dashboard_2/notifications" element={ <UnderConstruction /> } />
          <Route path="/dashboard_2/attendance" element={ <UnderConstruction /> } />
          <Route path="/dashboard_2/employees" element={ <UnderConstruction /> } />
          <Route path="/dashboard_2/attendance" element={ <UnderConstruction /> } />
          <Route path="/dashboard_2/settings" element={ <UnderConstruction /> } />
          <Route path="/dashboard_2/profile" element={ <UnderConstruction /> } />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
