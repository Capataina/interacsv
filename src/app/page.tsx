'use client';

import React, {useState, useEffect} from 'react';
import FileUpload from '../components/FileUpload';
import InteractiveChart from '../components/InteractiveChart';
import Papa from 'papaparse';

type ParsedData = {
    data: Array<Record<string, string>>;
    errors: Papa.ParseError[];
    meta: Papa.ParseMeta;
};

const sampleDatasets = [
    {name: 'Cost of Living', file: 'Cost_of_Living_Index_by_Country_2024.csv'},
    {name: 'Heart Attack Risk', file: 'heart_attack_dataset.csv'},
    {name: 'Coffee Sales', file: 'coffee sales.csv'},
];

export default function Home() {
    const [parsedData, setParsedData] = useState<ParsedData | null>(null);
    const [columns, setColumns] = useState<string[]>([]);
    const [selectedX, setSelectedX] = useState<string>('');
    const [selectedY, setSelectedY] = useState<string>('');

    const handleDataParsed = (data: ParsedData) => {
        setParsedData(data);
        if (data.data.length > 0) {
            const cols = Object.keys(data.data[0]);
            setColumns(cols);
            setSelectedX(cols[0]);
            setSelectedY(cols[1]);
        }
    };

    const loadSampleData = async (file: string) => {
        try {
            const response = await fetch(`/sample-data/${file}`);
            const csvText = await response.text();
            Papa.parse(csvText, {
                complete: handleDataParsed,
                header: true,
                skipEmptyLines: true,
            });
        } catch (error) {
            console.error('Error loading sample data:', error);
        }
    };

    const prepareChartData = () => {
        if (!parsedData || parsedData.data.length === 0 || !selectedX || !selectedY) return null;

        const xValues = parsedData.data.map(row => row[selectedX]);
        const yValues = parsedData.data.map(row => parseFloat(row[selectedY] || '0'));

        return [{
            x: xValues,
            y: yValues,
            type: 'bar', // Default to bar chart, will be made optional later
            name: selectedY
        }];
    };

    const chartData = prepareChartData();

    return (
        <main>
            <h1>InteraCSV</h1>
            <p>Upload your CSV file or select a sample dataset to visualize the data</p>
            <FileUpload onDataParsed={handleDataParsed}/>
            <div>
                <select onChange={(e) => loadSampleData(e.target.value)}>
                    <option value="">Select a sample dataset</option>
                    {sampleDatasets.map(dataset => (
                        <option key={dataset.file} value={dataset.file}>{dataset.name}</option>
                    ))}
                </select>
            </div>
            {columns.length > 0 && (
                <div>
                    <select value={selectedX} onChange={(e) => setSelectedX(e.target.value)}>
                        {columns.map(col => (
                            <option key={col} value={col}>{col}</option>
                        ))}
                    </select>
                    <select value={selectedY} onChange={(e) => setSelectedY(e.target.value)}>
                        {columns.map(col => (
                            <option key={col} value={col}>{col}</option>
                        ))}
                    </select>
                </div>
            )}
            {chartData && (
                <div style={{width: '100%', height: '500px'}}>
                    <InteractiveChart
                        data={chartData}
                        layout={{
                            title: `${selectedY} vs ${selectedX}`,
                            xaxis: {title: selectedX},
                            yaxis: {title: selectedY}
                        }}
                    />
                </div>
            )}
        </main>
    );
}