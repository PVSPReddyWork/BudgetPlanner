import React from 'react';
import './style.css';
import CustomNavigation from './NavigationPage/NavigationPage.js';
import ErrorBoundary from './ErrorDisplayHandler/ErrorBoundaryPage.js';

export default function App() {
  return (
    <div>
      <CustomNavigation />
    </div>
  ); /*
  return (
    <div>
      <ErrorBoundary fallback={<p>Something went wrong</p>}>
        <CustomNavigation />
      </ErrorBoundary>
    </div>
  );*/
}
