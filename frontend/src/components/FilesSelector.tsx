import React, { useState, ChangeEvent, useRef } from 'react';
import './FilesSelector.css';
import ButtonWithIcon from './Buttons/ButtonWithIcon';
import { Upload } from '@styled-icons/bootstrap/';

interface FilesSelectorProps {
    id?: string;

    onFileSelect: (e: ChangeEvent<HTMLInputElement>) => void;
    accept?: string;
    multiple?: boolean;
}

const FilesSelector: React.FC<FilesSelectorProps> = ({
    onFileSelect,
    id,
    accept,
    multiple,
}) => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [isSelectorOpen, setIsSelectorOpen] = useState(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const handleSelectorClick = () => {
        setIsSelectorOpen(true);
    };

    const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files && e.target.files[0];
        setSelectedFile(file);

        if (file) {
            onFileUpload(file);
        }
    };

    const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        e.stopPropagation();

        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleClearSelection = () => {
        const input = document.getElementById('file-input') as HTMLInputElement;
        if (input) {
            input.value = ''; // Clear the selected files from the input element
        }
    };

    return (
        <div className="file-selector">
            <div className="file-selector__input" onClick={handleSelectorClick}>
                <input
                    id={id || 'file-input'}
                    type="file"
                    // className="file-selector__hidden-input"
                    multiple={multiple}
                    accept={accept}
                    style={{ display: 'none' }}
                    onChange={onFileSelect}
                />
                <ButtonWithIcon
                    title="Upload Media"
                    className="upload-button"
                    icon=<Upload size={15} />
                    onClick={handleButtonClick}
                />
            </div>

            {/* <div className="file-selector__selected-files">
                <span>Files selected</span>
                <button className="file-selector__clear-button" onClick={handleClearSelection}>
                    Clear
                </button>
            </div> */}
        </div>
    );
};

export default FilesSelector;
