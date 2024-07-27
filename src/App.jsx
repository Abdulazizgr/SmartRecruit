import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Dashboard from './pages/HR/dashboard';
import Homepage from './pages/User/homePage';
import ProtectedRoute from './routes/protectedRoute';
import { AuthProvider } from './auth/authContext';
import TeamLeadLogin from './pages/TeamLead/teamLeadLogin';
import ManagerLogin from './pages/Manager/ManagerLogin';
import HRLogin from './pages/HR/HRLogin';


const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path='/teamlead-login' element={ <TeamLeadLogin /> } />
          <Route path='/manager-login' element={ <ManagerLogin /> } />
          <Route path='/hr-login' element={ <HRLogin /> } />
          <Route path='/dashboard' element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path='/' element={<Homepage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
