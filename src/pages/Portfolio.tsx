import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PublicLayout } from '@/components/layout/PublicLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { MovingBorder } from '@/components/ui/moving-border';
import { Eye } from 'lucide-react';

const Portfolio = () => {
  const [projects, setProjects] = useState<any[]>([]);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('featured', true)
      .order('created_at', { ascending: false });
    if (data) setProjects(data);
  };

  const filters = ['All', 'website', 'system', 'python'];

  const filteredProjects = filter === 'All' 
    ? projects 
    : projects.filter(p => p.type.toLowerCase() === filter.toLowerCase());

  return (
    <PublicLayout>
      <section className="min-h-screen px-4 md:px-8 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-4 text-gradient">Portfolio</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A selection of projects I've built for clients
          </p>
        </motion.div>

        <div className="flex justify-center gap-3 mb-14 flex-wrap">
          {filters.map((f) => (
            <motion.div
              key={f}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Badge
                variant={filter === f ? 'default' : 'outline'}
                className={`cursor-pointer px-6 py-2.5 text-base font-semibold rounded-full transition-all duration-200 ${
                  filter === f ? 'gradient-primary text-white shadow-lg shadow-cyan-500/25' : 'bg-card hover:bg-muted'
                }`}
                onClick={() => setFilter(f)}
              >
                {f}
              </Badge>
            </motion.div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: index * 0.1, type: 'spring' }}
            >
              <Link to={`/portfolio/${project.id}`}>
                <MovingBorder
                  duration={3000}
                  className="rounded-2xl overflow-hidden h-full"
                  rx="24px"
                  ry="24px"
                >
                  <div className="card-minimal overflow-hidden hover:shadow-2xl transition-all h-full group bg-card">
                    {project.images && Array.isArray(project.images) && project.images.length > 0 ? (
                      <div className="aspect-video bg-muted overflow-hidden relative">
                        <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity z-10 flex items-center justify-center">
                          <Eye className="h-12 w-12 text-cyan-500" />
                        </div>
                        {project.images.slice(0, 2).map((img: string, idx: number) => (
                          <img
                            key={idx}
                            src={img}
                            alt={project.title}
                            className="w-1/2 h-full object-cover inline-block group-hover:scale-110 transition-transform duration-500"
                            onError={(e) => {
                              e.currentTarget.style.display = 'none';
                            }}
                          />
                        ))}
                      </div>
                    ) : project.image_url ? (
                      <div className="aspect-video bg-muted overflow-hidden relative">
                        <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity z-10 flex items-center justify-center">
                          <Eye className="h-12 w-12 text-cyan-500" />
                        </div>
                        <img
                          src={project.image_url}
                          alt={project.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                          }}
                        />
                      </div>
                    ) : null}
                    <div className="p-6">
                      <div className="flex items-start justify-between gap-2 mb-3">
                        <h3 className="text-xl font-bold">{project.title || 'Untitled'}</h3>
                        <Badge variant="secondary" className="shrink-0">{project.type || 'N/A'}</Badge>
                      </div>
                      <p className="text-muted-foreground">
                        {project.short_description ||
                          (project.full_description
                            ? project.full_description.slice(0, 120) + (project.full_description.length > 120 ? '...' : '')
                            : 'No description available.')}
                      </p>
                    </div>
                  </div>
                </MovingBorder>
              </Link>
            </motion.div>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">No projects found for this filter.</p>
          </div>
        )}
      </section>
    </PublicLayout>
  );
};

export default Portfolio;
