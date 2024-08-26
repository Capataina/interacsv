import React from 'react';

interface DataInsightsProps {
    data: Array<Record<string, string | number>>;
    selectedColumn: string;
}

const DataInsights: React.FC<DataInsightsProps> = ({data, selectedColumn}) => {
    const calculateInsights = () => {
        const numericData = data
            .map(row => parseFloat(row[selectedColumn] as string))
            .filter(value => !isNaN(value));

        if (numericData.length === 0) return null;

        const sum = numericData.reduce((a, b) => a + b, 0);
        const mean = sum / numericData.length;
        const sortedData = [...numericData].sort((a, b) => a - b);
        const median = sortedData[Math.floor(sortedData.length / 2)];
        const min = sortedData[0];
        const max = sortedData[sortedData.length - 1];

        return {mean, median, min, max};
    };

    const insights = calculateInsights();

    if (!insights) {
        const uniqueValues = new Set(data.map(row => row[selectedColumn]));
        return (
            <div className="data-insights">
                <h3>Insights for {selectedColumn}</h3>
                <p>Data type: Text</p>
                <p>Unique values: {uniqueValues.size}</p>
                <p>Total entries: {data.length}</p>
            </div>
        );
    }

    return (
        <div className="data-insights">
            <h3>Insights for {selectedColumn}</h3>
            <p>Mean: {insights.mean.toFixed(2)}</p>
            <p>Median: {insights.median.toFixed(2)}</p>
            <p>Min: {insights.min.toFixed(2)}</p>
            <p>Max: {insights.max.toFixed(2)}</p>
        </div>
    );
};

export default DataInsights;