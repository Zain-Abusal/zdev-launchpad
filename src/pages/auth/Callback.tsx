import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const Callback = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handle = async () => {
      try {
        // Parse and store session from the URL after OAuth redirect (Supabase v2+)
        const { data, error } = await supabase.auth.exchangeCodeForSession(window.location.href);

        if (error) throw error;

        // Ensure user is available
        const { data: userData } = await supabase.auth.getUser();
        const user = userData.user;

        if (!user) {
          toast({ title: 'Authentication failed', description: 'No user found after OAuth redirect', variant: 'destructive' });
          navigate('/auth/sign-in');
          return;
        }

        const adminEmail = import.meta.env.VITE_ZDEV_ADMIN_EMAIL || 'admin@example.com';
        const isAdmin = user.email === adminEmail;

        toast({ title: 'Signed in', description: `Welcome back, ${user.email}` });

        navigate(isAdmin ? '/admin' : '/client');
      } catch (err: any) {
        toast({ title: 'Auth error', description: err?.message || 'Unable to complete authentication', variant: 'destructive' });
        navigate('/auth/sign-in');
      } finally {
        setLoading(false);
      }
    };

    handle();
  }, [navigate, toast]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <p className="text-lg font-medium">Completing sign in...</p>
        <p className="text-sm text-muted-foreground mt-2">Please wait while we finish authenticating your account.</p>
        {loading && <div className="mt-4">⏳</div>}
      </div>
    </div>
  );
};

export default Callback;
