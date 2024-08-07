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
import Login from './pages/experimental/Login/Login';
import List from './pages/experimental/List/List';
import Single from './pages/experimental/SinglePage/Single';
import New from './pages/experimental/NewU/New';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
        <Route path='/teamlead-login' element={ <TeamLeadLogin /> } />
          <Route path='/post-job' element={ <PostJob /> } />
          {/* <Route path='/posted-status' element={ <PostedStatus /> } /> */}

          <Route path='/manager-login' element={ <ManagerLogin /> } />
          <Route path='/see-posted-job' element={ <PostedJobs /> } />
          {/* <Route path='/see-history' element={ <StatusHistory /> } /> */}
          
          

          <Route path='/job-details/:id' element={ <JobDetailsPage /> } />
          <Route path='/application-form' element={ <ApplicationForm/> } />

          <Route path='/hr-login' element={ <HRLogin /> } />
          
          <Route path='/dashboard' element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path='/teamlead-page' element={<ProtectedRoute><TeamLeadPage /></ProtectedRoute>} />
          <Route path='/manager-page' element={<ProtectedRoute><ManagerPage /></ProtectedRoute>} />
          <Route path='/' element={<Homepage />} />


          {/* Jaefer Experimental version */}
          <Route path="/dashboard_2" element={<Dashboard2 />} />
          <Route path="/dashboard_2/login" element={<Login />} />
          
          <Route path="/dashboard_2/users">
            <Route index element={<List/>}/>
            <Route path=":userID" element={<Single />} />
            <Route path="new" element={<New />} />
          </Route>
          <Route path="/dashboard_2/jobs">
            <Route index element={<List/>}/>
            <Route path=":jobID" element={<Single />} />
            <Route path="new" element={<New />} />
          </Route>
          <Route path="/dashboard_2/departments">
            <Route index element={<List/>}/>
            <Route path=":depatmentID" element={<Single />} />
            <Route path="new" element={<New />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
