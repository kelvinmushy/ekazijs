import React from 'react';

const JobCategoryCard = ({ name, link, count }) => {
  return (
    <div className="my-2">
      <a href={link} title={name}>
        {name}
      </a> ({count})
    </div>
  );
};

export default JobCategoryCard;
