import React from 'react';
import Plotly from 'plotly.js';
import createPlotlyComponent from 'react-plotly.js/factory';

const Plot = createPlotlyComponent(Plotly);

interface InteractiveChartProps {
    data: any[]; // We'll refine this type later
    layout?: Partial<Plotly.Layout>;
    config?: Partial<Plotly.Config>;
}

const defaultLayout: Partial<Plotly.Layout> = {
    paper_bgcolor: 'rgba(0,0,0,0)', // transparent background
    plot_bgcolor: 'rgba(0,0,0,0)', // transparent plot area
    font: {
        family: 'Arial, sans-serif',
        size: 12,
        color: '#a1a1a6' // light grey for text
    },
    title: {
        font: {
            size: 24,
            color: '#ffffff' // white for title
        }
    },
    xaxis: {
        gridcolor: '#3a3a3c', // dark grey for grid lines
        linecolor: '#3a3a3c',
        tickcolor: '#3a3a3c'
    },
    yaxis: {
        gridcolor: '#3a3a3c',
        linecolor: '#3a3a3c',
        tickcolor: '#3a3a3c'
    },
    legend: {
        bgcolor: 'rgba(44,44,46,0.8)', // semi-transparent dark background
        bordercolor: '#3a3a3c',
        borderwidth: 1
    }
};

const defaultConfig: Partial<Plotly.Config> = {
    responsive: true,
    displayModeBar: false, // Hide the modebar for a cleaner look
};

const InteractiveChart: React.FC<InteractiveChartProps> = ({data, layout = {}, config = {}}) => {
    return (
        <Plot
            data={data}
            layout={{...defaultLayout, ...layout}}
            config={{...defaultConfig, ...config}}
            style={{width: '100%', height: '100%'}}
        />
    );
};

export default InteractiveChart;