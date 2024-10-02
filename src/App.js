// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AdminDashboard from './pages/Admin/AdminDashboard';
import EmployerDashboard from './pages/Employer/EmployerDashboard';

// import Header from './components/Header';
// import Footer from './components/Footer';
// import HomePage from './pages/HomePage';
// import ProfilePage from './pages/ProfilePage';
// import ApplyPage from './pages/ApplyPage';

// import EmployerPostJob from './components/Employee/Home/EmployerPostJob';
// import EmployerHome from './components/Employee/Home/EmployerHome';
// import EmployerListOfJobs from './components/Employee/Home/EmployerListOfJobs';
// import EditProfileForm from './components/Employee/profile/EditProfileForm';
// import ChangePassword from './components/Employee/profile/ChangePassword';
// import AddEditUser from './components/Employee/profile/AddEditUser';


import UserManagement from './pages/Admin/Users/UserManagement';
import JobManagement from './pages/Admin/Job/JobManagement';
import Category from './pages/Admin/Resources/Categories/Category';
import Country from './pages/Admin/Resources/Country/Country';
import State from './pages/Admin/Resources/Country/State';
import PositionLevel from './pages/Admin/Resources/PositionLevel/PositionLevel';
import Type from './pages/Admin/Resources/Type/Type';
import Culture from './pages/Admin/Resources/Culture/Culture';
import Skill from './pages/Admin/Resources/Skill/Skill';
import Experience from './pages/Admin/Resources/Experience/Experience';
import UserProfile from './pages/Admin/Users/UserProfile';

const App = () => {
  return (
    <Router>
      <Routes>
     
        <Route path="/employer/dashboard" element={<EmployerDashboard />} />


        {/* Admin routes will be here */}
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/manage-jobs"  element={<JobManagement/>}  />
        <Route path="/admin/manage-users" element={<UserManagement/>} />
        <Route path="/admin/resources/category" element={<Category/>} />
        <Route path="/admin/resources/country" element={<Country/>} />
        <Route path="/admin/resources/state" element={<State/>} />
        <Route path="/admin/resources/position-levels" element={<PositionLevel/>} />
        <Route path="/admin/resources/job-types" element={<Type/>} />
        <Route path="/admin/resources/experiences" element={<Experience/>} />
        <Route path="/admin/resources/cultures" element={<Culture/>} />
        <Route path="/admin/resources/skills" element={<Skill/>} /> 
        <Route path="/admin/user/profile" element={<UserProfile/>}/>
      </Routes>
    </Router>
  );
};

export default App;
