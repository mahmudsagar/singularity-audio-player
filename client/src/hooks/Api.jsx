import { useState, useEffect } from 'react';

function useApi(url) {
    const [result, setResult] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchData = async () => {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('An error occurred while fetching the data.');
            }
            const data = await response.json();
            setResult(data);
            setIsLoading(false);
        } catch (error) {
            setError("fetch data",error.message);
            setIsLoading(false);
        }
    };

    const postData = async (body) => {
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            });
            if (!response.ok) {
                throw new Error('An error occurred while posting the data.');
            }
            const data = await response.json();
            setResult(data);
        } catch (error) {
            setError(error.message);
        }
    };

    const deleteData = async () => {
        try {
            const response = await fetch(url, {
                method: 'DELETE'
            });
            if (!response.ok) {
                throw new Error('An error occurred while deleting the data.');
            }
            setResult(null);
        } catch (error) {
            setError(error.message);
        }
    };

    useEffect(() => {
        fetchData();
    }, [url]);

    return { result, isLoading, error, postData, deleteData };
}

export default useApi;