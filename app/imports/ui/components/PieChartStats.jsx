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
    const totContainers = Containers.collection.find().fetch().length;
    const totReturned = Containers.collection.find({ owner: 'trivera2@hawaii.edu' }).fetch().length;
    const totMissing = totContainers - totReturned;

    console.log('Total containers:', totContainers);
    console.log('Total returned:', totReturned);
    console.log('Total missing:', totMissing);

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

    const options = {
      aspectRatio: 3,
    };

    return (
      ready ? (
        <div>
          <Doughnut data={data} options={options} />
        </div>
      ) : <LoadingSpinner />
    );

  } if (!ready) {
    console.log('Subscription not ready yet.');
  }
};

export default PieChartStats;
