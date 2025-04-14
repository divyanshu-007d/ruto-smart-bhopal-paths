
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { MapPin } from "lucide-react";

const Hero = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-white to-gray-100 dark:from-ruto-dark dark:to-gray-900">
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
      
      {/* Purple circles in the background */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-ruto-purple/20 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-ruto-teal/20 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="py-20 md:py-28 flex flex-col items-center text-center">
          <div className="inline-flex items-center justify-center p-2 bg-white dark:bg-gray-800 rounded-full mb-8 shadow-md animate-fade-in">
            <div className="px-4 py-2 bg-ruto-purple/10 rounded-full flex items-center">
              <MapPin className="h-5 w-5 text-ruto-purple mr-2" />
              <span className="text-sm font-medium text-ruto-purple">Smart Navigation for Bhopal</span>
            </div>
          </div>
          
          <h1 className="heading-xl mb-6 text-gray-900 dark:text-white max-w-4xl leading-tight animate-fade-in">
            Smarter. Safer. Faster.
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-ruto-purple to-ruto-teal">
              Navigate with Ruto.
            </span>
          </h1>
          
          <p className="paragraph mb-8 max-w-2xl animate-fade-in">
            The intelligent route finder optimized for Bhopal city. Get real-time traffic updates, 
            weather information, and emergency navigation all in one place.
          </p>
          
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 animate-fade-in">
            <Button size="lg" asChild className="bg-ruto-purple hover:bg-ruto-lightPurple">
              <Link to="/map">Launch App</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href="#features">Learn More</a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
