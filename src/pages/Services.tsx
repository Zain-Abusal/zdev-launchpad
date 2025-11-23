import { motion } from 'framer-motion';
import { PublicLayout } from '@/components/layout/PublicLayout';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Layout, Database, Terminal, Globe, Server, Bot } from 'lucide-react';

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
      <section className="bg-gradient-to-br from-blue-50 via-pink-50 to-yellow-100 min-h-screen px-4 md:px-8 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-extrabold mb-4 text-primary drop-shadow-lg">Services</h1>
          <p className="text-xl text-primary/80 max-w-2xl mx-auto">
            Custom solutions designed and built specifically for your needs
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-10">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.8, delay: index * 0.2, type: 'spring' }}
            >
              <Card className="p-8 rounded-2xl shadow-2xl bg-white/90 dark:bg-card border-2 border-primary/10 hover:scale-[1.03] hover:shadow-primary/30 transition-all duration-300">
                <div className="flex items-center gap-6 mb-6">
                  {service.icon}
                  <h2 className="text-2xl font-bold text-primary/90 mb-0">{service.title}</h2>
                </div>
                <p className="text-base text-muted-foreground mb-6">{service.description}</p>
                <div className="mb-4">
                  <h3 className="font-semibold mb-3">Use Cases:</h3>
                  <ul className="space-y-2">
                    {service.useCases.map((useCase) => (
                      <li key={useCase} className="flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        <span className="text-muted-foreground">{useCase}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-3">Technologies:</h3>
                  <div className="flex flex-wrap gap-2">
                    {service.tech.map((tech) => (
                      <Badge key={tech} variant="secondary">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>
    </PublicLayout>
  );
};

export default Services;
