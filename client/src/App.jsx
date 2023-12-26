import React, { useEffect, useState } from 'react'
import ListAudio from './components/ListAudio'
import './App.scss'
import useApi from './hooks/Api';
import SearchAudio from './components/SearchAudio';
import { Row, Skeleton } from 'antd';

function App() {
  const [data, setData] = useState([]);
  let { result, isLoading, error } = useApi('http://localhost:8135/api/audio');
  const [loading, setLoading] = useState(isLoading);
  const handleSearch = async (value) => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:8135/api/audio?search=${value}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const result = await response.json();
      setData(result?.data);
    } catch (error) {
      console.error('Error:', error);
    }
    setLoading(false);
    // setData(searchResult)
  }
  useEffect(() => {
    setData(result?.data);
    setLoading(isLoading);
  }, [result]);

  return (
    <>
      <div className="wrapper">
        <div className='search-container'>
          <SearchAudio handleSearch={handleSearch} />
        </div>
        <div>
          {loading ?
            <Skeleton active />
            : <ListAudio result={data} isLoading={isLoading} error={error} />

          }

        </div>
      </div>
    </>
  )
}

export default App
