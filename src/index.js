import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import App from './Proj/Views/App';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);