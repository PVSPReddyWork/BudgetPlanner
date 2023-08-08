import React from 'react';

const BarChart = () => {
  // Sample data for the chart
  const data = [
    { label: 'Jan', value: 12 },
    { label: 'Feb', value: 19 },
    { label: 'Mar', value: 3 },
    { label: 'Apr', value: 5 },
    { label: 'May', value: 2 },
    { label: 'Jun', value: 3 },
  ];

  // Function to calculate the maximum value from the data array
  const getMaxValue = () => {
    return Math.max(...data.map((item) => item.value));
  };

  // Function to calculate the Y-axis coordinate for each data point
  const getYCoordinate = (value, maxValue, height) => {
    return height - (value / maxValue) * height;
  };

  // Calculate the maximum value and height of the chart container
  const maxValue = getMaxValue();
  const chartHeight = 200;

  return (
    <div style={{ width: '100%', height: '300px', border: '1px solid #ccc' }}>
      {/* Y-axis labels */}
      <div
        style={{
          position: 'relative',
          height: '100%',
          borderRight: '1px solid #ccc',
        }}
      >
        <div
          style={{
            position: 'absolute',
            bottom: '0',
            right: '5px',
            color: '#666',
          }}
        >
          {maxValue}
        </div>
        <div
          style={{
            position: 'absolute',
            bottom: `${chartHeight / 2}px`,
            right: '5px',
            color: '#666',
          }}
        >
          {maxValue / 2}
        </div>
      </div>

      {/* Chart */}
      <div style={{ position: 'relative', height: chartHeight }}>
        {data.map((item, index) => (
          <div
            key={index}
            style={{
              position: 'absolute',
              bottom: '0',
              left: `${(100 / (data.length - 1)) * index}%`,
              width: `${100 / (data.length - 1)}%`,
              height: `${(item.value / maxValue) * chartHeight}px`,
              backgroundColor: '#007bff',
            }}
          />
        ))}
      </div>

      {/* X-axis labels */}
      <div
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          padding: '0 10px',
          color: '#666',
        }}
      >
        {data.map((item, index) => (
          <div key={index}>{item.label}</div>
        ))}
      </div>
    </div>
  );
};

export default BarChart;
