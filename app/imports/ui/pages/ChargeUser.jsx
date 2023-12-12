import React, { useState } from 'react';
import { Col, Container, Row, Table, Button } from 'react-bootstrap';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { Containers } from '../../api/container/Containers';
import LoadingSpinner from '../components/LoadingSpinner';

const UsersList = () => {
  const [chargedContainersList, setChargedContainersList] = useState([]);

  const { unreturnedContainers, ready } = useTracker(() => {
    const subscription = Meteor.subscribe(Containers.adminPublicationName);
    const rdy = subscription.ready();
    const containers = Containers.collection.find({ owner: { $ne: 'ZWO' } }).fetch();
    return {
      unreturnedContainers: containers,
      ready: rdy,
    };
  }, []);

  if (!ready) {
    return <LoadingSpinner />;
  }

  const chargeContainer = (containerId, owner, size) => {
    // Show sweetalert notification
    swal('Success', `Container charged successfully for owner: ${owner}`, 'success');

    // Move container to chargedContainersList
    setChargedContainersList((prevChargedContainersList) => [
      ...prevChargedContainersList,
      { _id: containerId, owner, size },
    ]);

    // Implement logic to update the container status in the database
  };

  const removeChargedContainer = (containerId) => {
    // Remove container from chargedContainersList
    setChargedContainersList((prevChargedContainersList) => prevChargedContainersList.filter((container) => container._id !== containerId));

    // Implement logic to update the container status in the database
    // (e.g., call a Meteor method to update the container status)
  };

  return (
    <Container className="py-3" id="charge-user">
      <Row className="justify-content-center">
        <Col md={7}>
          <Col className="text-center"><h2>Unreturned Containers</h2></Col>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>ID #</th>
                <th>Size</th>
                <th>Owner</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {unreturnedContainers.map((container) => (
                <tr key={container._id}>
                  <td>{container._id}</td>
                  <td>{container.size}</td>
                  <td>{container.owner}</td>
                  <td>
                    <Button
                      variant="primary"
                      onClick={() => chargeContainer(container._id, container.owner, container.size)}
                    >
                      Charge
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>

      {/* Charged Containers Table */}
      <Row className="justify-content-center mt-4">
        <Col md={7}>
          <Col className="text-center"><h2>Charged Containers</h2></Col>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>ID #</th>
                <th>Size</th>
                <th>Owner</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {chargedContainersList.map((chargedContainer) => (
                <tr key={chargedContainer._id}>
                  <td>{chargedContainer._id}</td>
                  <td>{chargedContainer.size}</td>
                  <td>{chargedContainer.owner}</td>
                  <td>
                    <Button
                      variant="danger"
                      onClick={() => removeChargedContainer(chargedContainer._id)}
                    >
                      Remove
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};

export default UsersList;
