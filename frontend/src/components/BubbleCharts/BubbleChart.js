import React, { useState } from 'react';
import Plot from 'react-plotly.js';
import { Box, FormControl, InputLabel, Select, MenuItem, Button, Grid, Typography } from '@mui/material';

/*
  It  accepts data and headers via props.
  Three dropdown menus let the user select which columns to use for:
    • X Axis
    • Y Axis
    • Bubble Size
*/
const BubbleChart = ({ data, headers, idx, removePlot }) => {
  // ADDED: States to hold selected column indices for X, Y, and Bubble Size.
  // Defaulting to the first three columns.
  const [xAxis, setXAxis] = useState(0);
  const [yAxis, setYAxis] = useState(1);
  const [sizeAxis, setSizeAxis] = useState(2);

  // ADDED: Handler functions for the dropdown changes.
  const handleXChange = (e) => {
    setXAxis(e.target.value);
  };

  const handleYChange = (e) => {
    setYAxis(e.target.value);
  };

  const handleSizeChange = (e) => {
    setSizeAxis(e.target.value);
  };

  // MenuProps for scrollable dropdown
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: 48 * 4 + 8, // show up to 4 items, then scroll
        width: 200,
      },
    },
  };

  // ADDED: Create Plotly trace using the selected columns.
  // Data values for x, y, and bubble size are mapped and parsed to floats.
  const plotData = [
    {
      x: data.map(row => parseFloat(row[xAxis])),
      y: data.map(row => parseFloat(row[yAxis])),
      mode: 'markers',
      marker: {
        size: data.map(row => parseFloat(row[sizeAxis])), // size determined by chosen column
        sizemode: 'area',
      },
      text: data.map((row, i) => `Point ${i + 1}`),
      type: 'scatter',
    },
  ];

  // ADDED: Layout configuration with axis titles dynamically set based on selected headers.
  const layout = {
    title: 'Bubble Chart',
    xaxis: { title: headers[xAxis] },
    yaxis: { title: headers[yAxis] },
    height: 400,
    width: 500,
  };

  return (
    <div>
      {/* ADDED: Dropdown selectors for Bubble Chart configuration */}
      <Button variant="contained" color="primary" onClick={() => removePlot(idx)} sx={{ mb: 2 }}>
        Remove Plot
      </Button>

      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mb: 2 }}>
        <FormControl sx={{ width: 200 }}>
          <InputLabel id="x-axis-select-label">X Axis</InputLabel>
          <Select
            labelId="x-axis-select-label"
            value={xAxis}
            label="X Axis"
            onChange={handleXChange}
            MenuProps={MenuProps}
          >
            {headers.map((header, index) => (
              <MenuItem key={index} value={index}>
                {header || `Column ${index}`}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl sx={{ width: 200 }}>
          <InputLabel id="y-axis-select-label">Y Axis</InputLabel>
          <Select
            labelId="y-axis-select-label"
            value={yAxis}
            label="Y Axis"
            onChange={handleYChange}
            MenuProps={MenuProps}
          >
            {headers.map((header, index) => (
              <MenuItem key={index} value={index}>
                {header || `Column ${index}`}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl sx={{ width: 200 }}>
          <InputLabel id="size-axis-select-label">Bubble Size</InputLabel>
          <Select
            labelId="size-axis-select-label"
            value={sizeAxis}
            label="Bubble Size"
            onChange={handleSizeChange}
            MenuProps={MenuProps}
          >
            {headers.map((header, index) => (
              <MenuItem key={index} value={index}>
                {header || `Column ${index}`}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      {/* ADDED: Render the Plotly bubble chart using dynamic data */}
      <Plot data={plotData} layout={layout} />
    </div>
  );
};

export default BubbleChart;
