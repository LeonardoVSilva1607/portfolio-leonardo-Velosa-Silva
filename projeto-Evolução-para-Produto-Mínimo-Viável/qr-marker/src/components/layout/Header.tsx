import React from 'react';
import { Github, LogIn, LogOut, User as UserIcon } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const Header: React.FC = () => {
  const { user, login, logout } = useAuth();

  return (
    <header className="bg-black text-white h-16 flex items-center justify-between px-8 border-b border-white/5">
      <div className="flex items-center gap-2">
        <span className="font-bold text-xl tracking-tight italic text-red-500">QR</span>
        <span className="font-bold text-xl tracking-tight italic">marker</span>
      </div>
      <div className="flex items-center gap-6 text-sm font-medium">
        {user ? (
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-xs opacity-80">
              {user.photoURL ? (
                <img src={user.photoURL} alt={user.displayName || ''} className="w-6 h-6 rounded-full border border-blue-500" referrerPolicy="no-referrer" />
              ) : (
                <UserIcon size={16} />
              )}
              <span>{user.displayName}</span>
            </div>
            <button 
              onClick={logout}
              className="flex items-center gap-2 hover:text-red-500 transition-colors text-xs uppercase font-bold tracking-wider"
            >
              <LogOut size={16} />
              Logout
            </button>
          </div>
        ) : (
          <button 
            onClick={login}
            className="flex items-center gap-2 hover:text-blue-500 transition-colors text-xs uppercase font-bold tracking-wider"
          >
            <LogIn size={16} />
            Login
          </button>
        )}
        <div className="w-[1px] h-4 bg-white/10" />
        <a 
          href="https://github.com/LeonardoVSilva1607/Projetos-feitos-ou-em-andamento-/tree/main/trabalho%20de%20promt" 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center gap-2 hover:text-blue-500 transition-colors"
        >
          <Github size={18} />
          GitHub
        </a>
      </div>
    </header>
  );
};
