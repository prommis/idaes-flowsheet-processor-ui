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

function HowToSwitchVersion() {


    return (
    <div style={{marginTop: '20px'}}>
        <p>
            If you would like to switch project versions (eg. from WaterTAP to PrOMMIS), click on the project name in the top left:
            <img 
                style={styles.image}
                src={require('@site/static/img/switch-project-version.png').default}
            />
            <i>Note: This feature is only availabe in development mode and in the generic release of the Flowsheet Processor UI.</i>
        </p>
    </div>
    
  );
}

export default HowToSwitchVersion;