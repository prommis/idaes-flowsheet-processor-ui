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

function HowToUse() {


    return (
        <div>
            <div>
                The IDAES Flowsheet Processor allows users to run optimizations and sensitivity analyses on available flowsheets. Follow these step-by-step guides to learn how to use the different features of the UI.
            </div>
            <div style={{marginTop: '20px'}} id='run-an-optimization'>
                <h3>
                    Run an optimization
                </h3>
                <ol>
                    <li>
                      Open up the application. After the application has finished initializing, you should see the default list of flowsheets. For WaterTAP, this should look like:
                      <img 
                        style={styles.image}
                        src={require('@site/static/img/flowsheets-list-mac.png').default}
                      />
                    </li>
                    <li>
                      Select a flowsheet. If that flowsheet has customizable model options, you will be prompted to choose values for those options. After doing so, click Build Flowsheet.
                      <img 
                        style={styles.image}
                        src={require('@site/static/img/model-options-oaro-mac.png').default}
                      />
                    </li>
                    <li>
                      After the flowsheet has finished building, you will be directed to the input page. Here you can update selected variables by changing the value, fixed status, and upper/lower bounds. You can also choose from previously saved configurations to autopopulate the input values. When ready to run the optimization, click the Run button.
                      <img 
                        style={styles.image}
                        src={require('@site/static/img/input-oaro-mac.png').default}
                      />
                    </li>
                    <li>
                      Flowsheets can take anywhere from a couple seconds to several minutes to solve, depending on the model and operating system. Once the flowsheet has finished solving, you will see the output page. Here you can view the ouput of the model as a table. You can also save this configuration and download the results as a csv.
                      <img 
                        style={styles.image}
                        src={require('@site/static/img/output-oaro-mac.png').default}
                      />
                    </li>
                    <li>
                      From the output page, you can navigate to the compare page. Here you can compare outputs of saved configurations in a table and chart (coming soon) format. You can also download the table as a csv.
                      <img 
                        style={styles.image}
                        src={require('@site/static/img/compare-table-oaro-mac.png').default}
                      />
                    </li>
                </ol>
            </div>
            <div style={{marginTop: '20px'}} id='run-a-sensitivity-analysis'>
                <h3>
                    Run a sensitivity analysis
                </h3>
                <ol>
                    
                </ol>
            </div>
            <div style={{marginTop: '20px'}} id='upload-a-flowsheet'>
                <h3>
                    Upload a flowsheet
                </h3>
                <ol>
                    
                </ol>
            </div>
        </div>
    
  );
}

export default HowToUse;