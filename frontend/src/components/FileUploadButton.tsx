import React, { useRef, useState } from 'react';
import './FileUploadButton.css';
import { Upload } from '@styled-icons/bootstrap/';
import ButtonWithIcon from './Buttons/ButtonWithIcon';

interface FileUploadButtonProps {
    onFileUpload: (file: File) => void;
    multiple?: boolean;
}

const FileUploadButton: React.FC<FileUploadButtonProps> = ({ onFileUpload, multiple }) => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

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

    return (
        <div className="custom-file-upload">
            <input
                id="media"
                name="media"
                accept='image/*, video/*'
                multiple={multiple}
                type="file"
                ref={fileInputRef}
                style={{ display: 'none' }}
                onChange={handleFileInputChange}
            />
            <ButtonWithIcon 
                title="Upload Media" 
                className="upload-button" 
                icon=<Upload size={15} />
                onClick={handleButtonClick} 
            />
            {/* <button className="upload-button" onClick={handleButtonClick}>
                {selectedFile ? selectedFile.name : 'Select File'}
            </button> */}
        </div>
    );
};

export default FileUploadButton;