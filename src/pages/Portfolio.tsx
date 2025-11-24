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
      <section className="bg-gradient-to-br from-blue-50 via-pink-50 to-yellow-100 min-h-screen px-4 md:px-8 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-extrabold mb-4 text-primary drop-shadow-lg">Portfolio</h1>
          <p className="text-xl text-primary/80 max-w-2xl mx-auto">
            A selection of projects I've built for clients
          </p>
        </motion.div>

        <div className="flex justify-center gap-2 mb-12 flex-wrap">
          {filters.map((f) => (
            <motion.div
              key={f}
              variant={filter === f ? 'default' : 'outline'}
              className={`cursor-pointer px-5 py-2 text-base font-semibold rounded-xl shadow-md transition-all duration-200 ${filter === f ? 'bg-primary text-white' : 'bg-white/80 text-primary border border-primary/30'}`}
              onClick={() => setFilter(f)}
            >
              {f}
            </Badge>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.8, delay: index * 0.2, type: 'spring' }}
            >
              <Link to={`/portfolio/${project.id}`}>
                <Card className="overflow-hidden rounded-2xl shadow-2xl bg-white/90 dark:bg-card border-2 border-primary/10 hover:scale-[1.03] hover:shadow-primary/30 transition-all duration-300 h-full">
                  {project.images && Array.isArray(project.images) && project.images.length > 0 ? (
                    <div className="aspect-video bg-muted overflow-hidden flex flex-row gap-2">
                      {project.images.slice(0,2).map((img: string, idx: number) => (
                        <img 
                          key={idx}
                          src={img}
                          alt={project.title}
                          className="w-1/2 h-full object-cover rounded-xl"
                          onError={e => { e.currentTarget.style.display = 'none'; }}
                        />
                      ))}
                    </div>
                  ) : project.image_url ? (
                    <div className="aspect-video bg-muted overflow-hidden rounded-xl">
                      <img 
                        src={project.image_url} 
                        alt={project.title}
                        className="w-full h-full object-cover rounded-xl"
                        onError={e => { e.currentTarget.style.display = 'none'; }}
                      />
                    </div>
                  ) : null}
                  <CardHeader>
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <CardTitle className="text-xl font-bold text-primary/90">{project.title || 'Untitled'}</CardTitle>
                      <Badge variant="secondary" className="px-3 py-1 rounded-lg text-xs font-semibold">{project.type || 'N/A'}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-base text-muted-foreground mb-2">
                      {project.short_description || (project.full_description ? project.full_description.slice(0, 120) + (project.full_description.length > 120 ? '...' : '') : 'No description available.')}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <p className="text-primary/70 text-lg">No projects found for this filter.</p>
          </div>
        )}
      </section>
    </PublicLayout>
  );
};

export default Portfolio;
