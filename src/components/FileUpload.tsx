'use client';

import React, { useState } from 'react';

const FileUpload: React.FC = () => {
    const [file, setFile] = useState<File | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setFile(event.target.files[0]);
        }
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (file) {
            console.log('File uploaded:', file.name);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="file"
                accept=".csv"
                onChange={handleFileChange}
            />
            <button type="submit" disabled={!file}>
                Upload CSV
            </button>
        </form>
    );
};

export default FileUpload;