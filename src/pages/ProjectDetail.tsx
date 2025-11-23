import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { PublicLayout } from '@/components/layout/PublicLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';

const ProjectDetail = () => {
  const { id } = useParams();
  const [project, setProject] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProject = async () => {
      setLoading(true);
      setError(null);
      try {
        const { data, error } = await supabase
          .from('portfolio')
          .select('*')
          .eq('id', id)
          .single();
        if (error) {
          setError('Failed to fetch project.');
          setProject(null);
        } else if (!data) {
          setProject(null);
        } else {
          setProject(data);
        }
      } catch (err) {
        setError('Unexpected error occurred.');
        setProject(null);
      }
      setLoading(false);
    };
    fetchProject();
  }, [id]);

  if (loading) {
    return <PublicLayout><div className="container mx-auto px-4 py-20 text-center">Loading project...</div></PublicLayout>;
  }

  if (!project) {
    return <PublicLayout><div className="container mx-auto px-4 py-20 text-center">{error ? error : 'Project not found.'}</div></PublicLayout>;
  }

  return (
    <PublicLayout>
      <section className="container mx-auto px-4 py-20 max-w-3xl">
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl mb-2">{project.title || 'Untitled'}</CardTitle>
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
              {project.created_at ? new Date(project.created_at).toLocaleDateString() : 'Unknown date'}
            </div>
            <Badge variant="secondary">{project.type || 'N/A'}</Badge>
          </CardHeader>
          <CardContent className="prose prose-lg dark:prose-invert max-w-none">
            <div>{project.full_description || project.short_description || 'No description available.'}</div>
            {project.images && Array.isArray(project.images) && project.images.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                {project.images.map((img: string, idx: number) => (
                  <img key={idx} src={img} alt={`Project image ${idx + 1}`} className="w-full rounded shadow" onError={e => { e.currentTarget.style.display = 'none'; }} />
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </section>
    </PublicLayout>
  );
};

export default ProjectDetail;
