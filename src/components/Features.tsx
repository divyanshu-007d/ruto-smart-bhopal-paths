
import { Navigation, CloudRain, Clock, AlertTriangle, MapPin, Hospital } from "lucide-react";
import FeatureCard from "./FeatureCard";

const Features = () => {
  const features = [
    {
      icon: Navigation,
      title: "Real-Time Navigation",
      description: "Get accurate turn-by-turn directions with real-time traffic updates optimized for Bhopal's streets."
    },
    {
      icon: CloudRain,
      title: "Weather Updates",
      description: "Stay informed with integrated weather forecasts along your route to plan your journey better."
    },
    {
      icon: Clock,
      title: "Auto Theme Switch",
      description: "App automatically switches between light and dark mode based on the time of day for comfortable viewing."
    },
    {
      icon: AlertTriangle,
      title: "Construction Alerts",
      description: "Receive updates about ongoing construction and roadblocks to avoid delays and traffic jams."
    },
    {
      icon: MapPin,
      title: "Smart Location",
      description: "Intelligent location suggestions and favorites based on your frequently visited places."
    },
    {
      icon: Hospital,
      title: "Emergency Mode",
      description: "Quick access to routes for nearest hospitals and police stations during emergencies."
    },
  ];

  return (
    <section id="features" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="heading-lg mb-4 text-gray-900 dark:text-white">
            Smart Features for Smarter Navigation
          </h2>
          <p className="paragraph max-w-3xl mx-auto">
            Ruto combines powerful navigation technology with local Bhopal data to provide
            you with the most efficient and reliable routes.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
