import React, { useState } from 'react';
import Plot from 'react-plotly.js';
import { Box, FormControl, InputLabel, Select, MenuItem, Button, Grid, Typography } from '@mui/material';


const Scatter3DChart = ({ data, headers, idx, removePlot }) => {
  // Defaults are set to the first three columns.
  const [xAxis, setXAxis] = useState(0);
  const [yAxis, setYAxis] = useState(1);
  const [zAxis, setZAxis] = useState(2);

  const handleXChange = (e) => {
    setXAxis(e.target.value);
  };

  const handleYChange = (e) => {
    setYAxis(e.target.value);
  };

  const handleZChange = (e) => {
    setZAxis(e.target.value);
  };

  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: 48 * 4 + 8,
        width: 200,
      },
    },
  };

 
  const plotData = [
    {
      x: data.map(row => parseFloat(row[xAxis])),
      y: data.map(row => parseFloat(row[yAxis])),
      z: data.map(row => parseFloat(row[zAxis])),
      mode: 'markers',
      marker: {
        size: 5,
        
        color: data.map(row => parseFloat(row[xAxis])),
        showscale: true,
        colorbar: { title: headers[xAxis] },  
      },
      type: 'scatter3d',
      name: 'Data Points',    
      showlegend: true,        
    },
  ];

  
  const layout = {
    title: '3D Scatter Plot',
    showlegend: true,         
    legend: {
      orientation: 'h',
      x: 0,
      y: 1.1,
    },
    scene: {
      xaxis: { title: headers[xAxis] },
      yaxis: { title: headers[yAxis] },
      zaxis: { title: headers[zAxis] },
    },
    margin: { l: 0, r: 0, b: 0, t: 50 },
  };

  return (
    <div>
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
          <InputLabel id="z-axis-select-label">Z Axis</InputLabel>
          <Select
            labelId="z-axis-select-label"
            value={zAxis}
            label="Z Axis"
            onChange={handleZChange}
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

     
      <Plot data={plotData} layout={layout} />
    </div>
  );
};

export default Scatter3DChart;
