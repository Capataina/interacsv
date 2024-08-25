'use client';

import React, {useState} from 'react';
import FileUpload from '../components/FileUpload';

type ParsedData = {
    data: Array<Record<string, string>>;
    errors: any[];
    meta: any;
};

export default function Home() {
    const [parsedData, setParsedData] = useState<ParsedData | null>(null);

    const handleDataParsed = (data: ParsedData) => {
        setParsedData(data);
        console.log('Parsed Data:', data);
    };

    return (
        <main>
            <h1>InteraCSV</h1>
            <p>Upload your CSV file to visualize the data</p>
            <FileUpload onDataParsed={handleDataParsed}/>
            {parsedData && (
                <div>
                    <h2>Parsed Data:</h2>
                    <pre>{JSON.stringify(parsedData.data.slice(0, 5), null, 2)}</pre>
                </div>
            )}
        </main>
    );
}