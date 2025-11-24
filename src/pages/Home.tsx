import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PublicLayout } from '@/components/layout/PublicLayout';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import NewsletterSignup from '@/components/ui/NewsletterSignup';
import { Code2, Layout, Terminal, ArrowRight, Check, Sparkles, Zap, Target } from 'lucide-react';
import { BackgroundGradient } from '@/components/ui/background-gradient';
import { TextGenerateEffect } from '@/components/ui/text-generate-effect';
import { BentoGrid, BentoGridItem } from '@/components/ui/bento-grid';
import { Spotlight } from '@/components/ui/spotlight';

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
      {/* Hero Section with Spotlight */}
      <section className="relative overflow-hidden">
        <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="url(#gradient)" />
        <svg width="0" height="0" className="absolute">
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="hsl(var(--cyan))" />
              <stop offset="50%" stopColor="hsl(var(--purple))" />
              <stop offset="100%" stopColor="hsl(var(--pink))" />
            </linearGradient>
          </defs>
        </svg>
        <div className="container mx-auto px-4 md:px-8 py-20 md:py-32 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="mb-8">
                <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
                  Custom Web Solutions
                  <span className="block text-gradient mt-2">Built for You</span>
                </h1>
              </div>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                Freelance developer specializing in custom websites, web systems, and Python automation tools.
              </p>
              <div className="flex gap-4">
                <Link to="/get-started">
                  <Button size="lg" className="group relative overflow-hidden rounded-xl gradient-primary hover:shadow-2xl hover:shadow-cyan-500/25 transition-all">
                    <span className="relative z-10 flex items-center text-white font-semibold">
                      Get Started
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </Button>
                </Link>
                <Link to="/portfolio">
                  <Button size="lg" variant="outline" className="rounded-xl border-2 hover:border-cyan-500/50 transition-all">
                    View Portfolio
                  </Button>
                </Link>
              </div>
            </motion.div>

            <div className="flex flex-col gap-6">
              <BackgroundGradient className="rounded-3xl p-1">
                <div className="card-minimal bg-card">
                  <div className="p-8 text-center">
                    <Sparkles className="mx-auto mb-4 h-12 w-12 text-cyan-500" />
                    <h3 className="text-2xl font-bold mb-2">Modern & Fast</h3>
                    <p className="text-muted-foreground">Built with cutting-edge technologies for optimal performance</p>
                  </div>
                </div>
              </BackgroundGradient>
              <BackgroundGradient className="rounded-3xl p-1">
                <div className="card-minimal bg-card">
                  <div className="p-8 text-center">
                    <Zap className="mx-auto mb-4 h-12 w-12 text-purple-500" />
                    <h3 className="text-2xl font-bold mb-2">Responsive Design</h3>
                    <p className="text-muted-foreground">Seamless experience across all devices and screen sizes</p>
                  </div>
                </div>
              </BackgroundGradient>
            </div>
          </div>
        </div>
      </section>

      {/* What I Build - Bento Grid Style */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">What I Build</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Comprehensive solutions across web development and automation
            </p>
          </motion.div>

          <BentoGrid className="max-w-6xl mx-auto">
            {services.map((service, index) => (
              <BentoGridItem
                key={service.title}
                title={service.title}
                description={service.description}
                header={
                  <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl gradient-primary items-center justify-center">
                    <div className="text-white">{service.icon}</div>
                  </div>
                }
                icon={service.icon}
                className={index === 1 ? "md:col-span-2" : ""}
              />
            ))}
          </BentoGrid>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20">
        <div className="container mx-auto px-4 md:px-8">
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
                <div className="card-minimal h-full text-center p-8 hover:shadow-2xl transition-all">
                  <div className="text-6xl font-bold text-gradient mb-4">
                    {step.number}
                  </div>
                  <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-purple-500/10 to-pink-500/10" />
        <div className="container mx-auto px-4 md:px-8 text-center relative z-10">
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
              <Button size="lg" className="gradient-primary hover:shadow-2xl hover:shadow-purple-500/25 rounded-xl px-8 text-white font-semibold transition-all">
                Get Started Today
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Newsletter Signup Section - vibrant colors and big header */}
      <section className="bg-gradient-to-br from-pink-100 via-yellow-50 to-blue-100 py-20">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex flex-col items-center gap-6">
            <h2 className="text-4xl md:text-5xl font-extrabold text-primary mb-4 drop-shadow-lg">Join the Newsletter</h2>
            <span className="text-lg text-primary/80 mb-2 font-medium">Sign up for updates, tips, and exclusive offers. You’ll get notified about new features and login changes.</span>
            <NewsletterSignup />
          </div>
        </div>
      </section>
    </PublicLayout>
  );
};

export default Home;
