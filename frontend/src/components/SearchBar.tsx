import React from 'react';
import { Search } from '@styled-icons/bootstrap';

const SearchBar: React.FC = () => {
    return (
        <div className="search-bar">
            <input type="text" placeholder="Search..." />
            <Search size={18} className="search-icon" />
        </div>
    );
};

export default SearchBar;