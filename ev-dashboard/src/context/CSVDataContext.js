import React, { createContext } from 'react';
import useCSVData from '../Hooks/useCSVData';

const CSVDataContext = createContext();

export function CSVDataProvider({ children }) {
  const { data, loading } = useCSVData(`${process.env.PUBLIC_URL}/Electric_Vehicle_Population_Data.csv`);

  return (
    <CSVDataContext.Provider value={{ data, loading }}>
      {children}
    </CSVDataContext.Provider>
  );
}

export default CSVDataContext;
