import React, { useEffect, useState } from 'react'
import ListAudio from './components/ListAudio'
import './App.scss'
import useApi from './hooks/Api';
import SearchAudio from './components/SearchAudio';
import { Col, Row, Skeleton } from 'antd';
import CreateAudio from './components/CreateAudio';

function App() {
  const [data, setData] = useState([]);
  let { result, isLoading, error } = useApi(`${import.meta.env.VITE_SERVER_URL}/api/audio`);
  const [loading, setLoading] = useState(isLoading);
  const handleSearch = async (value) => {
    setLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/audio?search=${value}`);
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
          <Row align={"middle"} gutter={4}>
            <Col span={21}>
              <SearchAudio handleSearch={handleSearch} audioResults={result} />
            </Col>
            <Col span={3}>
              <CreateAudio />
            </Col>
          </Row>
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
