import React from 'react';
import { useQR } from '../../../context/QRContext';
import { DotType } from '../../../types/qr';
import { ColorSettings } from './ColorSettings';

const DOT_TYPES: { value: DotType; label: string }[] = [
  { value: 'dots', label: 'Dots' },
  { value: 'rounded', label: 'Rounded' },
  { value: 'classy', label: 'Classy' },
  { value: 'classy-rounded', label: 'Classy Rounded' },
  { value: 'square', label: 'Square' },
  { value: 'extra-rounded', label: 'Extra Rounded' },
];

export const DotsOptions: React.FC = () => {
  const { state, updateState } = useQR();

  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    updateState({
      dotsOptions: {
        ...state.dotsOptions,
        type: e.target.value as DotType,
      },
    });
  };

  return (
    <div className="space-y-5">
      {/* Dots Type */}
      <div className="space-y-2">
        <label className="text-[10px] font-bold uppercase text-gray-400 tracking-tight">Dots Type</label>
        <select
          value={state.dotsOptions.type}
          onChange={handleTypeChange}
          className="w-full bg-black border border-white/10 p-2 text-xs text-white outline-none focus:border-blue-500 transition-colors appearance-none cursor-pointer"
        >
          {DOT_TYPES.map((type) => (
            <option key={type.value} value={type.value}>
              {type.label}
            </option>
          ))}
        </select>
      </div>

      {/* Dots Color */}
      <ColorSettings
        label="Dots"
        colorType={state.dotsOptions.colorType || 'single'}
        color={state.dotsOptions.color}
        gradient={state.dotsOptions.gradient}
        onChange={(updates) => {
          updateState({
            dotsOptions: {
              ...state.dotsOptions,
              ...updates,
            },
          });
        }}
      />
    </div>
  );
};
