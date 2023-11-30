import React, { useState, useEffect } from 'react';
import qrcode from 'qrcode';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { Containers } from '../../api/container/Containers';
import LoadingSpinner from './LoadingSpinner';

const ContainerQRCodeGenerator = () => {
  const [qrCode, setQRCode] = useState('');
  // useTracker connects Meteor data to React components.
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
        { owner: 'ZWO' },
        { sort: { createdAt: 1 } },
      ).fetch();

      const latestContainer = latestContainerArray[latestContainerArray.length - 1];

      if (latestContainer) {
        const latestContainerId = latestContainer._id;
        console.log('Latest container ID:', latestContainerId);

        const userQrText = latestContainerId;

        qrcode.toDataURL(userQrText, (err, dataUrl) => {
          if (err) {
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
  }, [containers, ready]);

  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`<img src="${qrCode}" alt="QR Code" width="150px">`);
    printWindow.document.close();
    printWindow.print();
  };

  return (
    ready ? (
      <div>
        <h2>Container QR Code</h2>
        <div id="qrcode" className="d-flex justify-content-center align-items-center">
          {qrCode && <img src={qrCode} alt="QR Code" width="75%" />}
        </div>
        <button type="button" className="btn btn-primary mt-3" onClick={handlePrint}>
          Print QR Code
        </button>
      </div>
    ) : <LoadingSpinner />
  );
};

export default ContainerQRCodeGenerator;
