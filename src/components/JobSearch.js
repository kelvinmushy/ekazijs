// src/components/JobSearch.js
import React, { useState } from 'react';

const JobSearch = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSearch} className="job-search">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for jobs..."
      />
      <button type="submit">Search</button>
    </form>
  );
};

export default JobSearch;
