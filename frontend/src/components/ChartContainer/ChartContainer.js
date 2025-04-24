import React, { useState, useEffect } from 'react';
import {
  Grid,
  Stack,
  Box,
  Container,
  Button,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
} from '@mui/material';
import Heatmap from '../Heatmap/Heatmap';
import ParallelCoordinatesPlot from '../ParallelCoordinatesPlot/ParallelCoordinatesPlot';
import { FaDownload } from 'react-icons/fa';
import BubbleChart from '../BubbleCharts/BubbleChart';
import Scatter3DChart from '../Scatter3dChart/Scatter3dChart';

const ChartContainer = ({ headers, data }) => {
  const [layout, setLayout] = useState([]);
  const [visualizations, setVisualizations] = useState([]);
  const [heatmapData, setHeatmapData] = useState({ headers: null, data: null });
  const [selectedVisualizationType, setSelectedVisualizationType] = useState('heatmap');
  const [selectedColumns, setSelectedColumns] = useState([]);  

  useEffect(() => {
    if (headers && data) {
      setHeatmapData({ headers, data });
    }
  }, [headers, data]);

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

    const newLayoutItem = {
      i: `${selectedVisualizationType}-${Date.now()}`,
      x: newX,
      y: newY,
      w: 4,
      h: 4,
    };

    // updating the layout state from the previous state into our new layout box 
    setLayout(prev => [...prev, newLayoutItem]);
    setVisualizations(prev => [...prev, { id: newLayoutItem.i, type: selectedVisualizationType }]);
  };

  // Function to handle visualization type switch
  const handleVisualizationChange = (event) => {
    setSelectedVisualizationType(event.target.value);
  };

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

  // useEffect(() => {
  //   const saveData = () => {
  //     const data = { layout, visualizations };
  //     localStorage.setItem('visualizationData', JSON.stringify(data));
  //   };
  //   saveData();
  // }, [layout, visualizations]);

  const removePlot = (index) => {
    console.log(index);
    let tempVisualizations = [...visualizations];
    const removedPlot = tempVisualizations.splice(index, 1)[0];
    setVisualizations(tempVisualizations);
    setLayout(prevLayout => prevLayout.filter(item => item.i !== removedPlot.id));
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Stack 
        direction="row" 
        spacing={2} 
        alignItems="center" 
        justifyContent="center" 
        sx={{ mb: 3 }}
      >
        {/* Visualization selector */}
        <Box sx={{ maxWidth: 400 }}>
          <FormControl fullWidth>
            <InputLabel id="visualization-select-label">Visualization</InputLabel>
            <Select
              labelId="visualization-select-label"
              id="visualization-select"
              value={selectedVisualizationType}
              label="Visualization"
              onChange={handleVisualizationChange}
            >
              <MenuItem value="parallel">Parallel Coordinate Plot</MenuItem>
            
              <MenuItem value="scatter3d">3D Scatter Plot</MenuItem>
            </Select>
          </FormControl>
        </Box>
        
  
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
      
      <Box 
        sx={{ 
          width: '100%', 
          height: 'calc(100vh - 150px)', 
          overflow: 'auto',
          p: 2,
          border: '1px solid #e0e0e0',
          borderRadius: 1
        }}
      >
        <Stack spacing={2} alignItems="center">
          {visualizations.map((vis, idx) => {
            let borderColor = 'grey.300';
            let label = '';
            switch (vis.type) {
              case 'heatmap':
                label = 'Heatmap';
                break;
              case 'parallel':
                label = 'Parallel Coordinates Plot';
                break;
              case 'bubble':
                label = 'Bubble Chart';
                break;
              case 'scatter3d':
                label = '3D Scatter Plot';
                break;
            }

            return (
              <Box
                key={vis.id}
                data-grid={layout.find(item => item.i === vis.id)}
                sx={{
                  border: 2,
                  borderColor,
                  borderRadius: 1,
                  p: 1,
                  width: '100%',    
                  maxWidth: 800,      
                  boxShadow: 3,
                  '&:hover': {
                    boxShadow: 6,
                  }
                }}
              >
                {label && (
                  <Typography variant="subtitle2" sx={{ mb: 1, textAlign: 'center' }}>
                    {label}
                  </Typography>
                )}
                {vis.type === 'heatmap' && (
                  <Heatmap 
                    data={heatmapData.data} 
                    headers={heatmapData.headers} 
                    idx={idx} 
                    removePlot={removePlot}
                  />
                )}
                {vis.type === 'parallel' && (
                  <ParallelCoordinatesPlot 
                    data={heatmapData.data} 
                    headers={heatmapData.headers} 
                    idx={idx}
                    removePlot={removePlot}
                  />
                )}
                {vis.type === 'bubble' && (
                  <BubbleChart 
                    data={heatmapData.data}
                    headers={heatmapData.headers}
                    idx={idx}
                    removePlot={removePlot}
                  />
                )}
                {vis.type === 'scatter3d' && (
                  <Scatter3DChart 
                    data={heatmapData.data}
                    headers={heatmapData.headers}
                    idx={idx}
                    removePlot={removePlot}
                  />
                )}
              </Box>
            );
          })}
        </Stack>
      </Box>
    </Container>
  );
};

export default ChartContainer;
