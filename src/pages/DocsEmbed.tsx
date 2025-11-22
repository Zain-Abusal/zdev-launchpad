import { env } from '@/lib/env';
import { ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

import { useEffect } from 'react';

const DocsEmbed = () => {
  useEffect(() => {
    window.location.replace('https://docs.shopzyra.site');
  }, []);
  return null;
};

export default DocsEmbed;
import { useEffect } from 'react';

const DocsEmbed = () => {
  useEffect(() => {
    window.location.replace('https://docs.shopzyra.site');
  }, []);
  return null;
};
