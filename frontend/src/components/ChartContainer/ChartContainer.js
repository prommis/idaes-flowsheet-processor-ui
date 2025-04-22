import React, { useState, useEffect } from 'react';
import GridLayout from 'react-grid-layout';
import { Grid, Stack, Box, Container, Button, IconButton, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import Heatmap from '../Heatmap/Heatmap';
import ParallelCoordinatesPlot from '../ParallelCoordinatesPlot/ParallelCoordinatesPlot';
import { FaDownload } from "react-icons/fa";
import BubbleChart from '../BubbleCharts/BubbleChart';
import Scatter3DChart from '../Scatter3dChart/Scatter3dChart';

const ChartContainer = ({ headers, data }) => {
  const [layout, setLayout] = useState([]);
  const [visualizations, setVisualizations] = useState([]);
  const [heatmapData, setHeatmapData] = useState({ headers: null, data: null });
  const [selectedVisualizationType, setSelectedVisualizationType] = useState('heatmap');
  const [selectedColumns, setSelectedColumns] = useState([]);  // select columns for parallel coordinates plot ( added by isaac )

 
  // TODO: once the functionality is set, use the proper props data
  useEffect(() => {
    if (headers && data) {
      setHeatmapData({
        headers: headers, data: data
      });
    }
  }, [headers, data]);

 
  // Function to add a new visualization
  const addVisualization = () => {
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

    // ISAAC: Updated the layout item creation to work with any visualization type.
    const newLayoutItem = {
      i: `${selectedVisualizationType}-${Date.now()}`,
      x: newX,
      y: newY,
      w: 4,
      h: 4,
    };

    // updating the layout state from the previous state into our new layout box 
    setLayout(prev => [...prev, newLayoutItem]);
    // ISAAC: Add new visualization item with the selected visualization type
    setVisualizations(prev => [...prev, { id: newLayoutItem.i, type: selectedVisualizationType }]);
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
    useEffect(() => {
      // Automatically save data when it changes
      const saveData = () => {
        const data = { layout, visualizations };
        localStorage.setItem('visualizationData', JSON.stringify(data));
      };
  
      saveData();
    }, [layout, visualizations]);

  // TODO: fill this out


// Remove visualization by index
const removePlot = (index) => {
  console.log(index)
  // Create a temporary copy of the current visualizations array.
  let tempVisualizations = [...visualizations];

  // Remove the visualization at the given index.
  // This returns an array with the removed element; we get the first element (i.e., the removed visualization).
  const removedPlot = tempVisualizations.splice(index, 1)[0];

  // Update the visualizations state with the modified array.
  setVisualizations(tempVisualizations);

  // Also update the layout state by filtering out the layout element corresponding to the removed visualization.
  setLayout(prevLayout => prevLayout.filter(layoutItem => layoutItem.i !== removedPlot.id));
};

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      
      {/* 
        
      */}
      {/* Header: Controls aligned left with better spacing */}
      <Stack 
        direction="row" 
        spacing={2} 
        alignItems="center" 
        justifyContent="flex-start" 
        sx={{ mb: 3 }}
      >
        {/* Changed from native select to MUI FormControl, InputLabel, Select, and MenuItem */}
        <Box sx={{ flexGrow: 1, maxWidth: 400 }}>
          <FormControl fullWidth>
            <InputLabel id="visualization-select-label">Visualization</InputLabel>
            <Select
              labelId="visualization-select-label"
              id="visualization-select"
              value={selectedVisualizationType}
              label="Visualization"
              onChange={handleVisualizationChange}
            >
              <MenuItem value="heatmap">Heatmap</MenuItem>
              <MenuItem value="parallel">Parallel Coordinate Plot</MenuItem>
              {/* ADDED: New menu option for Bubble Chart */}
              <MenuItem value="bubble">Bubble Chart</MenuItem>
              {/* ADDED: New menu option for 3D Scatter Plot */}
              <MenuItem value="scatter3d">3D Scatter Plot</MenuItem>
            </Select>
          </FormControl>
        </Box>
        
        {/* Changed from native div with a button to MUI components for the download button */}
        <IconButton onClick={downloadData}>
          <FaDownload size={24} />
        </IconButton>
  
        {/* Changed from native button to MUI Button for adding a visualization */}
        <Button variant="contained" onClick={addVisualization}> 
          Add { 
            selectedVisualizationType === 'heatmap'
              ? 'Heatmap'
              : selectedVisualizationType === 'parallel'
              ? 'Parallel Plot'
              : selectedVisualizationType === 'bubble'
              ? 'Bubble Chart'
              : selectedVisualizationType === 'scatter3d'
              ? '3D Scatter Chart'
              : ''
          }
        </Button>
      </Stack>
      
      {/* Visualization area */}
      <Box 
        sx={{ 
          width: '100%', 
          height: 'calc(100vh - 150px)', // Adjust to give more room on load
          overflow: 'auto',
          p: 2,
          border: '1px solid #e0e0e0',
          borderRadius: 1
        }}

        // TODO : add some sort of thing that can show the difference betweeen both charts 
      >
        <Stack spacing={2}>
          {visualizations.map((vis, idx) =>
            vis.type === 'heatmap' ? (
              <div key={vis.id} data-grid={layout.find(item => item.i === vis.id)}>
                <Heatmap 
                  data={heatmapData.data} 
                  headers={heatmapData.headers} 
                  idx={idx} 
                  removePlot={removePlot}
                />
              </div>
            ) : vis.type === 'parallel' ? (
              <div key={vis.id} data-grid={layout.find(item => item.i === vis.id)}>
                <ParallelCoordinatesPlot 
                  data={heatmapData.data} 
                  headers={heatmapData.headers} 
                  idx={idx}
                  removePlot={removePlot}
                />
              </div>
            ) : vis.type === 'bubble' ? (
              <div key={vis.id} data-grid={layout.find(item => item.i === vis.id)}>
                {/* ADDED: Render the BubbleChart component */}
                <BubbleChart 
                  data={heatmapData.data}
                  headers={heatmapData.headers}
                  idx={idx}
                  removePlot={removePlot}
                />
              </div>
            ) : vis.type === 'scatter3d' ? (
              <div key={vis.id} data-grid={layout.find(item => item.i === vis.id)}>
                {/* ADDED: Render the 3D Scatter Chart component */}
                <Scatter3DChart 
                  data={heatmapData.data}
                  headers={heatmapData.headers}
                  idx={idx}
                  removePlot={removePlot}
                />
              </div>
            ) : (
              <div key={vis.id} data-grid={layout.find(item => item.i === vis.id)}>
                {/* Other visualization types could be handled here */}
              </div>
            )
          )}
        </Stack>
      </Box>
      
      {/* 
        <GridLayout
          className="layout"
          layout={layout}
          cols={12}
          rowHeight={30}
          width={1200}
          onLayoutChange={newLayout => setLayout(newLayout)}
        >
        </GridLayout>
      */}
    </Container>
  );
};

export default ChartContainer;
