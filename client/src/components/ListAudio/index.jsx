import React, { useEffect, useState } from 'react';
import { Row, Col } from 'antd';
import CardComponent from '../CardComponent';
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
            <Row gutter={[16, 24]} style={{justifyContent: "space-around"}}>
                {data && data?.map((item,index) => (

                    <Col key={index} className="gutter-row" span={7}>
                        <CardComponent data={item} />
                    </Col>
                ))
                }
            </Row>
        </>
    )

}

export default ListAudio;