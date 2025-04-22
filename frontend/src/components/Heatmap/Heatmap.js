import { useState } from 'react';
import Plot from 'react-plotly.js';
import { Box, FormControl, InputLabel, Select, MenuItem, Button, Grid, Typography } from '@mui/material';

const Heatmap = ({ headers, data, removePlot, idx }) => {
    // TODO: 
    // - replace csvData with data provided by props(done) - i modified component to accept csv data as prop 
    // - add option to remove plots. this will need to update the visualizations variable in ChartContainer (done)
    // 1) set heatmapData, layout as state variables(d0ne initialized aboue)
    // 2) use these as the data for a Plotly react component(done inititlazed aboue )

    // const [headers, setHeaders] = useState([]); // isaac - Store column names for dropdown
    const [heatmapData, setHeatmapData] = useState(null); // isaac- Store heatmap data in format for plotly null so it doesnt try to load before anything is there 
    const [plotLayout, setPlotLayout] = useState(null); // isaac - store layout for plotly heatmap - only controls titles and color scales ( should we make it customizable)
    const [selectedParameter, setSelectedParameter] = useState(null); // <-- kept in case you're still using it somewhere
    // const [ xIndex, setXIndex ] = useState(0)
    const [xParam, setXParam] = useState(''); // Added
    const [yParam, setYParam] = useState(''); // Added
    const [zParam, setZParam] = useState(''); // Added
    // TODO: once we start using real data, remove this

    // Function to create the heatmap
    function createHeatmap(xParam, yParam, zParam) { // i changed the  Fixed argument names
        const xIndex = headers.indexOf(xParam); // Replaced  index
        const yIndex = headers.indexOf(yParam); // 
        const zIndex = headers.indexOf(zParam); // 

        // Extract unique x and y values  
        // Todo : Dont remove duplicate values 
        // do regular array instead??


        let uniqueX = [...new Set(data.map(row => parseFloat(row[xIndex])))]; // Replaced desalIndex
        let uniqueY = [...new Set(data.map(row => parseFloat(row[yIndex])))]; // Replaced disposalIndex

        // console.log(uniqueX,uniqueY)
        //     uniqueX = [...(data.map(row => parseFloat(row[xIndex])))]; // Replaced desalIndex
        //     uniqueY = [...(data.map(row => parseFloat(row[yIndex])))]; // Replaced disposalIndex

        // console.log(uniqueX,uniqueY)


        // Ensure uniqueX and uniqueY have exactly 5 unique values each
        // why 5 unique values?
        // origionally chose 5 values as a default to make the heatmap cleaner there was alot of repeat variables in the data but only 5 values each 

        // uniqueX = uniqueX.slice(0, 5);
        // uniqueY = uniqueY.slice(0, 5);

        // Initialize zMatrix with null values
        const zMatrix = Array.from({ length: uniqueY.length }, () => Array(uniqueX.length));
        console.log(zMatrix)


        // Populate the zMatrix with parameter values
        data.forEach(row => {
            const xValue = parseFloat(row[xIndex]);
            const yValue = parseFloat(row[yIndex]);
            const zValue = parseFloat(row[zIndex]); // Renamed from zParamValue

            const i = uniqueY.indexOf(yValue); //  i = y-index
            const j = uniqueX.indexOf(xValue); // j = x-index

            // If x and y values are found in the unique lists, assign the parameter value to the zMatrix this is same code i just changed variables 
            if (i !== -1 && j !== -1) {
                zMatrix[i][j] = zValue; // Corrected 
            }
        });

        // Create heatmap data for Plotly
        const heatmapData = {
            x: uniqueX,
            y: uniqueY,
            z: zMatrix,
            type: 'heatmap',
            colorbar: {
                title: zParam // Title for the colorbar (parameter name)
            }
        };

        // Define layout for the heatmap plot
        const layout = {
            title: `Heatmap of ${zParam}`, // Title of the heatmap
            xaxis: {
                title: xParam // X-axis title
            },
            yaxis: {
                title: yParam // Y-axis title
            }
        };

        // updated: rather than using the Plotly module, we can handle the creation of the plot using state variables and Plotly's react API
        setHeatmapData([heatmapData]);
        setPlotLayout(layout);
    }

    const handleGenerate = () => { //  custom generation
        if (xParam && yParam && zParam) {
            createHeatmap(xParam, yParam, zParam);
        }
    };

    return (
        <Box sx={{ p: 2 }}>
            <Button variant="contained" color="primary" onClick={() => removePlot(idx)}>
                Remove Plot
            </Button>

            {/* 
                TODO: 
                1) Replace label and select with MUI components (Done)
                2) Loop through headers variable to populate options (Done)
                3) Update styling to look clean (Doneish)
            */}

            {/* QUESTION: Should we allow selecting multiple parameters or just one? - yes eventually */}
            <Grid container spacing={2} sx={{ my: 2 }}>
                <Grid item xs={12} sm={4}>
                    <FormControl fullWidth>
                        <InputLabel id="x-param-label">X Axis</InputLabel>
                        <Select
                            labelId="x-param-label"
                            value={xParam}
                            label="X Axis"
                            onChange={(e) => setXParam(e.target.value)}
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
                    <FormControl fullWidth>
                        <InputLabel id="y-param-label">Y Axis</InputLabel>
                        <Select
                            labelId="y-param-label"
                            value={yParam}
                            label="Y Axis"
                            onChange={(e) => setYParam(e.target.value)}
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
                    <FormControl fullWidth>
                        <InputLabel id="z-param-label">Z Axis</InputLabel>
                        <Select
                            labelId="z-param-label"
                            value={zParam}
                            label="Z Parameter"
                            onChange={(e) => setZParam(e.target.value)}
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
   

          {/* center button or move somewhere better */}
            <Button
                variant="contained"
                color = 'primary'
                onClick={handleGenerate}
                disabled={!xParam || !yParam || !zParam}
                sx={{ mb: 2 }}
            >
                {/* TODO : move abouve  */}
                Generate Heatmap
            </Button>

            {/* 
                update: Replace div with Plotly's Plot react component (Done)
            */}
            {/* QUESTION: Do we need a loading state before showing the heatmap? */}
            {heatmapData && plotLayout ? (
                <Plot data={heatmapData} layout={plotLayout} />
            ) : (
                <Typography>Select all parameters to generate the heatmap.</Typography>
            )}
        </Box>
    );
};

export default Heatmap;
