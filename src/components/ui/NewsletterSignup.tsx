
import React, { useState } from 'react';

const NewsletterSignup: React.FC = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setSubmitted(true);
      setLoading(false);
    }, 1200);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full flex justify-center items-center">
      <div className="relative">
        <input
          type="email"
          required
          placeholder={submitted ? 'Subscribed!' : 'Enter your email'}
          className={`peer px-6 py-3 w-72 rounded-full border border-primary/30 bg-white/70 shadow-lg outline-none text-base text-primary transition-all duration-300 focus:border-primary focus:bg-white/90 focus:shadow-xl ${submitted ? 'bg-green-100 border-green-400 text-green-700' : ''}`}
          value={email}
          onChange={e => setEmail(e.target.value)}
          disabled={loading || submitted}
        />
        <button
          type="submit"
          className={`absolute right-2 top-1/2 -translate-y-1/2 px-5 py-2 rounded-full bg-primary text-white font-semibold shadow-md transition-all duration-300 hover:bg-primary/90 focus:outline-none ${loading || submitted ? 'opacity-60 cursor-not-allowed' : ''}`}
          disabled={loading || submitted}
        >
          {loading ? (
            <span className="animate-spin inline-block w-5 h-5 border-2 border-white border-t-transparent rounded-full"></span>
          ) : submitted ? '✓' : 'Subscribe'}
        </button>
      </div>
    </form>
  );
};

export default NewsletterSignup;
