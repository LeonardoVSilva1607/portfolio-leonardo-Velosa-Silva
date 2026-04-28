import React from 'react';
import { useQR } from '../../../context/QRContext';
import { CornerSquareType, CornerDotType } from '../../../types/qr';
import { ColorSettings } from './ColorSettings';

const SQUARE_TYPES: { value: CornerSquareType; label: string }[] = [
  { value: 'dot', label: 'Dot' },
  { value: 'square', label: 'Square' },
  { value: 'extra-rounded', label: 'Extra Rounded' },
];

const DOT_TYPES: { value: CornerDotType; label: string }[] = [
  { value: 'dot', label: 'Dot' },
  { value: 'square', label: 'Square' },
];

export const CornersOptions: React.FC = () => {
  const { state, updateState } = useQR();

  return (
    <div className="space-y-8">
      {/* Corners Square Options */}
      <div className="space-y-5">
        <h3 className="text-[10px] font-black uppercase text-white border-b border-white/10 pb-1">Corners Square</h3>
        
        <div className="space-y-2">
          <label className="text-[10px] font-bold uppercase text-gray-400 tracking-tight">Type</label>
          <select
            value={state.cornersSquareOptions.type}
            onChange={(e) => updateState({
              cornersSquareOptions: { ...state.cornersSquareOptions, type: e.target.value as CornerSquareType }
            })}
            className="w-full bg-black border border-white/10 p-2 text-xs text-white outline-none focus:border-blue-500 transition-colors appearance-none cursor-pointer"
          >
            {SQUARE_TYPES.map((type) => (
              <option key={type.value} value={type.value}>{type.label}</option>
            ))}
          </select>
        </div>

        <ColorSettings
          label="Corners Square"
          colorType={state.cornersSquareOptions.colorType || 'single'}
          color={state.cornersSquareOptions.color}
          gradient={state.cornersSquareOptions.gradient}
          onChange={(updates) => {
            updateState({
              cornersSquareOptions: {
                ...state.cornersSquareOptions,
                ...updates,
              },
            });
          }}
        />
      </div>

      {/* Corners Dot Options */}
      <div className="space-y-5">
        <h3 className="text-[10px] font-black uppercase text-white border-b border-white/10 pb-1">Corners Dot</h3>
        
        <div className="space-y-2">
          <label className="text-[10px] font-bold uppercase text-gray-400 tracking-tight">Type</label>
          <select
            value={state.cornersDotOptions.type}
            onChange={(e) => updateState({
              cornersDotOptions: { ...state.cornersDotOptions, type: e.target.value as CornerDotType }
            })}
            className="w-full bg-black border border-white/10 p-2 text-xs text-white outline-none focus:border-blue-500 transition-colors appearance-none cursor-pointer"
          >
            {DOT_TYPES.map((type) => (
              <option key={type.value} value={type.value}>{type.label}</option>
            ))}
          </select>
        </div>

        <ColorSettings
          label="Corners Dot"
          colorType={state.cornersDotOptions.colorType || 'single'}
          color={state.cornersDotOptions.color}
          gradient={state.cornersDotOptions.gradient}
          onChange={(updates) => {
            updateState({
              cornersDotOptions: {
                ...state.cornersDotOptions,
                ...updates,
              },
            });
          }}
        />
      </div>
    </div>
  );
};
