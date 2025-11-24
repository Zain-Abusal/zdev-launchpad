import { motion } from 'framer-motion';
import { PublicLayout } from '@/components/layout/PublicLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink } from 'lucide-react';

const Demos = () => {
  const demos = [
    {
      title: 'E-commerce Dashboard',
      description: 'Full-featured admin dashboard with analytics, inventory management, and order processing.',
      features: ['Real-time analytics', 'Inventory tracking', 'Order management', 'Customer insights'],
      type: 'System',
    },
    {
      title: 'Task Management App',
      description: 'Collaborative task manager with drag-and-drop interface, teams, and project tracking.',
      features: ['Kanban boards', 'Team collaboration', 'Time tracking', 'Calendar view'],
      type: 'System',
    },
    {
      title: 'Data Scraping Bot',
      description: 'Python bot that automatically collects and processes data from multiple sources.',
      features: ['Multi-site scraping', 'Data cleaning', 'Scheduled runs', 'Export options'],
      type: 'Python',
    },
  ];

  return (
    <PublicLayout>
      <section className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gradient">Demos</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Interactive demonstrations of various projects and capabilities
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {demos.map((demo, index) => (
            <motion.div
              key={demo.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className="card-minimal h-full hover:shadow-2xl transition-all">
                <div className="mb-4">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="text-xl font-bold">{demo.title}</h3>
                    <Badge variant="secondary">{demo.type}</Badge>
                  </div>
                </div>
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    {demo.description}
                  </p>

                  <div>
                    <h4 className="font-semibold text-sm mb-2">Features:</h4>
                    <ul className="space-y-1">
                      {demo.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-2 text-sm">
                          <span className="text-cyan-500 mt-0.5">•</span>
                          <span className="text-muted-foreground">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Button variant="outline" className="w-full rounded-xl" disabled>
                    <ExternalLink className="mr-2 h-4 w-4" />
                    View Demo (Coming Soon)
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </PublicLayout>
  );
};

export default Demos;
