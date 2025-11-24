import { motion } from 'framer-motion';
import { PublicLayout } from '@/components/layout/PublicLayout';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Layout, Database, Terminal } from 'lucide-react';
import { BackgroundGradient } from '@/components/ui/background-gradient';

const Services = () => {
  const services = [
    {
      icon: <Layout className="h-12 w-12 text-primary" />,
      title: 'Custom Websites',
      description: 'Beautiful, responsive websites tailored to your needs. Whether you need a personal blog, business site, landing page, or portfolio, I create stunning web experiences.',
      useCases: [
        'Business websites and landing pages',
        'Personal blogs and portfolios',
        'Marketing and campaign pages',
        'E-commerce storefronts',
      ],
      tech: ['React', 'Next.js', 'Tailwind CSS', 'TypeScript'],
    },
    {
      icon: <Database className="h-12 w-12 text-primary" />,
      title: 'Systems & Web Apps',
      description: 'Full-featured web applications and systems designed to streamline your operations. From dashboards to complex admin panels.',
      useCases: [
        'Inventory management systems',
        'Admin dashboards and panels',
        'CRM and business tools',
        'Data visualization platforms',
      ],
      tech: ['React', 'Supabase', 'PostgreSQL', 'REST APIs'],
    },
    {
      icon: <Terminal className="h-12 w-12 text-primary" />,
      title: 'Python Tools & Automation',
      description: 'Custom Python scripts, bots, APIs, and automation tools to eliminate repetitive tasks and enhance productivity.',
      useCases: [
        'Data processing and analysis',
        'Web scraping and automation',
        'API development and integration',
        'Task automation and scheduling',
      ],
      tech: ['Python', 'FastAPI', 'Pandas', 'Selenium'],
    },
  ];

  return (
    <PublicLayout>
      <section className="bg-background min-h-screen px-4 md:px-8 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-extrabold mb-4 text-primary">Services</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Custom solutions designed and built specifically for your needs
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, delay: index * 0.2, type: 'spring' }}
            >
              <BackgroundGradient className="rounded-3xl p-1 h-full">
                <Card className="p-8 rounded-3xl bg-card border-0 h-full flex flex-col">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="p-3 bg-primary/10 rounded-2xl">
                      {service.icon}
                    </div>
                    <h2 className="text-2xl font-bold text-foreground">{service.title}</h2>
                  </div>
                  <p className="text-base text-muted-foreground mb-6 flex-grow">{service.description}</p>
                  <div className="mb-4">
                    <h3 className="font-semibold mb-3 text-foreground">Use Cases:</h3>
                    <ul className="space-y-2">
                      {service.useCases.map((useCase) => (
                        <li key={useCase} className="flex items-start gap-2">
                          <span className="text-primary mt-1 font-bold">•</span>
                          <span className="text-muted-foreground text-sm">{useCase}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-3 text-foreground">Technologies:</h3>
                    <div className="flex flex-wrap gap-2">
                      {service.tech.map((tech) => (
                        <Badge key={tech} variant="secondary" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </Card>
              </BackgroundGradient>
            </motion.div>
          ))}
        </div>
      </section>
    </PublicLayout>
  );
};

export default Services;
