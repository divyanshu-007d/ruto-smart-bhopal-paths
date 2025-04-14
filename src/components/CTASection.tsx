
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { MapPin } from "lucide-react";

const CTASection = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-ruto-purple to-ruto-lightPurple text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <MapPin className="h-16 w-16 mx-auto mb-6 opacity-75" />
        
        <h2 className="heading-lg mb-6 max-w-3xl mx-auto">
          Ready to Navigate Bhopal with the Smartest Route Finder?
        </h2>
        
        <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">
          Join thousands of Bhopal residents who are already using Ruto for safer, 
          faster and more efficient navigation around the city.
        </p>
        
        <Button size="lg" variant="secondary" className="text-ruto-purple font-medium" asChild>
          <Link to="/map">Launch Ruto App Now</Link>
        </Button>
      </div>
    </section>
  );
};

export default CTASection;
