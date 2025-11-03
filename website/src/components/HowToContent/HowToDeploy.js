import React, { useState, useEffect } from 'react';

const styles = {
  imageContainer: {
    margin: 10,
    width: '50%',
    textAlign: 'center',
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
                <p>Note, you must be a collaborator on the project to run this workflow from the main repository. Please contact one of the team members to be added as a collaborator OR create your own fork.</p>
                <ol>
                    <li>
                        Navigate to the GitHub deployment dispatch&nbsp;
                        <a target='_blank' href='https://github.com/prommis/idaes-electron-build/actions/workflows/build-dispatch.yml'>here</a> OR create a fork of <a target='_blank' href='https://github.com/prommis/idaes-electron-build'>idaes-eletron-build</a>, navigate to actions, and click Application Build Dispatch on the left sidebar.
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
            <div style={{marginTop: '20px'}}>
                <h3>
                    Code-sign your application
                </h3>
                <p>
                    The build workflow outlined above has code-signing built into it. However, to run the code-signing steps, you must complete a few additional steps.
                </p>
                <h3>
                    Windows
                </h3>
                <ol>
                    <li>
                        Purchase a Microsoft code-signing certificate, and host it in Azure Key Vault. For a step-by-step guide on how to accomplish this, follow <a target="_blank" href="https://melatonin.dev/blog/how-to-code-sign-windows-installers-with-an-ev-cert-on-github-actions/">this tutorial</a>.
                        <ul>
                            <li>
                                Once you complete this, you should have the following credentials: AZURE_KEY_VAULT_URI, AZURE_CLIENT_ID, AZURE_TENANT_ID, AZURE_CLIENT_SECRET, AZURE_CERT_NAME.
                            </li>
                        </ul>
                    </li>
                    <li>
                        In your fork of idaes-electron-build, navigate to Settings -&gt; Secrets and Variables -&gt; Actions.
                    </li>
                    <li>
                        Add a new repository secret for each of AZURE_KEY_VAULT_URI, AZURE_CLIENT_ID, AZURE_TENANT_ID, AZURE_CLIENT_SECRET, AZURE_CERT_NAME, using the values for your client.
                    </li>
                </ol>
                <h3>
                    Mac
                </h3>
                    <p>
                        There are 2 steps for creating trusted Mac applications. The application must be code signed, and then it must be uploaded and notarized by Apple. Both of these steps are covered in the workflow, as long as proper credentials are provided.
                    </p>
                <ol>
                    <li>
                        Sign up for an <a target='_blank' href='https://developer.apple.com/'>Apple Developer Account</a>
                    </li>
                    <li>
                        Create a Developer ID Application certificate.
                    </li>
                    <li>
                        Add a new repository secret for each of APPLE_BUILD_CERTIFICATE_BASE64, P12_PASSWORD, and KEYCHAIN_PASSWORD for code-signing, in addition to APPLE_ID, APPLE_ID_PASSWORD, and TEAM_ID for notarizing.
                    </li>
                </ol>
                <p>
                    Once you have added the proper credentials as secret variables, the workflow will automatically detect them and attempt to use them for code-signing the application during the build process.
                </p>
            </div>
        </div>
    
  );
}

export default HowToDeploy;