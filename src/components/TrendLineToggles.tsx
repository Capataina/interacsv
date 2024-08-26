import React from 'react';

interface TrendLineTogglesProps {
    onToggle: (type: string, enabled: boolean) => void;
}

const TrendLineToggles: React.FC<TrendLineTogglesProps> = ({onToggle}) => {
    const trendLines = [
        {id: 'linear', label: 'Linear'},
        {id: 'exponential', label: 'Exponential'},
        {id: 'moving_average', label: 'Moving Average'},
    ];

    return (
        <div className="trend-line-toggles">
            <h4>Trend Lines</h4>
            {trendLines.map(trendLine => (
                <label key={trendLine.id} className="trend-line-toggle">
                    <input
                        type="checkbox"
                        onChange={(e) => onToggle(trendLine.id, e.target.checked)}
                    />
                    {trendLine.label}
                </label>
            ))}
        </div>
    );
};

export default TrendLineToggles;