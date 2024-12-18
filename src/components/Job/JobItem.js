// src/components/Job/JobItem.js
import React from 'react';

const JobItem = ({ job, onDelete, onEdit,onView }) => {
  
  return (
    <tr>
      <td>{job.title}</td>
      {/* <td>{job.description}</td> */}
      <td>{new Date(job.posting_date).toLocaleDateString()}</td>
      <td>{new Date(job.expired_date).toLocaleDateString()}</td>

      <td>
      <button 
          onClick={() => onView(job)} 
          className="btn btn-success btn-sm mr-2"
        >
         View
        </button>
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
