import React, { useState } from 'react';

interface Option {
    value: string;
    label: string;
}

interface DropdownProps {
    options: Option[];
    onSelect: (selectedValue: string) => void;
    label?: string;
}

const Dropdown: React.FC<DropdownProps> = ({ options, onSelect, label }) => {
    const [selectedOption, setSelectedOption] = useState<string>('');

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedValue = e.target.value;
        setSelectedOption(selectedValue);
        onSelect(selectedValue);
    };

    return (
        <div className="dropdown">
            <label className="dropdown-label">{label}</label>
            <select className="dropdown-select" value={selectedOption} onChange={handleSelectChange}>
                <option value="">Select {label}</option>
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default Dropdown;