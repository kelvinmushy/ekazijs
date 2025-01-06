import React, { useState, useEffect, useContext } from 'react';
import { UniversalDataContext } from '../../context/UniversalDataContext';
import { useNavigate } from 'react-router-dom';
import ApplicantList from './ApplicantList';
import FilterModal from './FilterModal';
import ApplicantProfileModal from './ApplicantProfileModal';

import { fetchApplicantsCollectionData, fetchTotalExperience, fetchApplicantData, fetchSkills, fetchSocialMediaLinks } from '../../api/api';

const ApplicantCollectionComponent = ({employerId,collectionId}) => {
  const { countries, states, genders, experiences, maritalStatus,categories,positions,savedCollections} = useContext(UniversalDataContext);

  const [applicants, setApplicants] = useState([]);
  const [totalExperience, setTotalExperience] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, totalPages: 1 });
  const [filters, setFilters] = useState({
    country_id: '',
    region_id: '',
    gender_id: '',
    experience_id: '',
    marital_id: '',
    first_name: '',
    last_name: '',
    email: ''
  });
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [applicantData, setApplicantData] = useState(null);
  const [skills, setSkills] = useState([]);
  const [socialMediaLinks, setSocialMediaLinks] = useState([]);
  const [loading, setLoading] = useState(false); // Define loading state here

  const navigate = useNavigate();


  useEffect(() => {
    const loadApplicants = async () => {
      setLoading(true); // Set loading to true when fetching
  
      try {
        // Call API to fetch data based on employerId, collectionId, pagination, and filters
        const data = await fetchApplicantsCollectionData(employerId, collectionId, pagination.page, filters);
        
        console.log("Fetched data:", data);
        
        // Assuming the response data is an array of applicants directly
        setApplicants(data || []); // In case data is undefined, we default to an empty array
        
        // If pagination info is returned as part of the data, update pagination as well
        if (data.pagination) {
          setPagination({ page: data.page, totalPages: data.totalPages });
        }
  
      } catch (error) {
        console.error('Error fetching applicants:', error);
      } finally {
        setLoading(false); // Set loading to false once fetching is complete
      }
    };
  
    loadApplicants();
  }, [employerId, collectionId, pagination.page, filters]);
  


  const handleRowClick = async (applicantId) => {
    try {
      // Fetch the applicant's detailed data
      const experienceData = await fetchTotalExperience(applicantId);
      setTotalExperience(experienceData);

      const applicantDetails = await fetchApplicantData(applicantId);
      setApplicantData(applicantDetails);

      const skillsData = await fetchSkills(applicantId);
      setSkills(skillsData);

      const socialLinksData = await fetchSocialMediaLinks(applicantId);
      setSocialMediaLinks(socialLinksData);

      // Open the profile modal
      setShowProfileModal(true);  // This will show the profile modal
    } catch (error) {
      console.error('Error fetching applicant data:', error);
    }
  };

  const handleNextPage = () => {
    if (pagination.page < pagination.totalPages) {
      setPagination(prevState => ({ ...prevState, page: prevState.page + 1 }));
    }
  };

  const handlePreviousPage = () => {
    if (pagination.page > 1) {
      setPagination(prevState => ({ ...prevState, page: prevState.page - 1 }));
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prevFilters => ({
      ...prevFilters,
      [name]: value
    }));
  };

  const handleFilterSubmit = () => {
    setPagination({ ...pagination, page: 1 });
    setShowFilterModal(false);
  };

  const handleFilterReset = () => {
    setFilters({
      country_id: '',
      region_id: '',
      gender_id: '',
      experience_id: '',
      marital_id: '',
      first_name: '',
      last_name: '',
      email: ''
    });
    setPagination({ ...pagination, page: 1 });
    setShowFilterModal(false);
  };

  return (
    <div>
      <ApplicantList
        applicants={applicants}
        totalExperience={totalExperience}
        pagination={pagination}
        handleRowClick={handleRowClick}
        handleNextPage={handleNextPage}
        handlePreviousPage={handlePreviousPage}
        setShowFilterModal={setShowFilterModal}
      />

      {showFilterModal && (
        <FilterModal
          filters={filters}
          handleFilterChange={handleFilterChange}
          handleFilterSubmit={handleFilterSubmit}
          handleFilterReset={handleFilterReset}
          countries={countries}
          states={states}
          genders={genders}
          experiences={experiences}
          maritalStatus={maritalStatus}
          setShowFilterModal={setShowFilterModal}
        />
      )}

      {showProfileModal && (
        <ApplicantProfileModal
          applicantData={applicantData}
          experiencesData={totalExperience}
          skills={skills}
          socialMediaLinks={socialMediaLinks}
          categories={categories}
          positions={positions}
          savedCollections={savedCollections}
          employerId={employerId}
          setShowProfileModal={setShowProfileModal} // Close modal when this function is called
        />
      )}
    </div>
  );
};

export default ApplicantCollectionComponent;
