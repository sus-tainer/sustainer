import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';

/* After the user clicks the "SignOut" link in the NavBar, log them out and display this page. */
const SignOut = () => {
  Meteor.logout();

  return (
    <Container className="py-3">
      <Row>
        <Col id="signout-page" className="text-center py-3">
          <h2>You are signed out.</h2>
        </Col>
      </Row>

      <Row className="text-center py-3">
        <Link to="/">
          <Button type="submit" variant="primary">Home</Button>
        </Link>
      </Row>
    </Container>
  );
};

export default SignOut;
