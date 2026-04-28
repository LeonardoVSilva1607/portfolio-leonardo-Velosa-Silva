import React from 'react';

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-gray-100 font-sans selection:bg-blue-500/30">
      <header className="border-b border-white/10 bg-[#0f0f0f]/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-600/20">
              <span className="font-bold text-white text-xl">Q</span>
            </div>
            <h1 className="text-xl font-semibold tracking-tight">
              QR <span className="text-blue-500">Stylist</span>
            </h1>
          </div>
          <div className="flex items-center gap-4 text-sm text-gray-400">
            <span className="hidden sm:inline">Professional QR Generation</span>
            <div className="h-4 w-px bg-white/10 hidden sm:block"></div>
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              v1.0.0
            </a>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {children}
      </main>

      <footer className="border-t border-white/5 py-8 mt-auto">
        <div className="max-w-7xl mx-auto px-4 text-center text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} QR Stylist • Built for Developers</p>
        </div>
      </footer>
    </div>
  );
};
