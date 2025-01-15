import React from 'react';
import { Link } from 'react-router-dom'; // Import Link for internal navigation

const RecruiterCard = ({ imgSrc, altText, link, title }) => {
  // Inline styles for horizontal movement
  const styles = {
    theme1FeaturedLogo: {
      width: '100%', // Set width to 100% to make it take up the maximum available space
      maxWidth: '150px', // Set the maximum width of the logo
      height: 'auto', // Maintain aspect ratio by adjusting the height dynamically
      objectFit: 'contain', // Ensure the image fits within its container while maintaining the aspect ratio
      borderRadius: '50%', // Make the logo circular
      transition: 'transform 0.3s ease, filter 0.3s ease', // Smooth transition for hover effects
    },
    theme1FeaturedLogoHover: {
      transform: 'translateX(20px)', // Move horizontally to the right by 20px
      filter: 'brightness(1.2)', // Slightly brighten the image on hover
    },
  };

  // Hover effect state
  const [hovered, setHovered] = React.useState(false);

  return (
    <div className="col-6 col-sm-3 col-md-2 col-lg-2 col-xl-2 mb-4">
      <div className="card h-100 border-0 rounded-lg shadow-sm">
        <Link to={link}>
          <div className="d-flex justify-content-center align-items-center p-4">
            <img
              src={imgSrc ? `http://localhost:4000${imgSrc}` : 'https://via.placeholder.com/100'}
              alt={altText}
              title={title}
              className="card-img-top theme1-featured-logo"
              style={{
                ...styles.theme1FeaturedLogo,
                ...(hovered ? styles.theme1FeaturedLogoHover : {}),
              }}
              onMouseEnter={() => setHovered(true)} // Add hover state on mouse enter
              onMouseLeave={() => setHovered(false)} // Remove hover state on mouse leave
            />
          </div>
        </Link>
      </div>
    </div>
  );
};

export default RecruiterCard;
