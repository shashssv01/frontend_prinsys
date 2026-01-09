import { useState } from "react";
import './App.css';

document.body.style.backgroundColor = "#222831";

function App() {
  // const apiUrl = process.env.REACT_APP_API_URL;
  // const [leakageData, setLeakageData] = useState(null);  // useState now works
  // useEffect(() => {
  //   fetch(`${apiUrl}/water-leakage`)
  //     .then(response => response.json())
  //     .then(data => {
  //       console.log(data);  // Check the data received
  //       setLeakageData(data);  // Update the state with the received data
  //     })
  //     .catch(error => console.error("Error fetching data:", error));
  // }, [apiUrl]);

  return (
    <div className="App">
      <h1 class="text-5xl">Team Prinsys</h1>
      <h2 class="text-2xl">Water Leakage Detection System</h2>
      <div>
        <div class="flex flex-col-reverse gap-4 w-[50%] m-auto my-8">
          <Alert room="Room 68.2" location="Roof" datetime="2025-09-01 22:12" />
          <Alert room="Room 67.6" location="Bathroom" datetime="2025-09-01 22:19" isResolved="true" />
          <Alert room="Room 68.1" location="Window" datetime="2025-09-01 22:23" />
        </div>
      </div>
    </div>
  );
}

function Alert({ building = "Building 3", room, location, datetime, isResolved = false }) {
  const [resolved, setResolved] = useState(isResolved);

  return (
    <div className="flex flex-col items-start p-3 rounded bg-gradient-to-b from-[#393E46] to-[#2e333b] alert-box cursor-pointer"
         onClick={() => setResolved(prev => !prev)}
      >
      <p>{building} • {room}</p>
      <p className="text-lg font-bold">{location}</p>
      <p>Water Leakage Alert • {datetime} • <span className={'font-bold ' + (resolved ? "text-green-400" : "text-red-400")}>{resolved ? "Resolved" : "Unresolved"}</span></p>
    </div>
  )
}

export default App;
