import React, { useState } from 'react';
import Plot from 'react-plotly.js';
import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Typography,
} from '@mui/material';

const ParallelCoordinatesPlot = ({ data, headers, removePlot, idx }) => {
  const [selectedColumns, setSelectedColumns] = useState([]);

  const handleColumnChange = (e) => {
    setSelectedColumns(e.target.value);
  };

  let dimensions = selectedColumns.map((colIndex) => ({
    label: headers[colIndex],
    values: data.map((row) => parseFloat(row[colIndex])),
    labelfont: { size: 14 },
    tickfont: { size: 12 },
  }));

  const numDims = dimensions.length;
  if (numDims > 1) {
    const totalSpan = 0.6;
    const gap = (1 - totalSpan) / (numDims - 1);
    const axisWidth = totalSpan / numDims;

    dimensions = dimensions.map((dim, i) => ({
      ...dim,
      domain: [
        i * (axisWidth + gap),
        i * (axisWidth + gap) + axisWidth,
      ],
    }));
  }

  const colorValues =
    selectedColumns.length > 0
      ? data.map((row) => parseFloat(row[selectedColumns[0]]))
      : data.map(() => 0);

  const colorTitle = selectedColumns.length
    ? headers[selectedColumns[0]]
    : '';

  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: 48 * 4 + 8, 
        width: 250,
      },
    },
  };

  return (
    <Box p={2}>
      <Button
        variant="contained"
        color="primary"
        onClick={() => removePlot(idx)}
        sx={{ mb: 3 }}            // more space after button
      >
        Remove Plot
      </Button>

      {/* External title for the selector */}
      <Typography variant="subtitle1" sx={{ mb: 1 }}>
      </Typography>

      <FormControl
        sx={{
          mb: 2,
          width: 300,            // fixed width
        }}
      >
        <InputLabel id="column-selector-label">Columns</InputLabel>
        <Select
          labelId="column-selector-label"
          id="column-selector"
          multiple
          value={selectedColumns}
          onChange={handleColumnChange}
          renderValue={(sel) =>
            sel.map((i) => headers[i] || `Col ${i}`).join(', ')
          }
          MenuProps={MenuProps}
          label="Columns"
        >
          {headers.map((header, j) => (
            <MenuItem key={j} value={j}>
              {header || `Column ${j}`}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Typography variant="h6" align="center" gutterBottom>
      </Typography>

      <Plot
        data={[

          {
            type: 'parcoords',
            line: {
              color: colorValues,
              colorscale: 'Viridis',
              showscale: true,
              colorbar: {

                titleside: 'right',
                thickness: 15,
              },
              opacity: 0.6,
            },
            dimensions,
          },
        ]}
        layout={{
          height: 600,
          margin: {
            t: 80,
            b: 50,
            l: 50,
            r: 80,
          },
        }}
      />
    </Box>
  );
};

export default ParallelCoordinatesPlot;
