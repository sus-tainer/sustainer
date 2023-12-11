import React from 'react';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { useTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Containers } from '../../api/container/Containers';
import { Vendors } from '../../api/vendor/Vendors';
import LoadingSpinner from './LoadingSpinner';

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChartStats = () => {

  // useTracker connects Meteor data to React components.
  const { containers, ready, vendors } = useTracker(() => {
  // Get access to Container documents.
    const subscription = Meteor.subscribe(Containers.adminPublicationName);
    const subscription2 = Meteor.subscribe(Vendors.adminPublicationName);
    // Determine if the subscription is ready
    const rdy = subscription.ready();
    const rdy2 = subscription2.ready();
    // Get the Container documents
    const items = Containers.collection.find({}).fetch();
    const items2 = Vendors.collection.find({}).fetch();
    return {
      containers: items,
      vendors: items2,
      ready: rdy && rdy2,
    };
  }, []);

  if (ready && containers) {
    // Sets values for the pie chart
    const totContainers = Containers.collection.find().fetch().length;
    const totReturned = Containers.collection.find({ owner: 'ZWO' }).fetch().length;
    // Extract vendor email addresses
    const vendorEmails = vendors.map(vendor => vendor.email);
    // Find containers owned by vendors based on email
    const vendorContainers = Containers.collection.find({ owner: { $in: vendorEmails } }).fetch();
    // Get the total number of containers owned by vendors
    const totVendorContainers = vendorContainers.length;
    const totMissing = totContainers - (totReturned + totVendorContainers);
    const totReturnedPercent = ((totReturned + totVendorContainers) / totContainers) * 100;

    let pieImg = null;

    if (totReturnedPercent >= 95) {
      pieImg = './images/pie-chart-img/green-warning.png';

    } else if (totReturnedPercent >= 85) {
      pieImg = './images/pie-chart-img/blue-warning.png';

    } else if (totReturnedPercent >= 75) {
      pieImg = './images/pie-chart-img/yellow-warning.png';

    } else if (totReturnedPercent < 75) {
      pieImg = './images/pie-chart-img/red-warning.png';
    }

    // Sets data for the pie chart
    const data = {
      labels: [
        'Returned',
        'Vendors',
        'Missing',
      ],
      datasets: [{
        label: 'Container Retention Rate',
        data: [totReturned, totVendorContainers, totMissing],
        backgroundColor: [
          'rgb(0, 219, 0)',
          'rgb(255, 255, 0)',
          'rgb(256, 0, 0)',
        ],
        hoverOffset: 4,
      }],
    };

    // Options for the pie chart
    const options = {
      aspectRatio: 3,
    };

    // Returns the pie chart with the overlaying image
    return (
      ready ? (
        <div style={{ position: 'relative', textAlign: 'center', minWidth: '200px' }}>
          <h3>{totReturnedPercent.toFixed(2)}%</h3>
          <Doughnut data={data} options={options} style={{ minWidth: '100px' }} />
          {pieImg && <img src={pieImg} alt="Pie Chart" width="15%" style={{ position: 'absolute', top: '57%', left: '50%', transform: 'translate(-50%, -50%)', minWidth: '100px' }} />}
        </div>
      ) : <LoadingSpinner />
    );

  } if (!ready) {
    return (
      <LoadingSpinner />
    );
  }
  return null;
};

export default PieChartStats;
