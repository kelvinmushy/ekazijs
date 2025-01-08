import React from 'react';
import { Link } from 'react-router-dom'; // Import Link for internal navigation

const RecruiterCard = ({ imgSrc, altText, link, title }) => {
  return (
    <div className="col-6 col-sm-3 col-md-2 col-lg-2 col-xl-2 mobile-featured-recruiter">
      <div className="d-flex justify-content-center align-items-center" style={{ height: '100%' }}>
        <Link to={link}>
          <img
            src={imgSrc ? `http://localhost:4000${imgSrc}` : 'https://via.placeholder.com/100'}
            alt={altText}
            title={title}
            style={{
              maxWidth: '150px', // Set a larger maximum width
              maxHeight: '150px', // Set a larger maximum height
              width: 'auto', // Maintain aspect ratio
              height: 'auto', // Maintain aspect ratio
              objectFit: 'contain', // Keep the image within bounds
              transition: 'transform 0.3s ease', // Smooth transition on hover
            }}
            className="mb-3 theme1-featured-logo"
          />
        </Link>
      </div>
    </div>
  );
};

export default RecruiterCard;
