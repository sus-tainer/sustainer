import React from 'react';
import { Col, Button, Container, Row } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { Roles } from 'meteor/alanning:roles';
import FooterHome from '../components/FooterHome';

/* A simple static component to render some text for the landing page. */
const Home = () => {
  const { currentUser } = useTracker(() => ({
    currentUser: Meteor.user() ? Meteor.user().username : '',
  }), []);
  return (
    <div title={currentUser}>
      <div className="landing-part1">
        <Container className="">
          {Roles.userIsInRole(Meteor.userId(), 'user') ? ([
            <Row className="justify-content-center align-items-center">
              <Col xs="auto" className="my-3">
                <Button className="rounded-0" variant="outline-light" size="lg" href="/qrcode">
                  Generate QR Code
                </Button>
              </Col>
              <Col xs="auto">
                <Button className="rounded-0" variant="light" size="lg" href="/payment">
                  Choose Payment Method
                </Button>
              </Col>
            </Row>,
          ]) : ''}
          {Roles.userIsInRole(Meteor.userId(), 'admin') ? ([
            <Row className="justify-content-center align-items-center">
              <Col xs="auto" className="my-3">
                <Button className="rounded-0" variant="outline-light" size="lg" href="/admin-list">
                  Containers List
                </Button>
              </Col>
              <Col xs="auto">
                <Button className="rounded-0" variant="light" size="lg" href="/scan">
                  Scan Containers
                </Button>
              </Col>
            </Row>,
          ]) : ''}
          {Roles.userIsInRole(Meteor.userId(), 'vendor') ? ([
            <Row className="justify-content-center align-items-center">
              <Col xs="auto" className="my-3">
                <Button className="rounded-0" variant="outline-light" size="lg" href="/listvendororder">
                  Vendor Order List
                </Button>
              </Col>
              <Col xs="auto">
                <Button className="rounded-0" variant="light" size="lg" href="/vendororder">
                  Vendor Order Form
                </Button>
              </Col>
            </Row>,
          ]) : ''}
        </Container>
      </div>
      <FooterHome />
    </div>
  );
};

export default Home;
