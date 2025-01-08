import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

const JobCategoryCard = ({ name, link, count }) => {
  return (
    <div className="my-2">
      <Link to={link} title={name}>
        {name}
      </Link> ({count})
    </div>
  );
};

export default JobCategoryCard;
