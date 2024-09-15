import React from 'react';
import Layout from './Layout';

// Static job data
const jobs = [
  { id: 1, title: 'Software Engineer', description: 'Develop software applications.' },
  { id: 2, title: 'Product Manager', description: 'Manage product development.' },
  { id: 3, title: 'UX Designer', description: 'Design user experiences.' },
];

const JobManagement = () => {
  return (
    <Layout>
      <div className="content">
        <h2>Manage Jobs</h2>
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {jobs.map(job => (
              <tr key={job.id}>
                <td>{job.title}</td>
                <td>{job.description}</td>
                <td>
                  <button>Edit</button>
                  <button>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

export default JobManagement;
