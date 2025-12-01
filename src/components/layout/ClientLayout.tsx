import { Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { ClientSidebar } from './ClientSidebar';
import { supabase } from '@/integrations/supabase/client';

interface ClientLayoutProps {
  children: React.ReactNode;
}

export const ClientLayout = ({ children }: ClientLayoutProps) => {
  const { user, loading, isAdmin } = useAuth();
  const [announcement, setAnnouncement] = useState('');
  const [active, setActive] = useState(false);

  useEffect(() => {
    const fetchAnnouncement = async () => {
      const { data } = await supabase
        .from('header_announcements')
        .select('*')
        .eq('enabled', true)
        .order('created_at', { ascending: false })
        .limit(1);
      if (data && data[0]) {
        setAnnouncement(data[0].text);
        setActive(data[0].enabled);
      }
    };
    fetchAnnouncement();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth/sign-in" replace />;
  }

  if (isAdmin) {
    return <Navigate to="/admin" replace />;
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {active && announcement && (
        <div className="w-full bg-primary text-white text-center py-2 font-semibold">
          {announcement}
        </div>
      )}
      <div className="flex flex-1">
        <ClientSidebar />
        <main className="flex-1 overflow-auto p-6 md:p-8 page-section">
          {children}
        </main>
      </div>
    </div>
  );
};
