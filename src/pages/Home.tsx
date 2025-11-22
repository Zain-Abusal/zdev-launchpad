import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PublicLayout } from '@/components/layout/PublicLayout';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Code2, Layout, Terminal, ArrowRight, Check } from 'lucide-react';

const Home = () => {
  const services = [
    {
      icon: <Layout className="h-8 w-8" />,
      title: 'Custom Websites',
      description: 'Beautiful, responsive websites tailored to your brand. From blogs to business sites.',
    },
    {
      icon: <Code2 className="h-8 w-8" />,
      title: 'Systems & Dashboards',
      description: 'Full-featured web applications. Inventory systems, admin panels, and more.',
    },
    {
      icon: <Terminal className="h-8 w-8" />,
      title: 'Python & Automation',
      description: 'Custom scripts, bots, APIs, and tools to automate your workflows.',
    },
  ];

  const steps = [
    { number: '01', title: 'Discovery Call', description: 'We discuss your needs and vision' },
    { number: '02', title: 'Proposal', description: 'Receive a detailed plan and timeline' },
    { number: '03', title: 'Development', description: 'Your project comes to life' },
    { number: '04', title: 'Launch & Support', description: 'Go live with ongoing assistance' },
  ];

  return (
    <PublicLayout>
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 md:py-32">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6">
              Custom Web Solutions
              <span className="block text-primary">Built for You</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Freelance developer specializing in custom websites, web systems, and Python automation tools.
            </p>
            <div className="flex gap-4">
              <Link to="/get-started">
                <Button size="lg" className="group">
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link to="/portfolio">
                <Button size="lg" variant="outline">View Portfolio</Button>
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="grid grid-cols-2 gap-4">
              <Card className="p-6 hover-lift">
                <Code2 className="h-8 w-8 text-primary mb-3" />
                <p className="text-sm font-medium">Modern Tech Stack</p>
              </Card>
              <Card className="p-6 hover-lift mt-8">
                <Layout className="h-8 w-8 text-primary mb-3" />
                <p className="text-sm font-medium">Responsive Design</p>
              </Card>
              <Card className="p-6 hover-lift">
                <Terminal className="h-8 w-8 text-primary mb-3" />
                <p className="text-sm font-medium">Custom Solutions</p>
              </Card>
              <Card className="p-6 hover-lift mt-8">
                <Check className="h-8 w-8 text-primary mb-3" />
                <p className="text-sm font-medium">Quality Assured</p>
              </Card>
            </div>
          </motion.div>
        </div>
      </section>

      {/* What I Build */}
      <section className="bg-muted/30 py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What I Build</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Comprehensive solutions across web development and automation
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="p-8 h-full hover-lift hover-scale">
                  <div className="text-primary mb-4">{service.icon}</div>
                  <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                  <p className="text-muted-foreground">{service.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A straightforward process from idea to launch
            </p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="p-6 text-center h-full">
                  <div className="text-4xl font-bold text-primary mb-4">{step.number}</div>
                  <h3 className="text-lg font-bold mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary text-primary-foreground py-20">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Start Your Project?
            </h2>
            <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
              Let's discuss how I can help bring your vision to life
            </p>
            <Link to="/get-started">
              <Button size="lg" variant="secondary" className="group">
                Get Started Today
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </PublicLayout>
  );
};

export default Home;
