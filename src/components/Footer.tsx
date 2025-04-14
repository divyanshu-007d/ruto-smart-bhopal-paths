
import { Link } from "react-router-dom";
import { MapPin, Github, Twitter, Linkedin } from "lucide-react";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-white dark:bg-ruto-dark border-t border-gray-200 dark:border-gray-800">
      <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center gap-2">
              <MapPin className="h-8 w-8 text-ruto-purple" />
              <span className="text-2xl font-bold text-ruto-dark dark:text-white">Ruto</span>
            </Link>
            <p className="mt-4 text-gray-600 dark:text-gray-300 max-w-md">
              Smarter. Safer. Faster. Navigate with Ruto - the smart city navigation app optimized for Bhopal.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white tracking-wider uppercase mb-4">
              Navigation
            </h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-base text-gray-600 dark:text-gray-300 hover:text-ruto-purple dark:hover:text-ruto-lightPurple">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/map" className="text-base text-gray-600 dark:text-gray-300 hover:text-ruto-purple dark:hover:text-ruto-lightPurple">
                  Launch App
                </Link>
              </li>
              <li>
                <a href="#features" className="text-base text-gray-600 dark:text-gray-300 hover:text-ruto-purple dark:hover:text-ruto-lightPurple">
                  Features
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white tracking-wider uppercase mb-4">
              Connect
            </h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-ruto-purple dark:hover:text-ruto-lightPurple">
                <Github className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-ruto-purple dark:hover:text-ruto-lightPurple">
                <Twitter className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-ruto-purple dark:hover:text-ruto-lightPurple">
                <Linkedin className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-800">
          <p className="text-center text-gray-500 dark:text-gray-400">
            © {year} Ruto. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
