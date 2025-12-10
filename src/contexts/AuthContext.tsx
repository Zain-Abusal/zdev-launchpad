import React, { createContext, useContext, useMemo } from "react";
import { useAuth as useClerkAuth, useUser, UserResource } from "@clerk/clerk-react";

interface AuthContextType {
  user: UserResource | null;
  sessionId: string | null;
  isAdmin: boolean;
  loading: boolean;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const ADMIN_EMAIL = import.meta.env.VITE_ZDEV_ADMIN_EMAIL || "admin@example.com";
  const { signOut, sessionId, isLoaded: authLoaded } = useClerkAuth();
  const { user, isLoaded: userLoaded } = useUser();

  const value = useMemo<AuthContextType>(() => {
    const isAdmin =
      !!user?.emailAddresses.some((e) => e.emailAddress.toLowerCase() === ADMIN_EMAIL.toLowerCase());
    const loading = !authLoaded || !userLoaded;
    return { user: user ?? null, sessionId: sessionId ?? null, isAdmin, loading, signOut };
  }, [user, sessionId, ADMIN_EMAIL, authLoaded, userLoaded, signOut]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
