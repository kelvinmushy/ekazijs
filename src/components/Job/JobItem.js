// src/components/Job/JobItem.js
import React from 'react';

const JobItem = ({ job, onDelete, onEdit }) => {
  
  return (
    <tr>
      <td>{job.title}</td>
      <td>{job.description}</td>
      <td>
        <button 
          onClick={() => onEdit(job)} 
          className="btn btn-primary btn-sm mr-2"
        >
          Edit
        </button>
        <button 
          onClick={() => onDelete(job.id)} 
          className="btn btn-danger btn-sm"
        >
          Delete
        </button>
      </td>
    </tr>
  );
};


export default JobItem;