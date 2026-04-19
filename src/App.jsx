import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Models from './components/Models';
import Compare from './components/Compare';
import BookingForm from './components/BookingForm';
import AIAssistant from './components/AIAssistant';

function App() {
  return (
    <div className="bg-black text-white min-h-screen scroll-smooth">
      <Navbar />
      <main>
        <Hero />
        <Models />
        <div className="w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent my-10" />
        <Compare />
        <div className="w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent my-10" />
        <BookingForm />
      </main>
      <footer className="py-12 text-center text-gray-500 border-t border-white/10 mt-20">
        <p>© {new Date().getFullYear()} Aetheria Motors. DriveAI Prototype.</p>
      </footer>
      <AIAssistant />
    </div>
  );
}

export default App;
