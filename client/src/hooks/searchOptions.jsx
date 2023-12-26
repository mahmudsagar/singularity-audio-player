import React, { useState, useEffect } from "react";

const useSearchOption = (url) => {
    const [result, setResult] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [options, setOptions] = useState([]);
    const renderTitle = (title) => (
        <span>
            {title}
        </span>
    );
    const renderItem = (title) => ({
        value: title,
        label: (
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                }}
            >
                {title}
            </div>
        ),
    });

    const fetchData = async () => {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('An error occurred while fetching the data.');
            }
            const data = await response.json();
            setResult(data);
            setIsLoading(false);

            let titleOptions = new Set(data?.data?.map(item => (
                item.title
            )));
            let artistOption = new Set(data?.data?.map(item => (
                item.artist
            )))
            titleOptions = [...titleOptions].map(item => renderItem(item));
            artistOption = [...artistOption].map(item => renderItem(item));
            let optionResult = [
                {
                    label: renderTitle('Titles'),
                    options: titleOptions,
                },
                {
                    label: renderTitle('Artists'),
                    options: artistOption,
                },
            ];
            setOptions(optionResult);
        } catch (error) {
            setError(error.message);
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [url]);

    return { options, isLoading, error };
}

export default useSearchOption;