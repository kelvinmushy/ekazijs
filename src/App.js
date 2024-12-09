import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AdminDashboard from './pages/Admin/AdminDashboard';
import EmployerDashboard from './pages/Employer/EmployerDashboard';
import Profile from './pages/Employer/profile/Profile';
import Registration from './pages/Auth/Registration';
import Login from './pages/Auth/Login';
import HomePage from './pages/HomePage';
import UserManagement from './pages/Admin/Users/UserManagement';
import JobManagement from './pages/Admin/Job/JobManagement';
import EmployerJobManagement from './pages/Employer/Job/JobManagement';
import Category from './pages/Admin/Resources/Categories/Category';
import Country from './pages/Admin/Resources/Country/Country';
import State from './pages/Admin/Resources/Country/State';
import PositionLevel from './pages/Admin/Resources/PositionLevel/PositionLevel';
import Type from './pages/Admin/Resources/Type/Type';
import Culture from './pages/Admin/Resources/Culture/Culture';
import Skill from './pages/Admin/Resources/Skill/Skill';
import Experience from './pages/Admin/Resources/Experience/Experience';
import UserProfile from './pages/Admin/Users/UserProfile';
import CustomNavbar from './components/Admin/Partial/AdminHeader';
import ChangePassword from './pages/Admin/Users/ChangePassword';


const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));

  const handleLogout = () => {
    alert("Logging out..."); // For debugging
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    window.location.href = '/login'; // Redirect to login page
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <Router>
      <CustomNavbar onLogout={handleLogout} /> 
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registration />} />
        {isAuthenticated && (
          <>
            <Route path="/employer/dashboard" element={<EmployerDashboard />} />
            <Route path="/employer/profile" element={<Profile />} />
            <Route path="/employer/manage-jobs" element={<EmployerJobManagement/>} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/manage-jobs" element={<JobManagement />} />
            <Route path="/admin/manage-users" element={<UserManagement />} />
            <Route path="/admin/resources/category" element={<Category />} />
            <Route path="/admin/resources/country" element={<Country />} />
            <Route path="/admin/resources/state" element={<State />} />
            <Route path="/admin/resources/position-levels" element={<PositionLevel />} />
            <Route path="/admin/resources/job-types" element={<Type />} />
            <Route path="/admin/resources/experiences" element={<Experience />} />
            <Route path="/admin/resources/cultures" element={<Culture />} />
            <Route path="/admin/resources/skills" element={<Skill />} />
            <Route path="/admin/user/profile" element={<UserProfile />} />
            <Route path="/admin/change/password" element={<ChangePassword />} />
            
          </>
        )}
      </Routes>
    </Router>
  );
};

export default App;
