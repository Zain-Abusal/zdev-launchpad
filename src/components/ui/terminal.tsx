import { useState } from 'react';
import { Card } from './card';
import { Button } from './button';

const sampleHistory = [
  { type: 'output', text: 'Welcome to the web terminal!' },
];

export const Terminal = () => {
  const [history, setHistory] = useState(sampleHistory);
  const [input, setInput] = useState('');

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    setHistory((h) => [...h, { type: 'input', text: input }]);
    // Simulate output
    setTimeout(() => {
      setHistory((h) => [...h, { type: 'output', text: `You typed: ${input}` }]);
    }, 500);
    setInput('');
  };

  return (
    <Card className="p-4 bg-black text-white font-mono">
      <div className="h-64 overflow-y-auto mb-2">
        {history.map((item, idx) => (
          <div key={idx} className={item.type === 'input' ? 'text-green-400' : 'text-white'}>
            {item.type === 'input' ? `> ${item.text}` : item.text}
          </div>
        ))}
      </div>
      <form onSubmit={handleCommand} className="flex gap-2">
        <input
          className="flex-1 bg-gray-900 text-white px-2 py-1 rounded border border-gray-700"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          autoFocus
          placeholder="Type a command..."
        />
        <Button type="submit" size="sm">Run</Button>
      </form>
    </Card>
  );
};
