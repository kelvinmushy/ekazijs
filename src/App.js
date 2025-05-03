import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import AdminDashboard from './pages/Admin/AdminDashboard';
import EmployerDashboard from './pages/Employer/EmployerDashboard';
import Profile from './pages/Employer/Profile/Profile';
import Registration from './pages/Auth/Registration';
import Login from './pages/Auth/Login';
import AllJobs from './pages/Job/AllJobsPage';
import HomePage from './pages/HomePage';
import UserManagement from './pages/Admin/Users/UserManagement';
import JobManagement from './pages/Admin/Job/JobManagement';
import EmployerJobManagement from './pages/Employer/Job/JobManagement';
import EmployerManageUser from './pages/Employer/ManageUser/EmployerManageUser';
import EmployerChangePassword from './pages/Employer/ManageUser/EmployerChangePassword';
import ResumeAllApplicants from './pages/Employer/Resume/ResumeAllApplicants';
import CvCollection from './pages/Employer/Resume/CvCollection';
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
import EmployerProfile from './pages/Employer/Profile/EmployerProfile';
import AllIndustryPage from './pages/AllIndustryPage';
import ApplicantDashboard from './pages/Applicant/ApplicantDashboard';
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
import JobDetails from './components/JobDetails';
import AllEmployerPage from './pages/Employer/AllEmployerPage';
import Applications from './pages/Applicant/Application/Applications';
import ApplicantSavedJobPage from './pages/Applicant/Application/ApplicantSavedJobPage';
import Hero from './pages/Hero';
import JobByCategories from './pages/Job/JobByCategories';
import JobApplicationPage from './pages/Employer/Job/JobApplicationPage';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));
  const [userType, setUserType] = useState(localStorage.getItem('userType'));

  const handleLogout = () => {
    alert("Logging out...");
    
    // Clear all localStorage items related to authentication
    localStorage.removeItem('token');
    localStorage.removeItem('userType');
    localStorage.removeItem('userId');
    localStorage.removeItem('applicantId');
    localStorage.removeItem('employerId');
  
    // Update the state immediately after logout
    setIsAuthenticated(false);
    setUserType(null);
  
    // Force redirect to login before reloading
    window.location.href = "/"; 
  
    // Optionally, reload the page to clear cached state
    setTimeout(() => {
      window.location.reload(); // In case the redirect doesn't do enough
    }, 200); // Slight delay to ensure redirect happens first
  };
  
  useEffect(() => {
    const token = localStorage.getItem('token');
    const userType = localStorage.getItem('userType');
    if (token) {
      setIsAuthenticated(true);
      setUserType(userType); // Set userType when user is authenticated
    }
  }, []);

  const ProtectedRoute = ({ element, allowedRoles }) => {
    console.log("isAuthenticated:", isAuthenticated);
    console.log("userType:", userType);
    
    if (!isAuthenticated) {
      return <Navigate to="/" />;
    }
    
    if (allowedRoles && !allowedRoles.includes(userType)) {
      console.log(`Redirecting because ${userType} is not allowed.`);
      return <Navigate to="/" />;
    }
  
    return element;
  };
  
  return (
    <UniversalDataProvider> 
      <Router>
        <CustomNavbar onLogout={handleLogout} />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Registration />} />
          <Route path='/cv/template/basic' element={<CvTemplate1 />} />
          <Route path='/cv/template/premium' element={<CvTemplate2 />} />
          <Route path='/cv/template/p' element={<CvTemplate3 />} />
          <Route path="/job/:jobId" element={<JobDetails />} />
          <Route path="/all-jobs" element={<AllJobs />} />
          <Route path="/category/:slug/:id" element={<JobByCategories />} />
          <Route path="/home/all-category" element={<AllIndustryPage />} />
          <Route path="/employer/profile/:id" element={<EmployerProfile />} /> 
          <Route path="/featured/employer" element={<AllEmployerPage />} />
          <Route path="/hero" element={<Hero />} /> 

          {/* Protected Routes */}
          <Route path="/applicant/dashboard" element={<ProtectedRoute element={<ApplicantDashboard />} allowedRoles={['applicant']} />} />
          <Route path="/applicant/academic" element={<ProtectedRoute element={<AcademicQualification />} allowedRoles={['applicant']} />} />
          <Route path="/applicant/referees" element={<ProtectedRoute element={<ApplicantReferees />} allowedRoles={['applicant']} />} />
          <Route path="/applicant/skills" element={<ProtectedRoute element={<ApplicantSkills />} allowedRoles={['applicant']} />} />
          <Route path="/applicant/working-experience" element={<ProtectedRoute element={<WorkExperience />} allowedRoles={['applicant']} />} />
          <Route path="/applicant/language" element={<ProtectedRoute element={<LanguageProficiency />} allowedRoles={['applicant']} />} />
          <Route path="/applicant/professional" element={<ProtectedRoute element={<ProfessionalQualification />} allowedRoles={['applicant']} />} />
          <Route path="/applicant/personal-details" element={<ProtectedRoute element={<PersonalDetails />} allowedRoles={['applicant']} />} />
          <Route path="/applicant/build-cv" element={<ProtectedRoute element={<ApplicantCvBuilder />} allowedRoles={['applicant']} />} />
          <Route path="/applicant/view-cv" element={<ProtectedRoute element={<ApplicantViewCv />} allowedRoles={['applicant']} />} />
          <Route path="/applicant/change-password" element={<ProtectedRoute element={<ApplicantChangePassword />} allowedRoles={['applicant']} />} />
          <Route path="/applicant/social-media" element={<ProtectedRoute element={<AppicantSocialMedia />} allowedRoles={['applicant']} />} />
          <Route path="/applicant/applied-jobs" element={<ProtectedRoute element={<Applications />} allowedRoles={['applicant']} />} />
          <Route path="/applicant/saved-jobs" element={<ProtectedRoute element={<ApplicantSavedJobPage />} allowedRoles={['applicant']} />} />

          {/* Employer Routes */}
          <Route path="/employer/dashboard" element={<ProtectedRoute element={<EmployerDashboard />} allowedRoles={['employer']} />} />
          <Route path="/employer/profile" element={<ProtectedRoute element={<Profile />} allowedRoles={['employer']} />} />
          <Route path="/employer/manage-jobs" element={<ProtectedRoute element={<EmployerJobManagement />} allowedRoles={['employer']} />} />
          <Route path="/employer/edit-profile" element={<ProtectedRoute element={<EditProfile />} allowedRoles={['employer']} />} />
          <Route path="/employer/manage/users" element={<ProtectedRoute element={<EmployerManageUser />} allowedRoles={['employer']} />} />
          <Route path="/employer/change/password" element={<ProtectedRoute element={<EmployerChangePassword />} allowedRoles={['employer']} />} />
          <Route path="/employer/resumes" element={<ProtectedRoute element={<ResumeAllApplicants />} allowedRoles={['employer']} />} />
          <Route path="/employer/resume-collections" element={<ProtectedRoute element={<CvCollection />} allowedRoles={['employer']} />} />

          <Route path="/employer/jobs/:jobId/applicants"   element={<ProtectedRoute element={<JobApplicationPage />} allowedRoles={['employer']} />}/>

          {/* Admin Routes */}
          <Route path="/admin/dashboard" element={<ProtectedRoute element={<AdminDashboard />} allowedRoles={['admin']} />} />
          <Route path="/admin/manage-jobs" element={<ProtectedRoute element={<JobManagement />} allowedRoles={['admin']} />} />
          <Route path="/admin/manage-users" element={<ProtectedRoute element={<UserManagement />} allowedRoles={['admin']} />} />
          <Route path="/admin/resources/category" element={<ProtectedRoute element={<Category />} allowedRoles={['admin']} />} />
          <Route path="/admin/resources/country" element={<ProtectedRoute element={<Country />} allowedRoles={['admin']} />} />
          <Route path="/admin/resources/state" element={<ProtectedRoute element={<State />} allowedRoles={['admin']} />} />
          <Route path="/admin/resources/position-levels" element={<ProtectedRoute element={<PositionLevel />} allowedRoles={['admin']} />} />
          <Route path="/admin/resources/job-types" element={<ProtectedRoute element={<Type />} allowedRoles={['admin']} />} />
          <Route path="/admin/resources/experiences" element={<ProtectedRoute element={<Experience />} allowedRoles={['admin']} />} />
          <Route path="/admin/resources/cultures" element={<ProtectedRoute element={<Culture />} allowedRoles={['admin']} />} />
          <Route path="/admin/resources/skills" element={<ProtectedRoute element={<Skill />} allowedRoles={['admin']} />} />
          <Route path="/admin/user/profile" element={<ProtectedRoute element={<UserProfile />} allowedRoles={['admin']} />} />
          <Route path="/admin/cv/template" element={<ProtectedRoute element={<CvTemplate />} allowedRoles={['admin']} />} />
          <Route path="/admin/change/password" element={<ProtectedRoute element={<ChangePassword />} allowedRoles={['admin']} />} />
        </Routes>
      </Router>
    </UniversalDataProvider>
  );
};

export default App;
