import { Header } from './Header';
import { Footer } from './Footer';
import { MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PublicLayoutProps {
  children: React.ReactNode;
}

export const PublicLayout = ({ children }: PublicLayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      
      {/* Floating Chat Button */}
      <Button
        size="icon"
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg hover-scale gradient-primary"
        aria-label="Chat with us"
      >
        <MessageCircle className="h-6 w-6" />
      </Button>
    </div>
  );
};
