import React from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';

/** The Footer appears at the bottom of every page. Rendered by the App Layout component. */
const FooterHome = () => {
  const { currentUser } = useTracker(() => ({
    currentUser: Meteor.user() ? Meteor.user().username : '',
  }), []);
  return (
    <footer title={currentUser}>
      <Container className="mission-footer text-center">
        <h1 className="mt-3 pb-lg-3">FAQ</h1>
        <Row xs={1} sm={2} className="justify-content-center mb-5">
          {Roles.userIsInRole(Meteor.userId(), 'user') ? ([
            <Col xs="auto" sm="auto" md="auto" lg="auto">
              <Card className="mission-card" style={{ width: '14em' }}>
                <Card.Body>
                  <Card.Title>How do I begin ordering?</Card.Title>
                  <Card.Text>
                    Click on &quot;Generate QR Code&quot; and have your QR code scanned to begin ordering.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>,
            <Col xs="auto" sm="auto" md="auto" lg="auto">
              <Card className="mission-card rounded-0" style={{ width: '14em' }}>
                <Card.Body>
                  <Card.Title>How do I pay?</Card.Title>
                  <Card.Text>
                    First, click on &quot;Choose Payment Method&quot; to select a payment method, and then provide the necessary details to complete your payment.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>,
          ]) : ''}
          {Roles.userIsInRole(Meteor.userId(), 'vendor') ? ([
            <Col xs="auto" sm="auto" md="auto" lg="auto">
              <Card className="mission-card" style={{ width: '14em' }}>
                <Card.Body>
                  <Card.Title>How do I ?</Card.Title>
                  <Card.Text>
                    Click on &quot;List Containers&quot; to see a list of containers.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>,
            <Col xs="auto" sm="auto" md="auto" lg="auto">
              <Card className="mission-card rounded-0" style={{ width: '14em' }}>
                <Card.Body>
                  <Card.Title>How do I pay?</Card.Title>
                  <Card.Text>
                    First, click on &quot;Choose Payment Method&quot; to select a payment method, and then provide the necessary details to complete your payment.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>,
          ]) : ''}
          {Roles.userIsInRole(Meteor.userId(), 'admin') ? ([
            <Col xs="auto" sm="auto" md="auto" lg="auto">
              <Card className="mission-card" style={{ width: '14em' }}>
                <Card.Body>
                  <Card.Title>How do I check the retention of containers?</Card.Title>
                  <Card.Text>
                    Click on &quot;Containers List&quot; to see a list of all of the containers and its respective owners.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>,
            <Col xs="auto" sm="auto" md="auto" lg="auto">
              <Card className="mission-card rounded-0" style={{ width: '14em' }}>
                <Card.Body>
                  <Card.Title>How do I &quot;check&quot; a container back in to Zero Waste Oahu?</Card.Title>
                  <Card.Text>
                    Click on &quot;Scan Containers&quot; to scan a container then click on the &quot;Start&quot; button back to allow access to your camera. Once granted permssion, you can know scan the QR code to check the container back in.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>,
          ]) : ''}
        </Row>
      </Container>
    </footer>
  // <footer >
  //   <div className="landing-part1">
  //     <Container className="">
  //       {Roles.userIsInRole(Meteor.userId(), 'user') ? ([
  //         <Row className="justify-content-center align-items-center">
  //           <Col xs="auto" className="my-3">
  //             <Button className="rounded-0" variant="outline-light" size="lg" href="/qrcode">
  //               Generate QR Code
  //             </Button>
  //           </Col>
  //           <Col xs="auto">
  //             <Button className="rounded-0" variant="light" size="lg" href="/payment">
  //               Choose Payment Method
  //             </Button>
  //           </Col>
  //         </Row>,
  //       ]) : ''}
  //       {Roles.userIsInRole(Meteor.userId(), 'admin') ? ([
  //         <Row className="justify-content-center align-items-center">
  //           <Col xs="auto" className="my-3">
  //             <Button className="rounded-0" variant="outline-light" size="lg" href="/admin-list">
  //               Containers List
  //             </Button>
  //           </Col>
  //           <Col xs="auto">
  //             <Button className="rounded-0" variant="light" size="lg" href="/scan-container">
  //               Scan Containers
  //               </Button>
  //             </Col>
  //           </Row>,
  //         ]) : ''}
  //         {Roles.userIsInRole(Meteor.userId(), 'vendor') ? ([
  //           <Row className="justify-content-center align-items-center">
  //             <Col xs="auto" className="my-3">
  //               <Button className="rounded-0" variant="outline-light" size="lg" href="/listvendororder">
  //                 Vendor Order List
  //               </Button>
  //             </Col>
  //             <Col xs="auto">
  //               <Button className="rounded-0" variant="light" size="lg" href="/vendororder">
  //                 Vendor Order Form
  //               </Button>
  //             </Col>
  //           </Row>,
  //         ]) : ''}
  //       </Container>
  //     </div>
  //     <FooterHome />
  //   </footer>
  );
};

export default FooterHome;
