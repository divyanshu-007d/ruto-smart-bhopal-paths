import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { AlertCircle, Ambulance, Shield } from "lucide-react";

const EmergencySection = () => {
  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-ruto-purple/10 to-ruto-teal/5"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center justify-center p-2 bg-red-50 dark:bg-red-900/20 rounded-full mb-6">
              <div className="px-4 py-2 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center">
                <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400 mr-2" />
                <span className="text-sm font-medium text-red-600 dark:text-red-400">Emergency Features</span>
              </div>
            </div>
            
            <h2 className="heading-lg mb-6 text-gray-900 dark:text-white">
              Quick Access to <span className="text-red-600 dark:text-red-400">Emergency Services</span>
            </h2>
            
            <p className="paragraph mb-8">
              In critical situations, every second counts. Ruto's Emergency Mode provides immediate 
              routing to the nearest hospitals and police stations in Bhopal, potentially saving 
              lives when it matters most.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  <Ambulance className="h-6 w-6 text-ruto-purple" />
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white">Hospital Routing</h4>
                  <p className="text-gray-600 dark:text-gray-300">Find and navigate to the nearest hospitals with emergency services.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  <Shield className="h-6 w-6 text-ruto-purple" />
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white">Police Station Locator</h4>
                  <p className="text-gray-600 dark:text-gray-300">Quickly find the closest police stations in case of emergencies.</p>
                </div>
              </div>
            </div>
            
            <Button size="lg" className="mt-8 bg-ruto-purple hover:bg-ruto-lightPurple" asChild>
              <Link to="/map?mode=emergency">Try Emergency Mode</Link>
            </Button>
          </div>
          
          <div className="relative">
            <div className="aspect-square w-full max-w-md mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden glass border-2 border-red-200 dark:border-red-900/30">
              <div className="absolute inset-0 bg-[url('/emergency-map.jpg')] bg-cover bg-center opacity-80 dark:opacity-60"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-red-600/30 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h3 className="text-2xl font-bold mb-2">Emergency Mode</h3>
                <p className="text-sm mb-4">Shows nearby hospitals and police stations with the fastest routes.</p>
                <div className="flex space-x-2">
                  <span className="bg-red-500 text-white text-xs py-1 px-2 rounded-full">Hospital</span>
                  <span className="bg-blue-500 text-white text-xs py-1 px-2 rounded-full">Police</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EmergencySection;
