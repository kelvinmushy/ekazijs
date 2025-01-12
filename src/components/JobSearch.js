// src/components/JobSearch.js
import React, { useState } from 'react';

const JobSearch = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <div className="container-fluid" style={{ background: '#276795'}}>
    <div className="container" >
    <div className="row">
      <div className="col-md-10 mx-auto text-center">
        <h1 className="text-white home-heading" style={{ fontWeight: 700, fontSize: '53px' }}>
        Locate the perfect role for your life
        </h1>
        <h5 className="text-white mb-4">Aligning exceptional career opportunities with top talent.</h5>

        <div className="card" style={{
          borderRadius: '12px',
          boxShadow: '0 7px 14px 0 rgb(8 15 52 / 3%)',
          transform: 'translate(0px, 0px)',
          background: '#799fbf',
          boxShadow: '0 1px 4px 0 rgba(12, 12, 13, 0.1)',
          border: 'transparent'
        }}>
          <div className="card-body">
            <form name="search_job" action="https://ejobsitesoftware.com/jobboard_demo/job-search/" method="post">
              <input type="hidden" name="action" value="search" />
              <div className="row g-3">
                <div className="col flex-auto">
                  <input
                    type="text"
                    name="keyword"
                    className="form-control form-control-lg form-home"
                    placeholder="Keyword"
                  />
                </div>
                <div className="col flex-auto">
                  <select name="country" className="form-select form-select-lg form-home">
                    <option value="">All location</option>
                    <option value="1">Afghanistan</option>
                    <option value="2">Albania</option>
                    {/* Add all the other options here */}
                    <option value="239">Zimbabwe</option>
                  </select>
                </div>
                <div className="col flex-auto">
                  <select name="job_category[]" className="form-select form-select-lg">
                    <option value="0">All Category</option>
                    <option value="21">Accounting/Finance/Banking</option>
                    <option value="1">Administration/HR/Legal</option>
                    {/* Add all the other job categories here */}
                    <option value="41">Transportation/Warehousing</option>
                    <option value="20">Travel/ Airlines</option>
                  </select>
                </div>
                <div className="col-auto flex-auto">
                  <button type="submit" className="btn btn-lg btn-warning m-w-100">
                    <i className="bi bi-search"></i> Search
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
        
        <div className="mt-3">
          <a href="https://ejobsitesoftware.com/jobboard_demo/job-search/" className="text-white advance-link">
            Advanced Search
          </a>
        </div>
      </div>
    </div>
    </div>
  </div>
  );
};

export default JobSearch;
