import React, { useState, useEffect } from 'react';
import qrcode from 'qrcode';
import { Meteor } from 'meteor/meteor';

const QRCodeGenerator = () => {
  const [qrCode, setQRCode] = useState('');

  useEffect(() => {
    const userId = Meteor.user();

    if (userId) {
      // Extract the user's email from the Meteor user object
      const userQrText = userId.emails[0].address;

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
    <div id="generate-qr">
      <h1>User QR Code</h1>
      <div id="qrcode" className="d-flex justify-content-center align-items-center">
        {qrCode && <img src={qrCode} alt="QR Code" width="95%" />}
      </div>
    </div>
  );
};

export default QRCodeGenerator;
