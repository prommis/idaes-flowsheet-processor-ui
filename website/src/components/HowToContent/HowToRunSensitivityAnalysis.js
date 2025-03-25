import React, { useState, useEffect } from 'react';

const styles = {
  container: {
    margin: '40px auto',
    padding: 20,
    backgroundColor: '#f9f9f9',
    border: '1px solid #ddd',
    borderRadius: 10,
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    width: '100%'
  },
  image: {
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.4)',
    borderRadius: 10,
    padding: 20,
    marginTop: 10
  }
};

function HowToRunSensitivityAnalysis() {


    return (
    <div style={{marginTop: '20px'}}>
        <ol>
          <li>
              Select and build a flowsheet. Click the Analysis Type dropdown and select parameter sweep. Make sure to change at least one variable from fixed/free to sweep. Click Run.
              <img 
                style={styles.image}
                src={require('@site/static/img/sweep-input-generic-mac.png').default}
              />
          </li>
          <li>
              Sensitivity analyses run multiple optimizations, so they take longer than a single optimization run. Once the analysis is complete, you will see an output table.
              <img 
                style={styles.image}
                src={require('@site/static/img/sweep-output-table-generic-mac.png').default}
              />
          </li>
          <li>
              To view the output in a chart format, click on Chart View. The chart type will vary depending on the amount of variables that were involved in the sweep. For one variable, you will have the option to view and interact with a line chart. For two, the chart type will be a heatmap. For three or more, a parallel coordinates plot. 
              <img 
                style={styles.image}
                src={require('@site/static/img/sweep-output-chart-generic-mac.png').default}
              />
          </li>
        </ol>
    </div>
    
  );
}

export default HowToRunSensitivityAnalysis;