import React from 'react';
import './ChartStyles.css';

const BarSVGChart = (params) => {
  const { x_Data, y_Data } = params;

  const xData = ['Street Food', 'Fun and Entertainment', 'Recharge', 'Rent'];
  const yData = ['23453', '34234.34', '23424.22', '1221.21'];

  const xSpaceRatio = 80 / (xData.length + 1);

  const ySpaceRatio = 80 / (yData.length + 1);

  const textSizeScale = 0.3;

  return (
    <>
      <div className="mainHolder">
        <svg height="200px" width="200px" viewBox="0,0,100,100">
          <g>
            <line x1="20" y1="0" x2="20" y2="81" className="chartAxis" />
            <line x1="20" y1="80" x2="100" y2="80" className="chartAxis" />
          </g>
          <g>
            {yData.map((item, index) => {
              let yIndex = ySpaceRatio * (index + 1);
              return (
                <text
                  x={0}
                  y={0}
                  fill="red"
                  text-anchor="end"
                  transform={`translate(${20},${yIndex}) rotate(${-30} ${0},${0}) scale(${textSizeScale})`}
                >
                  {item}
                </text>
              );
            })}
          </g>
          <g>
            {xData.map((item, index) => {
              var multiText = null;
              if (item.includes(' ')) {
                multiText = item.split(' ');
              }

              let xIndex = xSpaceRatio * (index + 1);

              if (multiText !== null && multiText !== undefined) {
                if (multiText.length > 2) {
                  xIndex = 15 + xIndex;
                } else {
                  xIndex = 20 + xIndex;
                }
              } else {
                xIndex = 20 + xIndex;
              }
              return (
                <text
                  x={0}
                  y={0}
                  fill="red"
                  text-anchor="end"
                  transform={`translate(${xIndex},${84}) rotate(${320} ${0},${0}) scale(${textSizeScale})`}
                >
                  {multiText !== null && multiText !== undefined
                    ? multiText.map((multiTextItem, multiTextIndex) => {
                        return (
                          <tspan
                            // x={0}
                            x={0}
                            dy={10}
                            fill="green"
                            text-anchor="end"
                            transform={`translate(${
                              xIndex + multiTextIndex * 10
                            },${84}) rotate(${320} ${0},${0}) scale(${textSizeScale})`}
                          >
                            {multiTextItem}
                          </tspan>
                        );
                      })
                    : item}
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
