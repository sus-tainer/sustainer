import React from 'react';
import { Container, Card, Col, Row, Image } from 'react-bootstrap';

const About = () => (
  <Container className="justify-content-center text-center p-3" id="about-page">
    <h1>About</h1>
    <Row xs={1} sm={2} className="justify-content-center mb-5">
      <Col className="py-1">
        <Card className="mission-card text-start" style={{ width: '100%' }}>
          <Card.Body>
            <Card.Text>
              Single-use takeout containers and food wrappers make up a significant portion—up to one-third—of the debris discovered along Hawai’i&apos;s shorelines. Sustainer is dedicated to tackling this environmental challenge by
              providing a convenient and user-friendly reusable takeout container system. Our aim is to contribute to reducing this prevalent waste and elimi nating debris along Hawai’i&apos;s coastal areas. Join us in making a positive
              impact by adopting our sustainable solution for takeout packaging.
            </Card.Text>
          </Card.Body>
        </Card>
      </Col>
    </Row>
    <Row className="align-content-center">
      <Col>
        <Image src="./images/small-container.png" fluid />
      </Col>
      <Col>
        <Image src="./images/large-container.png" fluid />
      </Col>
      <Col>
        <Image src="./images/medium-container.png" fluid />
      </Col>
    </Row>
    <h1>Our Mission</h1>
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
);

export default About;
