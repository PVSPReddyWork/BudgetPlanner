import React, { useEffect, useRef } from 'react';

const LineChart = ({ xData, yData }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const chartHeight = 200;
    const chartWidth = canvas.width;
    const maxValue = Math.max(...yData);
    const dataPoints = yData.length;
    const stepX = chartWidth / (dataPoints - 1);
    const stepY = chartHeight / maxValue;

    ctx.clearRect(0, 0, chartWidth, chartHeight);
    ctx.beginPath();
    ctx.strokeStyle = '#007bff';
    ctx.moveTo(0, chartHeight - yData[0] * stepY);

    yData.forEach((value, index) => {
      ctx.lineTo(index * stepX, chartHeight - value * stepY);
    });

    ctx.stroke();
  }, [xData, yData]);

  return <canvas ref={canvasRef} width={400} height={200} />;
};

export default LineChart;
