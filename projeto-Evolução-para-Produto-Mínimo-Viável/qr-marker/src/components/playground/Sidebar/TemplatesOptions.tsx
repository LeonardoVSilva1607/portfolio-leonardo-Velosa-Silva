import React from 'react';
import { useQR } from '../../../context/QRContext';
import { PRESET_TEMPLATES, Template } from '../../../constants/templates';
import { LayoutGrid, Check } from 'lucide-react';

export const TemplatesOptions: React.FC = () => {
  const { state, updateState } = useQR();

  const handleApplyTemplate = (template: Template) => {
    updateState(template.config);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        {PRESET_TEMPLATES.map((template) => (
          <button
            key={template.id}
            onClick={() => handleApplyTemplate(template)}
            className={`group relative flex flex-col items-start p-3 border transition-all duration-200 text-left ${
              // Simple heuristic to check if template is "active"
              // (Not perfect but good for UX)
              state.dotsOptions.type === template.config.dotsOptions?.type &&
              state.dotsOptions.color === template.config.dotsOptions?.color
                ? 'bg-red-600/10 border-red-500 shadow-[0_0_15px_rgba(220,38,38,0.2)]'
                : 'bg-black border-white/10 hover:border-blue-500/50 hover:bg-white/5'
            }`}
          >
            <div className="flex items-center justify-between w-full mb-1">
              <span className={`text-[10px] font-black uppercase tracking-tighter ${
                state.dotsOptions.type === template.config.dotsOptions?.type &&
                state.dotsOptions.color === template.config.dotsOptions?.color
                  ? 'text-red-500'
                  : 'text-white group-hover:text-blue-400'
              }`}>
                {template.name}
              </span>
              {state.dotsOptions.type === template.config.dotsOptions?.type &&
               state.dotsOptions.color === template.config.dotsOptions?.color && (
                <Check size={10} className="text-red-500" />
              )}
            </div>
            <p className="text-[9px] text-gray-500 leading-tight">
              {template.description}
            </p>
            
            {/* Visual indicator of the template colors */}
            <div className="flex gap-1 mt-2">
              <div 
                className="w-2 h-2 rounded-full border border-white/10" 
                style={{ backgroundColor: template.config.dotsOptions?.color || '#fff' }} 
              />
              <div 
                className="w-2 h-2 rounded-full border border-white/10" 
                style={{ backgroundColor: template.config.backgroundOptions?.color || '#000' }} 
              />
            </div>
          </button>
        ))}
      </div>
      
      <div className="p-3 bg-blue-900/10 border border-blue-500/20">
        <div className="flex items-center gap-2 mb-1">
          <LayoutGrid size={12} className="text-blue-400" />
          <span className="text-[10px] font-bold text-blue-400 uppercase tracking-wider">Quick Note</span>
        </div>
        <p className="text-[9px] text-gray-500 leading-relaxed">
          Applying a template will overwrite your current style settings. You can still customize everything manually after applying.
        </p>
      </div>
    </div>
  );
};
