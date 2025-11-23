import { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import CookieBanner from '@/components/ui/CookieBanner';
import { supabase } from '../integrations/supabase/client';

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
            {activeTab === 'tos' && (
              <>
                <h3>Additional Terms</h3>
                <ul>
                  <li>User actions and system events may be logged for security and audit purposes.</li>
                  <li>Cloudflare Turnstile CAPTCHA is used to protect sensitive actions.</li>
                  <li>Turnstile may set cookies for bot protection and session management.</li>
                </ul>
              </>
            )}
            {activeTab === 'privacy' && (
              <>
                <h3>Additional Privacy Information</h3>
                <ul>
                  <li>We log user actions, system events, and device information for security and service improvement.</li>
                  <li>Cloudflare Turnstile CAPTCHA is used and may set cookies to verify users and prevent abuse.</li>
                  <li>Logged data is not shared with third parties except as required by law.</li>
                </ul>
              </>
            )}
          </div>
        </CardContent>
      </Card>
      <CookieBanner />
    </div>
  );
};

export default Legal;
