import { useState, useEffect } from 'react';
import Plot from 'react-plotly.js';
import { FormControl, InputLabel, Select, MenuItem, Button } from '@mui/material';


const CustomHeatmap = ({headers, data, removePlot, idx}) => {
    // TODO: 
    // - replace csvData with data provided by props(done) - i modified component to accept csv data as prop 
    // - add option to remove plots. this will need to update the visualizations variable in ChartContainer (done)
    // 1) set heatmapData, layout as state variables(d0ne initialized abouve)
    // 2) use these as the data for a Plotly react component(done inititlazed abouve )

    // const [headers, setHeaders] = useState([]); // isaac - Store column names for dropdown
    const [heatmapData, setHeatmapData] = useState(null); // isaac- Store heatmap data in format for plotly null so it doesnt try to load before anything is there 
    const [plotLayout, setPlotLayout] = useState(null); // isaac - store layout for plotly heatmap - only controls titles and color scales ( should we make it customizable)
    const [ selectedParameter, setSelectedParameter] = useState(null);
    // TODO: once we start using real data, remove this
    
    
    // Function to create the heatmap
    function createHeatmap(parameter) {
        // const { headers, data } = parseCSV(csvData);
    
        // TODO: why are these variables initialized?
        // were arrays to store the data for the values and we populate it later 
        
        const desalIndex = headers.indexOf('Desal 1 base cost');
        const disposalIndex = headers.indexOf('Disposal cost');
        const parameterIndex = headers.indexOf(parameter);
    
        // Extract unique x (Desal 1 base cost) and y (Disposal cost) values
        let uniqueX = [...new Set(data.map(row => parseFloat(row[desalIndex])))];
        let uniqueY = [...new Set(data.map(row => parseFloat(row[disposalIndex])))];
    
        // Ensure uniqueX and uniqueY have exactly 5 unique values each
        // why 5 unique values?

        // origionally chose 5 values as a default to make the heatmap cleaner there was alot of repeat variables in the data but only 5 values each 

        uniqueX = uniqueX.slice(0, 5);
        uniqueY = uniqueY.slice(0, 5);
    
        // Initialize zMatrix with null values
        const zMatrix = Array.from({ length: uniqueY.length }, () => Array(uniqueX.length).fill(null));
    
        // Populate the zMatrix with parameter values
        data.forEach(row => {
            const xValue = parseFloat(row[desalIndex]);
            const yValue = parseFloat(row[disposalIndex]);
            const parameterValue = parseFloat(row[parameterIndex]);
            const xIndex = uniqueX.indexOf(xValue);
            const yIndex = uniqueY.indexOf(yValue);
    
            // If x and y values are found in the unique lists, assign the parameter value to the zMatrix
            if (xIndex !== -1 && yIndex !== -1) {
                zMatrix[yIndex][xIndex] = parameterValue;
            }
        });
    
        // Create heatmap data for Plotly
        const heatmapData = {
            x: uniqueX,
            y: uniqueY,
            z: zMatrix,
            type: 'heatmap',
            colorbar: {
                title: parameter // Title for the colorbar (parameter name)
            }
        };
    
        // Define layout for the heatmap plot
        const layout = {
            title: `Heatmap of ${parameter}`, // Title of the heatmap
            xaxis: {
                title: 'Desal 1 base cost' // X-axis title
            },
            yaxis: {
                title: 'Disposal cost' // Y-axis title
            }
        };


        // updated: rather than using the  Plotly module, we can handle the creation of the plot using state variables and Plotly's react API
        setHeatmapData([heatmapData]);
        setPlotLayout(layout);
    }


    const handleSelectParameter = (e) => {
        createHeatmap(e.target.value)
        setSelectedParameter(e.target.value)
    }

    return (

        <div>
            <button onClick={() => removePlot(idx)}>Remove Plot</button>

            {/* 
                TODO: 
                1) Replace label and select with MUI components (Done)
                2) Loop through headers variable to populate options (Done)
                3) Update styling to look clean (Doneish)
            */}

            {/* QUESTION: Should we allow selecting multiple parameters or just one? - yes eventually */}
            <FormControl fullWidth>
                <InputLabel id="parameterSelector-label">Select Parameter</InputLabel>
                <Select
                    labelId="parameterSelector-label"
                    id="parameterSelector"
                    value={selectedParameter} // QUESTION: Should we store this value in a state?
                    onChange={handleSelectParameter} // QUESTION: What should happen when a value is selected?
                >
                    {headers.map((header, index) => (
                        <MenuItem key={index} value={header}>
                            {header}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            {/* 
                update: Replace div with Plotly's Plot react component (Done)
            */}
            {/* QUESTION: Do we need a loading state before showing the heatmap? */}
            {heatmapData && plotLayout && (
                <Plot
                    data={heatmapData}
                    layout={plotLayout}
                />
            )}
        </div>
    );
};

export default CustomHeatmap;