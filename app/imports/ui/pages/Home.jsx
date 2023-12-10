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
      {/* <------------------ User Homepage --------------------> */}
      {Roles.userIsInRole(Meteor.userId(), 'user') ? ([
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
        </div>,
      ]) : ''}
      {/* <------------------ End of User Homepage --------------------> */}
      {/* <------------------ Admin Homepage --------------------> */}
      {Roles.userIsInRole(Meteor.userId(), 'admin') ? ([
        <div className="landing-not-user">
          <Container className="justify-content-center">
            <Row className="">
              <Col className="px-0">
                <Button className="rounded-4 " variant="outline-light" size="lg" href="/add-container">
                  Add Containers
                </Button>
              </Col>
              <Col className="px-0">
                <Button className="rounded-4" variant="outline-light" size="lg" href="/scan-container">
                  Return Containers
                </Button>
              </Col>
              <Col className="px-0">
                <Button className="rounded-4" variant="outline-light" size="lg" href="/admin-list">
                  Containers List
                </Button>
              </Col>
              <Col className="px-0">
                <Button className="rounded-4" variant="outline-light" size="lg" href="/charge-user">
                  Charge User
                </Button>
              </Col>
            </Row>
          </Container>
        </div>,
      ]) : ''}
      {/* <------------------ End of Admin Homepage --------------------> */}
      {/* <------------------ Vendor Homepage --------------------> */}
      {Roles.userIsInRole(Meteor.userId(), 'vendor') ? ([
        <div className="landing-not-user">
          <Container>
            <Row className="justify-content-center align-items-center">
              <Col xs="auto" className="my-3">
                <Button className="rounded-0" variant="outline-light-landing" size="lg" href="/listvendororder">
                  Vendor Order List
                </Button>
              </Col>
              <Col xs="auto">
                <Button className="rounded-0" variant="light" size="lg" href="/vendororder">
                  Vendor Order Form
                </Button>
              </Col>
            </Row>
          </Container>
        </div>,
      ]) : ''}
      {Roles.userIsInRole(Meteor.userId(), 'user') ? ([
        <FooterHome />,
      ]) : ''}
    </div>
  );
};

export default Home;
