import { env } from '@/lib/env';
import { ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const DocsEmbed = () => {
  const DOCS_URL = env.docsUrl || 'https://docs.shopzyra.site';

  return (
    <div style={{ width: '100vw', height: '100vh', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', right: 16, top: 16, zIndex: 40 }}>
        <a href={DOCS_URL} target="_blank" rel="noopener noreferrer">
          <Button size="sm">
            <ExternalLink className="mr-2 h-4 w-4" />
            Open in new tab
          </Button>
        </a>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        style={{ width: '100%', height: '100%' }}
      >
        <iframe
          src={DOCS_URL}
          style={{ width: '100vw', height: '100vh', border: 'none' }}
          title="Documentation"
          allowFullScreen
        />
      </motion.div>
    </div>
  );
};

export default DocsEmbed;
