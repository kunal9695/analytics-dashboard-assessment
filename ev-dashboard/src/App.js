import React from 'react';
import { CSVDataProvider } from './context/CSVDataContext';
import Dashboard from './components/Dashboard';

function App() {
  return (
    <CSVDataProvider>
      <Dashboard />
    </CSVDataProvider>
  );
}

export default App;
