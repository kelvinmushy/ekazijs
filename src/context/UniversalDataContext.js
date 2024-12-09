import React, { createContext, useState, useEffect } from 'react';

// Create the Context
export const UniversalDataContext = createContext();

const UniversalDataProvider = ({ children }) => {
  // Universal data
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [categories, setCategories] = useState([]);
  const [experiences, setExperiences] = useState([]);
  const [skills, setSkills] = useState([]);
  const [cultures, setCultures] = useState([]);
  const [jobTypes, setTypes] = useState([]);
  const [levels, setLevels] = useState([]);
  const [jobPrograms, setJobPrograms] = useState([]);  // Job Programs/Courses
  const [educationLevels, setEducationLevels] = useState([]);  // Education Levels

  useEffect(() => {
    // Fetch or hardcode universal data here (mock example)
    setCountries([
      { id: 1, name: 'United States' },
      { id: 2, name: 'India' },
      { id: 3, name: 'Germany' }
    ]);

    setSkills([
      { id: 1, name: 'ChatGPT' },
      { id: 2, name: 'Office' },
      { id: 3, name: 'Linux' }
    ]);

    setCultures([
      { id: 1, name: 'American' },
      { id: 2, name: 'Indian' },
      { id: 3, name: 'German' }
    ]);

    setTypes([
      { id: 1, name: 'Full-Time' },
      { id: 2, name: 'Part-Time' },
      { id: 3, name: 'Contract' }
    ]);

    setExperiences([
      { id: 1, name: '1-3 years' },
      { id: 2, name: '3-5 years' },
      { id: 3, name: '5+ years' }
    ]);

    setLevels([
      { id: 1, name: 'Junior' },
      { id: 2, name: 'Mid' },
      { id: 3, name: 'Senior' }
    ]);

    setStates([
      { id: 1, name: 'California', countryId: 1 },
      { id: 2, name: 'New York', countryId: 1 },
      { id: 3, name: 'Maharashtra', countryId: 2 }
    ]);

    setCategories([
      { id: 1, name: 'Engineering' },
      { id: 2, name: 'Finance' },
      { id: 3, name: 'Marketing' }
    ]);

    // Add sample job programs/courses
    setJobPrograms([
      { id: 1, name: 'Computer Science' },
      { id: 2, name: 'Business Administration' },
      { id: 3, name: 'Data Science' }
    ]);

    // Add sample education levels
    setEducationLevels([
      { id: 1, name: 'High School' },
      { id: 2, name: 'Associate Degree' },
      { id: 3, name: 'Bachelor\'s Degree' },
      { id: 4, name: 'Master\'s Degree' },
      { id: 5, name: 'Doctorate' }
    ]);
  }, []);

  return (
    <UniversalDataContext.Provider value={{
      countries,
      states,
      categories,
      skills,
      jobTypes,
      levels,
      cultures,
      experiences,
      jobPrograms,  // Providing jobPrograms
      educationLevels  // Providing educationLevels
    }}>
      {children}
    </UniversalDataContext.Provider>
  );
};

export default UniversalDataProvider;
