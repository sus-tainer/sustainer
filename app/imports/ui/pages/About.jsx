import React from 'react';
import { Container, Card, Col, Row } from 'react-bootstrap';

const About = () => (
  <Container className="justify-content-center text-center p-3">
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
  </Container>
);

export default About;
