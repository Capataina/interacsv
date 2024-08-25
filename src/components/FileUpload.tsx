'use client';

import React, {useState} from 'react';
import Papa from 'papaparse';

type ParsedData = {
    data: Array<Record<string, string>>;
    errors: Papa.ParseError[];
    meta: Papa.ParseMeta;
};

type FileUploadProps = {
    onDataParsed: (data: ParsedData) => void;
};

const FileUpload: React.FC<FileUploadProps> = ({onDataParsed}) => {
    const [file, setFile] = useState<File | null>(null);

    /*    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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
    */


    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            const selectedFile = event.target.files[0];
            setFile(selectedFile);

            Papa.parse(selectedFile, {
                complete: (result) => {
                    onDataParsed(result as ParsedData);
                },
                header: true,
                skipEmptyLines: true,
            });
        }
    };

    return (
        <form>
            <input
                type="file"
                accept=".csv"
                onChange={handleFileChange}
            />
            {file && <p>Selected file: {file.name}</p>}
        </form>
    );
};

export default FileUpload;