import React from "react";

export default function HeatmapContainer() {
    return (
        <iframe
            src="/heatmap/heatmap.html"
            width="100%"
            height="600px"
            style={{ border: "none" }}
            title="Heatmap Visualization"
        />
    );
}
