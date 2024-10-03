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

  useEffect(() => {
    // Fetch or hardcode universal data here (mock example)
    setCountries([
      { id: 1, name: 'United States' },
      { id: 2, name: 'India' },
      { id: 3, name: 'Germany' }
    ]);

    setSkills([
        { id: 1, name: 'ChatGpt' },
        { id: 2, name: 'Ofice' },
        { id: 3, name: 'Linux' }
      ]);
      setCultures([
        { id: 1, name: 'United States' },
        { id: 2, name: 'India' },
        { id: 3, name: 'Germany' }
      ]);
      setTypes([
        { id: 1, name: 'United States' },
        { id: 2, name: 'India' },
        { id: 3, name: 'Germany' }
      ]);
      setExperiences([
        { id: 1, name: 'United States' },
        { id: 2, name: 'India' },
        { id: 3, name: 'Germany' }
      ]);
      setLevels([
        { id: 1, name: 'United States' },
        { id: 2, name: 'India' },
        { id: 3, name: 'Germany' }
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
  }, []);

  return (
    <UniversalDataContext.Provider value={{ countries, states, categories,skills,jobTypes,levels,cultures,experiences }}>
      {children}
    </UniversalDataContext.Provider>
  );
};

export default UniversalDataProvider;
