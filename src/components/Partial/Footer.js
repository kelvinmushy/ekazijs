import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const Footer = () => {
  return (
    <div className="container-fluid py-3" style={{ backgroundColor: '#276795', color: 'white' }}>
      <div className="container text-start">
        <div className="py-4 row row-cols-1 row-cols-sm-2 row-cols-md-4 g-3">
          <div className="col">
            <img
              src="https://ejobsitesoftware.com/jobboard_demo/img/logo.png"
              width="149"
              height="25"
              alt="Logo"
              className="footer-logo"
            />
            <p className="copyright">
              © 2024
              <a href="https://ejobsitesoftware.com/jobboard_demo/" style={{ color: 'white', textDecoration: 'none' }}> JOBBOARD DEMO </a>
            </p>

            <ul className="list-unstyled d-flex gap-2">
              <li>
                <a
                  href="https://www.facebook.com/ejobsitesoftware/"
                  className="text-white"
                  title="Facebook"
                >
                  <i className="bi bi-facebook"></i>
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/ejobsitesoftware/"
                  className="text-white"
                  title="LinkedIn"
                >
                  <i className="bi bi-linkedin"></i>
                </a>
              </li>
              <li>
                <a
                  href="https://www.twitter/ejobsitesoftware/"
                  className="text-white"
                  title="Twitter"
                >
                  <i className="bi bi-twitter"></i>
                </a>
              </li>
              <li>
                <a
                  href="https://www.google.com/ejobsitesoftware/"
                  className="text-white"
                  title="Google Plus"
                >
                  <i className="bi bi-google"></i>
                </a>
              </li>
              <li>
                <a
                  href="https://ejobsitesoftware.com/jobboard_demo/industry_rss.php"
                  className="text-white"
                  title="RSS"
                >
                  <i className="bi bi-rss-fill"></i>
                </a>
              </li>
            </ul>
          </div>

          <div className="col">
            <p>
              <strong>JOB SEEKER</strong>
            </p>
            <ul className="list-unstyled">
              <li>
                <a href="https://ejobsitesoftware.com/jobboard_demo/jobseeker-register/" className="text-white">Sign up</a>
              </li>
              <li>
                <a href="https://ejobsitesoftware.com/jobboard_demo/job-search/" className="text-white">Search jobs</a>
              </li>
              <li>
                <a href="https://ejobsitesoftware.com/jobboard_demo/login/" className="text-white">Sign in</a>
              </li>
              <li>
                <a href="https://ejobsitesoftware.com/jobboard_demo/login/" className="text-white">View applications</a>
              </li>
              <li>
                <a href="https://ejobsitesoftware.com/jobboard_demo/login/" className="text-white">Job alerts</a>
              </li>
              <li>
                <a href="https://ejobsitesoftware.com/jobboard_demo/jobseeker_resume1.php" className="text-white">Post resume</a>
              </li>
              <li>
                <a href="https://ejobsitesoftware.com/jobboard_demo/lms/my-courses.php" className="text-white">My courses</a>
              </li>
            </ul>
          </div>

          <div className="col">
            <p>
              <strong>EMPLOYER</strong>
            </p>
            <ul className="list-unstyled">
              <li>
                <a href="https://ejobsitesoftware.com/jobboard_demo/post_job.php" className="text-white">Post a job</a>
              </li>
              <li>
                <a href="https://ejobsitesoftware.com/jobboard_demo/search_resume.php" className="text-white">Search resume</a>
              </li>
              <li>
                <a href="https://ejobsitesoftware.com/jobboard_demo/recruiter-login/" className="text-white">Sign in</a>
              </li>
              <li>
                <a href="https://ejobsitesoftware.com/jobboard_demo/recruiter-registation/" className="text-white">Sign up</a>
              </li>
              <li>
                <a href="https://ejobsitesoftware.com/jobboard_demo/recruiter-login/" className="text-white">Resume alerts</a>
              </li>
              <li>
                <a href="https://ejobsitesoftware.com/jobboard_demo/recruiter-login/" className="text-white">Applicant tracking</a>
              </li>
              <li>
                <a href="https://ejobsitesoftware.com/jobboard_demo/lms/courses/" className="text-white">LMS</a>
              </li>
            </ul>
          </div>

          <div className="col">
            <p>
              <strong>INFORMATION</strong>
            </p>
            <ul className="list-unstyled">
              <li>
                <a href="https://ejobsitesoftware.com/jobboard_demo/about-us/" className="text-white">About us</a>
              </li>
              <li>
                <a href="https://ejobsitesoftware.com/jobboard_demo/article/" className="text-white">Articles</a>
              </li>
              <li>
                <a href="https://ejobsitesoftware.com/jobboard_demo/lms/courses-list/" className="text-white">LMS</a>
              </li>
              <li>
                <a href="https://ejobsitesoftware.com/jobboard_demo/jobfair/" className="text-white">Jobfairs</a>
              </li>
              <li>
                <a href="https://ejobsitesoftware.com/jobboard_demo/site-map/" className="text-white">Sitemap</a>
              </li>
              <li>
                <a href="https://ejobsitesoftware.com/jobboard_demo/contact-us/" className="text-white">Contact</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
