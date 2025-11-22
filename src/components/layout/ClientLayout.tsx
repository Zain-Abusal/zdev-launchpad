import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { ClientSidebar } from './ClientSidebar';

interface ClientLayoutProps {
  children: React.ReactNode;
}

export const ClientLayout = ({ children }: ClientLayoutProps) => {
  const { user, loading, isAdmin } = useAuth();

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
    <div className="flex min-h-screen">
      <ClientSidebar />
      <main className="flex-1 p-8 bg-background overflow-auto">
        {children}
      </main>
    </div>
  );
};
