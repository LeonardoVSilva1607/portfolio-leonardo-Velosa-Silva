import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface AccordionProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

export const Accordion: React.FC<AccordionProps> = ({ title, children, defaultOpen = false }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="flex flex-col border-b border-white/5 last:border-b-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-[#121212] p-4 flex items-center justify-between text-white hover:bg-[#1a1a1a] transition-colors cursor-pointer"
      >
        <span className="text-[11px] font-bold uppercase tracking-wider">{title}</span>
        {isOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
      </button>
      
      {isOpen && (
        <div className="bg-[#0a0a0a] p-6 space-y-6 border-t border-white/5">
          {children}
        </div>
      )}
    </div>
  );
};
