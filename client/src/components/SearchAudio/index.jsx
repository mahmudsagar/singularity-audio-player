import React, { useEffect, useState } from 'react';
import { AutoComplete, Input } from 'antd';
import useSearchOption from '../../hooks/searchOptions';
import { ClearOutlined, SmileOutlined } from '@ant-design/icons';

const SearchAudio = ({ handleSearch }) => {
    const [searchOptions, setSearchOptions] = useState([]);
    const { options, isLoading, error } = useSearchOption('http://localhost:8135/api/audio');
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
                onSelect={(value) => handleSearch(value)}
                onClear={() => handleSearch('')}
                filterOption
            >
                <Input.Search size="large" placeholder="input here" />
            </AutoComplete>
        </div>
    );
}

export default SearchAudio;