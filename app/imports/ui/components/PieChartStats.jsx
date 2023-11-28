import React from 'react';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const data = {
  labels: [
    '95%',
  ],
  datasets: [{
    label: 'My First Dataset',
    data: [95, 5],
    backgroundColor: [
      'rgb(0, 219, 0)',
      'rgb(256, 256, 256)',
    ],
    hoverOffset: 4,
  }],
};

const options = {
  aspectRatio: 3,
};

/** Renders a doughnut pie chart with data. */
const PieChartStats = () => (
  <Doughnut data={data} options={options} />
);

export default PieChartStats;
