import { useEffect, useState } from "react";
import { createClient } from '@supabase/supabase-js'
import { AnimatePresence, motion } from "framer-motion";
import './App.css';

document.body.style.background = "linear-gradient(rgba(34, 40, 49, 0.8), rgba(34, 40, 49, 0.8)), url('./bg.jpg')";
document.body.style.backgroundSize = "cover"
const supabase = createClient('https://usuujbwztwljaytklyws.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVzdXVqYnd6dHdsamF5dGtseXdzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjgwMjgyOTYsImV4cCI6MjA4MzYwNDI5Nn0.nD90ciMvi2_8f5KtAnenjn_jStRwu2FnFkXtWezQ2iA')

// Create a single supabase client for interacting with your database

// TODO: Update these values

function App() {
  const [alerts, setAlerts] = useState([]);
  
  useEffect(() => {
    const channel = supabase
      .channel("schema-db-changes")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
        },
        (payload) => {
          setAlerts((prev) => [
            ...prev,
            {
              time: payload.commit_timestamp,
              room: payload.new.room,
              location: payload.new.location,
            },
          ]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);
  return (
    <div className="App">
      <div className={"pr-6 pl-3 fixed left-2 bottom-2 flex justify-between w-full"}>
        <img className={"h-16"} src="prinsys.png"></img>
        <img className={"h-16"} src="aalto.png"></img>
      </div>
      <h1 class="text-5xl">Team Prinsys</h1>
      <h2 class="text-2xl">Water Leakage Detection System</h2>
      <div>
        <button onClick={() => setAlerts([])} className="hover:to-red-500 active:to-red-700 active:from-red-700 px-8 py-3 mt-8  rounded text-white bg-gradient-to-b from-red-500 to-red-600">Clear all alerts</button>
        <div className="flex flex-col-reverse gap-4 md:w-[50%] m-auto my-8">
          <AnimatePresence initial={false}>
          {alerts.map((msg, index) => (
            <motion.div
              key={alert.time}
              layout
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
            <Alert room={msg.room} location={msg.location} datetime={msg.time} />
            </motion.div>
          ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

function Alert({ building = "Building 3", room, location, datetime, isResolved = false }) {
  const [resolved, setResolved] = useState(isResolved);
  const [flash, setFlash] = useState(true);

  useEffect(() => {
    // Remove flash after 1 second
    const timer = setTimeout(() => setFlash(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={"flex flex-col items-start p-3 rounded bg-gradient-to-b from-[#393E46] to-[#2e333b] alert-box cursor-pointer"
  }
         onClick={() => setResolved(prev => !prev)}
      >
      <p>{building} • {room} • Receiver 0x34a</p>
      <p className="text-lg font-bold">{location}</p>
      <p>Water Leakage Alert • {datetime} • <span className={'font-bold ' + (resolved ? "text-green-400" : "text-red-400")}>{resolved ? "Resolved" : "Unresolved"}</span></p>
    </div>
  )
}

export default App;
