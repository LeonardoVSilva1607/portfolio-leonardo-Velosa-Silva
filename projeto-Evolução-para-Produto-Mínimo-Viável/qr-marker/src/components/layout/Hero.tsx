import React from 'react';

export const Hero: React.FC = () => {
  return (
    <section className="relative h-[300px] flex items-center px-12 overflow-hidden bg-black">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 via-black to-red-900/20" />
      <div className="z-10 max-w-2xl">
        <h1 className="text-5xl font-bold text-white mb-4 italic tracking-tighter">
          <span className="text-red-500">QR</span> marker
        </h1>
        <p className="text-xl text-white/60 leading-relaxed font-light">
          An open source library <br />
          for making <span className="text-blue-400">unique</span> QR codes
        </p>
      </div>
      <div className="absolute right-0 top-0 w-1/2 h-full opacity-20 pointer-events-none">
        <div className="w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-500/20 via-transparent to-transparent" />
      </div>
    </section>
  );
};
