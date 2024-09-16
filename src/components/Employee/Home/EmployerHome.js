import React from "react";
import { Container } from "react-bootstrap";
import { Card, Table, Button,Row,Col} from 'react-bootstrap';
import { FaBriefcase, FaUsers, FaCheckCircle, FaEye } from 'react-icons/fa';
import EmployerLayout from "../Layout/EmployerLayout";
const EmployerHome=()=>{

    return(
    <EmployerLayout>
     <Container >
        <Row>
          <Col  md={8}>
          <Row className="mb-3">
            <Col xl={6} md={6} className="mb-2">
              <Card className="border h-100">
                <Card.Body className="d-flex align-items-center">
                  <div className="dot me-3 bg-indigo"></div>
                  <div className="flex-grow-1">
                    <a href="list_of_jobs.php">
                      <div className="text-gray-500 numbers2">
                        1114 <span className="text-muted ms-2" style={{ fontWeight: 400, fontSize: '16px' }}>Jobs</span>
                      </div>
                    </a>
                  </div>
                  <div className="icon text-white bg-indigo ms-auto">
                    <FaBriefcase className="dashboard-icon1" />
                  </div>
                </Card.Body>
              </Card>
            </Col>

            <Col xl={6} md={6} className="mb-2">
              <Card className="border h-100">
                <Card.Body className="d-flex align-items-center">
                  <div className="dot me-3 bg-green"></div>
                  <div className="flex-grow-1">
                    <a href="applicant_tracking.php">
                      <div className="text-gray-500 numbers2">
                        75 <span className="text-muted ms-2" style={{ fontWeight: 400, fontSize: '16px' }}>Applicants</span>
                      </div>
                    </a>
                  </div>
                  <div className="icon text-white bg-green ms-auto">
                    <FaUsers className="dashboard-icon2" />
                  </div>
                </Card.Body>
              </Card>
            </Col>

            <Col xl={6} md={6} className="mb-2">
              <Card className="border h-100">
                <Card.Body className="d-flex align-items-center">
                  <div className="dot me-3 bg-blue"></div>
                  <div className="flex-grow-1">
                    <div className="text-gray-500 numbers2">
                      28 <span className="text-muted ms-2" style={{ fontWeight: 400, fontSize: '16px' }}>Selected</span>
                    </div>
                  </div>
                  <div className="icon text-white bg-blue ms-auto">
                    <FaCheckCircle className="dashboard-icon3" />
                  </div>
                </Card.Body>
              </Card>
            </Col>

            <Col xl={6} md={6} className="mb-2">
              <Card className="border h-100">
                <Card.Body className="d-flex align-items-center">
                  <div className="dot me-3 bg-red"></div>
                  <div className="flex-grow-1">
                    <div className="text-gray-500 numbers2">
                      80570 <span className="text-muted ms-2" style={{ fontWeight: 400, fontSize: '16px' }}>Total views</span>
                    </div>
                  </div>
                  <div className="icon text-white bg-red ms-auto">
                    <FaEye className="dashboard-icon4" />
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col md={12}>
              <Card className="card-jobseeker mb-3">
                <Card.Header className="card-header-custom px-4 pt-3" style={{ borderTopLeftRadius: '0.8rem', borderTopRightRadius: '0.8rem' }}>
                  Jobs Status
                </Card.Header>
                <Card.Body className="p-0 pb-3">
                  <Table borderless className="table-responsive" align="center">
                    <tbody>
                      <tr height="130">
                        <td align="center" valign="bottom">
                          <Table borderless>
                            <tbody>
                              <tr><td align="center">1114</td></tr>
                              <tr><td align="center"><img src="img/bar1.gif" height="100" alt="1114" title="1114" width="45" /></td></tr>
                            </tbody>
                          </Table>
                        </td>
                        <td align="center" valign="bottom">
                          <Table borderless>
                            <tbody>
                              <tr><td align="center">875</td></tr>
                              <tr><td align="center"><img src="img/bar2.gif" height="78.5" alt="875" title="875" width="45" /></td></tr>
                            </tbody>
                          </Table>
                        </td>
                        <td align="center" valign="bottom">
                          <Table borderless>
                            <tbody>
                              <tr><td align="center">75</td></tr>
                              <tr><td align="center"><img src="img/bar3.gif" height="6.7" alt="75" title="75" width="45" /></td></tr>
                            </tbody>
                          </Table>
                        </td>
                        <td align="center" valign="bottom">
                          <Table borderless>
                            <tbody>
                              <tr><td align="center">28</td></tr>
                              <tr><td align="center"><img src="img/bar4s.gif" height="2.5" alt="28" title="28" width="45" /></td></tr>
                            </tbody>
                          </Table>
                        </td>
                      </tr>
                      <tr>
                        <td align="center">Jobs</td>
                        <td align="center">Active jobs</td>
                        <td align="center">Total applicants</td>
                        <td align="center">Selected</td>
                      </tr>
                    </tbody>
                  </Table>
                </Card.Body>
              </Card>
            </Col>
          
          </Row>
          </Col>

          <Col md={4} className="mb-3">
          <Card className="card-jobseeker mb-3">
            <Card.Header className="card-header-custom px-3 pt-3 mb-2" style={{ borderTopLeftRadius: '0.8rem', borderTopRightRadius: '0.8rem' }}>
              Job Posting
            </Card.Header>
            <Card.Body>
              <div className="text-muted px-2" style={{ fontSize: '12px' }}>
                From : Wed May 26, 2021&nbsp;&nbsp;&nbsp;To : Wed May 25, 2033
              </div>
              <Table size="sm" className="text-muted">
                <thead>
                  <tr>
                    <th className="px-2" style={{ fontSize: '12px' }}>Total jobs allocated :</th>
                    <th className="px-2" style={{ fontSize: '12px' }}>Unlimited</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th className="px-2" style={{ fontSize: '12px' }}>Total jobs posted :</th>
                    <td className="px-2" style={{ fontSize: '12px' }}>82</td>
                  </tr>
                </tbody>
              </Table>
            </Card.Body>
          </Card>

          <Card className="card-jobseeker mb-3">
            <Card.Header className="card-header-custom px-3 pt-3 mb-2" style={{ borderTopLeftRadius: '0.8rem', borderTopRightRadius: '0.8rem' }}>
              Resume
            </Card.Header>
            <Card.Body>
              <div className="text-muted px-2" style={{ fontSize: '12px' }}>
                From : Wed May 26, 2021&nbsp;&nbsp;&nbsp;To : Wed May 25, 2033
              </div>
              <Table size="sm">
                <thead>
                  <tr>
                    <th className="px-2" style={{ fontSize: '12px' }}>Time allocated for CV's search :</th>
                    <th className="px-2" style={{ fontSize: '12px' }}>Unlimited</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th className="px-2" style={{ fontSize: '12px' }}>Total no. of CV's searched :</th>
                    <td className="px-2" style={{ fontSize: '12px' }}>416</td>
                  </tr>
                </tbody>
              </Table>
            </Card.Body>
          </Card>

          <Card className="card-jobseeker mb-4">
            <Card.Header className="card-header-custom px-3 pt-3 mb-2" style={{ borderTopLeftRadius: '0.8rem', borderTopRightRadius: '0.8rem' }}>
              Subscription Plan
            </Card.Header>
            <Card.Body>
              <span className="text-muted d-block mb-2">
                Rate Card: Post your jobs and access resumes instantly.
              </span>
              <a href="https://ejobsitesoftware.com/jobboard_demo/rates.php" className="text-decoration-none">
                <i className="bi bi-cart"></i> Rate Card
              </a>
            </Card.Body>
          </Card>

          <div className="text-center">
            <Button variant="outline-secondary" className="w-100">
              <i className="bi bi-person-workspace me-2"></i> Start Applicant Tracking
            </Button>
          </div>
        </Col>


        </Row>
       
    
      
       </Container>

    </EmployerLayout> 
      
    )

}


export default EmployerHome;