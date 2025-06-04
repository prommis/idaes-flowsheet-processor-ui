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
  imageContainer: {
    margin: 10,
    width: '50%',
    textAlign: 'center',
  },
  image: {
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.4)',
    borderRadius: 10,
    padding: 20,
    marginTop: 10
  }
};

function Troubleshooting() {


    return (
    <div style={{marginTop: '20px'}}>
        <p>
            If you run into an error when building or solving a flowsheet, the UI has a feature that allows you to view the logs including any model outputs. To view logs, click the menu icon in the top right and choose "View Logs":
            <img 
            style={styles.image}
            src={require('@site/static/img/view-logs-dropdown.png').default}
            />
        </p>
        <p>
            Logs are searchable, downloadable, and filterable by log level. Furthermore, they are color coded to enhance the user experience:
            <img 
            style={styles.image}
            src={require('@site/static/img/view-logs.png').default}
            />
        </p>
        <p>
            If logs are unhelpful, you can navigate to the <a href='https://github.com/prommis/idaes-flowsheet-processor/issues' target='_blank'>Github website</a> and create an issue for the error you are running into. Make sure to include which flowsheet you were running, which computer operating system you were using, and if possible, provide the input values that caused the error. 
        </p>
    </div>
    
  );
}

export default Troubleshooting;