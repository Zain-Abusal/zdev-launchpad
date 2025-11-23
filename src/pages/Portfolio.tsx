import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PublicLayout } from '@/components/layout/PublicLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';

const Portfolio = () => {
  const [projects, setProjects] = useState<any[]>([]);
  const [filter, setFilter] = useState('All');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data, error } = await supabase
        .from('portfolio')
        .select('*')
        .eq('featured', true)
        .order('created_at', { ascending: false });
      if (error) {
        setError('Failed to fetch projects.');
        setProjects([]);
      } else if (!data || data.length === 0) {
        setProjects([]);
      } else {
        setProjects(data);
      }
    } catch (err) {
      setError('Unexpected error occurred.');
      setProjects([]);
    }
    setLoading(false);
  };

  const filters = ['All', 'website', 'system', 'python'];

  const filteredProjects = filter === 'All' 
    ? projects 
    : projects.filter(p => p.type?.toLowerCase() === filter.toLowerCase());

  return (
    <PublicLayout>
      <section className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Portfolio</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A selection of projects I've built for clients
          </p>
        </motion.div>

        <div className="flex justify-center gap-2 mb-12 flex-wrap">
          {filters.map((f) => (
            <Badge
              key={f}
              variant={filter === f ? 'default' : 'outline'}
              className="cursor-pointer hover-scale"
              onClick={() => setFilter(f)}
            >
              {f}
            </Badge>
          ))}
        </div>

        {loading ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Loading projects...</p>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-red-500">{error}</p>
          </div>
        ) : (
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Link to={`/portfolio/${project.id}`}>
                    <Card className="overflow-hidden hover-lift hover-scale h-full">
                      {project.images && Array.isArray(project.images) && project.images.length > 0 ? (
                        <div className="aspect-video bg-muted overflow-hidden flex flex-row gap-2">
                          {project.images.slice(0,2).map((img: string, idx: number) => (
                            <img 
                              key={idx}
                              src={img}
                              alt={project.title}
                              className="w-1/2 h-full object-cover rounded"
                              onError={e => { e.currentTarget.style.display = 'none'; }}
                            />
                          ))}
                        </div>
                      ) : project.image_url ? (
                        <div className="aspect-video bg-muted overflow-hidden">
                          <img 
                            src={project.image_url} 
                            alt={project.title}
                            className="w-full h-full object-cover"
                            onError={e => { e.currentTarget.style.display = 'none'; }}
                          />
                        </div>
                      ) : null}
                      <CardHeader>
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <CardTitle className="text-lg">{project.title || 'Untitled'}</CardTitle>
                          <Badge variant="secondary">{project.type || 'N/A'}</Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground">
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
                <p className="text-muted-foreground">No projects found for this filter.</p>
              </div>
            )}
          </>
        )}
      </section>
    </PublicLayout>
  );
};

export default Portfolio;
