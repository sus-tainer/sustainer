import React from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

/** Render a Not Found page if the user enters a URL that doesn't match any route. */
const NotFound = () => (
  <Container className="py-3">
    <Row className="justify-content-center">
      <Col xs={4} className="text-center">
        <h2>
          <p>Page not found</p>
        </h2>
      </Col>
    </Row>
    <Row className="text-center py-3">
      <Link to="/">
        <Button type="submit" variant="primary">Home</Button>
      </Link>
    </Row>
  </Container>
);

export default NotFound;
