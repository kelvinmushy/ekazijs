import React from 'react';

const RecruiterCard = ({ imgSrc, altText, link, title }) => {
  return (
    <div className="col-6 col-sm-3 col-md-2 col-lg-2 col-xl-2 mobile-featured-recruiter">
      <div>
        <a href={link} target="_blank" rel="noopener noreferrer">
          <img
            src={imgSrc}
            alt={altText}
            title={title}
            className="card-custom mb-3 theme1-featured-logo"
          />
        </a>
      </div>
    </div>
  );
};

export default RecruiterCard;
