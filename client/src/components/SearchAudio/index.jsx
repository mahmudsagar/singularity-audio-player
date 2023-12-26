import React, { useEffect, useState } from 'react';
import { AutoComplete, Input, message } from 'antd';
import useSearchOption from '../../hooks/searchOptions';
import { ClearOutlined, SmileOutlined } from '@ant-design/icons';

const SearchAudio = ({ handleSearch, audioResults }) => {
    const [searchOptions, setSearchOptions] = useState([]);
    const { options, isLoading, error } = useSearchOption(audioResults);
    useEffect(() => {
        setSearchOptions(options);
    }, [options]);
    return (
        <div className="search-audio">
            <AutoComplete
                allowClear
                popupClassName="search-dropdown"
                popupMatchSelectWidth={500}
                options={searchOptions}
                onSelect={(value) => {
                    if (!value || value.trim() === '') {
                        message.error('Please select a valid option.');
                        return;
                    }
                    handleSearch(value);
                }}
                onClear={() => handleSearch('')}
                filterOption
            >
                <Input.Search size="large" placeholder="Search audio with title or artist" />
            </AutoComplete>
        </div>
    );
}

export default SearchAudio;