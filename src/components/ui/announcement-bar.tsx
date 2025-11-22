import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Button } from './button';
import { supabase } from '@/integrations/supabase/client';

export const AnnouncementBar = () => {
  const [announcement, setAnnouncement] = useState<any>(null);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    fetchAnnouncement();
  }, []);

  const fetchAnnouncement = async () => {
    const { data } = await supabase
      .from('header_announcements')
      .select('*')
      .eq('enabled', true)
      .limit(1)
      .single();

    if (data) {
      const dismissed = localStorage.getItem(`announcement-dismissed-${data.id}`);
      if (!dismissed) {
        setAnnouncement(data);
      } else {
        setIsVisible(false);
      }
    }
  };

  const handleDismiss = () => {
    if (announcement) {
      localStorage.setItem(`announcement-dismissed-${announcement.id}`, 'true');
    }
    setIsVisible(false);
  };

  if (!announcement || !isVisible) return null;

  return (
    <div className="bg-primary text-primary-foreground py-2 px-4">
      <div className="container mx-auto flex items-center justify-between gap-4">
        <p className="text-sm flex-1 text-center">
          {announcement.text}
          {announcement.link_url && announcement.link_text && (
            <>
              {' '}
              <a 
                href={announcement.link_url} 
                className="underline font-semibold hover:opacity-80 transition-opacity"
                target="_blank"
                rel="noopener noreferrer"
              >
                {announcement.link_text}
              </a>
            </>
          )}
        </p>
        <Button
          variant="ghost"
          size="icon"
          onClick={handleDismiss}
          className="h-6 w-6 shrink-0 hover:bg-primary-foreground/20"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};
