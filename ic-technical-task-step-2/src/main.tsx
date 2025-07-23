import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { StateProvider } from './context/StateContext';
import ErrorBoundary from './components/ErrorBoundary'; // Import ErrorBoundary

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ErrorBoundary>
      <StateProvider>
        <App />
      </StateProvider>
    </ErrorBoundary>
  </React.StrictMode>
);
