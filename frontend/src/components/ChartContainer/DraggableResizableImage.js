import React, { useRef } from 'react';
import Plot from 'react-plotly.js';
import useResizeObserver from './useResizeObserver';

const DraggableResizableImage = ({ data, layout }) => {
  const containerRef = useRef(null);
  const dimensions = useResizeObserver(containerRef);

  return (
    <div ref={containerRef} style={{ width: '100%', height: '100%' }}>
      <Plot
        data={data}
        layout={{ ...layout, width: dimensions.width, height: dimensions.height }}
        config={{ displayModeBar: false }}  // Disable Plotly controls
        useResizeHandler={true}  // Enable Plotly's resize handler
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );
};

export default DraggableResizableImage;
