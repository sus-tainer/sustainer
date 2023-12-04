import React, { useState } from 'react';
import { Container, Button } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import { Containers } from '../../api/container/Containers';
import QRCodeScanner from '../components/QRCodeScanner';
import LoadingSpinner from '../components/LoadingSpinner';

const AdminContainerScan = () => {
  const { containers, ready } = useTracker(() => {
    const subscription = Meteor.subscribe(Containers.adminPublicationName);
    const rdy = subscription.ready();
    const items = Containers.collection.find({}).fetch();
    return {
      containers: items,
      ready: rdy,
    };
  }, []);

  const [result, setResult] = useState('');

  const handleResultChange = (newResult) => {
    setResult(newResult);
  };

  const submit = () => {
    Containers.collection.update(
      { _id: result },
      { $set: { owner: 'ZWO' } },
      (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          swal('Success', 'Container owner updated to "ZWO"', 'success');
        }
      },
    );
  };

  return ready ? (
    <Container className="text-center p-2">
      <h1>Return Containers</h1>
      {containers.map((container) => (
        <div key={container._id}>
          {/* Render container information as needed */}
        </div>
      ))}
      <QRCodeScanner onResultChange={handleResultChange} />
      <h3>Container Id: </h3>
      <div id="result">
        {result}
      </div>
      <div className="d-flex justify-content-center align-items-center">
        <Button value={result} onClick={submit}>Scan</Button>
      </div>
    </Container>
  ) : <LoadingSpinner />;
};

export default AdminContainerScan;
