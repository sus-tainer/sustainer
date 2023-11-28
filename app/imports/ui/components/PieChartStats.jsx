// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
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
import LoadingSpinner from './LoadingSpinner';

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChartStats = () => {

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

  if (ready && containers) {
    // Sets values for the pie chart
    const totContainers = Containers.collection.find().fetch().length;
    const totReturned = Containers.collection.find({ owner: 'ZWO' }).fetch().length;
    const totMissing = totContainers - totReturned;
    const totReturnedPercent = (totReturned / totContainers) * 100;

    // Prints values to console for debugging
    console.log('Total containers:', totContainers);
    console.log('Total returned:', totReturned);
    console.log('Total missing:', totMissing);

    let pieImg = null;

    if (totReturnedPercent >= 95) {
      console.log('Container retention rate is above 95%');
      pieImg = './images/pie-chart-img/green-warning.png';
    } else if (totReturnedPercent >= 85) {
      console.log('Container retention rate is above 85%');
      pieImg = './images/pie-chart-img/blue-warning.png';
    } else if (totReturnedPercent >= 75) {
      console.log('Container retention rate is above 75%');
      pieImg = './images/pie-chart-img/yellow-warning.png';
    } else if (totReturnedPercent < 75) {
      console.log('Container retention rate is below 75%');
      pieImg = './images/pie-chart-img/red-warning.png';
    }

    // Sets data for the pie chart
    const data = {
      labels: [
        'Returned',
        'Missing',
      ],
      datasets: [{
        label: 'Container Retention Rate',
        data: [totReturned, totMissing],
        backgroundColor: [
          'rgb(0, 219, 0)',
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
    console.log('Subscription not ready yet.');
    return (
      <LoadingSpinner />
    );
  }
  return null;
};

export default PieChartStats;
