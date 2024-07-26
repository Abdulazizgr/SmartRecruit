// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import HRLogin from './pages/HR/HRLogin.jsx';
// import Dashboard from './pages/Dashboard'; // Example path
// import Homepage from './pages/Homepage'; // Example path
// import ProtectedRoute from './components/ProtectedRoute'; // Custom ProtectedRoute component
import { AuthProvider } from './auth/authContext.jsx';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div>
          <p>nkedgljwrgwjrebgwe</p>
          <h1>Welcome</h1>
        </div>
        <Routes>
          <Route path='/HRLogin' element={<HRLogin />} />
          <Route path='/dashboard' element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path='/' element={<Homepage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
