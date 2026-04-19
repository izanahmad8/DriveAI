import React from 'react';

export default function Hero() {
  return (
    <section id="hero" className="relative h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img 
          src="/images/apex.png" 
          alt="Aetheria Apex" 
          className="w-full h-full object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
      </div>
      
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 drop-shadow-lg">
          The Future of Driving,<br/> <span className="text-indigo-400">Navigated by AI.</span>
        </h1>
        <p className="text-lg md:text-2xl text-gray-300 mb-10 font-light">
          Experience the pinnacle of automotive engineering with Aetheria Motors.
          Talk to our AI assistant to find your perfect ride.
        </p>
        <a href="#models" className="px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full font-semibold transition shadow-[0_0_20px_rgba(79,70,229,0.4)]">
          Explore Models
        </a>
      </div>
    </section>
  );
}
