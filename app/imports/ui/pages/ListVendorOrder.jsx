import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Col, Container, Row, Table } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import LoadingSpinner from '../components/LoadingSpinner';
import { VendorOrder } from '../../api/vendor/VendorOrder';
import VendorOrderItem from '../components/VendorOrderItem';

const ListVendorOrder = () => {
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { ready, vendororders } = useTracker(() => {
    // Note that this subscription will get cleaned up
    // when your component is unmounted or deps change.
    // Get access to Stuff documents.
    const subscription = Meteor.subscribe(VendorOrder.userPublicationName);
    // Determine if the subscription is ready
    const rdy = subscription.ready();
    // Get the Stuff documents
    const vendorItems = VendorOrder.collection.find({}).fetch();
    return {
      vendororders: vendorItems,
      ready: rdy,
    };
  }, []);
  return (ready ? (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col md={7}>
          <Col className="text-center">
            <h2>List Vendor Orders</h2>
          </Col>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Event</th>
                <th>Location</th>
                <th>Containers</th>
                <th>Remove</th>
              </tr>
            </thead>
            <tbody>
              {vendororders.map((vendororder) => <VendorOrderItem key={VendorOrderItem._id} vendororder={vendororder} vendorordercollection={VendorOrder.collection} />)}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner />);
};

export default ListVendorOrder;
