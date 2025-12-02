import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  isAdmin: boolean;
  loading: boolean;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  const ADMIN_EMAIL = import.meta.env.VITE_ZDEV_ADMIN_EMAIL || "admin@example.com";

  useEffect(() => {
    // Set up auth state listener first
    let lastUserEmail: string | null = null;
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
      // Send thank you email only on login
      if (event === 'SIGNED_IN' && session?.user?.email && session.user.email !== lastUserEmail) {
        lastUserEmail = session.user.email;
        try {
          const { sendResendEmail } = await import('@/integrations/resend');
          await sendResendEmail({
            to: session.user.email,
            subject: 'Thank you for logging in!',
            html: `<h2>Welcome back to zdev!</h2><p>Thank you for logging in. If you need help, reply to this email.</p>`
          });
        } catch (err) {
          // Silently ignore email errors
        }
      }
    });

    // Then check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const isAdmin = user?.email === ADMIN_EMAIL;

  const signOut = async () => {
    // Optimistically clear local state so UI routes away even if network fails
    setUser(null);
    setSession(null);
    setLoading(false);
    try {
      await supabase.auth.signOut();
    } catch (err) {
      console.error("Error during sign out", err);
    }
  };

  return (
    <AuthContext.Provider value={{ user, session, isAdmin, loading, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
