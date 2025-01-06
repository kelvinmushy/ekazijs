import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AdminDashboard from './pages/Admin/AdminDashboard';
import EmployerDashboard from './pages/Employer/EmployerDashboard';
import Profile from './pages/Employer/Profile/Profile';
import Registration from './pages/Auth/Registration';
import Login from './pages/Auth/Login';
import HomePage from './pages/HomePage';
import UserManagement from './pages/Admin/Users/UserManagement';
import JobManagement from './pages/Admin/Job/JobManagement';
import EmployerJobManagement from './pages/Employer/Job/JobManagement';
import EmployerManageUser from './pages/Employer/ManageUser/EmployerManageUser';
import EmployerChangePassword from './pages/Employer/ManageUser/EmployerChangePassword';
import ResumeAllApplicants from './pages/Employer/Resume/ResumeAllApplicants';
import CvCollection from './pages/Employer/Resume/CvCollection';
import ApplicantCollection from './pages/Employer/Resume/ApplicantCollection';

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
import EditProfile from './pages/Employer/Profile/EditProfile';
import ChangePassword from './pages/Admin/Users/ChangePassword';
import CvTemplate from './pages/Admin/Cv/CvTemplate';

import ApplicantDashboard from './pages/Applicant/ApplicantDashboard';
// Import the UniversalDataProvider (not the context itself)
import UniversalDataProvider from './context/UniversalDataContext'; 
import AcademicQualification from './pages/Applicant/Profile/AcademicQualification';
import ApplicantReferees from './pages/Applicant/Profile/ApplicantReferees';
import ApplicantSkills from './pages/Applicant/Profile/ApplicantSkills';
import WorkExperience from './pages/Applicant/Profile/WorkExperience';
import LanguageProficiency from './pages/Applicant/Profile/LanguageProficiency';
import ProfessionalQualification from './pages/Applicant/Profile/ProfessionalQualification';
import PersonalDetails from './pages/Applicant/Profile/PersonalDetails';
import CvTemplate1 from './pages/Templates/CvTemplate1';
import CvTemplate2 from './pages/Templates/CvTemplate2';
import CvTemplate3 from './pages/Templates/CvTemplate3';
import ApplicantCvBuilder from './pages/Applicant/CvBuilder/ApplicantCvBuilder';
import ApplicantViewCv from './pages/Applicant/CvBuilder/ApplicantViewCv';
import ApplicantChangePassword from './pages/Applicant/Profile/ApplicantChangePassword';
import AppicantSocialMedia from './pages/Applicant/Profile/AppicantSocialMedia';




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
    <UniversalDataProvider> 
      <Router>
        <CustomNavbar onLogout={handleLogout} />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Registration />} />
          <Route path='/cv/template/basic' element={<CvTemplate1/>} />
          <Route path='/cv/template/premium' element={<CvTemplate2/>} />
          <Route path='/cv/template/p' element={<CvTemplate3/>} />
          
          {isAuthenticated && (
            <>
             <Route path="/applicant/dashboard" element={<ApplicantDashboard />} />
              <Route path="/applicant/academic" element={<AcademicQualification />} />
              <Route path="/applicant/referees" element={<ApplicantReferees/>} />
              <Route path="/applicant/skills" element={<ApplicantSkills/>} />
              <Route path="/applicant/working-experience" element={<WorkExperience />} />
              <Route path="/applicant/language" element={<LanguageProficiency/>} />
              <Route path="/applicant/professional" element={<ProfessionalQualification/>} />
              <Route path="/applicant/personal-details" element={<PersonalDetails/>} />
              <Route path="/applicant/build-cv" element={<ApplicantCvBuilder/>} />
              <Route path="/applicant/view-cv" element={<ApplicantViewCv/>} />
              <Route path="/applicant/change-password" element={<ApplicantChangePassword/>} />
              <Route path="/applicant/social-media" element={<AppicantSocialMedia/>} />
              
              

              <Route path="/employer/dashboard" element={<EmployerDashboard />} />
              <Route path="/employer/profile" element={<Profile />} />
              <Route path="/employer/manage-jobs" element={<EmployerJobManagement />} />
              <Route path="/employer/edit-profile" element={<EditProfile />} />
              <Route path="/employer/manage/users" element={<EmployerManageUser/>} />
              <Route path="/employer/change/password" element={<EmployerChangePassword/>} />
              <Route path="/employer/resumes"  element={<ResumeAllApplicants/>}/>
              <Route path="/employer/resume-collections"  element={<CvCollection/>}/>

              <Route path='/cv-collection/:employerId/:collectionId' element={<ApplicantCollection/>}/>

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
              <Route path="/admin/cv/template" element={<CvTemplate />} />
              <Route path="/admin/change/password" element={<ChangePassword />} />
            </>
          )}
        </Routes>
      </Router>
    </UniversalDataProvider> 
  );
};

export default App;
