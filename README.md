# InteraCSV

InteraCSV is an interactive CSV viewer built with Next.js, TypeScript, and Plotly. It provides a user-friendly interface for visualizing and analyzing CSV data through various chart types and data insights.

## Features

- [x] CSV File Upload: Users can upload their own CSV files for visualization.
- [x] Sample Datasets: Pre-loaded sample datasets are available for quick exploration.
- [x] Interactive Charts: Utilizes Plotly to create interactive bar, line, and scatter plots.
- [x] Dynamic Axis Selection: Users can choose which columns to display on the X and Y axes.
- [x] Chart Type Selection: Supports bar, line, and scatter plot types.
- [x] Data Insights: Provides basic statistical insights for the selected data column.
- [x] Responsive Design: Ensures a good user experience across different device sizes.
- [ ] Support for additional file types beyond CSV.
- [ ] More chart types and visualization options.
- [ ] Advanced data analytics capabilities with more statistical measures and insights.
- [ ] Trend line functionality for deeper data analysis.

## Technologies Used

- [Next.js](https://nextjs.org/): React framework for building the web application, providing server-side rendering and routing.

- [TypeScript](https://www.typescriptlang.org/): Adds static typing to JavaScript, improving code quality and developer productivity.

- [Plotly.js](https://plotly.com/javascript/): Powers the interactive charts and graphs, enabling dynamic data visualization.

- [Papa Parse](https://www.papaparse.com/): Handles CSV parsing, converting uploaded files into a format for manipulation and visualization.

- [React](https://reactjs.org/): Used for building the user interface components and managing application state.

- [CSS Modules](https://github.com/css-modules/css-modules): Provides scoped and modular CSS for styling components.

- [Vercel](https://vercel.com/): Hosts the application, providing seamless deployment and scaling.

## Getting Started

To run InteraCSV locally, follow these steps:

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/interacsv.git
   cd interacsv
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Run the development server:
   ```
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Live Website

You can access the live version of InteraCSV at [https://interacsv.vercel.app/](https://interacsv.vercel.app/). This deployed version allows you to use all features of the application without setting up a local environment.

## Usage

1. Upload a CSV file using the file input or select a sample dataset from the dropdown.
2. Once data is loaded, use the dropdowns to select which columns to display on the X and Y axes.
3. Choose a chart type (bar, line, or scatter).
4. The chart will update automatically based on your selections.
5. View data insights for the selected Y-axis column on the right side of the chart.

## Project Structure

- `components/`: Contains React components like FileUpload, InteractiveChart, and DataInsights.
- `pages/`: Next.js pages, including the main application page.
- `public/sample-data/`: Contains sample CSV datasets.
- `styles/`: Global CSS styles.
- `utils/`: Utility functions, including trend line calculations.

## Contributing

Contributions to InteraCSV are welcome! Please feel free to submit a Pull Request.

## License

[MIT License](LICENSE)
