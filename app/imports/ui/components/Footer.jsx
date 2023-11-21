import React from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';

/** The Footer appears at the bottom of every page. Rendered by the App Layout component. */
const Footer = () => (
  <footer>
    <Container className="text-center mission-footer">
      <h1 className="mt-3 pb-lg-3">Our Mission</h1>
      <Row xs={1} sm={2} className="justify-content-center mb-5">
        <Col xs="auto" sm="auto" md="auto" lg="auto">
          <Card className="mission-card" style={{ width: '14em' }}>
            <Card.Body>
              <Card.Title>Reduce</Card.Title>
              <Card.Text>
                Minimize container loss and enhance the successful implementation of the <a href="https://www.fullcycletakeouthawaii.org/" target="/blank">Full Cycle Takeout program</a>.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col xs="auto" sm="auto" md="auto" lg="auto">
          <Card className="mission-card" style={{ width: '14em' }}>
            <Card.Body>
              <Card.Title>Reuse</Card.Title>
              <Card.Text>
                Establish a streamlined system to guarantee the return of all containers, facilitating their reuse and sustainability.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  </footer>
);

export default Footer;
