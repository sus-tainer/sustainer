import React, { useState, useEffect } from 'react';
import qrcode from 'qrcode';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data'; // Import the useTracker hook
import { Containers } from '../../api/container/Containers';
import LoadingSpinner from './LoadingSpinner';

const ContainerQRCodeGenerator = () => {
  const [qrCode, setQRCode] = useState('');

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

  useEffect(() => {
    if (ready && containers) {

      const latestContainerArray = Containers.collection.find(
        { owner: Meteor.userId() },
        { sort: { createdAt: 1 } },
      ).fetch();

      // Retrieve the last element in the array
      const latestContainer = latestContainerArray[latestContainerArray.length - 1];

      if (latestContainer) {
        const latestContainerId = latestContainer._id;
        console.log('Latest container ID:', latestContainerId);

        // Generate the QR code based on the user ID
        const userQrText = latestContainerId;

        // Use the toDataURL method from the qrcode library
        qrcode.toDataURL(userQrText, (err, dataUrl) => {
          if (err) {
            // eslint-disable-next-line no-console
            console.error(err);
            return;
          }
          setQRCode(dataUrl);
        });
      } else {
        console.log('No containers found for the current user.');
      }
    } else if (!ready) {
      console.log('Subscription not ready yet.');
    }
  }, [containers, ready]); // Include containers in the dependency array

  return (ready ? (
    <div>
      <h1>Container QR Code</h1>
      <div id="qrcode" className="d-flex justify-content-center align-items-center">
        {qrCode && <img src={qrCode} alt="QR Code" width="95%" />}
      </div>
    </div>
  ) : <LoadingSpinner />);
};

export default ContainerQRCodeGenerator;
