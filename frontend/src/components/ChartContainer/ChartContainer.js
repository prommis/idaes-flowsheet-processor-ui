<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Heatmap</title>
    <script src="https://cdn.plot.ly/plotly-latest.min.js"></script>
    <script defer src="Watertap.js"></script>
</head>
<body>
    <label for=""parameterSelector>Select Parameter:</label>
    <select id="parameterSelector"></select>
    <div id="heatmap"></div>
</body>
</html>


// import React, { useState, useEffect } from 'react';
// import GridLayout from 'react-grid-layout';
// import Heatmap from '../Heatmap/Heatmap';
// import { FaDownload } from "react-icons/fa";


// const ChartContainer = () => {
//   const [layout, setLayout] = useState([]);
//   const [visualizations, setVisualizations] = useState([]);
//   const [selectedVisualizationType, setSelectedVisualizationType] = useState('heatmap');

//   // Function to add a new heatmap
//   const addHeatmap = () => {
//     const existingPositions = layout.map(item => ({ x: item.x, y: item.y }));
//     let newX = 0, newY = 0;
//     let foundSpot = false;

//     while (!foundSpot) {
//       if (!existingPositions.some(pos => pos.x === newX && pos.y === newY)) {
//         foundSpot = true;
//       } else {
//         newX += 1;
//         if (newX >= 12) {
//           newX = 0;
//           newY += 1;
//         }
//       }
//     }

//     const newLayoutItem = {
//       i: `heatmap-${Date.now()}`,
//       x: newX,
//       y: newY,
//       w: 4, // Adjust width as needed
//       h: 4, // Adjust height as needed
//     };

//     setLayout([...layout, newLayoutItem]);
//     setVisualizations([...visualizations, { id: newLayoutItem.i, type: 'heatmap' }]);
//   };

//   // Function to handle visualization type switch
//   const handleVisualizationChange = (event) => {
//     setSelectedVisualizationType(event.target.value);
//   };

//   // Download data function
//   const downloadData = () => {
//     const data = { layout, visualizations };
//     const blob = new Blob([JSON.stringify(data)], { type: 'application/json' });
//     const url = URL.createObjectURL(blob);
//     const link = document.createElement('a');
//     link.href = url;
//     link.download = 'data.json';
//     link.click();
//     URL.revokeObjectURL(url);
//   };

//   useEffect(() => {
//     // Automatically save data when it changes
//     const saveData = () => {
//       const data = { layout, visualizations };
//       localStorage.setItem('visualizationData', JSON.stringify(data));
//     };

//     saveData();
//   }, [layout, visualizations]);

//   return (
//     <div className="App">
//       <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '16px' }}>
//         <button
//           className="download-button"
//           onClick={downloadData}
//           style={{ background: 'none', border: 'none', cursor: 'pointer' }}
//         >
//           <FaDownload size={24} />
//         </button>
//       </div>
//       <select
//         value={selectedVisualizationType}
//         onChange={handleVisualizationChange}
//         className="visualization-select"
//       >
//         <option value="heatmap">Heatmap</option>
//         <option value="parallelCoordinate">Parallel Coordinate Plot</option>
//       </select>
//       <button onClick={addHeatmap}>Add Heatmap</button>
//       <GridLayout
//         className="layout"
//         layout={layout}
//         cols={12}
//         rowHeight={30}
//         width={1200}
//         onLayoutChange={newLayout => setLayout(newLayout)}
//       >
//         {visualizations.map(vis =>
//           vis.type === 'heatmap' ? (
//             <div key={vis.id} data-grid={layout.find(item => item.i === vis.id)}>
//               <Heatmap />
//             </div>
//           ) : (
//             <div key={vis.id} data-grid={layout.find(item => item.i === vis.id)}>
              
//             </div>
//           )
//         )}
//       </GridLayout>
//     </div>
//   );
// };

// export default ChartContainer;
