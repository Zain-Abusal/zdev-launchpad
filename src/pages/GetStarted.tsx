import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { PublicLayout } from '@/components/layout/PublicLayout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

const GetStarted = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    projectTitle: '',
    projectType: 'website',
    description: '',
    budget: '',
    timeframe: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.from('project_requests').insert({
        full_name: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        project_title: formData.projectTitle,
        description: `Type: ${formData.projectType}\n\nDescription: ${formData.description}\n\nBudget: ${formData.budget}\nTimeframe: ${formData.timeframe}`,
        status: 'new',
      });

      if (error) throw error;

      toast({
        title: 'Request submitted!',
        description: "I'll review your project and get back to you soon.",
      });

      navigate('/');
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to submit request. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <PublicLayout>
      <section className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Start Your Project</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Tell me about your project and let's bring your vision to life
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-3xl mx-auto"
        >
          <Card className="p-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Your Details */}
              <div>
                <h2 className="text-xl font-bold mb-4">Your Details</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="fullName">Full Name *</Label>
                    <Input
                      id="fullName"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                    />
                  </div>

                  <div className="md:col-span-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>
                </div>
              </div>

              {/* Project Details */}
              <div>
                <h2 className="text-xl font-bold mb-4">Project Details</h2>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="projectTitle">What do you want built? *</Label>
                    <Input
                      id="projectTitle"
                      placeholder="e.g., E-commerce website for my business"
                      value={formData.projectTitle}
                      onChange={(e) => setFormData({ ...formData, projectTitle: e.target.value })}
                      required
                    />
                  </div>

                  <div>
                    <Label>Project Type *</Label>
                    <RadioGroup
                      value={formData.projectType}
                      onValueChange={(value) => setFormData({ ...formData, projectType: value })}
                      className="flex flex-wrap gap-4 mt-2"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="website" id="website" />
                        <Label htmlFor="website" className="cursor-pointer">Website</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="system" id="system" />
                        <Label htmlFor="system" className="cursor-pointer">System</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="python" id="python" />
                        <Label htmlFor="python" className="cursor-pointer">Python</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="mixed" id="mixed" />
                        <Label htmlFor="mixed" className="cursor-pointer">Mixed</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div>
                    <Label htmlFor="description">Detailed Description *</Label>
                    <Textarea
                      id="description"
                      rows={6}
                      placeholder="Describe your project in detail..."
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Budget & Timeline */}
              <div>
                <h2 className="text-xl font-bold mb-4">Budget & Timeline</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="budget">Budget</Label>
                    <Input
                      id="budget"
                      placeholder="e.g., $5,000 - $10,000"
                      value={formData.budget}
                      onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    />
                  </div>

                  <div>
                    <Label htmlFor="timeframe">Timeframe</Label>
                    <Input
                      id="timeframe"
                      placeholder="e.g., 4 weeks, end of next month"
                      value={formData.timeframe}
                      onChange={(e) => setFormData({ ...formData, timeframe: e.target.value })}
                    />
                  </div>
                </div>
              </div>

              <Button type="submit" size="lg" className="w-full" disabled={loading}>
                {loading ? 'Submitting...' : 'Submit Request'}
              </Button>
            </form>
          </Card>
        </motion.div>
      </section>
    </PublicLayout>
  );
};

export default GetStarted;
