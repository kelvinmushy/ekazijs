import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import styles from './../../styles/cv/template1.module.css';


const StageApplicantProfileModal = ({
  applicantData,
  experiencesData,
  skills,
  socialMediaLinks,
  setShowProfileModal,
  employerId,
  educationalQualifications = [],
  professionalQualifications = [],

}) => {
  
  const [category, setCategory] = useState(null); // State to store selected category
  const [applicantId, setApplicantId] = useState(applicantData.id || '');  // Assuming applicantData has an id field
  const [position, setPosition] = useState(null); // State to store selected position
  const [folderName, setFolderName] = useState(''); // State to store folder name

  console.log("employerId", employerId);

 
 
  

  return (
    <>
      {/* First Modal - Applicant Profile */}
      <Modal show={true} onHide={() => setShowProfileModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{applicantData.first_name} {applicantData.last_name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {applicantData ? (
            <div>
              <div className={styles.cvContainer}>
                <div className={styles.sidebar}>
                  <div className="profile">
                    <img
                      src={applicantData.logo ? `http://localhost:4000${applicantData.logo}` : 'https://via.placeholder.com/100'}
                      alt="Profile"
                      className={styles.profileImg}
                    />
                    <h2 className={styles.profileName}>{applicantData.first_name} {applicantData.last_name}</h2>
                    <p className={styles.profileTitle}>Senior Software Engineer</p>
                    <div className={styles.profileContact}>
                      <p>Email: {applicantData.email}</p>
                      <p>Phone: {applicantData.phone_number}</p>
                    </div>
                  </div>
                  <div className={styles.links}>
                    {socialMediaLinks.length > 0 ? (
                      socialMediaLinks.map((link) => (
                        <p key={link.id}>
                          <a href={link.url} target="_blank" rel="noopener noreferrer">{link.social_media_name}</a>
                        </p>
                      ))
                    ) : (
                      <p>No social media links available</p>
                    )}
                  </div>
                </div>

                <div className={styles.mainContent}>
                  {/* About Me Section */}
                  <section className={styles.section}>
                    <h3 className={styles.sectionTitle}>About Me</h3>
                    <p>{applicantData.about || "No about section provided."}</p>
                  </section>

                  {/* Work Experience Section */}
                  <section className={styles.section}>
                    <h3 className={styles.sectionTitle}>Work Experience</h3>
                    {experiencesData.length > 0 ? (
                      <ul>
                        {experiencesData.map((experience) => (
                          <li key={experience.id}>
                            <h4>{experience.position} | {experience.institution}</h4>
                            <p>
                              <strong>
                                {new Date(experience.from).toLocaleDateString('en-US', {
                                  year: 'numeric',
                                  month: 'long',
                                  day: 'numeric',
                                })} - 
                                {experience.to === "Present" 
                                  ? "Present" 
                                  : new Date(experience.to).toLocaleDateString('en-US', {
                                      year: 'numeric',
                                      month: 'long',
                                      day: 'numeric',
                                    })}
                              </strong>
                            </p>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p>No work experience available</p>
                    )}
                  </section>

                  {/* Education Section */}
                  <section className={styles.section}>
                    <h3 className={styles.sectionTitle}>Education</h3>
                    {educationalQualifications.length > 0 ? (
                      <ul>
                        {educationalQualifications.map((qualification) => (
                          <li key={qualification.id}>
                            <h4>{qualification.education_level} {qualification.programme}</h4>
                            <p>
                              <strong>{qualification.institution}</strong> | Graduated in  
                              {new Date(qualification.ended).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                              })}
                            </p>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p>No education data available</p>
                    )}
                  </section>

                  {/* Skills Section */}
                  <section className={styles.section}>
                    <h3 className={styles.sectionTitle}>Skills</h3>
                    {skills.length > 0 ? (
                      <div className={styles.skills}>
                        {skills.map((skill) => (
                          <span key={skill.id} className={styles.skill}>{skill.skill_name}</span>
                        ))}
                      </div>
                    ) : (
                      <p>No skills data available</p>
                    )}
                  </section>
                </div>
              </div>
            </div>
          ) : (
            <p>Loading applicant data...</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowProfileModal(false)}>
            Close
          </Button>
          {/* <Button variant="primary" onClick={handleSave}>
            Save Profile
          </Button> */}
        </Modal.Footer>
      </Modal>

     
    </>
  );
};

export default StageApplicantProfileModal;
