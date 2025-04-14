
import React, { useEffect, useRef, useState, useCallback } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Loader, MapPin, Navigation, CloudRain, AlertTriangle, 
  Hospital, Shield, Search, X, Menu
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Input } from "@/components/ui/input";
import { useLocation } from "react-router-dom";
import { toast } from "sonner";

// Define the Google Maps window interface
declare global {
  interface Window {
    initMap: () => void;
    google: typeof google;
  }
}

type MapMode = "navigation" | "emergency" | "weather";
type EmergencyType = "hospitals" | "police" | "all";
type WeatherInfo = {
  temp: number;
  condition: string;
  icon: string;
  humidity: number;
  windSpeed: number;
};

const MapContainer = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [mode, setMode] = useState<MapMode>("navigation");
  const [emergencyType, setEmergencyType] = useState<EmergencyType>("all");
  const [weatherInfo, setWeatherInfo] = useState<WeatherInfo | null>(null);
  const [userLocation, setUserLocation] = useState<google.maps.LatLng | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [markers, setMarkers] = useState<google.maps.Marker[]>([]);
  const [directionsRenderer, setDirectionsRenderer] = useState<google.maps.DirectionsRenderer | null>(null);
  const { user } = useAuth();
  const location = useLocation();
  
  // Clear previous markers
  const clearMarkers = useCallback(() => {
    markers.forEach(marker => marker.setMap(null));
    setMarkers([]);
    if (directionsRenderer) {
      directionsRenderer.setMap(null);
    }
  }, [markers, directionsRenderer]);

  // Initialize Google Maps
  useEffect(() => {
    // Load Google Maps API
    const loadGoogleMaps = () => {
      const googleMapsApiKey = "AIzaSyDHQbOpELbshQTBAkoAqxwOYtHNu3rcaeI";
      const script = document.createElement("script");
      
      window.initMap = () => {
        setMapLoaded(true);
      };
      
      script.src = `https://maps.googleapis.com/maps/api/js?key=${googleMapsApiKey}&callback=initMap&v=weekly&libraries=places`;
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
  
  // Initialize map when loaded
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
      
      // Add directions renderer
      const directionsRendererInstance = new window.google.maps.DirectionsRenderer({
        map: mapInstance,
        suppressMarkers: false,
        polylineOptions: {
          strokeColor: "#6366F1",
          strokeWeight: 6,
          strokeOpacity: 0.8
        }
      });
      
      setDirectionsRenderer(directionsRendererInstance);
      setMap(mapInstance);
      
      // Try to get user's current location
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const userPos = new window.google.maps.LatLng(
              position.coords.latitude,
              position.coords.longitude
            );
            
            setUserLocation(userPos);
            mapInstance.setCenter(userPos);
            
            // Add a marker for current location
            const marker = new window.google.maps.Marker({
              position: userPos,
              map: mapInstance,
              title: "Your Location",
              animation: window.google.maps.Animation.DROP,
              icon: {
                path: window.google.maps.SymbolPath.CIRCLE,
                fillColor: "#4285F4",
                fillOpacity: 1,
                strokeColor: "white",
                strokeWeight: 2,
                scale: 8,
              }
            });
            
            setMarkers(prev => [...prev, marker]);
          },
          (error) => {
            console.error("Error getting location:", error);
            toast.error("Couldn't get your location", {
              description: "Using Bhopal as default location"
            });
            
            // Add a marker for Bhopal
            const marker = new window.google.maps.Marker({
              position: bhopal,
              map: mapInstance,
              title: "Bhopal",
              animation: window.google.maps.Animation.DROP,
            });
            
            setMarkers(prev => [...prev, marker]);
          }
        );
      }
    }
  }, [mapLoaded, mapRef, map]);
  
  // Check for URL parameters
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const modeParam = params.get("mode");
    
    if (modeParam === "emergency") {
      setMode("emergency");
    }
  }, [location]);
  
  // Handle mode changes
  useEffect(() => {
    if (!map || !mapLoaded) return;
    
    clearMarkers();
    
    if (mode === "emergency") {
      showEmergencyLocations();
    } else if (mode === "weather") {
      fetchWeatherData();
    }
  }, [map, mapLoaded, mode, emergencyType, clearMarkers]);
  
  // Simulate fetching emergency locations
  const showEmergencyLocations = () => {
    if (!map) return;
    
    // Simulated emergency locations in Bhopal
    const emergencyLocations = {
      hospitals: [
        { name: "Hamidia Hospital", lat: 23.2611, lng: 77.3961, type: "hospitals" },
        { name: "AIIMS Bhopal", lat: 23.2071, lng: 77.4629, type: "hospitals" },
        { name: "Bansal Hospital", lat: 23.2200, lng: 77.4412, type: "hospitals" },
        { name: "People's Hospital", lat: 23.2314, lng: 77.4296, type: "hospitals" }
      ],
      police: [
        { name: "MP Nagar Police Station", lat: 23.2310, lng: 77.4345, type: "police" },
        { name: "Habibganj Police Station", lat: 23.1939, lng: 77.4379, type: "police" },
        { name: "TT Nagar Police Station", lat: 23.2567, lng: 77.4046, type: "police" },
        { name: "Shahpura Police Station", lat: 23.2012, lng: 77.4573, type: "police" }
      ]
    };
    
    // Filter locations based on emergency type
    let locationsToShow = [];
    if (emergencyType === "hospitals") {
      locationsToShow = emergencyLocations.hospitals;
    } else if (emergencyType === "police") {
      locationsToShow = emergencyLocations.police;
    } else {
      locationsToShow = [...emergencyLocations.hospitals, ...emergencyLocations.police];
    }
    
    const bounds = new window.google.maps.LatLngBounds();
    const newMarkers: google.maps.Marker[] = [];
    
    // Add markers for emergency locations
    locationsToShow.forEach(location => {
      const position = new window.google.maps.LatLng(location.lat, location.lng);
      bounds.extend(position);
      
      const icon = {
        url: location.type === "hospitals" 
          ? "https://maps.google.com/mapfiles/ms/icons/red-dot.png"
          : "https://maps.google.com/mapfiles/ms/icons/blue-dot.png",
        scaledSize: new window.google.maps.Size(40, 40)
      };
      
      const marker = new window.google.maps.Marker({
        position,
        map,
        title: location.name,
        animation: window.google.maps.Animation.DROP,
        icon
      });
      
      // Add click event to get directions
      marker.addListener("click", () => {
        if (userLocation) {
          getDirections(userLocation, position, location.name);
        } else {
          toast.error("Your location is not available", {
            description: "Please enable location services"
          });
        }
      });
      
      newMarkers.push(marker);
    });
    
    setMarkers(newMarkers);
    
    // Adjust map to fit all markers
    if (newMarkers.length > 0) {
      map.fitBounds(bounds);
    }
    
    // Show info toast
    toast.info(`Showing ${emergencyType === "all" ? "all emergency" : emergencyType} locations`, {
      description: "Click on a marker to get directions"
    });
  };
  
  // Simulate fetching weather data
  const fetchWeatherData = async () => {
    // Simulate API call delay
    toast.info("Fetching weather data...");
    
    setTimeout(() => {
      // Simulated weather data for Bhopal
      const weather = {
        temp: Math.floor(Math.random() * 10) + 25, // 25-35°C
        condition: "Partly Cloudy",
        icon: "https://openweathermap.org/img/wn/02d@2x.png",
        humidity: Math.floor(Math.random() * 30) + 40, // 40-70%
        windSpeed: Math.floor(Math.random() * 10) + 5, // 5-15 km/h
      };
      
      setWeatherInfo(weather);
      
      // Show weather overlay on map
      if (map) {
        // Simulate weather overlay with custom layer
        const weatherOverlay = new window.google.maps.Circle({
          strokeColor: "#4285F4",
          strokeOpacity: 0.2,
          strokeWeight: 2,
          fillColor: "#4285F4",
          fillOpacity: 0.1,
          map,
          center: map.getCenter()!,
          radius: 10000,
        });
        
        // Add to markers to clean up later
        setMarkers(prev => [...prev, weatherOverlay as any]);
      }
    }, 1500);
  };
  
  // Get directions between two points
  const getDirections = (origin: google.maps.LatLng, destination: google.maps.LatLng, destinationName: string) => {
    if (!map || !directionsRenderer) return;
    
    const directionsService = new window.google.maps.DirectionsService();
    
    directionsService.route(
      {
        origin,
        destination,
        travelMode: window.google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === window.google.maps.DirectionsStatus.OK && result) {
          directionsRenderer.setDirections(result);
          
          // Extract route information
          const route = result.routes[0].legs[0];
          toast.success(`Route to ${destinationName}`, {
            description: `Distance: ${route.distance?.text}, Time: ${route.duration?.text}`
          });
        } else {
          toast.error("Could not calculate directions");
        }
      }
    );
  };
  
  // Handle search functionality
  const handleSearch = () => {
    if (!map || !searchQuery.trim()) return;
    
    const placesService = new window.google.maps.places.PlacesService(map);
    
    placesService.textSearch(
      {
        query: searchQuery,
        location: map.getCenter()!,
        radius: 10000,
      },
      (results, status) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK && results && results.length > 0) {
          clearMarkers();
          
          const place = results[0];
          if (place.geometry && place.geometry.location) {
            map.setCenter(place.geometry.location);
            map.setZoom(15);
            
            const marker = new window.google.maps.Marker({
              position: place.geometry.location,
              map,
              title: place.name,
              animation: window.google.maps.Animation.DROP,
            });
            
            setMarkers([marker]);
            
            // Create info window
            const infoWindow = new window.google.maps.InfoWindow({
              content: `
                <div style="padding: 8px; max-width: 200px;">
                  <strong>${place.name}</strong><br/>
                  ${place.formatted_address || ""}
                </div>
              `
            });
            
            marker.addListener("click", () => {
              infoWindow.open(map, marker);
            });
            
            // Get directions if we have user location
            if (userLocation) {
              getDirections(userLocation, place.geometry.location, place.name!);
            }
          }
        } else {
          toast.error("No results found", {
            description: "Try a different search term"
          });
        }
      }
    );
  };

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
          {/* Mode selection */}
          <Card className="absolute top-4 left-4 right-4 z-10 p-2 glass">
            <div className="flex items-center justify-between">
              <Button 
                variant="ghost" 
                className="h-8 w-8 p-0 md:hidden"
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              >
                <Menu />
              </Button>
              
              <div className="flex justify-center flex-1">
                <Tabs 
                  value={mode} 
                  onValueChange={(value) => setMode(value as MapMode)}
                  className="w-full max-w-md"
                >
                  <TabsList className="grid grid-cols-3">
                    <TabsTrigger value="navigation" className="flex items-center gap-1">
                      <Navigation className="h-4 w-4" />
                      <span className="hidden sm:inline">Navigation</span>
                    </TabsTrigger>
                    <TabsTrigger value="emergency" className="flex items-center gap-1">
                      <AlertTriangle className="h-4 w-4" />
                      <span className="hidden sm:inline">Emergency</span>
                    </TabsTrigger>
                    <TabsTrigger value="weather" className="flex items-center gap-1">
                      <CloudRain className="h-4 w-4" />
                      <span className="hidden sm:inline">Weather</span>
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            </div>
            
            {/* Search bar */}
            <div className="mt-2 flex gap-2">
              <Input
                ref={searchInputRef}
                placeholder="Search locations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                className="flex-1"
              />
              <Button onClick={handleSearch} size="sm" className="bg-ruto-purple hover:bg-ruto-lightPurple">
                <Search className="h-4 w-4 mr-2" />
                <span>Search</span>
              </Button>
            </div>
          </Card>
          
          {/* Sidebar for emergency mode */}
          {mode === "emergency" && isSidebarOpen && (
            <Card className="absolute left-4 top-24 bottom-4 z-20 w-64 p-4 glass overflow-auto">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-red-500" />
                  Emergency Mode
                </h3>
                <Button variant="ghost" size="sm" onClick={() => setIsSidebarOpen(false)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">Select emergency service:</p>
                  <div className="grid grid-cols-1 gap-2">
                    <Button 
                      variant={emergencyType === "all" ? "default" : "outline"}
                      onClick={() => setEmergencyType("all")}
                      className={emergencyType === "all" ? "bg-ruto-purple hover:bg-ruto-lightPurple" : ""}
                      size="sm"
                    >
                      All Services
                    </Button>
                    <Button 
                      variant={emergencyType === "hospitals" ? "default" : "outline"}
                      onClick={() => setEmergencyType("hospitals")}
                      className={emergencyType === "hospitals" ? "bg-red-500 hover:bg-red-600" : ""}
                      size="sm"
                    >
                      <Hospital className="h-4 w-4 mr-2" />
                      Hospitals
                    </Button>
                    <Button 
                      variant={emergencyType === "police" ? "default" : "outline"}
                      onClick={() => setEmergencyType("police")}
                      className={emergencyType === "police" ? "bg-blue-500 hover:bg-blue-600" : ""}
                      size="sm"
                    >
                      <Shield className="h-4 w-4 mr-2" />
                      Police Stations
                    </Button>
                  </div>
                </div>
                
                <div className="border-t pt-4">
                  <p className="text-sm font-medium mb-2">Emergency Contacts:</p>
                  <ul className="space-y-2 text-sm">
                    <li className="flex justify-between">
                      <span>Emergency Helpline</span>
                      <span className="font-medium">112</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Ambulance</span>
                      <span className="font-medium">108</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Police</span>
                      <span className="font-medium">100</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Fire</span>
                      <span className="font-medium">101</span>
                    </li>
                  </ul>
                </div>
              </div>
            </Card>
          )}
          
          {/* Weather info */}
          {mode === "weather" && weatherInfo && (
            <Card className="absolute right-4 top-24 z-20 w-64 p-4 glass">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-semibold">Weather</h3>
                <img 
                  src={weatherInfo.icon} 
                  alt="Weather" 
                  className="h-12 w-12"
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-3xl font-bold">{weatherInfo.temp}°C</span>
                  <span className="text-gray-600 dark:text-gray-300">{weatherInfo.condition}</span>
                </div>
                
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <p className="text-gray-500 dark:text-gray-400">Humidity</p>
                    <p className="font-medium">{weatherInfo.humidity}%</p>
                  </div>
                  <div>
                    <p className="text-gray-500 dark:text-gray-400">Wind</p>
                    <p className="font-medium">{weatherInfo.windSpeed} km/h</p>
                  </div>
                </div>
                
                <p className="text-xs text-gray-500 mt-2">Simulated weather data for Bhopal</p>
              </div>
            </Card>
          )}
          
          {/* User welcome card (only show briefly) */}
          {user && (
            <Card className="absolute bottom-4 left-4 right-4 md:right-auto md:w-80 z-10 p-4 glass opacity-90 animate-fade-in">
              <h2 className="text-lg font-medium mb-2 flex items-center gap-2">
                <MapPin className="h-5 w-5 text-ruto-purple" />
                Welcome to Ruto
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {user?.user_metadata?.full_name ? `Hello, ${user.user_metadata.full_name}!` : 'Hello!'}
                {' '}Explore Bhopal with real-time traffic updates. 
                {mode === "navigation" && " Use the search box to find locations."}
                {mode === "emergency" && " Emergency services are shown on the map."}
                {mode === "weather" && " Current weather conditions are displayed."}
              </p>
            </Card>
          )}
          
          <div ref={mapRef} className="w-full h-full"></div>
        </div>
      )}
    </div>
  );
};

export default MapContainer;
