import React from 'react';
import { useAppContext } from '../context/AppContext';
import { Sparkles } from 'lucide-react';

export default function Navbar() {
  const { currency, setCurrency } = useAppContext();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <div className="text-2xl font-bold tracking-widest flex items-center gap-2">
          <Sparkles className="text-indigo-500" />
          AETHERIA
        </div>
        <div className="flex gap-6 items-center text-sm font-medium">
          <a href="#models" className="hover:text-indigo-400 transition">Models</a>
          <a href="#compare" className="hover:text-indigo-400 transition">Compare</a>
          <a href="#booking" className="hover:text-indigo-400 transition">Test Drive</a>
          <button 
            onClick={() => setCurrency(currency === 'INR' ? 'USD' : 'INR')}
            className="px-3 py-1 bg-white/10 rounded-full hover:bg-white/20 transition"
          >
            {currency}
          </button>
        </div>
      </div>
    </nav>
  );
}
