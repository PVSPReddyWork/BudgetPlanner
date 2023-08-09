import React from 'react';
import './ChartStyles.css';

const BarSVGChart = (params) => {
  const { xData, yData } = params;

  return (
    <>
      <div className="mainHolder">
        <svg height="200px" width="200px" viewBox="0,0,100,100">
          <g>
            <line x1="0" y1="0" x2="0" y2="80" className="chartAxis" />
            <line x1="0" y1="80" x2="80" y2="80" className="chartAxis" />
          </g>
          <g>
            {xData.map((item, index) => {
              var spaceRatio = 80 / xData.length;
              let xIndex = spaceRatio * index;
              return (
                <text
                  x={xIndex}
                  y={100}
                  fill="red"
                  transform={`rotate(${30} ${xIndex},${100}) scale(${0.3})`}
                >
                  {item}
                </text>
              );
            })}
          </g>
        </svg>
      </div>
    </>
  );
};

export default BarSVGChart;
