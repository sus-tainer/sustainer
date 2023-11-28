import React, { useState, useEffect } from 'react';
import qrcode from 'qrcode';
import { Meteor } from 'meteor/meteor';

const QRCodeGenerator = () => {
  const [qrCode, setQRCode] = useState('');

  useEffect(() => {
    const userId = Meteor.userId();

    if (userId) {
      // Generate the QR code based on the user ID
      const userQrText = `${userId}`;

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
      setQRCode('');
    }
  }, []);

  return (
    <div>
      <h1>User QR Code</h1>
      <div id="qrcode" className="d-flex justify-content-center align-items-center">
        {qrCode && <img src={qrCode} alt="QR Code" width="95%" />}
      </div>
    </div>
  );
};

export default QRCodeGenerator;
