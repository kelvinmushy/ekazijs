import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import styles from './../../styles/cv/template1.module.css';
import { getRecruitmentstage, moveApplicantToStage } from '../../api/api';
import InterviewDetailsForm from '../InterviewStage/InterviewDetails';
import AssessmentDetailsForm from '../InterviewStage/AssessmentDetailsForm';
import ScreeningDetailsForm from '../InterviewStage/ScreeningDetailsForm';

const StageApplicantProfileModal = ({
  applicationId,
  applicantData,
  experiencesData = [],
  skills = [],
  socialMediaLinks = [],
  setShowProfileModal,
  employerId,
  educationalQualifications = [],
  professionalQualifications = [],
}) => {
  const [category, setCategory] = useState('');
  const [stageData, setStageData] = useState([]);
  const [showInterviewModal, setShowInterviewModal] = useState(false);
  const [showAssessmentModal, setShowAssessmentModal] = useState(false);
  const [showScreeningModal, setShowScreeningModal] = useState(false);

  const [interviewDetails, setInterviewDetails] = useState({
    date: '',       // Interview date
    time: '',       // Interview time
    venue: '',      // Interview venue (in-person, online, or phone)
    duration: '',   // Interview duration
    notes: '',      // Interview notes
    interviewer_id: null, // Interviewer ID (can be null or assigned later)
  });
  
  useEffect(() => {
    if (!employerId) return;

    const fetchStages = async () => {
      try {
        const response = await getRecruitmentstage(employerId);
        setStageData(response?.stages || []);
      } catch (error) {
        console.error("Failed to fetch recruitment stages:", error);
      }
    };

    fetchStages();
  }, [employerId]);

  const handleStageSelect = (e) => {
    const selectedId = e.target.value;
    setCategory(selectedId);

    const selectedStage = stageData.find(stage => stage.id.toString() === selectedId);
    const stageName = selectedStage?.name?.toLowerCase() || '';

    setShowInterviewModal(stageName.includes('interview'));
    setShowAssessmentModal(stageName.includes('assessment'));
    setShowScreeningModal(stageName.includes('screening'));
  };

  const handleStageShift = async () => {
    if (category === applicantData?.stage_id?.toString()) {
      alert("The applicant is already in this stage.");
      return;
    }

    const selectedStage = stageData.find(stage => stage.id.toString() === category);
    const stageName = selectedStage?.name?.toLowerCase() || '';

    let stagePayload = {};

    if (stageName.includes('interview')) {
      const { date, time, venue, duration, notes } = interviewDetails;
      if (!date || !time || !venue || !duration) {
        alert("Please fill in all required interview fields.");
        return;
      }
      stagePayload = {
        type: 'in-person', // or 'online' or 'phone' based on user input
        interviewer_id: interviewDetails.interviewer_id || null, // Add interviewer id here
        result: 'Pending', // Default value if not decided
        interview_time: `${date} ${time}`, // Concatenate date and time
        location: venue, // Location/venue for the interview
        notes: notes || '', // Any additional notes
      };
    } else if (stageName.includes('assessment')) {
      stagePayload = { type: 'assessment' };
    } else if (stageName.includes('screening')) {
      stagePayload = { type: 'screening' };
    }

    try {
      await moveApplicantToStage(applicationId, category, stagePayload);
      alert("Applicant moved successfully!");
      setShowInterviewModal(false);
      setShowAssessmentModal(false);
      setShowScreeningModal(false);
    } catch (error) {
      console.error("Error moving applicant:", error);
      alert("Failed to move applicant.");
    }
  };

  return (
    <>
      <Modal show onHide={() => setShowProfileModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{applicantData?.first_name} {applicantData?.last_name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className={styles.cvContainer}>
            {/* Sidebar */}
            <div className={styles.sidebar}>
              <div className="profile">
                <img
                  src={applicantData?.logo ? `http://localhost:4000${applicantData.logo}` : 'https://via.placeholder.com/100'}
                  alt="Profile"
                  className={styles.profileImg}
                />
                <h2 className={styles.profileName}>
                  {applicantData?.first_name} {applicantData?.last_name}
                </h2>
                <p className={styles.profileTitle}>Senior Software Engineer</p>
                <div className={styles.profileContact}>
                  <p>Email: {applicantData?.email}</p>
                  <p>Phone: {applicantData?.phone_number}</p>
                </div>
              </div>

              <div className={styles.links}>
                {socialMediaLinks.length > 0 ? (
                  socialMediaLinks.map(link => (
                    <p key={link.id}>
                      <a href={link.url} target="_blank" rel="noopener noreferrer">
                        {link.social_media_name}
                      </a>
                    </p>
                  ))
                ) : <p>No social media links available</p>}
              </div>
            </div>

            {/* Main Content */}
            <div className={styles.mainContent}>
              <section className={styles.section}>
                <h3 className={styles.sectionTitle}>About Me</h3>
                <p>{applicantData?.about || "No about section provided."}</p>
              </section>

              <section className={styles.section}>
                <h3 className={styles.sectionTitle}>Work Experience</h3>
                {experiencesData.length > 0 ? (
                  <ul>
                    {experiencesData.map(exp => (
                      <li key={exp.id}>
                        <h4>{exp.position} | {exp.institution}</h4>
                        <p><strong>{new Date(exp.from).toLocaleDateString()} - {exp.to === "Present" ? "Present" : new Date(exp.to).toLocaleDateString()}</strong></p>
                      </li>
                    ))}
                  </ul>
                ) : <p>No work experience available</p>}
              </section>

              <section className={styles.section}>
                <h3 className={styles.sectionTitle}>Education</h3>
                {educationalQualifications.length > 0 ? (
                  <ul>
                    {educationalQualifications.map(edu => (
                      <li key={edu.id}>
                        <h4>{edu.education_level} {edu.programme}</h4>
                        <p><strong>{edu.institution}</strong> | Graduated in {new Date(edu.ended).toLocaleDateString()}</p>
                      </li>
                    ))}
                  </ul>
                ) : <p>No education data available</p>}
              </section>

              <section className={styles.section}>
                <h3 className={styles.sectionTitle}>Skills</h3>
                {skills.length > 0 ? (
                  <div className={styles.skills}>
                    {skills.map(skill => (
                      <span key={skill.id} className={styles.skill}>{skill.skill_name}</span>
                    ))}
                  </div>
                ) : <p>No skills data available</p>}
              </section>

              <section className={styles.section}>
                <h3 className={styles.sectionTitle}>Recruitment Stage</h3>
                <p>
                  Current Stage: <strong>{stageData.find(s => s.id === applicantData?.stage_id)?.name || 'Unknown'}</strong>
                </p>
                <Form.Group>
                  <Form.Label>Move to another stage</Form.Label>
                  <Form.Select value={category} onChange={handleStageSelect}>
                    <option value="">Select a stage</option>
                    {stageData.map(stage => (
                      <option key={stage.id} value={stage.id} disabled={stage.id === applicantData?.stage_id}>
                        {stage.name}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
                <Button
                  variant="primary"
                  className="mt-2"
                  onClick={handleStageShift}
                  disabled={!category}
                >
                  Move Applicant to Stage
                </Button>
              </section>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowProfileModal(false)}>Close</Button>
        </Modal.Footer>
      </Modal>

      {/* Stage-specific modals */}
      <InterviewDetailsForm
        show={showInterviewModal}
        onClose={() => setShowInterviewModal(false)}
        onSubmit={handleStageShift}
        interviewDetails={interviewDetails}
        setInterviewDetails={setInterviewDetails}
      />
      <AssessmentDetailsForm
        show={showAssessmentModal}
        onClose={() => setShowAssessmentModal(false)}
      />
      <ScreeningDetailsForm
        show={showScreeningModal}
        onClose={() => setShowScreeningModal(false)}
      />
    </>
  );
};

export default StageApplicantProfileModal;
