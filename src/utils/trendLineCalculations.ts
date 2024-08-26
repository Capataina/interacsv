type TrendLineType = 'linear' | 'exponential' | 'moving_average';

interface TrendLineData {
    x: number[];
    y: (number | null)[];
    type: 'scatter';
    mode: 'lines';
    name: string;
    line: { color: string };
}

export const calculateTrendLine = (xValues: any[], yValues: number[], type: TrendLineType): TrendLineData | null => {
    const x = xValues.map(Number);
    const y = yValues;
    const n = x.length;
    const sumX = x.reduce((a, b) => a + b, 0);
    const sumY = y.reduce((a, b) => a + b, 0);
    const sumXY = x.reduce((sum, xi, i) => sum + xi * y[i], 0);
    const sumX2 = x.reduce((sum, xi) => sum + xi * xi, 0);

    switch (type) {
        case 'linear':
            const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
            const intercept = (sumY - slope * sumX) / n;

            return {
                x: x,
                y: x.map(xi => slope * xi + intercept),
                type: 'scatter',
                mode: 'lines',
                name: 'Linear Trend',
                line: {color: 'red'},
            };

        case 'exponential':
            const lnY = y.map(yi => Math.log(yi));
            const sumLnY = lnY.reduce((a, b) => a + b, 0);
            const sumXLnY = x.reduce((sum, xi, i) => sum + xi * lnY[i], 0);

            const a = Math.exp((sumLnY * sumX2 - sumX * sumXLnY) / (n * sumX2 - sumX * sumX));
            const b = (n * sumXLnY - sumX * sumLnY) / (n * sumX2 - sumX * sumX);

            return {
                x: x,
                y: x.map(xi => a * Math.exp(b * xi)),
                type: 'scatter',
                mode: 'lines',
                name: 'Exponential Trend',
                line: {color: 'green'},
            };

        case 'moving_average':
            const period = 5; //TASK make this changeable later
            const movingAvg = y.map((_, i, arr) =>
                i < period - 1
                    ? null
                    : arr.slice(i - period + 1, i + 1).reduce((sum, val) => sum + val, 0) / period
            );

            return {
                x: x,
                y: movingAvg,
                type: 'scatter',
                mode: 'lines',
                name: 'Moving Average',
                line: {color: 'blue'},
            };

        default:
            return null;
    }
};