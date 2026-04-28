import React from 'react';
import { Header } from './Header';
import { Hero } from './Hero';
import { Footer } from './Footer';

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-[#0a0a0a] text-white">
      <Header />
      <Hero />
      <main className="flex-1 max-w-[1400px] mx-auto w-full p-8">
        {children}
      </main>
      <Footer />
    </div>
  );
};
