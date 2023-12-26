import React, { useState, useEffect } from "react";

const useSearchOption = (results) => {
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
        let titleOptions = new Set(results?.data?.map(item => (
            item.title
        )));
        let artistOption = new Set(results?.data?.map(item => (
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
    };

    useEffect(() => {
        fetchData();
    }, [results]);

    return { options };
}

export default useSearchOption;