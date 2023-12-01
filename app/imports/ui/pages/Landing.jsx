import React from 'react';
import { Col, Button, Container, Row } from 'react-bootstrap';
import Footer from '../components/Footer';

/* A simple static component to render some text for the landing page. */
const Landing = () => (
  <>
    <div className="landing-part1">
      <Container id="landing-page">
        <Row className="">
          <Col className="my-5">
            <h2 className="mt-sm-3 text-center">What is Sustainer?</h2>
            <p className="mb-0 text-center">
              {/* eslint-disable-next-line max-len */}
              Single-use takeout containers and food wrappers make up a significant portion—up to one-third—of the debris discovered along Hawai’i&apos;s shorelines. Sustainer is dedicated to tackling this environmental challenge by
              providing a convenient and user-friendly reusable takeout container system. Our aim is to contribute to reducing this prevalent waste and elimi nating debris along Hawai’i&apos;s coastal areas. Join us in making a positive
              impact by adopting our sustainable solution for takeout packaging.
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
