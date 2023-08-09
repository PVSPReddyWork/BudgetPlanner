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
                  x={0}
                  y={0}
                  fill="red"
                  transform={`translate(${xIndex},${90}) rotate(${30} ${0},${0}) scale(${0.3})`}
                >
                  {item}
                </text>
              );
            })}
          </g>
          <g>
            {yData.map((item, index) => {
              var spaceRatio = 80 / yData.length;
              let yIndex = spaceRatio * index;
              return (
                <text
                  x={0}
                  y={0}
                  fill="red"
                  transform={`translate(${0},${yIndex}) rotate(${30} ${0},${0}) scale(${0.3})`}
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
