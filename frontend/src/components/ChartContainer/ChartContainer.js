import React, { useState, useEffect } from 'react';
import GridLayout from 'react-grid-layout';
import { Grid, Stack } from '@mui/material'
import Heatmap from '../Heatmap/Heatmap';
import { FaDownload } from "react-icons/fa";


const ChartContainer = () => {
  const [layout, setLayout] = useState([]);
  const [visualizations, setVisualizations] = useState([]);
  const [selectedVisualizationType, setSelectedVisualizationType] = useState('heatmap');

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

  return (
    <div>
        {/* 
            TODO:
            1) use MUI components for buttons, other applicable components
            2) clean up styling
            3) figure out what's going on with GridLayout. It jumps around and doesn't drag smoothly
        */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '16px' }}>
        <button
          className="download-button"
          onClick={downloadData}
          style={{ background: 'none', border: 'none', cursor: 'pointer' }}
        >
          <FaDownload size={24} />
        </button>
      </div>
      <select
        value={selectedVisualizationType}
        onChange={handleVisualizationChange}
        className="visualization-select"
      >
        <option value="heatmap">Heatmap</option>
        {/* <option value="parallelCoordinate">Parallel Coordinate Plot</option> */}
      </select>
      <button onClick={addHeatmap}>Add Heatmap</button>
      {/* <GridLayout
        className="layout"
        layout={layout}
        cols={12}
        rowHeight={30}
        width={1200}
        onLayoutChange={newLayout => setLayout(newLayout)}
      > */}
      <Stack direction='column'>
        {visualizations.map(vis =>
          vis.type === 'heatmap' ? (
            <div key={vis.id} data-grid={layout.find(item => item.i === vis.id)}>
              <Heatmap />
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
