
import React, { createContext, useState, useContext, useEffect } from "react";
import { User, Session } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "sonner";

type AuthContextType = {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Handle hash fragment for auth (temporary fix for the redirect issue)
    if (location.hash && location.hash.includes('access_token')) {
      // We have an auth response in the URL
      // The session will be automatically handled by getSession() and onAuthStateChange
      console.log("Auth redirect detected, redirecting to map...");
      setTimeout(() => {
        navigate('/map', { replace: true });
      }, 100);
    }

    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, currentSession) => {
        console.log("Auth state changed:", event);
        setSession(currentSession);
        setUser(currentSession?.user ?? null);
        setIsLoading(false);

        // If user logs out, redirect to home
        if (event === 'SIGNED_OUT') {
          navigate('/');
          toast.info("You have been signed out");
        }
        
        // If user logs in, redirect to map
        if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
          navigate('/map');
          if (event === 'SIGNED_IN') {
            toast.success(`Welcome ${currentSession?.user?.user_metadata?.full_name || 'back'}!`);
          }
        }
      }
    );

    // THEN check for existing session
    const getInitialSession = async () => {
      try {
        const { data } = await supabase.auth.getSession();
        setSession(data.session);
        setUser(data.session?.user ?? null);
      } catch (error) {
        console.error("Error getting session:", error);
      } finally {
        setIsLoading(false);
      }
    };

    getInitialSession();

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate, location]);

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
      navigate('/');
    } catch (error) {
      console.error("Error signing out:", error);
      toast.error("Failed to sign out");
    }
  };

  return (
    <AuthContext.Provider value={{ user, session, isLoading, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
