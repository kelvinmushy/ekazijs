import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom


const JobCategoryCard = ({ name, id, count,slug }) => {
  return (
    <div className="my-2">

      <Link to={`/category/${slug}/${id}`} title={name}>

        {name}

       </Link> ({count})

  </div>
  );
};

export default JobCategoryCard;
