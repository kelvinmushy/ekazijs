import React from 'react';
import Layout from '../../AdminLayout/Layout';

// Static job data
const categories = [
  { id: 1, name: 'Software Engineer', description: 'Develop software applications.' },
  { id: 2, name: 'Product Manager', description: 'Manage product development.' },
  { id: 3, name: 'UX Designer', description: 'Design user experiences.' },
];

const State = () => {
  return (
    <Layout>
      <div className="content">
        <h2>Manage categories</h2>
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map(job => (
              <tr key={job.id}>
                <td>{job.name}</td>
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

export default State;
