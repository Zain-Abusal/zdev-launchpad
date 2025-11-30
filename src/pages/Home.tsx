import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PublicLayout } from '@/components/layout/PublicLayout';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import AnimatedCard from '@/components/ui/AnimatedCard';
import NewsletterSignup from '@/components/ui/NewsletterSignup';
import { BentoGrid, BentoGridItem } from '@/components/ui/bento-grid';
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
      {/* Hero Section - Modern, Even, shadcn Card */}
      <section className="container mx-auto px-4 md:px-8 py-20 md:py-32">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-6xl font-extrabold tracking-tight mb-6 text-primary drop-shadow-lg">
              Custom Web Solutions
              <span className="block text-secondary">Built for You</span>
            </h1>
            <p className="text-2xl text-muted-foreground mb-8">
              Freelance developer specializing in custom websites, web systems, and Python automation tools.
            </p>
            <div className="flex gap-4">
              <Link to="/get-started">
                <Button size="lg" className="group w-full md:w-auto">
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link to="/portfolio">
                <Button size="lg" variant="outline">View Portfolio</Button>
              </Link>
            </div>
          </motion.div>

          {/* Modern Cards - shadcn/ui Card, visually balanced */}
          <div className="flex flex-col gap-8 items-center w-full">
            <div className="w-full max-w-md">
              <Card className="rounded-2xl shadow-xl bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 border-2 border-primary/10">
                <div className="p-8 text-center">
                  <span className="block text-3xl font-bold text-primary mb-2">Modern</span>
                  <p className="text-base text-muted-foreground mb-2">Built with React, Tailwind, and Framer Motion.</p>
                  <Check className="mx-auto text-primary" />
                </div>
              </Card>
            </div>
            <div className="w-full max-w-md">
              <Card className="rounded-2xl shadow-xl bg-gradient-to-br from-pink-100 via-yellow-100 to-blue-100 border-2 border-secondary/10">
                <div className="p-8 text-center">
                  <span className="block text-3xl font-bold text-secondary mb-2">Fast</span>
                  <p className="text-base text-muted-foreground mb-2">Lightning quick load times and smooth interactions.</p>
                  <ArrowRight className="mx-auto text-secondary" />
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* What I Build - Apple.com style scroll animation */}
      <section className="bg-gradient-to-br from-blue-50 via-pink-50 to-yellow-50 py-20">
        <div className="container mx-auto px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8, type: 'spring' }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">What I Build</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Comprehensive solutions across web development and automation
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.8, delay: index * 0.2, type: 'spring' }}
              >
                <AnimatedCard className="h-full">
                  <div className="text-primary mb-4">{service.icon}</div>
                  <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                  <p className="text-muted-foreground">{service.description}</p>
                </AnimatedCard>
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
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">How It Works</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              A straightforward process from idea to launch
            </p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1, type: "spring" }}
              >
                <AnimatedCard className="text-center h-full">
                  <div className="text-4xl font-bold text-primary mb-4">{step.number}</div>
                  <h3 className="text-lg font-bold mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                </AnimatedCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-primary/80 to-secondary/80 text-primary-foreground py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:20px_20px]" />
        <div className="container mx-auto px-4 md:px-8 text-center relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Start Your Project?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Let's discuss how I can help bring your vision to life
            </p>
            <Link to="/get-started">
                <Button size="lg" variant="secondary" className="group w-full md:w-auto hover-scale">
                Get Started Today
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </PublicLayout>
  );
};

export default Home;
