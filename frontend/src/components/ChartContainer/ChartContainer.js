import React, { useState, useEffect } from 'react';
import GridLayout from 'react-grid-layout';
import { Grid, Stack, Button, IconButton, FormControl, InputLabel, Select, MenuItem } from '@mui/material'
import Heatmap from '../Heatmap/Heatmap';
import { FaDownload } from "react-icons/fa";


const ChartContainer = ({headers, data}) => {
  const [layout, setLayout] = useState([]);
  const [visualizations, setVisualizations] = useState([]);
  const [ heatmapData, setHeatmapData ] = useState({headers: null, data: null})
  const [selectedVisualizationType, setSelectedVisualizationType] = useState('heatmap');

    useEffect(() => {
      fetch('./ExpData.csv')
      .then(response => response.text()) 
      .then(csvData => {
          const { headers, data } = parseCSV(csvData);
          setHeatmapData({
            headers: headers, data: data
          })
      })
      .catch(error => console.error('Error loading CSV data:', error));
  }, [])


  // TODO: once the functionality is set, use the proper props data
//   useEffect(() => {
//     if (headers && data) {
//       setHeatmapData({
//         headers: headers, data: data
//       })
//     }
// }, [headers, data])

  function parseCSV(csvData) {
      // Split CSV data into rows
      const rows = csvData.split('\n').map(row => row.split(','));

      // Extract headers (first row) and data (remaining rows)
      const headers = rows[0];
      const data = rows.slice(1);

      console.log('headers, data')
      console.log(headers)
      console.log(data)
      return { headers, data }
  }

  // Function to add a new heatmap
  const addHeatmap = () => {
    const existingPositions = layout.map(item => ({ x: item.x, y: item.y }));
    let newX = 0, newY = 0;
    let foundSpot = false;

    while (!foundSpot) {
      if (!existingPositions.some(pos => pos.x === newX && pos.y === newY)) {
        foundSpot = true;
      } else {
        newX += 1;
        if (newX >= 12) {
          newX = 0;
          newY += 1;
        }
      }
    }

    const newLayoutItem = {
      i: `heatmap-${Date.now()}`,
      x: newX,
      y: newY,
      w: 4, // Adjust width as needed
      h: 4, // Adjust height as needed
    };

    setLayout([...layout, newLayoutItem]);
    setVisualizations([...visualizations, { id: newLayoutItem.i, type: 'heatmap' }]);
  };

  // Function to handle visualization type switch
  const handleVisualizationChange = (event) => {
    setSelectedVisualizationType(event.target.value);
  };

  // Download data function
  const downloadData = () => {
    const data = { layout, visualizations };
    const blob = new Blob([JSON.stringify(data)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'data.json';
    link.click();
    URL.revokeObjectURL(url);
  };


  // Update: let's hold off on saving data for now
//   useEffect(() => {
//     // Automatically save data when it changes
//     const saveData = () => {
//       const data = { layout, visualizations };
//       localStorage.setItem('visualizationData', JSON.stringify(data));
//     };

//     saveData();
//   }, [layout, visualizations]);


  // TODO: fill this out
  const removePlot = (index) => {

  }

  return (
    <div>
        {/* 
            TODO:
            1) use MUI components for buttons, other applicable components - done 
            2) clean up styling - still being worked 
            3) figure out what's going on with GridLayout. It jumps around and doesn't drag smoothly - o
        */}
      {/* Changed from native div with a button to MUI components for the download button */}
      <Stack direction="row" justifyContent="flex-end" mb={2}>
        <IconButton onClick={downloadData}>
          <FaDownload size={24} />
        </IconButton>
      </Stack>
      
      {/* Changed from native select to MUI FormControl, InputLabel, Select, and MenuItem */}
      <FormControl sx={{ minWidth: 120, mb: 2 }}>
        <InputLabel id="visualization-select-label">Visualization</InputLabel>
        <Select
          labelId="visualization-select-label"
          id="visualization-select"
          value={selectedVisualizationType}
          label="Visualization"
          onChange={handleVisualizationChange}
        >
          <MenuItem value="heatmap">Heatmap</MenuItem>
          {/* <MenuItem value="parallelCoordinate">Parallel Coordinate Plot</MenuItem> */}
        </Select>
      </FormControl>
      
      {/* Changed from native button to MUI Button for adding a heatmap */}
      <Button variant="contained" onClick={addHeatmap}>
        Add Heatmap
      </Button>
      
      {/* <GridLayout
        className="layout"
        layout={layout}
        cols={12}
        rowHeight={30}
        width={1200}
        onLayoutChange={newLayout => setLayout(newLayout)}
      > */}
      <Stack direction='column'>
        {visualizations.map((vis, idx) =>
          vis.type === 'heatmap' ? (
            <div key={vis.id} data-grid={layout.find(item => item.i === vis.id)}>
              <Heatmap data={heatmapData.data} headers={heatmapData.headers} idx={idx} removePlot={removePlot}/>
            </div>
          ) : (
            <div key={vis.id} data-grid={layout.find(item => item.i === vis.id)}>
              
            </div>
          )
        )}
      </Stack>
        
      {/* </GridLayout> */}
    </div>
  );
};

export default ChartContainer;
