import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link, Navigate } from 'react-router-dom';
import { Accounts } from 'meteor/accounts-base';
import { Alert, Card, Col, Container, Row } from 'react-bootstrap';
import SimpleSchema from 'simpl-schema';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { AutoForm, ErrorsField, SubmitField, TextField } from 'uniforms-bootstrap5';

const SignUp = ({ location }) => {
  const [error, setError] = useState('');
  const [redirectToReferer, setRedirectToRef] = useState(false);

  const schema = new SimpleSchema({
    firstName: String,
    lastName: String,
    email: String,
    password: {
      type: String,
    },
  });
  const bridge = new SimpleSchema2Bridge(schema);

  const submit = (doc) => {
    const { email, password } = doc;
    Accounts.createUser({ email, username: email, password }, (err) => {
      if (err) {
        setError(err.reason);
      } else {
        setError('');
        setRedirectToRef(true);
      }
    });
  };

  const { from } = location?.state || { from: { pathname: '/add' } };
  if (redirectToReferer) {
    // eslint-disable-next-line react/jsx-filename-extension
    <Navigate to={from} />;
  }

  return (
    <Container id="signup-page" className="py-3">
      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={6}>
          <Col className="text-center">
            <h2>Register your account</h2>
          </Col>
          <AutoForm schema={bridge} onSubmit={(data) => submit(data)}>
            <Card>
              <Card.Body>
                <TextField name="firstName" placeholder="First Name" inputClassName="form-control form-control-lg mb-3" />
                <TextField name="lastName" placeholder="Last Name" inputClassName="form-control form-control-lg mb-3" />
                <TextField name="email" placeholder="E-mail address" inputClassName="form-control form-control-lg mb-3" />
                <TextField name="password" placeholder="Password" type="password" inputClassName="form-control form-control-lg mb-3" />
                <ErrorsField />
                <SubmitField />
              </Card.Body>
            </Card>
          </AutoForm>
          <Alert variant="light">
            Already have an account? Login <Link to="/signin">here</Link>
          </Alert>
          {error === '' ? (
            ''
          ) : (
            <Alert variant="danger">
              <Alert.Heading>Registration was not successful</Alert.Heading>
              {error}
            </Alert>
          )}
        </Col>
      </Row>
    </Container>
  );
};

SignUp.propTypes = {
  location: PropTypes.shape({
    state: PropTypes.string,
  }),
};

SignUp.defaultProps = {
  location: { state: '' },
};

export default SignUp;
