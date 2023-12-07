import { useTracker } from 'meteor/react-meteor-data';
import React from 'react';
import { Container, Table, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { Containers } from '../../api/container/Containers';
import LoadingSpinner from '../components/LoadingSpinner';

const ListVendorInventory = () => {
  // useTracker connects Meteor data to React components.
  const { containers, ready } = useTracker(() => {
    // Get access to Container documents.
    const subscription = Meteor.subscribe(Containers.userPublicationName);
    // Determine if the subscription is ready
    const rdy = subscription.ready();
    // Get the Container documents
    const items = Containers.collection.find({}).fetch();
    return {
      containers: items,
      ready: rdy,
    };
  }, []);

  if (ready) {
    // Get the total number of containers owned by vendors
    const totLargeContainer = Containers.collection.find({ size: 'large' }).count();
    const totMediumContainer = Containers.collection.find({ size: 'medium' }).count();
    const totSmallContainer = Containers.collection.find({ size: 'small' }).count();

    console.log('Total large containers:', totLargeContainer);
    console.log('Total medium containers:', totMediumContainer);
    console.log('Total small containers:', totSmallContainer);

    const totcontainers = containers;
    console.log('Total containers:', totcontainers);

    return (
      ready ? (
        <Container className="text-center p-3">
          <h1>Container Inventory</h1>
          <Row className="justify-content-center py-3">
            <Col className="col-lg-6">
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Small</th>
                    <th>Medium</th>
                    <th>Large</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{totSmallContainer}</td>
                    <td>{totMediumContainer}</td>
                    <td>{totLargeContainer}</td>
                  </tr>
                </tbody>
              </Table>
            </Col>
          </Row>
          <Row className="text-center py-3">
            <Link to="/vendororder">
              <Button type="submit" variant="primary">Order More</Button>
            </Link>
          </Row>
        </Container>
      ) : <LoadingSpinner />
    );
  }
  return <LoadingSpinner />;
};

export default ListVendorInventory;
