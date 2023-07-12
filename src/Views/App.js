import React from 'react';
import './style.css';
import CustomNavigation from './NavigationPage/NavigationPage.js';
import ErrorBoundary from './ErrorDisplayHandler/ErrorBoundaryPage.js';

export default function App() {
  return (
    <div>
      <ErrorBoundary fallback={<p>Something went wrong</p>}>
        <CustomNavigation />
        <h1>Hello World</h1>
      </ErrorBoundary>
    </div>
  );
}
