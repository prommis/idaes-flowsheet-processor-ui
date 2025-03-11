

// Function to parse CSV data
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
  // Parse CSV data to get headers and data
  const { headers, data } = parseCSV(csvData);

  // Initialize arrays for x, y, and z (parameter) values
  const x = [], y = [], z = [];

  // Get the indices of the relevant columns
  const desalIndex = headers.indexOf('Desal 1 base cost');
  const disposalIndex = headers.indexOf('Disposal cost');
  const parameterIndex = headers.indexOf(parameter);

  // Extract unique x (Desal 1 base cost) and y (Disposal cost) values
  let uniqueX = [...new Set(data.map(row => parseFloat(row[desalIndex])))];
  let uniqueY = [...new Set(data.map(row => parseFloat(row[disposalIndex])))];

  // Ensure uniqueX and uniqueY have exactly 5 unique values each
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
  Plotly.newPlot('heatmap', [heatmapData], layout);
}

// Populate the dropdown menu with column names
function populateDropdown(headers) {
  const dropdown = document.getElementById('parameterSelector');

  // Add options to the dropdown for each header except 'Desal 1 base cost' and 'Disposal cost'
  headers.forEach(header => {
      if (header !== 'Desal 1 base cost' && header !== 'Disposal cost') {
          const option = document.createElement('option');
          option.value = header;
          option.text = header;
          dropdown.appendChild(option);
      }
  });
}

// Set up event listener for the dropdown menu
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

// Load and parse the CSV file
fetch('ExpData.csv')
  .then(response => response.text()) // Fetch the CSV file and convert to text
  .then(csvData => {
      const { headers } = parseCSV(csvData); // Parse the CSV data to get headers
      populateDropdown(headers); // Populate the dropdown with the headers
      setupDropdownEventListener(csvData); // Set up the dropdown event listener
  })
  .catch(error => console.error('Error loading CSV data:', error)); // Log any errors that occur during the fetch process