import React from 'react';
import { Accordion, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const EmployerSidebar = () => {
  return (
 
     <div>
          <Card style={{marginBottom: "0.1rem"}}>
            <Card.Body>
                
          <div className="text-center" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <img 
              src="https://ejobsitesoftware.com/jobboard_demo/image.php?image_name=logo/20240830075831logo-w__1_.jpg&amp;size=300" 
              alt="Logo" 
              style={{ width: '100px', borderRadius: '0.5rem' }}
            />
          </div>
            <div className="text-center mt-2">
              <a 
                href="#" 
                className="small" 
                style={{ color: '#0a66c2' }}
              >
                Edit Logo
              </a>
            </div>
            <div className="mt-3 fw-bold text-capitalize mb-3">
              Welcome, Metagrowth Digital
            </div>
            </Card.Body>
          </Card>
            <Accordion  defaultActiveKey="0" >
            <Accordion.Item eventKey="0" className='mt-2'>
          <Accordion.Header>
            <i className="bi bi-speedometer2 me-2"></i> Dashboard
          </Accordion.Header>
          <Accordion.Body>
            <Link to="/employer/dashboard" className="accordion-button2 fw-bold drop-padd card-dashboard2">
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
            <Link to="/employer/post-job">Post a job</Link>
            </div>
            <div className="pb-1">
              
            <Link to="/employer/job/lists">List of jobs (123)</Link>
            </div>
            <div className="pb-1">
            <Link to="/employer/post-job">Active jobs (3)</Link>

            </div>
            <div className="pb-1">
            <Link to="/employer/post-job">Expired jobs (23)</Link>

            </div>
          
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="2">
          <Accordion.Header>
            <i className="bi bi-search me-2" style={{ color: '#808080' }}></i> Search Resumes
          </Accordion.Header>
          <Accordion.Body>
            <div className="pb-1">
              <a href="#">Search resume</a>
            </div>
            <div className="pb-1">
              <a href="#">Search applicant</a>
            </div>
            <div className="pb-1">
              <a href="#">Resume search agents</a> (3)
            </div>
            <div className="pb-1">
              <a href="#">Saved resumes</a> (28)
            </div>
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="3">
          <Accordion.Header>
            <i className="bi bi-person-bounding-box me-2" style={{ color: '#808080' }}></i> Applicant Tracking
          </Accordion.Header>
          <Accordion.Body>
            <div className="pb-1">
              <a href="#">Applicant Tracking</a> (75)
            </div>
            <div className="pb-1">
              <a href="#">Direct Applicants</a>
            </div>
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="4">
          <Accordion.Header>
            <i className="bi bi-shield-lock-fill me-2" style={{ color: '#808080' }}></i> My Account
          </Accordion.Header>
          <Accordion.Body>
            <div className="pb-1">
              <Link  to='/employer/edit/profile'> Edit Profile</Link>
            </div>
          
            <div className="pb-1">
              <Link  to='#'> Order history</Link>
            </div>
            <div className="pb-1">
             
              <Link to='/employer/manage/user'>Manage User (5)</Link>
            </div>
         
            <div className="pb-1">
              <Link to='/employer/change/password'>Change password</Link>
            </div>
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="5">
          <Accordion.Header>
            <i className="bi bi-gear-fill me-2" style={{ color: '#808080' }}></i> Resources
          </Accordion.Header>
          <Accordion.Body>
            <div className="pb-1">
              <a href="#">Job forum</a>
            </div>
            <div className="pb-1">
              <a href="#">Articles</a>
            </div>
            <div className="pb-1">
              <a href="#">Newsletter</a>
            </div>
            <div className="pb-1">
              <a href="#">Contact list</a> (2)
            </div>
            <div className="pb-1">
              <a href="#">Job fairs</a>
            </div>
            <div className="pb-1">
              <a href="#">LMS</a>
            </div>
          </Accordion.Body>
        </Accordion.Item>
        </Accordion>
       
     </div>
    
  );
};

export default EmployerSidebar;
