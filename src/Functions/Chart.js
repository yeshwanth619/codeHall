import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

// Memoize the Chart component to prevent unnecessary renders
const Chart = React.memo(function Chart(props) {
  return (
    <div className="chart-container">
      <ResponsiveContainer width="100%" height={400}>
        {/* Create a LineChart component */}
        <LineChart
          data={props.cryptoData} // Data for the chart
          margin={{ top: 20, right: 30, left: 20, bottom: 10 }} // Chart margin
        >
          {/* Add a grid to the chart */}
          <CartesianGrid strokeDasharray="3 3" />

          {/* Define the X-axis */}
          <XAxis dataKey="time" />

          {/* Define the Y-axis */}
          <YAxis />

          {/* Show a tooltip on hover */}
          <Tooltip />

          {/* Show a legend */}
          <Legend />

          {/* Define the line chart */}
          <Line
            type="monotone" // Type of line
            dataKey="price" // Data key for the Y-values
            stroke="green" // Line color (green)
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
});

export default Chart;
