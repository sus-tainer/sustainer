import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Col, Container, Row, Table } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { VendorOrder } from '../../api/vendor/VendorOrder';
import VendorOrderItem from '../components/VendorOrderItem';
import LoadingSpinner from '../components/LoadingSpinner';

const ListVendorOrder = () => {
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { ready, vendorOrders } = useTracker(() => {
    // Note that this subscription will get cleaned up
    // when your component is unmounted or deps change.
    // Get access to VendorOrder documents.
    const subscription = Meteor.subscribe(VendorOrder.vendorPublicationName);
    // Determine if the subscription is ready
    const rdy = subscription.ready();
    // Get the Stuff documents
    const vendorItems = VendorOrder.collection.find({}).fetch();
    return {
      vendorOrders: vendorItems,
      ready: rdy,
    };
  }, []);
  return (ready ? (
    <Container className="py-3" id="vendor-history-page">
      <Row className="justify-content-center">
        <Col md={7}>
          <Col className="text-center">
            <h2>List Vendor Orders</h2>
          </Col>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Approval Status</th>
                <th>Event</th>
                <th>Location</th>
                <th>Containers</th>
                <th>Size</th>
                <th>Created On</th>
                <th>Scheduled For</th>
                <th>Edit</th>
                <th>Remove</th>
              </tr>
            </thead>
            <tbody>
              {vendorOrders.map((order) => <VendorOrderItem key={order._id} vendorOrder={order} collection={VendorOrder.collection} />)}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner />);
};

export default ListVendorOrder;
