import * as React from "react"
import Svg, { Circle, Path } from "react-native-svg"
//https://react-svgr.com/playground/?native=true

function BudgetPlannerLogoJSX(props) {
  return (
    <Svg viewBox="0 0 600 600" {...props}>
      <Circle
        cx={300}
        cy={300}
        r={250}
        stroke="#000"
        strokeWidth={6}
        fill="transparent"
      />
      <Path
        d="M250 300c0-70 100-70 100 0h50c0-130-200-130-200 0z"
        fill="green"
      />
      <Path d="M200 80v220h50V80z" fill="#ff0" />
      <Path d="M200 300v220h50V300z" fill="green" />
      <Path
        d="M250 300c0 70 100 70 100 0h50c0 130-200 130-200 0z"
        fill="#ff0"
      />
      {"Sorry, your browser does not support inline SVG."}
    </Svg>
  )
}

export default BudgetPlannerLogoJSX


/*
import React from "react";

function BudgetPlannerLogoJSX() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600">
      <circle
        cx="300"
        cy="300"
        r="250"
        fill="transparent"
        stroke="#000"
        strokeWidth="6"
      ></circle>
      <path
        fill="green"
        stroke="green"
        strokeWidth="0"
        d="M250 300c0-70 100-70 100 0h50c0-130-200-130-200 0z"
      ></path>
      <path
        fill="#ff0"
        stroke="#ff0"
        strokeWidth="0"
        d="M200 80v220h50V80z"
      ></path>
      <path
        fill="green"
        stroke="green"
        strokeWidth="0"
        d="M200 300v220h50V300z"
      ></path>
      <path
        fill="#ff0"
        stroke="#ff0"
        strokeWidth="0"
        d="M250 300c0 70 100 70 100 0h50c0 130-200 130-200 0z"
      ></path>
      Sorry, your browser does not support inline SVG.
    </svg>
  );
}
*/

/*
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600" version="1.1">

   <circle cx="300" cy="300" r="250" stroke="black" stroke-width="6" fill="transparent"/>
   
   <path id="bCurve"
   d="M 250 300 
   C 250 230, 350 230, 350 300
   L 400 300
   C 400 170, 200 170, 200 300
   Z"
   stroke="green" fill="green" stroke-width="0"/>
   
   <path id="bRectangle"
   d="M 200 80 
   L 200 300 
   L 250 300
   L 250 80
   Z" stroke="yellow" fill="yellow" stroke-width="0"/>
   
   <path id="pRectangle"
   d="M 200 300 
   L 200 520 
   L 250 520
   L 250 300
   Z" stroke="green" fill="green" stroke-width="0"/>
   
   <path id="bCurve"
   d="M 250 300 
   C 250 370, 350 370, 350 300
   L 400 300
   C 400 430, 200 430, 200 300
   Z" stroke="yellow" fill="yellow" stroke-width="0"/>
   
   Sorry, your browser does not support inline SVG.
</svg>
* /

export default BudgetPlannerLogoJSX;
*/