import React, { useState, useEffect } from 'react';
import Layout from '../../AdminLayout/Layout';


const Country = () => {
  const [countries, setCountries] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentCountry, setCurrentCountry] = useState(null);

  const openModal = (country = null) => {
    setCurrentCountry(country);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setCurrentCountry(null);
    setIsModalOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const url = 'http://localhost:4000/api/admin/resource/new/country';
    const update_url='http://localhost:4000/api/admin/resource/update/country'
    
    try {
      if (currentCountry?.id) {
        // Update existing country
        const response = await fetch(`${update_url}/${currentCountry.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: currentCountry.name,
            country_code: currentCountry.country_code,
            currency: currentCountry.currency,
          }),
        });
  
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
  
        const updatedCountry = await response.json();
        setCountries(prevCountries =>
          prevCountries.map(country =>
            country.id === updatedCountry.id ? updatedCountry : country
          )
        );
      } else {
        
      // Add new country
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: currentCountry.name,
            country_code: currentCountry.country_code,
            currency: currentCountry.currency,
          }),
        });
  
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
  
        const newCountry = await response.json();
        setCountries(prevCountries => [...prevCountries, newCountry]);
      }
  
      closeModal();
    } catch (error) {
      console.error('Error saving country:', error);
    }
  };
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this country?');
    if (confirmDelete) {
      try {
        const response = await fetch(`http://localhost:4000/api/admin/resource/countries/${id}`, {
          method: 'DELETE',
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // Remove the deleted country from the state
        setCountries(countries.filter(country => country.id !== id));
      } catch (error) {
        console.error('Error deleting country:', error);
      }
    }
  };


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
        <button onClick={() => openModal()}>Add Country</button>
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
                  <button onClick={() => openModal(country)}>Edit</button>
                  <button onClick={() => handleDelete(country.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {isModalOpen && (
          <div className="modal">
            <div className="modal-content">
              <span className="close" onClick={closeModal}>&times;</span>
              <h2>{currentCountry ? 'Edit Country' : 'Add Country'}</h2>
              <form onSubmit={handleSubmit}>
                <label>
                  Name:
                  <input className='form-control'
                    type="text"
                    value={currentCountry ? currentCountry.name : ''}
                    onChange={(e) => setCurrentCountry({ ...currentCountry, name: e.target.value })}
                    required
                  />
                </label>
                <label>
                  Code:
                  <input className='form-control'
                    type="text"
                    value={currentCountry ? currentCountry.country_code : ''}
                    onChange={(e) => setCurrentCountry({ ...currentCountry, country_code: e.target.value })}
                    required
                  />
                </label>
                <label>
                  Currency:
                  <input className='form-control'
                    type="text"
                    value={currentCountry ? currentCountry.currency : ''}
                    onChange={(e) => setCurrentCountry({ ...currentCountry, currency: e.target.value })}
                    required
                  />
                </label>
                <button type="submit" className='btn btn-primary'>{currentCountry ? 'Update' : 'Add'} Country</button>
              </form>
            </div>
          </div>
        )}
      </div>
      
    </Layout>
  );
};

export default Country;
