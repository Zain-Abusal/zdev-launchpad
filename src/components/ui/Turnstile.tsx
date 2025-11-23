import { useEffect, useRef, useState } from 'react';

declare global {
  interface Window {
    turnstile?: {
      render: (
        element: HTMLElement,
        options: { sitekey: string; callback: (token: string) => void }
      ) => void;
    };
  }
}

interface TurnstileProps {
  siteKey: string;
  onVerify: (token: string) => void;
}

const Turnstile: React.FC<TurnstileProps> = ({ siteKey, onVerify }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (!window.turnstile) {
      const script = document.createElement('script');
      script.src = 'https://challenges.cloudflare.com/turnstile/v2/api.js';
      script.async = true;
      document.body.appendChild(script);
      script.onload = () => {
        try {
          window.turnstile && window.turnstile.render(ref.current!, {
            sitekey: siteKey,
            callback: onVerify,
          });
        } catch {
          setError(true);
        }
      };
      // Fallback if widget doesn't render in 5s
      timeout = setTimeout(() => {
        if (!ref.current || !ref.current.hasChildNodes()) setError(true);
      }, 5000);
    } else {
      try {
        window.turnstile.render(ref.current!, {
          sitekey: siteKey,
          callback: onVerify,
        });
      } catch {
        setError(true);
      }
    }
    return () => clearTimeout(timeout);
  }, [siteKey, onVerify]);

  return (
    <div style={{ minHeight: 80, margin: '16px 0' }}>
      <div ref={ref} />
      {error && (
        <div style={{ color: 'red', marginTop: 8, fontSize: 14 }}>
          Turnstile widget failed to load. Please check your connection or disable adblockers.
        </div>
      )}
    </div>
  );
};

export default Turnstile;
