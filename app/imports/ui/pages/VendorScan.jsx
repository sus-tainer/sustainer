import React, { useState, useEffect } from 'react';
import { Button, Container } from 'react-bootstrap';
import swal from 'sweetalert';
import { useTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import QRCodeScanner from '../components/QRCodeScanner';
import LoadingSpinner from '../components/LoadingSpinner';
import { Containers } from '../../api/container/Containers';

const VendorScan = () => {
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
  const [formStep, setFormStep] = useState(0);
  const [userId, setUserId] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const handleResultChange = (newResult) => {
    setResult(newResult);
  };

  const next = () => {
    if (result === '') {
      swal('Error', 'Please scan a user', 'error');
    } else {
      setUserId(result);
      setFormStep(1);
      swal('Success', `User "${result}" scanned`, 'success').then(() => {
        setResult('');
      });
    }
  };

  const submit = () => {
    setSubmitting(true);
    if (result === '') {
      swal('Error', 'Container ID is empty', 'error');
      setSubmitting(false);
      setResult('');
      return;
    }

    Containers.collection.update(
      { _id: result },
      { $set: { owner: userId } },
      (error) => {
        setSubmitting(false);
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          swal('Success', `Container owner updated to "${userId}"`, 'success');
          setResult('');
        }
      },
    );
  };

  const handleNewUser = () => {
    setFormStep(0);
    setResult('');
  };

  useEffect(() => {
    if (userId !== null && formStep === 1 && submitting) {
      submit();
    }
  }, [userId, formStep, submitting]);

  return ready ? (
    <Container className="text-center p-2">
      {formStep === 0 && (
        <>
          <h1>Scan User</h1>
          {containers.map((container) => (
            <div key={container._id}>
              {/* Render container information as needed */}
            </div>
          ))}
          <QRCodeScanner onResultChange={handleResultChange} />
          <h3>User Email: </h3>
          <div id="result">{result}</div>
          <div className="d-flex justify-content-center align-items-center">
            <Button value={result} onClick={next}>
              Scan
            </Button>
          </div>
        </>
      )}

      {formStep === 1 && (
        <>
          <h1>Scan Container</h1>
          {containers.map((container) => (
            <div key={container._id}>
              {/* Render container information as needed */}
            </div>
          ))}
          <QRCodeScanner onResultChange={handleResultChange} />
          <h3>Container Id: </h3>
          <div id="result">{result}</div>
          <div className="d-flex justify-content-center align-items-center">
            <Button value={result} onClick={submit}>
              Scan
            </Button>
          </div>
          <div className="d-flex justify-content-center align-items-center py-3">
            <Button value={result} onClick={handleNewUser}>
              New Customer
            </Button>
          </div>
        </>
      )}
    </Container>
  ) : (
    <LoadingSpinner />
  );
};

export default VendorScan;
