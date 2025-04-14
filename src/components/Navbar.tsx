
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Menu, X, MapPin, Moon, Sun } from "lucide-react";
import UserProfile from "@/components/UserProfile";
import { useAuth } from "@/contexts/AuthContext";

interface NavbarProps {
  setDarkMode?: React.Dispatch<React.SetStateAction<boolean>>;
  darkMode?: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ setDarkMode, darkMode }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user } = useAuth();

  const toggleDarkMode = () => {
    if (setDarkMode) {
      setDarkMode(prev => !prev);
      
      // Add dark mode class to document
      if (!darkMode) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    }
  };

  return (
    <nav className="bg-white/80 dark:bg-ruto-dark/80 backdrop-blur-md sticky top-0 z-50 border-b border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2">
              <MapPin className="h-8 w-8 text-ruto-purple" />
              <span className="text-2xl font-bold text-ruto-dark dark:text-white">Ruto</span>
            </Link>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-6">
            <Button variant="ghost" asChild>
              <Link to="/">Home</Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link to="/map">Launch App</Link>
            </Button>
            <Button variant="outline" onClick={toggleDarkMode} size="icon">
              {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
            
            {user ? (
              <UserProfile />
            ) : (
              <Button className="bg-ruto-purple hover:bg-ruto-lightPurple" asChild>
                <Link to="/auth">Sign In</Link>
              </Button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <Button variant="outline" onClick={toggleDarkMode} size="icon" className="mr-2">
              {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
            {user && <UserProfile />}
            <Button
              variant="outline"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="ml-2"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white dark:bg-ruto-dark p-4 animate-fade-in">
          <div className="flex flex-col space-y-4">
            <Link
              to="/"
              className="px-3 py-2 rounded-md text-base font-medium hover:bg-gray-100 dark:hover:bg-gray-800"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/map"
              className="px-3 py-2 rounded-md text-base font-medium hover:bg-gray-100 dark:hover:bg-gray-800"
              onClick={() => setIsMenuOpen(false)}
            >
              Launch App
            </Link>
            {!user && (
              <Button className="bg-ruto-purple hover:bg-ruto-lightPurple w-full" asChild>
                <Link to="/auth">Sign In</Link>
              </Button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
