
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";

const Auth = () => {
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();

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

    // Check if user is already logged in
    const checkUser = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (data.session) {
        navigate('/map');
      }
    };
    
    checkUser();
  }, [navigate]);

  // Function for sign-in with Google
  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/map`,
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          }
        }
      });
      
      if (error) {
        toast.error("Error signing in with Google", {
          description: error.message
        });
      }
    } catch (error) {
      console.error("Google sign-in error:", error);
      toast.error("Failed to sign in with Google");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-ruto-dark">
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
      
      <div className="flex-1 flex items-center justify-center px-4">
        <div className="w-full max-w-md space-y-8 bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Welcome to Ruto
            </h2>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
              Sign in with Google to continue
            </p>
          </div>
          
          <Button 
            onClick={handleGoogleSignIn}
            className="w-full flex items-center justify-center gap-3 bg-white text-gray-800 hover:bg-gray-100 border border-gray-300"
            disabled={loading}
          >
            <FcGoogle className="h-5 w-5" />
            <span>Continue with Google</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Auth;
