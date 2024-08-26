'use client';

import dynamic from 'next/dynamic';
import React, {useState} from 'react';
import FileUpload from '../components/FileUpload';
import DataInsights from '../components/DataInsights';

const InteractiveChart = dynamic(() => import('../components/InteractiveChart'), {
    ssr: false,
});

import Papa from 'papaparse';

/*
import TrendLineToggles from "../components/TrendLineToggles";
import {calculateTrendLine} from '../utils/trendLineCalculations';
*/

type ParsedData = {
    data: Array<Record<string, string>>;
    errors: Papa.ParseError[];
    meta: Papa.ParseMeta;
};


const chartTypes = ['bar', 'line', 'scatter'];

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
    const [chartType, setChartType] = useState<string>('bar');

    /*
    const [trendLines, setTrendLines] = useState<Record<string, boolean>>({});

    const handleTrendLineToggle = (type: string, enabled: boolean) => {
        setTrendLines(prev => ({...prev, [type]: enabled}));
    };
    */

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

        const minValue = Math.min(...yValues);
        const maxValue = Math.max(...yValues);
        const colors = yValues.map(value => {
            const normalizedValue = (value - minValue) / (maxValue - minValue);

            const r = Math.round(180 - normalizedValue * 30);
            const g = Math.round(220 - normalizedValue * 185);
            const b = Math.round(130 + normalizedValue * 125);
            return `rgba(${r}, ${g}, ${b}, 0.8)`;
        });


        const chartData: any[] = [{
            x: xValues,
            y: yValues,
            type: chartType as any,
            name: selectedY,
            mode: chartType === 'scatter' ? 'markers' : 'lines',
            line: {
                color: 'rgb(75, 192, 192)',
                width: 2
            },
            marker: {
                color: colors,
                size: 8
            }
        }];

        /*
        // Add trend lines
        Object.entries(trendLines).forEach(([type, enabled]) => {
            if (enabled) {
                const trendLine = calculateTrendLine(xValues, yValues, type as any);
                if (trendLine) {
                    chartData.push(trendLine);
                }
            }
        });
        */

        return chartData;
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
                    <label>
                        X-Axis:
                        <select value={selectedX} onChange={(e) => setSelectedX(e.target.value)}>
                            {columns.map(col => (
                                <option key={col} value={col}>{col}</option>
                            ))}
                        </select>
                    </label>
                    <label>
                        Y-Axis:
                        <select value={selectedY} onChange={(e) => setSelectedY(e.target.value)}>
                            {columns.map(col => (
                                <option key={col} value={col}>{col}</option>
                            ))}
                        </select>
                    </label>
                    <label>
                        Chart Type:
                        <select value={chartType} onChange={(e) => setChartType(e.target.value)}>
                            {chartTypes.map(type => (
                                <option key={type} value={type}>{type.charAt(0).toUpperCase() + type.slice(1)}</option>
                            ))}
                        </select>
                    </label>
                </div>
            )}
            {typeof window !== 'undefined' && chartData && (
                <div style={{display: 'flex', width: '100%'}}>
                    <div style={{width: '70%', height: '500px'}}>
                        <InteractiveChart
                            data={chartData}
                            layout={{
                                title: `${selectedY} vs ${selectedX}`,
                                xaxis: {
                                    title: selectedX,
                                    type: 'category',
                                    tickangle: 45,
                                    automargin: true
                                },
                                yaxis: {title: selectedY},
                                showlegend: false,
                                hovermode: 'closest'
                            }}
                            config={{
                                toImageButtonOptions: {
                                    filename: `InteraCSV_${selectedY}_vs_${selectedX}`
                                },
                                displayModeBar: true,
                                scrollZoom: true
                            }}
                        />
                    </div>
                    <div style={{width: '30%', padding: '0 20px'}}>
                        <DataInsights data={parsedData?.data || []} selectedColumn={selectedY}/>
                        {/*<TrendLineToggles onToggle={handleTrendLineToggle}/>*/}
                    </div>
                </div>
            )}
        </main>
    );
}