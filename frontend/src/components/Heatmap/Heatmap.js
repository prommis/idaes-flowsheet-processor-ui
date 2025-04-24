import { useState, useEffect } from 'react';
import Plot from 'react-plotly.js';
import { Box, FormControl, InputLabel, Select, MenuItem, Button, Grid, Typography } from '@mui/material';

const Heatmap = ({ headers, data, removePlot, idx }) => {
   

    const [heatmapData, setHeatmapData] = useState(null); 
    const [plotLayout, setPlotLayout] = useState(null);  
    const [selectedParameter, setSelectedParameter] = useState(null); 
    const [xParam, setXParam] = useState(''); 
    const [yParam, setYParam] = useState(''); 
    const [zParam, setZParam] = useState(''); 

    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: 48 * 4 + 8, 
                width: 200,
            },
        },
    };

    function createHeatmap(xParam, yParam, zParam) {
        const xIndex = headers.indexOf(xParam);
        const yIndex = headers.indexOf(yParam);
        const zIndex = headers.indexOf(zParam);

        let uniqueX = [...new Set(data.map(row => parseFloat(row[xIndex])))];
        let uniqueY = [...new Set(data.map(row => parseFloat(row[yIndex])))];

        const zMatrix = Array.from({ length: uniqueY.length }, () => Array(uniqueX.length));

        data.forEach(row => {
            const xValue = parseFloat(row[xIndex]);
            const yValue = parseFloat(row[yIndex]);
            const zValue = parseFloat(row[zIndex]);
            const i = uniqueY.indexOf(yValue);
            const j = uniqueX.indexOf(xValue);
            if (i !== -1 && j !== -1) {
                zMatrix[i][j] = zValue;
            }
        });

        const heatmapTrace = {
            x: uniqueX,
            y: uniqueY,
            z: zMatrix,
            type: 'heatmap',
            colorbar: { title: zParam }
        };

        const layout = {
            title: `${zParam}`,
            xaxis: { title: xParam },
            yaxis: { title: yParam }
        };

        setHeatmapData([heatmapTrace]);
        setPlotLayout(layout);
    }

    // Automatically regenerate when parameters change
    useEffect(() => {
        if (xParam && yParam && zParam) {
            createHeatmap(xParam, yParam, zParam);
        }
    }, [xParam, yParam, zParam]);

    return (
        <Box sx={{ p: 2 }}>
            <Button variant="contained" color="primary" onClick={() => removePlot(idx)} sx={{ mb: 2 }}>
                Remove Plot
            </Button>

           

            <Grid container spacing={2} sx={{ my: 2, justifyContent: 'center' }}>
                <Grid item xs={12} sm={4}>
                    <FormControl fullWidth sx={{ maxWidth: 200 }}>
                        <InputLabel id="x-param-label">X Axis</InputLabel>
                        <Select
                            labelId="x-param-label"
                            value={xParam}
                            label="X Axis"
                            onChange={(e) => setXParam(e.target.value)}
                            MenuProps={MenuProps}
                        >
                            {headers.map((header, index) => (
                                <MenuItem key={index} value={header}>
                                    {header}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>

                <Grid item xs={12} sm={4}>
                    <FormControl fullWidth sx={{ maxWidth: 200 }}>
                        <InputLabel id="y-param-label">Y Axis</InputLabel>
                        <Select
                            labelId="y-param-label"
                            value={yParam}
                            label="Y Axis"
                            onChange={(e) => setYParam(e.target.value)}
                            MenuProps={MenuProps}
                        >
                            {headers.map((header, index) => (
                                <MenuItem key={index} value={header}>
                                    {header}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>

                <Grid item xs={12} sm={4}>
                    <FormControl fullWidth sx={{ maxWidth: 200 }}>
                        <InputLabel id="z-param-label">Z Axis</InputLabel>
                        <Select
                            labelId="z-param-label"
                            value={zParam}
                            label="Z Parameter"
                            onChange={(e) => setZParam(e.target.value)}
                            MenuProps={MenuProps}
                        >
                            {headers.map((header, index) => (
                                <MenuItem key={index} value={header}>
                                    {header}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>


            {heatmapData && plotLayout ? (
                <Plot data={heatmapData} layout={plotLayout} />
            ) : (
                <Typography>Select all parameters to generate the heatmap.</Typography>
            )}
        </Box>
    );
};

export default Heatmap;
