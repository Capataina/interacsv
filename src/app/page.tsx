import React from 'react';
import FileUpload from '../components/FileUpload';

export default function Home() {
    return (
        <main>
            <h1>InteraCSV</h1>
            <p>Upload your CSV file to visualize the data</p>
            <FileUpload />
        </main>
    );
}