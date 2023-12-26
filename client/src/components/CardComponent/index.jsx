import React, { useState, useEffect } from 'react';
import {Button, Card, Col, Row, Slider } from 'antd';
import { PauseCircleOutlined, PlayCircleOutlined } from '@ant-design/icons'
import './CardComponent.scss'
function CardComponent({ data }) {
    const [isPlaying, setIsPlaying] = useState(false);
    const [audioObj, setAudio] = useState(null);
    const [currentTime, setCurrentTime] = useState("0:00");
    const [duration, setDuration] = useState("0:00");
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const audio = new Audio(data.audioUrl);
        setAudio(audio);

        audio.addEventListener('timeupdate', () => {
            const minutes = Math.floor(audio.currentTime / 60);
            const seconds = Math.floor(audio.currentTime % 60);
            setCurrentTime(`${minutes}:${seconds < 10 ? '0' : ''}${seconds}`);
            setProgress(audio.currentTime / audio.duration);
        });

        audio.addEventListener('loadedmetadata', () => {
            const minutes = Math.floor(audio.duration / 60);
            const seconds = Math.floor(audio.duration % 60);
            setDuration(`${minutes}:${seconds < 10 ? '0' : ''}${seconds}`);
        });

        audio.addEventListener('ended', () => {
            setIsPlaying(false);
            setProgress(0);
        });

        return () => {
            audio.removeEventListener('timeupdate', () => {});
            audio.removeEventListener('loadedmetadata', () => {});
            audio.removeEventListener('ended', () => {});
        };
    }, [data]);

    const playAudio = () => {
        if (audioObj) {
            if (isPlaying) {
                audioObj.pause();
            } else {
                audioObj.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    const onProgressChange = (newValue) => {
        const newProgress = newValue;
        setProgress(newProgress);
        if (audioObj) {
            audioObj.currentTime = newProgress * audioObj.duration;
        }
    };

    return (
        <Card
            hoverable
            style={{ width: "100%",textAlign:'center' }}
            cover={<img alt="example" src={`https://picsum.photos/200?random=${data.id}`} />}
        >
            <Card.Meta title={data.title} description={data.artist} />
            <Row className='controls'>
                <Col span={4}>{currentTime}</Col>
                <Col span={16}>
                    <Slider
                        min={0}
                        max={1}
                        step={0.01}
                        value={progress}
                        onChange={onProgressChange}
                    />
                </Col>
                <Col span={4}>{duration}</Col>
            </Row>
            <div className='play-button-container'>
            <Button onClick={playAudio} className='play-button'>
                {isPlaying ? <PauseCircleOutlined /> : <PlayCircleOutlined />}
            </Button>
            </div>
        </Card>
    );
}

export default CardComponent;