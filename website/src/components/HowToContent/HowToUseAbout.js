import React, { useState, useEffect } from 'react';
import MDXComponents from "@theme/MDXComponents";

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

function HowToUseAbout() {


    return (
        <div>
            The IDAES Flowsheet Processor allows users to run optimizations and sensitivity analyses on available flowsheets. Follow these step-by-step guides to learn how to use the different features of the UI.
        </div>
    
  );
}

export default HowToUseAbout;