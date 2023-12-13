import React from 'react';
import { Col, Button, Container, Row } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { Roles } from 'meteor/alanning:roles';
import FooterHome from '../components/FooterHome';
import PieChartStats from '../components/PieChartStats';

/* A simple static component to render some text for the landing page. */
const Home = () => {
  const { currentUser } = useTracker(() => ({
    currentUser: Meteor.user() ? Meteor.user().username : '',
  }), []);

  const userHomePage = () => (
    <div className="landing-part1">
      <Container>
        <Row className="justify-content-center align-items-center">
          <Col xs="auto" className="my-3">
            <Button className="rounded-0" variant="outline-light-landing" size="lg" href="/qrcode">
              Generate QR Code
            </Button>
          </Col>
          <Col xs="auto">
            <Button className="rounded-0" variant="light" size="lg" href="/payment">
              Choose Payment Method
            </Button>
          </Col>
        </Row>
      </Container>
    </div>
  );

  const adminHomePage = () => (
    <div className="landing-admin adminhome-column">
      <div className="adminhome-piechart">
        <h2>Container Retention Rate</h2>
        <PieChartStats />
      </div>
      <div>
        <Container className="justify-content-center">
          <Row className="me-3">
            <Col className="px-0">
              <Button className="rounded-0" variant="outline-light" size="lg" href="/add-container">
                Add Containers
              </Button>
              <Button className="rounded-0" variant="outline-light" size="lg" href="/scan-container">
                Return Containers
              </Button>
            </Col>
            <Col className="px-0">
              <Button className="rounded-0" variant="outline-light" size="lg" href="/admin-list">
                Containers List
              </Button>
              <Button className="rounded-0" variant="outline-light" size="lg" href="/charge-user">
                Charge User
              </Button>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );

  const vendorHomePage = () => (
    <div className="landing-vendor">
      <Container>
        <Row className="justify-content-center align-items-center">
          <Col xs="auto" className="my-3">
            <Button className="rounded-0" variant="outline-light-vendor" size="lg" href="/vendorscan">
              Scan
            </Button>
          </Col>
          <Col xs="auto">
            <Button className="rounded-0" variant="outline-light-vendor" size="lg" href="/vendororder">
              Order Form
            </Button>
          </Col>
        </Row>
        <Row className="justify-content-center align-items-center">
          <Col xs="auto" className="my-3">
            <Button className="rounded-0" variant="outline-light-vendor" size="lg" href="/listvendororder">
              Order History
            </Button>
          </Col>
          <Col xs="auto">
            <Button className="rounded-0" variant="outline-light-vendor" size="lg" href="/listinventory">
              Inventory
            </Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
  return (
    <>
      {Roles.userIsInRole(Meteor.userId(), 'admin') ? adminHomePage() : null}
      {Roles.userIsInRole(Meteor.userId(), 'vendor') ? vendorHomePage() : null}
      {currentUser && !Roles.userIsInRole(Meteor.userId(), ['admin', 'vendor']) ? userHomePage() : null}
      {currentUser && !Roles.userIsInRole(Meteor.userId(), ['admin', 'vendor']) ? <FooterHome /> : null}
    </>
  );
};

export default Home;
