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
        const variance = numericData.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0) / numericData.length;
        const stdDev = Math.sqrt(variance);

        return {mean, median, min, max, stdDev};
    };

    const insights = calculateInsights();

    const InsightItem: React.FC<{ label: string; value: string | number }> = ({label, value}) => (
        <div className="insight-item">
            <span className="insight-label">{label}:</span>
            <span className="insight-value">{typeof value === 'number' ? value.toFixed(2) : value}</span>
        </div>
    );

    if (!insights) {
        const uniqueValues = new Set(data.map(row => row[selectedColumn]));
        return (
            <div className="data-insights">
                <h3>Insights for {selectedColumn}</h3>
                <InsightItem label="Data type" value="Text"/>
                <InsightItem label="Unique values" value={uniqueValues.size}/>
                <InsightItem label="Total entries" value={data.length}/>
            </div>
        );
    }

    return (
        <div className="data-insights">
            <h3>Insights for {selectedColumn}</h3>
            <InsightItem label="Mean" value={insights.mean}/>
            <InsightItem label="Median" value={insights.median}/>
            <InsightItem label="Min" value={insights.min}/>
            <InsightItem label="Max" value={insights.max}/>
            <InsightItem label="Standard Deviation" value={insights.stdDev}/>
        </div>
    );
};

export default DataInsights;