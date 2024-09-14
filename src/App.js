// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import ApplyPage from './pages/ApplyPage';
import JobForm from './components/Employee/job/JobForm';
import EmployerHome from './components/Employee/Home/EmployerHome';

const App = () => (
  <Router>
    <Header />
    <main>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/apply" element={<ApplyPage />} />
        <Route path="/employee/post-job" element={<JobForm />} />
        <Route path='/employer/dashboard' element={<EmployerHome/>}/>
      </Routes>
    </main>
    <Footer />
   
  </Router>
);

export default App;
