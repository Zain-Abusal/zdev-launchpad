import { motion } from 'framer-motion';
import { PublicLayout } from '@/components/layout/PublicLayout';
import { Button } from '@/components/ui/button';
import { ExternalLink } from 'lucide-react';

const DocsEmbed = () => {
  const DOCS_URL = '/docs'; // Mintlify docs on same domain

  return (
    <PublicLayout>
      <section className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Documentation</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-6">
            Comprehensive guides and documentation for all projects
          </p>
          <a href={DOCS_URL} target="_blank" rel="noopener noreferrer">
            <Button size="lg">
              <ExternalLink className="mr-2 h-4 w-4" />
              Open Full Documentation
            </Button>
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="rounded-xl overflow-hidden shadow-lg border border-border"
          style={{ height: '80vh' }}
        >
          <iframe
            src={DOCS_URL}
            style={{
              width: '100%',
              height: '100%',
              border: 'none',
            }}
            title="Documentation"
          />
        </motion.div>
      </section>
    </PublicLayout>
  );
};

export default DocsEmbed;
