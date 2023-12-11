import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Col, Container, Row, Table } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import LoadingSpinner from '../components/LoadingSpinner';
import AdminVendorOrderItem from '../components/AdminVendorOrderItem';
import { ApproveOrders } from '../../api/vendor/ApproveVendorOrder';

const ApproveVendorOrder = () => {
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { ready, vendorOrders } = useTracker(() => {
    // Note that this subscription will get cleaned up
    // when your component is unmounted or deps change.
    // Get access to VendorOrder documents.
    const subscription = Meteor.subscribe(ApproveOrders.adminPublicationName);
    // Determine if the subscription is ready
    const rdy = subscription.ready();
    // Get the Stuff documents
    const vendorItems = ApproveOrders.collection.find({}).fetch();
    return {
      vendorOrders: vendorItems,
      ready: rdy,
    };
  }, []);
  return (ready ? (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col md={7}>
          <Col className="text-center">
            <h2>Approve Vendor Orders</h2>
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
                <th>Size</th>
                <th>Submitted On</th>
                <th>Approval</th>
              </tr>
            </thead>
            <tbody>
              {vendorOrders.map((order) => <AdminVendorOrderItem key={order._id} vendorOrder={order} collection={ApproveOrders.collection} />)}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner />);
};

export default ApproveVendorOrder;
