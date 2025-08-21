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
  screenshotContainer: {
    margin: 10,
    width: 'calc(33.33% - 20px)',
    display: 'inline-block',
    verticalAlign: 'top',
    '@media (maxWidth: 768px)': {
      width: '100%',
      margin: 10,
    },
    // margin: 10,
    // width: '100%',
    // textAlign: 'center',
  },
};

function AboutContent() {

    const demoVideoLink = 'https://stanford.zoom.us/rec/play/77rL0u4zPm9J0fgDbhAAFro8fhRIjWn47e3HUKIYiXntONg2EtzozQVxpRdcqN1SUGGlxvZx4vgjM_RO.c_3pkbmruJ0byiFh?canPlayFromShare=true&from=share_recording_detail&startTime=1715976131000&componentName=rec-play&originRequestUrl=https%3A%2F%2Fstanford.zoom.us%2Frec%2Fshare%2Fw3pasvLktrvFD0XBTdcp3WlutR3Yi8bj2d13S6BrqbDPI-nNuHF53mF0idnp_hND.CKVx6Nko5EGd3Xfr%3FstartTime%3D1715976131000'
    const screenshots = [
        {
            src: require('@site/static/img/ui-input.png').default,
            description: 'Input'
        },
        {
            src: require('@site/static/img/ui-output.png').default,
            description: 'Output'
        },
        {
            src: require('@site/static/img/ui-compare-table.png').default,
            description: 'Comparison Table'
        },
    ]

    return (
        <div>
            <div>
                The IDAES Flowsheet Processor provides a zero-code way of running selected models in a graphical user interface, and viewing results as graphs or tables. It can run individual optimizations or sensitivity analyses for user-defined variables and ranges. To see a walk-through of using the tool, see <a target='_blank' href={demoVideoLink}>this video</a>. You can get the source code and install it on your system manually from <a target='_blank' href='https://github.com/prommis/idaes-flowsheet-processor-ui'>idaes-flowsheet-processor-ui</a> on GitHub, or follow the download instructions below to use the native installer (MacOS and Windows only).
            </div>
            <div style={styles.container}>
                <h3>Screenshots</h3>
                {
                    screenshots.map((screenshot) => (
                        <div style={styles.screenshotContainer} key={screenshot.description}>
                            <img src={screenshot.src} alt={screenshot.description} style={{ width: '100%', height: 'auto' }} />
                        </div>
                    ))
                }
            </div>
        </div>
    
  );
}

export default AboutContent;