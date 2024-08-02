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
import PostedStatus from './pages/TeamLead/PostedStatus';
import PostedJobs from './pages/Manager/PostedJobs';
import StatusHistory from './pages/Manager/StatusHistory';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path='/teamlead-login' element={ <TeamLeadLogin /> } />
          <Route path='/post-job' element={ <PostJob /> } />
          <Route path='/posted-status' element={ <PostedStatus /> } />

          <Route path='/manager-login' element={ <ManagerLogin /> } />
          <Route path='/see-posted-job' element={ <PostedJobs /> } />
          <Route path='/see-history' element={ <StatusHistory /> } />
          

          <Route path='/hr-login' element={ <HRLogin /> } />
          
          <Route path='/dashboard' element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path='/teamlead-page' element={<ProtectedRoute><TeamLeadPage /></ProtectedRoute>} />
          <Route path='/manager-page' element={<ProtectedRoute><ManagerPage /></ProtectedRoute>} />
          <Route path='/' element={<Homepage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
