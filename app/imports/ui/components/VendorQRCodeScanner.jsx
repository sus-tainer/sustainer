import React, { useEffect, useState } from 'react';
import ZXing from '@zxing/library';
import { Button } from 'react-bootstrap';

const VendorQrCodeScanner = () => {
  const [selectedDeviceId, setSelectedDeviceId] = useState(null);

  useEffect(() => {
    const initCodeReader = async () => {
      try {
        const codeReader = new ZXing.BrowserQRCodeReader();
        console.log('ZXing code reader initialized');

        const videoInputDevices = await codeReader.getVideoInputDevices();
        setSelectedDeviceId(videoInputDevices[0]?.deviceId);

        if (videoInputDevices.length >= 1) {
          const sourceSelect = document.getElementById('sourceSelect');
          videoInputDevices.forEach((element) => {
            const sourceOption = document.createElement('option');
            sourceOption.text = element.label;
            sourceOption.value = element.deviceId;
            sourceSelect.appendChild(sourceOption);
          });

          sourceSelect.onchange = () => {
            setSelectedDeviceId(sourceSelect.value);
          };

          const sourceSelectPanel = document.getElementById('sourceSelectPanel');
          sourceSelectPanel.style.display = 'block';
        }

        document.getElementById('startButton').addEventListener('click', () => {
          const decodingStyle = document.getElementById('decoding-style').value;

          if (decodingStyle === 'once') {
            // eslint-disable-next-line no-use-before-define
            decodeOnce(codeReader, selectedDeviceId);
          } else {
            // eslint-disable-next-line no-use-before-define
            decodeContinuously(codeReader, selectedDeviceId);
          }

          console.log(`Started decode from camera with id ${selectedDeviceId}`);
        });

        document.getElementById('resetButton').addEventListener('click', () => {
          codeReader.reset();
          document.getElementById('result').textContent = '';
          console.log('Reset.');
        });
      } catch (error) {
        console.error(error);
      }
    };

    initCodeReader();
  }, [selectedDeviceId]);

  // eslint-disable-next-line no-shadow
  const decodeOnce = (codeReader, selectedDeviceId) => {
    codeReader.decodeFromInputVideoDevice(selectedDeviceId, 'video').then((result) => {
      console.log(result);
      document.getElementById('result').textContent = result.text;
    }).catch((err) => {
      console.error(err);
      document.getElementById('result').textContent = err;
    });
  };

  // eslint-disable-next-line no-shadow
  const decodeContinuously = (codeReader, selectedDeviceId) => {
    codeReader.decodeFromInputVideoDeviceContinuously(selectedDeviceId, 'video', (result, err) => {
      if (result) {
        console.log('Found QR code!', result);
        document.getElementById('result').textContent = result.text;
      }

      if (err) {
        if (err instanceof ZXing.NotFoundException) {
          console.log('No QR code found.');
        }

        if (err instanceof ZXing.ChecksumException) {
          console.log('A code was found, but its read value was not valid.');
        }

        if (err instanceof ZXing.FormatException) {
          console.log('A code was found, but it was in an invalid format.');
        }
      }
    });
  };

  return (
    <div className="wrapper" style={{ paddingTop: '2em' }}>

      <div>
        <Button className="button" id="startButton">Start</Button>
        <Button className="button" id="resetButton">Reset</Button>
      </div>

      <div>
        {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
        <video id="video" width="300" height="200" style={{ border: '1px solid gray' }} />
      </div>

      <div id="sourceSelectPanel" style={{ display: 'none' }}>
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label htmlFor="sourceSelect">Change video source:</label>
        {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
        <select id="sourceSelect" style={{ maxWidth: '400px' }} />
      </div>

      <div style={{ display: 'table' }}>
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label htmlFor="decoding-style"> Decoding Style:</label>
        <select id="decoding-style" size="1">
          <option value="once">Decode once</option>
          <option value="continuously">Decode continuously</option>
        </select>
      </div>

      <h3>Result:</h3>
      <pre><code id="result" /></pre>
    </div>
  );
};

export default VendorQrCodeScanner;
