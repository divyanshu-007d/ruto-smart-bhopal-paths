
import React, { useEffect, useRef, useState } from "react";
import { Card } from "@/components/ui/card";
import { Loader } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

// Define the Google Maps window interface
declare global {
  interface Window {
    initMap: () => void;
    google: typeof google;
  }
}

const MapContainer = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const { user } = useAuth();
  
  useEffect(() => {
    // Load Google Maps API
    const loadGoogleMaps = () => {
      const googleMapsApiKey = "AIzaSyDHQbOpELbshQTBAkoAqxwOYtHNu3rcaeI";
      const script = document.createElement("script");
      
      window.initMap = () => {
        setMapLoaded(true);
      };
      
      script.src = `https://maps.googleapis.com/maps/api/js?key=${googleMapsApiKey}&callback=initMap&v=weekly`;
      script.async = true;
      script.defer = true;
      
      document.head.appendChild(script);
      
      return () => {
        document.head.removeChild(script);
        delete window.initMap;
      };
    };
    
    if (!window.google) {
      loadGoogleMaps();
    } else {
      setMapLoaded(true);
    }
  }, []);
  
  useEffect(() => {
    if (mapLoaded && mapRef.current && !map) {
      // Default to Bhopal coordinates
      const bhopal = { lat: 23.2599, lng: 77.4126 };
      
      const mapInstance = new window.google.maps.Map(mapRef.current, {
        center: bhopal,
        zoom: 12,
        mapTypeControl: true,
        fullscreenControl: true,
        streetViewControl: false,
        zoomControl: true,
      });
      
      // Add a marker for current location
      new window.google.maps.Marker({
        position: bhopal,
        map: mapInstance,
        title: "Bhopal",
        animation: window.google.maps.Animation.DROP,
      });
      
      setMap(mapInstance);
    }
  }, [mapLoaded, mapRef, map]);

  return (
    <div className="flex flex-col h-screen">
      {!mapLoaded ? (
        <div className="h-full flex items-center justify-center bg-gray-100 dark:bg-gray-800">
          <div className="text-center">
            <Loader className="h-10 w-10 animate-spin mx-auto mb-4 text-ruto-purple" />
            <p className="text-gray-600 dark:text-gray-300">Loading Google Maps...</p>
          </div>
        </div>
      ) : (
        <div className="h-full relative">
          <Card className="absolute top-4 left-4 right-4 z-10 p-4 glass">
            <h2 className="text-lg font-medium mb-2">Welcome to Ruto</h2>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              {user?.user_metadata?.full_name ? `Hello, ${user.user_metadata.full_name}!` : 'Hello!'}
              {' '}You can now explore Bhopal with real-time traffic updates and more features coming soon.
            </p>
          </Card>
          <div ref={mapRef} className="w-full h-full"></div>
        </div>
      )}
    </div>
  );
};

export default MapContainer;
