import { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';

const legalTypes = [
  { key: 'tos', label: 'Terms of Service', slug: 'tos' },
  { key: 'privacy', label: 'Privacy Policy', slug: 'privacy' },
  { key: 'gdpr', label: 'GDPR', slug: 'gdpr' },
];

const Legal = () => {
  const [activeTab, setActiveTab] = useState(legalTypes[0].key);
  const [legal, setLegal] = useState<any>({});

  useEffect(() => {
    const tab = legalTypes.find(l => l.key === activeTab);
    if (tab) fetchLegal(tab.slug, tab.key);
  }, [activeTab]);

  const fetchLegal = async (slug: string, key: string) => {
    const { data } = await supabase
      .from('docs')
      .select('content')
      .eq('slug', slug)
      .limit(1);
    setLegal((prev: any) => ({ ...prev, [key]: data && data[0] ? data[0].content : 'Not available.' }));
  };

  return (
    <div className="max-w-2xl mx-auto py-8">
      <Card>
        <CardHeader>
          <CardTitle>Legal Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-4">
            {legalTypes.map(l => (
              <button
                key={l.key}
                className={`px-3 py-1 rounded ${activeTab === l.key ? 'bg-primary text-white' : 'bg-muted'}`}
                onClick={() => setActiveTab(l.key)}
              >
                {l.label}
              </button>
            ))}
          </div>
          <div className="prose max-w-none">
            {legal[activeTab] || 'Loading...'}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Legal;
