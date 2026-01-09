import { useState, useEffect } from 'react'; // Add useState import here
import './App.css';

function App() {
  const apiUrl = process.env.REACT_APP_API_URL;

  const [leakageData, setLeakageData] = useState(null);  // useState now works
  useEffect(() => {
    fetch(`${apiUrl}/water-leakage`)
      .then(response => response.json())
      .then(data => {
        console.log(data);  // Check the data received
        setLeakageData(data);  // Update the state with the received data
      })
      .catch(error => console.error("Error fetching data:", error));
  }, [apiUrl]);

  return (
    <div className="App">
      <h1> Water Leakage Detection System</h1>
      <h2> Team Prinsys</h2>
      <div>
        <h3>{leakageData ? (leakageData.leakageDetected ? 'Leakage Detected!' : 'No Leakage detected') : 'Loading data...'}</h3>
        {leakageData && (
          <>
            <p>Sensor ID: {leakageData.sensor_id}</p>
            <p>Timestamp: {new Date(leakageData.timestamp).toLocaleString()}</p>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
