import React, { useState } from 'react';
import { Button, Form, Input, Modal } from 'antd';
import useApi from '../../hooks/Api';

const CreateAudio = () => {
    const [form] = Form.useForm();
    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const showModal = () => {
        setOpen(true);
    };
    //(`${import.meta.env.VITE_SERVER_URL}
    const handleSubmit = (values) => {
        form.validateFields()
            .then(async (values) => {
                setConfirmLoading(true);
                try {
                    const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/audio`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(values),
                    });
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    const data = await response.json();
                    console.log('Success:', data);
                    setOpen(false);
                } catch (error) {
                    console.error('Error:', error);
                } finally {
                    setConfirmLoading(false);
                }
            })
            .catch((info) => {
                console.log('Validate Fields failed:', info);
            });
    };;
    // const handleOk = async () => {
    //     setConfirmLoading(true);

    //     setConfirmLoading(false);
    // };
    const handleCancel = () => {
        setOpen(false);
    };
    return (
        <>
            <Button type="primary" style={{ height: "40px", float: "inline-end", width: "100%" }} onClick={showModal}>
                Add music
            </Button>
            <Modal
                title="Add music to your playlist"
                open={open}
                onOk={handleSubmit}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
            >
                <p>Enter the details of the music you want to add to your playlist</p>
                <Form
                    form={form}
                    layout="vertical"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                >
                    {/* Add your form fields here */}
                    <Form.Item
                        label="Title"
                        name="title"
                        rules={[{ required: true, message: 'Please enter music title!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Artist"
                        name="artist"
                        rules={[{ required: true, message: 'Please enter artist name!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Audio URL"
                        name="audioUrl"
                        rules={[{ required: true, message: 'Please enter music url' }]}
                    >
                        <Input />
                    </Form.Item>
                    {/* Add more form fields as needed */}
                </Form>
                {/* <label htmlFor='title'>Title</label>
                <Input id='title' placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
                <label htmlFor='artist'>Artist</label>
                <Input id='artist' placeholder="Artist" value={artist} onChange={(e) => setArtist(e.target.value)} />
                <label htmlFor='url'>URL</label>
                <Input id="url" placeholder="Audio URL" value={audioUrl} onChange={(e) => setAudioUrl(e.target.value)} /> */}

            </Modal>
        </>
    );
}

export default CreateAudio