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
import Category from './components/Admin/Resources/Categories/Category';
import Country from './components/Admin/Resources/Country/Country';
import State from './components/Admin/Resources/Country/State';
import PositionLevel from './components/Admin/Resources/PositionLevel/PositionLevel';
import Type from './components/Admin/Resources/Type/Type';
import Culture from './components/Admin/Resources/Culture/Culture';
import Skill from './components/Admin/Resources/Skill/Skill';
import Experience from './components/Admin/Resources/Experience/Experience';

const App = () => (
  <Router>
   
    <main>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/apply" element={<ApplyPage />} />
        <Route path="/employer/post-job" element={<EmployerPostJob />} />
       
        <Route exact path="/employer/dashboard" component={EmployerHome} />
        <Route path='/employer/job/lists' element={<EmployerListOfJobs/>}/>
        <Route path='/employer/edit/profile' element={<EditProfileForm/>}/>
        <Route path='/employer/change/password' element={<ChangePassword/>}/>
        <Route path='/employer/manage/user' element={<AddEditUser/>}/>
        <Route path="/admin/manage-jobs"  element={<JobManagement/>}  />
        <Route path="/admin/manage-users" element={<UserManagement/>} />
        <Route path="/admin/dashboard" element={<Dashboard/>} />
        <Route path="/admin/resources/category" element={<Category/>} />
        <Route path="/admin/resources/country" element={<Country/>} />
        <Route path="/admin/resources/state" element={<State/>} />
        <Route path="/admin/resources/position-levels" element={<PositionLevel/>} />
        <Route path="/admin/resources/job-types" element={<Type/>} />
        <Route path="/admin/resources/experiences" element={<Experience/>} />
        <Route path="/admin/resources/cultures" element={<Culture/>} />
        <Route path="/admin/resources/skills" element={<Skill/>} />
       
      </Routes>
    </main>
    <Footer />
   
  </Router>
);

export default App;
