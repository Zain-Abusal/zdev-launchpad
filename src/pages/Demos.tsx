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
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Demos</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Interactive demonstrations of various projects and capabilities
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {demos.map((demo, index) => (
            <motion.div
              key={demo.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="h-full hover-lift hover-scale">
                <CardHeader>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <CardTitle className="text-lg">{demo.title}</CardTitle>
                    <Badge variant="secondary">{demo.type}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    {demo.description}
                  </p>

                  <div>
                    <h4 className="font-semibold text-sm mb-2">Features:</h4>
                    <ul className="space-y-1">
                      {demo.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-2 text-sm">
                          <span className="text-primary mt-0.5">•</span>
                          <span className="text-muted-foreground">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Button variant="outline" className="w-full" disabled>
                    <ExternalLink className="mr-2 h-4 w-4" />
                    View Demo (Coming Soon)
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>
    </PublicLayout>
  );
};

export default Demos;
