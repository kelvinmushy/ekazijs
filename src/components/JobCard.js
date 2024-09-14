import React from "react";

const JobCard = ({ imgSrc, title, company, location, date, jobType, link }) => (
  <div className="col-md-4 mb-4">
    <div className="card card-custom featured-job-tag">
      <div className="card-body card-body-custom px-3 align-items-center">
        <div className="d-flex align-items-center mb-3">
          <div className="flex-shrink-0">
            <img src={imgSrc} alt={title} className="featured-logo thumbnail img-responsive img-hover" />
          </div>
          <div className="flex-grow-1 ms-3">
            <h5 className="mb-0 text-capitalize">
              <a href={link} target="_blank" rel="noopener noreferrer">{title}</a>
            </h5>
            <div className="align-items-center">
              <span className="me-2">{company}</span>
            </div>
            <div>
              <span className="text-muted para-theme1">
                <i className="bi bi-geo-alt"></i> {location}
              </span>
            </div>
          </div>
        </div>
        <div className="d-flex">
          <div>
            <div className="text-muted para-theme1">{date}</div>
          </div>
          <div className="d-flex ms-auto">
            <div className="para-theme1">
              <span className={jobType}>{jobType}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default JobCard;
