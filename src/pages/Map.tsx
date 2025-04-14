
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import MapContainer from "@/components/MapContainer";

const Map = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // Check if dark mode is preferred or if it's evening/night
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const currentHour = new Date().getHours();
    const isNightTime = currentHour < 6 || currentHour >= 18;
    
    setDarkMode(prefersDark || isNightTime);
    
    if (prefersDark || isNightTime) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  return (
    <div className="h-screen flex flex-col bg-white dark:bg-ruto-dark">
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
      <MapContainer />
    </div>
  );
};

export default Map;
