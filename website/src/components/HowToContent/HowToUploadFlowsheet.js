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

function HowToUploadFlowsheet() {

  const howToExportLink = 'how_to_export_flowsheet'


    return (
    <div style={{marginTop: '20px'}}>
        <ol>
          <li>
              Navigate to the flowsheets list page. Click on New Flowsheet +. You should see the following:
              <img 
                style={styles.image}
                src={require('@site/static/img/upload-flowsheet-mac.png').default}
              />
          </li>
          <li>
              A flowsheet python file and an export python file (<a href={howToExportLink} target='_blank'>see how to export a flowsheet</a>) for that flowsheet are required. In addition, you can upload a diagram of the flowsheet and any necessary data files (yaml, json, csv, etc). After attaching the files, click Upload Flowsheet. If successful, you should see the page refresh and see your flowsheet populate in the list. If unsuccessful, you should see an error popup. 
              <img 
                style={styles.image}
                src={require('@site/static/img/custom-flowsheet-mac.png').default}
              />
          </li>
        </ol>
    </div>
    
  );
}

export default HowToUploadFlowsheet;