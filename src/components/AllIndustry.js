import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';

const AllIndustry = () => {
  const industries = [
    { name: "Accounting/Finance/Banking", count: 8, url: "https://ejobsitesoftware.com/jobboard_demo/accounting-finance-banking-jobs/" },
    { name: "Administration/HR/Legal", count: 11, url: "https://ejobsitesoftware.com/jobboard_demo/administration-hr-legal-jobs/" },
    { name: "Advertising/Marketing/PR", count: 8, url: "https://ejobsitesoftware.com/jobboard_demo/advertising-marketing-pr-jobs/" },
    { name: "Arts & Design", count: 11, url: "https://ejobsitesoftware.com/jobboard_demo/arts-design-jobs/" },
    { name: "Automotive", count: 3, url: "https://ejobsitesoftware.com/jobboard_demo/automotive-jobs/" },
    { name: "Aviation/Airlines", count: 1, url: "https://ejobsitesoftware.com/jobboard_demo/aviation-airlines-jobs/" },
    { name: "Call Centre/BPO", count: 2, url: "https://ejobsitesoftware.com/jobboard_demo/call-centre-bpo-jobs/" },
    { name: "Construction/Architecture", count: 1, url: "https://ejobsitesoftware.com/jobboard_demo/construction-architecture-jobs/" },
    { name: "Consulting Services", count: 2, url: "https://ejobsitesoftware.com/jobboard_demo/consulting-services-jobs/" },
    { name: "Courier/Distribution/Logistics", count: 1, url: "https://ejobsitesoftware.com/jobboard_demo/courier-distribution-logistics-jobs/" },
    { name: "CustomerSupport/Telemarketing", count: 1, url: "https://ejobsitesoftware.com/jobboard_demo/customersupport-telemarketing-jobs/" },
    { name: "Education/Training", count: 16, url: "https://ejobsitesoftware.com/jobboard_demo/education-training-jobs/" },
    { name: "Engineering/Manufacturing", count: 2, url: "https://ejobsitesoftware.com/jobboard_demo/engineering-manufacturing-jobs/" },
    { name: "Entertainment/Media", count: 4, url: "https://ejobsitesoftware.com/jobboard_demo/entertainment-media-jobs/" },
    { name: "Environmental", count: 1, url: "https://ejobsitesoftware.com/jobboard_demo/environmental-jobs/" },
    { name: "Export/Import", count: 1, url: "https://ejobsitesoftware.com/jobboard_demo/export-import-jobs/" },
    { name: "Fashion/Garments", count: 9, url: "https://ejobsitesoftware.com/jobboard_demo/fashion-garments-jobs/" },
    { name: "Food Industry", count: 1, url: "https://ejobsitesoftware.com/jobboard_demo/food-industry-jobs/" },
    { name: "Government Services", count: 2, url: "https://ejobsitesoftware.com/jobboard_demo/government-services-jobs/" },
    { name: "HealthCare/Pharma", count: 3, url: "https://ejobsitesoftware.com/jobboard_demo/healthcare-pharma-jobs/" },
    { name: "Hospitality/Travel/Tourism", count: 1, url: "https://ejobsitesoftware.com/jobboard_demo/hospitality-travel-tourism-jobs/" },
    { name: "Insurance", count: 1, url: "https://ejobsitesoftware.com/jobboard_demo/insurance-jobs/" },
    { name: "Internet/E-Commerce", count: 2, url: "https://ejobsitesoftware.com/jobboard_demo/internet-e-commerce-jobs/" },
    { name: "IT/Hardware", count: 1, url: "https://ejobsitesoftware.com/jobboard_demo/it-hardware-jobs/" },
    { name: "IT/Software", count: 9, url: "https://ejobsitesoftware.com/jobboard_demo/it-software-jobs/" },
    { name: "Legal/Company Secretarial", count: 1, url: "https://ejobsitesoftware.com/jobboard_demo/legal-company-secretarial-jobs/" },
    { name: "Maintenance/Repair", count: 1, url: "https://ejobsitesoftware.com/jobboard_demo/maintenance-repair-jobs/" },
    { name: "Media/Publishing", count: 2, url: "https://ejobsitesoftware.com/jobboard_demo/media-publishing-jobs/" },
    { name: "Oil/Gas/Power", count: 1, url: "https://ejobsitesoftware.com/jobboard_demo/oil-gas-power-jobs/" },
    { name: "Oil/Gas/Utilities", count: 1, url: "https://ejobsitesoftware.com/jobboard_demo/oil-gas-utilities-jobs/" },
    { name: "Others", count: 2, url: "https://ejobsitesoftware.com/jobboard_demo/others-jobs/" },
    { name: "Production/Operations", count: 2, url: "https://ejobsitesoftware.com/jobboard_demo/production-operations-jobs/" },
    { name: "Purchase/ Supply Chain", count: 1, url: "https://ejobsitesoftware.com/jobboard_demo/purchase-supply-chain-jobs/" },
    { name: "Recruitment/HR", count: 1, url: "https://ejobsitesoftware.com/jobboard_demo/recruitment-hr-jobs/" },
    { name: "Retail/Wholesale", count: 1, url: "https://ejobsitesoftware.com/jobboard_demo/retail-wholesale-jobs/" },
    { name: "Sales/Business Development", count: 1, url: "https://ejobsitesoftware.com/jobboard_demo/sales-business-development-jobs/" },
    { name: "Science/Research/Development", count: 1, url: "https://ejobsitesoftware.com/jobboard_demo/science-research-development-jobs/" },
    { name: "Sports and Recreation", count: 1, url: "https://ejobsitesoftware.com/jobboard_demo/sports-and-recreation-jobs/" },
    { name: "Supply Chain/Logistics", count: 1, url: "https://ejobsitesoftware.com/jobboard_demo/supply-chain-logistics-jobs/" },
    { name: "Telecom/ISP", count: 3, url: "https://ejobsitesoftware.com/jobboard_demo/telecom-isp-jobs/" },
    { name: "Transportation/Warehousing", count: 1, url: "https://ejobsitesoftware.com/jobboard_demo/transportation-warehousing-jobs/" },
    { name: "Travel/ Airlines", count: 5, url: "https://ejobsitesoftware.com/jobboard_demo/travel-airlines-jobs/" }
  ];

  return (
    <div className="container" style={{'marginTop':'70px','marginBottom':'20px'}}>
      <div className="row">
        <div className="col-md-9 mx-auto">
          <Card className="card-custom">
            <Card.Header className="d-flex justify-content-between align-items-center bg-primary text-white p-3">
              <h1 className="m-0" style={{ fontSize: '1.75rem' }}>Search Job By Industry</h1>
            </Card.Header>
            <Card.Body className="card-body-custom px-3">
              <Row className="link-gray">
                {industries.map((industry, index) => (
                  <Col md={6} key={index}>
                    <a 
                      href={industry.url} 
                      title={industry.name} 
                      className="industry-link"
                    >
                      {industry.name}
                    </a>&nbsp;({industry.count})
                  </Col>
                ))}
              </Row>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AllIndustry;
