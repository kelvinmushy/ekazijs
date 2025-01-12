// api.js

// Function to fetch all applicants with pagination and filters
export const fetchApplicantsData = async (page, filters = {}) => {
    try {
      const response = await fetch(
        `http://localhost:4000/api/universals/all-applicants?page=${page}&country_id=${filters.country_id}&region_id=${filters.region_id}&gender_id=${filters.gender_id}&experience_id=${filters.experience_id}&first_name=${filters.first_name}&last_name=${filters.last_name}&email=${filters.email}&marital_id=${filters.marital_id}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch applicants. Please try again later.");
      }
      const data = await response.json();
      if (data.success) {
        return { applicants: data.data, pagination: data.pagination };
      } else {
        throw new Error("Unexpected response format.");
      }
    } catch (error) {
      throw error; // Re-throw the error to be caught in the component
    }
  };
  
  // Function to fetch total experience of an applicant
  export const fetchTotalExperience = async (applicantId) => {
    try {
      const response = await fetch(`http://localhost:4000/api/applicant/total-experiences/${applicantId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch total experience.");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  };
  
  // Function to fetch applicant data by ID
  export const fetchApplicantData = async (applicantId) => {
    try {
      const response = await fetch(`http://localhost:4000/api/applicant/${applicantId}`);
      const data = await response.json();
      return data[0] || null; // Return the first item or null if no data
    } catch (error) {
      throw error;
    }
  };
  
  export const fetchApplicantsCollectionData = async (employerId, collectionId) => {
    try {
      // Check if employerId and collectionId are objects and extract the primitive values
      if (typeof employerId === 'object') {
        employerId = employerId.employerId || employerId.id; // Adjust depending on your data structure
      }
  
      if (typeof collectionId === 'object') {
        collectionId = collectionId.collectionId || collectionId.id; // Adjust depending on your data structure
      }
  
      // Ensure employerId and collectionId are valid strings or numbers
      if (!employerId || !collectionId) {
        throw new Error('Missing employerId or collectionId');
      }
  
      // Log the corrected ids for debugging
      console.log('Fetching data for employerId:', employerId, 'collectionId:', collectionId);
  
      // Construct the URL with the correct values
      const response = await fetch(`http://localhost:4000/api/universals/saved-resumes/${employerId}/${collectionId}`);
  
      // Check if the response is successful
      if (!response.ok) {
        throw new Error(`Error fetching data: ${response.statusText}`);
      }
  
      const data = await response.json();
  
      // Ensure data is valid before returning
      if (!data || !Array.isArray(data) || data.length === 0) {
        return null; // Return null if no data is found
      }
  
      return data; // Return the data if it is valid
    } catch (error) {
      console.error('Error fetching applicant data:', error);
      throw error; // Re-throw the error to be handled by the calling code
    }
  };
  
  
  
  
  // Function to fetch educational qualifications of an applicant
  export const fetchEducationalQualifications = async (applicantId) => {
    try {
      const response = await fetch(`http://localhost:4000/api/applicant/educational-qualifications/${applicantId}`);
      const data = await response.json();
      return data || [];
    } catch (error) {
      throw error;
    }
  };
  
  // Function to fetch professional qualifications of an applicant
  export const fetchProfessionalQualifications = async (applicantId) => {
    try {
      const response = await fetch(`http://localhost:4000/api/applicant/professional-qualifications/${applicantId}`);
      const data = await response.json();
      return data || [];
    } catch (error) {
      throw error;
    }
  };
  
  // Function to fetch experiences of an applicant
  export const fetchExperiences = async (applicantId) => {
    try {
      const response = await fetch(`http://localhost:4000/api/applicant/experiences/${applicantId}`);
      const data = await response.json();
      return data || [];
    } catch (error) {
      throw error;
    }
  };
  
  // Function to fetch languages of an applicant
  export const fetchLanguages = async (applicantId) => {
    try {
      const response = await fetch(`http://localhost:4000/api/applicant/languages/${applicantId}`);
      const data = await response.json();
      return data || [];
    } catch (error) {
      throw error;
    }
  };
  
  // Function to fetch skills of an applicant
  export const fetchSkills = async (applicantId) => {
    try {
      const response = await fetch(`http://localhost:4000/api/applicant/skills/${applicantId}`);
      const data = await response.json();
      return data || [];
    } catch (error) {
      throw error;
    }
  };
  
  // Function to fetch referees of an applicant
  export const fetchReferees = async (applicantId) => {
    try {
      const response = await fetch(`http://localhost:4000/api/applicant/referees/${applicantId}`);
      const data = await response.json();
      return data || [];
    } catch (error) {
      throw error;
    }
  };
  
  // Function to fetch social media links of an applicant
  export const fetchSocialMediaLinks = async (applicantId) => {
    try {
      const response = await fetch(`http://localhost:4000/api/applicant/social-media/${applicantId}`);
      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        throw new Error("Error fetching social media links.");
      }
    } catch (error) {
      throw error;
    }
  };

   // Function to fetch social media links of an applicant
   export const fetchAllJobs = async (categoryId) => {

  
    try {
      const response = await fetch(` http://localhost:4000/api/universals/jobs/${categoryId}`);
      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        throw new Error("Error fetching jobs.");
      }
    } catch (error) {
      throw error;
    }
  };

     // Function to fetch industry all
     export const fetchAllIndustry = async () => {
      try {
        const response = await fetch(` http://localhost:4000/api/universals/industries`);
        if (response.ok) {
          const data = await response.json();
          return data;
        } else {
          throw new Error("Error fetching jobs.");
        }
      } catch (error) {
        throw error;
      }
    };
  
      // Function to fetch industry all
      export const fetchAllEmployer= async () => {
        try {
          const response = await fetch(` http://localhost:4000/api/universals/employers`);
          if (response.ok) {
            const data = await response.json();
            return data;
          } else {
            throw new Error("Error fetching jobs.");
          }
        } catch (error) {
          throw error;
        }
      };
    

   
 

    
  