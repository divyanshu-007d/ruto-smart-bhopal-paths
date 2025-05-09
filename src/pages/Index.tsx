
import { useState, useEffect } from "react";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import EmergencySection from "@/components/EmergencySection";
import CTASection from "@/components/CTASection";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Index = () => {
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
    <div className="min-h-screen bg-white dark:bg-ruto-dark">
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
      <Hero />
      <Features />
      <EmergencySection />
      <CTASection />
      <Footer />
    </div>
  );
};

export default Index;
