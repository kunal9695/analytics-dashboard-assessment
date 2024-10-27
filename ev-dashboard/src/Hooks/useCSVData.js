import { useState, useEffect } from 'react';
import Papa from 'papaparse';

function useCSVData(url, chunkSize = 1000) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Papa.parse(url, {
      header: true,
      download: true,
      chunk: results => {
        setData(prevData => [...prevData, ...results.data]); 
      },
      complete: () => setLoading(false),
      error: err => console.error(err),
    });
  }, [url]);

  return { data, loading };
}

export default useCSVData;
