import { useState, useEffect } from 'react';
import Plot from 'react-plotly.js';


const CustomHeatmap = () => {
    // TODO: 
    // - replace csvData with data provided by props
    // - add option to remove plots. this will need to update the visualizations variable in ChartContainer 
    const [ heatmapData, setHeatmapData ] = useState()
    const [ plotLayout, setPlotLayout ] = useState()

    // TODO: once we start using real data, remove this
    function parseCSV(csvData) {
        // Split CSV data into rows
        const rows = csvData.split('\n').map(row => row.split(','));
    
        // Extract headers (first row) and data (remaining rows)
        const headers = rows[0];
        const data = rows.slice(1);
    
        // Return headers and data as an object
        return { headers, data };
    }
    
    // Function to create the heatmap
    function createHeatmap(csvData, parameter) {
        const { headers, data } = parseCSV(csvData);
    
        // TODO: why are these variables initialized?
        const x = [], y = [], z = [];
    
        
        const desalIndex = headers.indexOf('Desal 1 base cost');
        const disposalIndex = headers.indexOf('Disposal cost');
        const parameterIndex = headers.indexOf(parameter);
    
        // Extract unique x (Desal 1 base cost) and y (Disposal cost) values
        let uniqueX = [...new Set(data.map(row => parseFloat(row[desalIndex])))];
        let uniqueY = [...new Set(data.map(row => parseFloat(row[disposalIndex])))];
    
        // Ensure uniqueX and uniqueY have exactly 5 unique values each
        // why 5 unique values?
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
    
        // Plot the heatmap using Plotly
        // Plotly.newPlot('heatmap', [heatmapData], layout);

        // updated: rather than using the  Plotly module, we can handle the creation of the plot using state variables and Plotly's react API
        // 1) set heatmapData, layout as state variables
        // 2) use these as the data for a Plotly react component
        setHeatmapData([heatmapData])
        setPlotLayout(layout)
    }
    

    // TODO: rather than relying on DOM manipulation (which does not work well with React), we can dynamically generate the options using JSX
    // 1) store the headers in a state variable
    // 2) loop over the state variable to populate the option elements in the html return
    function populateDropdown(headers) {
        const dropdown = document.getElementById('parameterSelector');
    
        
        headers.forEach(header => {
            if (header !== 'Desal 1 base cost' && header !== 'Disposal cost') {
                const option = document.createElement('option');
                option.value = header;
                option.text = header;
                dropdown.appendChild(option);
            }
        });
    }
    
    // TODO: change this to onChange function to the select component (or onClick for the option components) 
    function setupDropdownEventListener(csvData) {
        const dropdown = document.getElementById('parameterSelector');
    
        // When the dropdown value changes, create a new heatmap with the selected parameter
        dropdown.addEventListener('change', () => {
            const selectedParameter = dropdown.value;
            createHeatmap(csvData, selectedParameter);
        });
    
        // Trigger the heatmap creation for the initial selection if the dropdown is not empty
        if (dropdown.options.length > 0) {
            createHeatmap(csvData, dropdown.options[0].value);
        }
    }
    
    // update: ultimately, we will want to take data as an input prop. for now, we will put the fetch in a useEffect
    // we do not want to call fetch() directly in a react component. if we do that, it will run upon every render
    // by putting it in a useEffect, we can control when this function is called
    useEffect(() => {
        fetch('./ExpData.csv')
        .then(response => response.text()) 
        .then(csvData => {
            const { headers, data } = parseCSV(csvData);
            populateDropdown(headers); 
            setupDropdownEventListener(csvData); 
        })
        .catch(error => console.error('Error loading CSV data:', error));
    }, [])
    

    return (
        <div>
            {/* 
                TODO: 
                1) replace label and select with MUI components
                2) loop through headers variable to populate options
                3) update styling to look clean
            */}
            <label for="parameterSelector">Select Parameter:</label>
            <select id="parameterSelector"></select>


            {/* 
                update: replace div with Ploty's Plot react component
            */}
            {/* <div id="heatmap"></div> */}
            {heatmapData && plotLayout && 
                <Plot
                    data={heatmapData}
                    layout={plotLayout}
                />
            }
                
        </div>
    )
}

export default CustomHeatmap;