import React, { useEffect, useState } from 'react';
import { Row, Col } from 'antd';
import CardComponent from '../CardComponent';
import useApi from '../../hooks/Api';
const ListAudio = ({result, isLoading, error}) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        if(result){
            setData(result);
        }
    }, [result]);

    if (isLoading) {
        return <div>Loading...</div>;
    }
    if (error) {
        return <div>Error: {error}</div>;
    }
    return (
        <>
            <Row gutter={[16, 24]}>
                {data && data?.data?.map((item,index) => (

                    <Col key={index} className="gutter-row" span={4}>
                        <CardComponent id={index} data={item} />
                    </Col>
                ))
                }
            </Row>
        </>
    )

}

export default ListAudio;