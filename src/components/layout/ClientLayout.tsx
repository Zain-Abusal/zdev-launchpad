import { Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { ClientSidebar } from './ClientSidebar';

interface ClientLayoutProps {
  children: React.ReactNode;
}

export const ClientLayout = ({ children }: ClientLayoutProps) => {
  const { user, loading, isAdmin } = useAuth();
  const [announcement, setAnnouncement] = useState('');
  const [active, setActive] = useState(false);

  useEffect(() => {
    const fetchAnnouncement = async () => {
      const { data } = await import('@/integrations/supabase/client').then(m => m.supabase)
        .from('announcements')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(1);
      if (data && data[0]) {
        setAnnouncement(data[0].text);
        setActive(data[0].active);
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
    <div className="flex min-h-screen flex-col">
      {active && announcement && (
        <div className="w-full bg-primary text-white text-center py-2 font-semibold">
          {announcement}
        </div>
      )}
      <div className="flex flex-1">
        <ClientSidebar />
        <main className="flex-1 p-8 bg-background overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
};
