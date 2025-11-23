import React, { useState } from 'react';

const CookieBanner: React.FC = () => {
  const [visible, setVisible] = useState(true);
  if (!visible) return null;
  return (
    <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, background: '#222', color: '#fff', padding: '16px', zIndex: 1000, textAlign: 'center' }}>
      This site uses cookies for security and bot protection (Cloudflare Turnstile). By continuing, you accept our use of cookies. <button style={{ marginLeft: 16, background: '#fff', color: '#222', border: 'none', padding: '8px 16px', borderRadius: 4, cursor: 'pointer' }} onClick={() => setVisible(false)}>Accept</button>
    </div>
  );
};

export default CookieBanner;