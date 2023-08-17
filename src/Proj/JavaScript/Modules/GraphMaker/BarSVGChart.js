import React, { useState, useEffect } from 'react';
import './ChartStyles.css';

const BarSVGChart = (params) => {
  const { xData, yData } = params;

  const defaultData = {
    xData: [],
    yData: [],
    xSpaceRatio: 0,
    ySpaceRatio: 0,
    textSizeScale: 0.3,
  };
  const [chartData, setChartData] = useState({ data: defaultData });

  useEffect(() => {
    initGraph();
  }, []);

  const initGraph = () => {
    try {
      const x_Data = [
        'Street Food',
        'Fun and Entertainment',
        'Recharge',
        'Rent',
      ];
      let y_Data = ['23453', '34234.34', '23424.22', '1221.21'];

      y_Data = y_Data.sort(function (a, b) {
        return b - a;
      });

      y_Data.forEach((item) => {
        item = item.includes('.') ? item : `${item}.00`;
      });

      const x_SpaceRatio = 80 / (x_Data.length + 1);
      const y_SpaceRatio = 80 / (y_Data.length + 1);
      const updatedData = {
        ...chartData.data,
        xData: x_Data,
        yData: y_Data,
        xSpaceRatio: x_SpaceRatio,
        ySpaceRatio: y_SpaceRatio,
      };
      setChartData({ ...chartData, data: updatedData });
    } catch (ex) {}
  };
  /*
  useEffect(() => {
    initGraphData();
  }, []);

  useEffect(() => {
    updateGraph();
  }, [chartData.data.yData]);

  const initGraphData = () => {
    try {
      const x_Data = [
        'Street Food',
        'Fun and Entertainment',
        'Recharge',
        'Rent',
      ];
      let y_Data = ['23453', '34234.34', '23424.22', '1221.21'];

      y_Data = y_Data.sort(function (a, b) {
        return b - a;
      });

      y_Data.forEach((item) => {
        item = item.includes('.') ? item : `${item}.00`;
      });

      const updatedData = {
        ...chartData.data,
        xData: x_Data,
        yData: y_Data,
      };
      setChartData({ ...chartData, data: updatedData });
    } catch (ex) {}
  };

  const updateGraph = () => {
    try {
      const x_SpaceRatio = 80 / (chartData.data.xData.length + 1);
      const y_SpaceRatio = 80 / (chartData.data.yData.length + 1);
      const updatedData = {
        ...chartData.data,
        xSpaceRatio: x_SpaceRatio,
        ySpaceRatio: y_SpaceRatio,
      };
      setChartData({ ...chartData, data: updatedData });
    } catch (ex) {}
  };
  */

  return (
    <>
      <div className="mainHolder">
        <svg height="200px" width="200px" viewBox="0,0,120,120">
          {/* This is for base lines */}
          <g>
            <line x1="20" y1="0" x2="20" y2="81" className="chartAxis" />
            <line x1="20" y1="80" x2="100" y2="80" className="chartAxis" />
          </g>

          {/* This is for y-axis info */}
          <g>
            {chartData.data.yData.map((item, index) => {
              let yIndex = chartData.data.ySpaceRatio * (index + 1);
              return (
                <text
                  x={0}
                  y={0}
                  fill="red"
                  textAnchor="end"
                  transform={`translate(${20},${yIndex}) rotate(${-30} ${0},${0}) scale(${
                    chartData.data.textSizeScale
                  })`}
                >
                  {item}
                </text>
              );
            })}
          </g>

          {/* This is for x-axis info */}
          <g>
            {chartData.data.xData.map((item, index) => {
              var multiText = null;
              if (item.includes(' ')) {
                multiText = item.split(' ');
              }

              let xIndex = chartData.data.xSpaceRatio * (index + 1);

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
                  textAnchor="end"
                  transform={`translate(${xIndex},${84}) rotate(${320} ${0},${0}) scale(${
                    chartData.data.textSizeScale
                  })`}
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
                            },${84}) rotate(${320} ${0},${0}) scale(${
                              chartData.data.textSizeScale
                            })`}
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

          {/* This is for graph data bars */}
          <g>{chartData.data.yData.map((item, index) => {})}</g>
        </svg>
      </div>
    </>
  );
};

export default BarSVGChart;
