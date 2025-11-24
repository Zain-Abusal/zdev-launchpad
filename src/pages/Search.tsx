import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PublicLayout } from '@/components/layout/PublicLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Search as SearchIcon, FileText, Folder, Code } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [searchTerm, setSearchTerm] = useState(query);
  const [results, setResults] = useState<any>({
    blog: [],
    portfolio: [],
    projects: [],
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (query) {
      performSearch(query);
    }
  }, [query]);

  const performSearch = async (term: string) => {
    if (!term.trim()) return;
    
    setLoading(true);
    const searchPattern = `%${term}%`;

    try {
      // Search blog posts
      const { data: blogData } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('published', true)
        .or(`title.ilike.${searchPattern},content.ilike.${searchPattern},excerpt.ilike.${searchPattern}`);

      // Search portfolio
      const { data: portfolioData } = await supabase
        .from('portfolio')
        .select('*')
        .or(`title.ilike.${searchPattern},short_description.ilike.${searchPattern},full_description.ilike.${searchPattern}`);

      // Search projects
      const { data: projectsData } = await supabase
        .from('projects')
        .select('*')
        .or(`title.ilike.${searchPattern},short_description.ilike.${searchPattern},full_description.ilike.${searchPattern}`);

      setResults({
        blog: blogData || [],
        portfolio: portfolioData || [],
        projects: projectsData || [],
      });
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      setSearchParams({ q: searchTerm });
    }
  };

  const totalResults = results.blog.length + results.portfolio.length + results.projects.length;

  return (
    <PublicLayout>
      <section className="min-h-screen px-4 md:px-8 py-20">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-8 text-gradient">Search</h1>
            
            <form onSubmit={handleSearch} className="mb-12">
              <div className="relative">
                <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search blog posts, projects, and more..."
                  className="pl-12 h-14 text-lg rounded-2xl border-0 bg-muted/50"
                />
              </div>
            </form>

            {query && (
              <div className="mb-6">
                <p className="text-muted-foreground">
                  {loading ? 'Searching...' : `${totalResults} results for "${query}"`}
                </p>
              </div>
            )}

            <div className="space-y-12">
              {/* Blog Results */}
              {results.blog.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                    <FileText className="h-6 w-6" />
                    Blog Posts ({results.blog.length})
                  </h2>
                  <div className="grid gap-6">
                    {results.blog.map((post: any) => (
                      <Link key={post.id} to={`/blog/${post.slug}`}>
                        <Card className="card-minimal hover:shadow-xl transition-all">
                          <CardHeader>
                            <CardTitle className="text-xl">{post.title}</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <p className="text-muted-foreground line-clamp-2 mb-4">
                              {post.excerpt}
                            </p>
                            {post.tags && post.tags.length > 0 && (
                              <div className="flex flex-wrap gap-2">
                                {post.tags.slice(0, 3).map((tag: string) => (
                                  <Badge key={tag} variant="secondary">{tag}</Badge>
                                ))}
                              </div>
                            )}
                          </CardContent>
                        </Card>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Portfolio Results */}
              {results.portfolio.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                    <Folder className="h-6 w-6" />
                    Portfolio ({results.portfolio.length})
                  </h2>
                  <div className="grid gap-6">
                    {results.portfolio.map((item: any) => (
                      <Link key={item.id} to={`/portfolio/${item.id}`}>
                        <Card className="card-minimal hover:shadow-xl transition-all">
                          <CardHeader>
                            <div className="flex items-start justify-between">
                              <CardTitle className="text-xl">{item.title}</CardTitle>
                              <Badge variant="secondary">{item.type}</Badge>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <p className="text-muted-foreground line-clamp-2">
                              {item.short_description || item.full_description}
                            </p>
                          </CardContent>
                        </Card>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Projects Results */}
              {results.projects.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                    <Code className="h-6 w-6" />
                    Projects ({results.projects.length})
                  </h2>
                  <div className="grid gap-6">
                    {results.projects.map((project: any) => (
                      <Link key={project.id} to={`/portfolio/${project.id}`}>
                        <Card className="card-minimal hover:shadow-xl transition-all">
                          <CardHeader>
                            <div className="flex items-start justify-between">
                              <CardTitle className="text-xl">{project.title}</CardTitle>
                              <Badge variant="secondary">{project.type}</Badge>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <p className="text-muted-foreground line-clamp-2">
                              {project.short_description || project.full_description}
                            </p>
                          </CardContent>
                        </Card>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {totalResults === 0 && query && !loading && (
                <div className="text-center py-12">
                  <p className="text-muted-foreground text-lg">No results found for "{query}"</p>
                  <p className="text-muted-foreground mt-2">Try different keywords or check the spelling</p>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </section>
    </PublicLayout>
  );
};

export default Search;
