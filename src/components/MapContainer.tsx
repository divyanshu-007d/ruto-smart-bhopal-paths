
import React from "react";
import { Card } from "@/components/ui/card";

const MapContainer = () => {
  return (
    <div className="flex flex-col h-screen">
      <div className="h-full relative">
        <Card className="absolute top-4 left-4 right-4 z-10 p-4 glass">
          <h2 className="text-lg font-medium mb-2">Map Integration Coming Soon</h2>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            The Google Maps integration will be available shortly. 
            This will include real-time routing with traffic overlays, 
            weather updates, and emergency services locations.
          </p>
        </Card>
        <div className="w-full h-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
          <div className="text-center">
            <p className="text-lg font-medium text-gray-600 dark:text-gray-300">Google Maps Integration</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">Coming soon in the next update</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapContainer;
