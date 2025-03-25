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
    // margin: 10,
    // width: 'calc(33.33% - 20px)',
    // display: 'inline-block',
    // verticalAlign: 'top',
    // '@media (max-width: 768px)': {
    //   width: '100%',
    //   margin: 10,
    // },
    margin: 10,
    width: '50%',
    textAlign: 'center',
  },
  gridContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%'
    // height: '200px',
    // width: '200px',
    // border: '1px solid black'
  },
  gridLeft: {
    // width: '100%',
    height: '100%'
  },
  gridRight: {
    // width: '100%',
    height: '100%'
  }
};

function HowToDeploy() {


    return (
        <div>
            <div>
                The IDAES Flowsheet Processor is deployable into a desktop application compatible with either Windows or MacOS (ARM64) operating systems. The application can be deployed into one of three different versions: WaterTAP, IDAES, or PrOMMIS. Each version comes with a custom styling and default set of flowsheets. The default flowsheets are provided by the parent projects, but user provided flowsheets can always be uploaded through the frontend after installation. 
            </div>
            <div style={{marginTop: '20px'}}>
                <h3>
                    To deploy a new version of the application installer, please follow the steps outlined below.
                </h3>
                <p>Note, you must be a collaborator on the project to run this workflow. Please contact one of the team members to be added as a collaborator.</p>
                <ol>
                    <li>
                        Navigate to the GitHub deployment dispatch 
                        <a target='_blank' href='https://github.com/watertap-org/idaes-electron-build/actions/workflows/build-dispatch.yml'> here</a>.
                    </li>
                    <li>
                        Click on Run workflow dropdown.
                    </li>
                    <li>
                        Fill out inputs. Some have default values, but be sure to choose the correct operating system, project, pip target, and artifact name. See image below.
                    </li>
                    <li>
                        Click run workflow.
                    </li>
                </ol>
                <div style={styles.imageContainer}>
                    <img src={require('@site/static/img/DispatchInput.png').default}/>
                </div>
                <div>
                    Once initiated, you should see the new workflow run added to the list on the GitHub console. Builds can take between 15 to 30 minutes, depending on the project and operating system involved. Once finished, the installer will be ready for download inside the workflow run under artifacts.
                </div>
                
            </div>
        </div>
    
  );
}

export default HowToDeploy;