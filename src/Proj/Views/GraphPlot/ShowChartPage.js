import React from 'react';
import LineChart from './../../JavaScript/Modules/GraphMaker/LineChart.js';
import BarChart from './../../JavaScript/Modules/GraphMaker/BarChart.js';

const showChart_page = () => {
  const xData = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
  const yData = [12, 19, 3, 5, 2, 3];
  return (
    <div>
      <h1>My Line Chart App</h1>
      <LineChart xData={xData} yData={yData} />

      <BarChart xData={xData} yData={yData} />
    </div>
  );
};

const ShowChartPage = showChart_page;
export default ShowChartPage;
