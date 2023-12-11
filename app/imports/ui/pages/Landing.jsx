import React from 'react';
import { Col, Button, Container, Row } from 'react-bootstrap';
import Footer from '../components/Footer';

/* A static component to render the landing page. */
const Landing = () => (
  <>
    <div className="landing-part1">
      <Container id="landing-page">
        <Row>
          <Col className="my-5">
            <h2 className="mt-sm-3 text-center">Sustainer</h2>
            <p className="mb-0 text-center">
              {/* eslint-disable-next-line max-len */}
              The Earth friendly way to enjoy ono foods!
            </p>
          </Col>
        </Row>
        <Row className="mb-5 g-0 justify-content-center">
          <Col xs="auto">
            <Button className="rounded-0" variant="outline-light" size="lg" href="/signin">
              Sign In
            </Button>
          </Col>
          <Col xs="auto">
            <Button className="rounded-0" variant="light" size="lg" href="/signup">
              Register
            </Button>
          </Col>
        </Row>
      </Container>
    </div>
    <Footer />
  </>
);

export default Landing;
