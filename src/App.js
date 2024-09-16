// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import ApplyPage from './pages/ApplyPage';
import EmployerPostJob from './components/Employee/Home/EmployerPostJob';
import EmployerHome from './components/Employee/Home/EmployerHome';
import EmployerListOfJobs from './components/Employee/Home/EmployerListOfJobs';
import EditProfileForm from './components/Employee/profile/EditProfileForm';
import ChangePassword from './components/Employee/profile/ChangePassword';
import AddEditUser from './components/Employee/profile/AddEditUser';

import JobManagement from './components/Admin/JobManagement';
import UserManagement from './components/Admin/UserManagement';
import Dashboard from './components/Admin/Dashboard';

const App = () => (
  <Router>
   
    <main>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/apply" element={<ApplyPage />} />
        <Route path="/employer/post-job" element={<EmployerPostJob />} />
        <Route path='/employer/dashboard' element={<EmployerHome/>}/>
        <Route path='/employer/job/lists' element={<EmployerListOfJobs/>}/>
        <Route path='/employer/edit/profile' element={<EditProfileForm/>}/>
        <Route path='/employer/change/password' element={<ChangePassword/>}/>
        <Route path='/employer/manage/user' element={<AddEditUser/>}/>
        <Route path="/admin/manage-jobs"  element={<JobManagement/>}  />
        <Route path="/admin/manage-users" element={<UserManagement/>} />
        <Route path="/admin/dashboard" element={<Dashboard/>} />
      </Routes>
    </main>
    <Footer />
   
  </Router>
);

export default App;
