import React from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { Col, Container, Row, Table } from 'react-bootstrap';
import { Containers } from '../../api/container/Containers';
import LoadingSpinner from '../components/LoadingSpinner';
import ContainerAdmin from '../components/ContainerAdmin';
import PieChartStats from '../components/PieChartStats';

/* Renders a table containing all the Container documents. Use <ContainerAdmin> to render each row. */
const ListContainersAdmin = () => {
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { containers, ready } = useTracker(() => {
    // Get access to Container documents.
    const subscription = Meteor.subscribe(Containers.adminPublicationName);
    // Determine if the subscription is ready
    const rdy = subscription.ready();
    // Get the Container documents
    const items = Containers.collection.find({}).fetch();
    return {
      containers: items,
      ready: rdy,
    };
  }, []);
  return (ready ? (
    <Container className="py-3" id="list-containers-admin-page">
      <Row className="justify-content-center">
        <Container className="py-3 text-center">
          <h2>Container Retention Rate</h2>
          <PieChartStats />
        </Container>
      </Row>
      <Row className="justify-content-center">
        <Col md={7}>
          <Col className="text-center"><h2>List Containers (Admin)</h2></Col>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>ID #</th>
                <th>Size</th>
                <th>Owner</th>
              </tr>
            </thead>
            <tbody>
              {containers.map((container) => <ContainerAdmin key={container._id} container={container} />)}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner />);
};

export default ListContainersAdmin;
