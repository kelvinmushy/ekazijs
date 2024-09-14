import React from 'react';
import { Accordion, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const EmployerSidebar = () => {
  return (
 
      <Accordion  defaultActiveKey="0">
        <Card style={{ borderTopLeftRadius: '0.8rem', borderTopRightRadius: '0.8rem' }} className='mt-4'>
          <Card.Body className="text-center">
            <img 
              src="https://ejobsitesoftware.com/jobboard_demo/image.php?image_name=logo/20240830075831logo-w__1_.jpg&amp;size=300" 
              alt="Logo" 
              style={{ width: '100px', borderRadius: '0.5rem' }}
            />
            <div className="text-center mt-2">
              <a 
                href="https://ejobsitesoftware.com/jobboard_demo/recruiter_registration.php" 
                className="small" 
                style={{ color: '#0a66c2' }}
              >
                Edit Logo
              </a>
            </div>
            <div className="mt-3 fw-bold text-capitalize">
              Welcome, Metagrowth Digital
            </div>
          </Card.Body>
        </Card>

        <Accordion.Item eventKey="0">
          <Accordion.Header>
            <i className="bi bi-speedometer2 me-2"></i> Dashboard
          </Accordion.Header>
          <Accordion.Body>
            <Link to="https://ejobsitesoftware.com/jobboard_demo/recruiter_control_panel.php" className="accordion-button2 fw-bold drop-padd card-dashboard2">
              <i className="bi bi-speedometer2 me-2"></i> Dashboard
            </Link>
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="1">
          <Accordion.Header>
            <i className="bi bi-briefcase-fill me-2" style={{ color: '#808080' }}></i> Job Posting
          </Accordion.Header>
          <Accordion.Body>
            <div className="pb-1">
              <a href="https://ejobsitesoftware.com/jobboard_demo/post_job.php">Post a job</a>
            </div>
            <div className="pb-1">
              <a href="https://ejobsitesoftware.com/jobboard_demo/list_of_jobs.php?j_status=all">List of jobs</a>
            </div>
            <div className="pb-1">
              <a href="https://ejobsitesoftware.com/jobboard_demo/list_of_jobs.php?page=1&amp;j_status=active">Active jobs</a> (875)
            </div>
            <div className="pb-1">
              <a href="https://ejobsitesoftware.com/jobboard_demo/list_of_jobs.php?j_status=expired">Expired jobs</a> (237)
            </div>
            <div className="pb-1">
              <a href="https://ejobsitesoftware.com/jobboard_demo/recruiter_import_jobs.php">Import jobs</a>
            </div>
            <div className="pb-1">
              <a href="https://ejobsitesoftware.com/jobboard_demo/reports/recruiter-reports.php">Reports</a>
            </div>
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="2">
          <Accordion.Header>
            <i className="bi bi-search me-2" style={{ color: '#808080' }}></i> Search Resumes
          </Accordion.Header>
          <Accordion.Body>
            <div className="pb-1">
              <a href="https://ejobsitesoftware.com/jobboard_demo/search_resume.php">Search resume</a>
            </div>
            <div className="pb-1">
              <a href="https://ejobsitesoftware.com/jobboard_demo/search_applicant.php">Search applicant</a>
            </div>
            <div className="pb-1">
              <a href="https://ejobsitesoftware.com/jobboard_demo/my_resume_search_agents.php">Resume search agents</a> (3)
            </div>
            <div className="pb-1">
              <a href="https://ejobsitesoftware.com/jobboard_demo/list_of_resumes.php">Saved resumes</a> (28)
            </div>
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="3">
          <Accordion.Header>
            <i className="bi bi-person-bounding-box me-2" style={{ color: '#808080' }}></i> Applicant Tracking
          </Accordion.Header>
          <Accordion.Body>
            <div className="pb-1">
              <a href="https://ejobsitesoftware.com/jobboard_demo/applicant_tracking.php">Applicant Tracking</a> (75)
            </div>
            <div className="pb-1">
              <a href="https://ejobsitesoftware.com/jobboard_demo/list_of_unreg_resumes.php">Direct Applicants</a>
            </div>
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="4">
          <Accordion.Header>
            <i className="bi bi-shield-lock-fill me-2" style={{ color: '#808080' }}></i> My Account
          </Accordion.Header>
          <Accordion.Body>
            <div className="pb-1">
              <a href="https://ejobsitesoftware.com/jobboard_demo/recruiter_registration.php">Edit profile</a>
            </div>
            <div className="pb-1">
              <a href="https://ejobsitesoftware.com/jobboard_demo/company_description.php">Company profile</a>
            </div>
            <div className="pb-1">
              <a href="https://ejobsitesoftware.com/jobboard_demo/order_history.php">Order history</a>
            </div>
            <div className="pb-1">
              <a href="https://ejobsitesoftware.com/jobboard_demo/list_of_users.php">Manage users</a> (5)
            </div>
            <div className="pb-1">
              <form name="recstatus" action="https://ejobsitesoftware.com/jobboard_demo/recruiter_control_panel.php" method="post">
                <input type="hidden" name="action" value="direct_login_inactive" />
                Apply without Login 
                <label htmlFor="checkbox_rec_dr_log" className="switch">
                  <input type="checkbox" name="direct_login" value="Yes" checked="" className="inputdemo" id="checkbox_rec_dr_log" />
                  <span className="slider round"></span>
                </label>
              </form>
            </div>
            <div className="pb-1">
              <a href="https://ejobsitesoftware.com/jobboard_demo/recruiter_change_password.php">Change password</a>
            </div>
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="5">
          <Accordion.Header>
            <i className="bi bi-gear-fill me-2" style={{ color: '#808080' }}></i> Resources
          </Accordion.Header>
          <Accordion.Body>
            <div className="pb-1">
              <a href="https://ejobsitesoftware.com/jobboard_demo/forum/">Job forum</a>
            </div>
            <div className="pb-1">
              <a href="https://ejobsitesoftware.com/jobboard_demo/article.php">Articles</a>
            </div>
            <div className="pb-1">
              <a href="https://ejobsitesoftware.com/jobboard_demo/list_of_newsletters.php">Newsletter</a>
            </div>
            <div className="pb-1">
              <a href="https://ejobsitesoftware.com/jobboard_demo/contact_list.php">Contact list</a> (2)
            </div>
            <div className="pb-1">
              <a href="https://ejobsitesoftware.com/jobboard_demo/list_of_jobfairs.php">Job fairs</a>
            </div>
            <div className="pb-1">
              <a href="https://ejobsitesoftware.com/jobboard_demo/lms/courses.php">LMS</a>
            </div>
          </Accordion.Body>
        </Accordion.Item>
        </Accordion>
    
  );
};

export default EmployerSidebar;
