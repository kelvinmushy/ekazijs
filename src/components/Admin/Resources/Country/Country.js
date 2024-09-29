import React, { useState, useEffect } from 'react';
import Layout from '../../AdminLayout/Layout';

const Country = () => {
  const [countries, setCountries] = useState([]);

  const getCountry = async () => {
    try {
      const response = await fetch('http://localhost:4000/api/admin/resource/countries');
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      console.log(data); // Log the data or handle it as needed
      return data; // Return data for further use
    } catch (error) {
      console.error('Error fetching countries:', error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const countriesData = await getCountry();
      if (countriesData) {
        setCountries(countriesData); // Update state with fetched data
      }
    };

    fetchData();
  }, []);

  return (
    <Layout>
      <div className="content">
        <h2>Manage Countries</h2>
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Code</th>
              <th>Currency</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {countries.map(country => (
              <tr key={country.id}>
                 <td>{country.name}</td>
                <td>{country.country_code}</td>
                <td>{country.currency}</td>
                <td>
                  <button>Edit</button>
                  <button>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

export default Country;
