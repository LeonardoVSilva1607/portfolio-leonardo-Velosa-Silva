import React from 'react';
import { useQR } from '../../../context/QRContext';

export const ImageOptions: React.FC = () => {
  const { state, updateState } = useQR();

  return (
    <div className="space-y-6">
      {/* Hide Background Dots */}
      <div className="flex items-center justify-between">
        <label className="text-[10px] font-bold uppercase text-gray-400 tracking-tight">Hide Background Dots</label>
        <input
          type="checkbox"
          checked={state.imageOptions.hideBackgroundDots}
          onChange={(e) => updateState({
            imageOptions: { ...state.imageOptions, hideBackgroundDots: e.target.checked }
          })}
          className="w-4 h-4 accent-red-500 cursor-pointer"
        />
      </div>

      {/* Image Size */}
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <label className="text-[10px] font-bold uppercase text-gray-400 tracking-tight">Image Size</label>
          <span className="text-[10px] font-mono text-gray-500">{Math.round(state.imageOptions.imageSize * 100)}%</span>
        </div>
        <input
          type="range"
          min="0.1"
          max="1"
          step="0.05"
          value={state.imageOptions.imageSize}
          onChange={(e) => updateState({
            imageOptions: { ...state.imageOptions, imageSize: Number(e.target.value) }
          })}
          className="w-full h-1 bg-white/10 rounded-none appearance-none cursor-pointer accent-red-500"
        />
      </div>

      {/* Image Margin */}
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <label className="text-[10px] font-bold uppercase text-gray-400 tracking-tight">Image Margin</label>
          <span className="text-[10px] font-mono text-gray-500">{state.imageOptions.margin}px</span>
        </div>
        <input
          type="range"
          min="0"
          max="50"
          value={state.imageOptions.margin}
          onChange={(e) => updateState({
            imageOptions: { ...state.imageOptions, margin: Number(e.target.value) }
          })}
          className="w-full h-1 bg-white/10 rounded-none appearance-none cursor-pointer accent-red-500"
        />
      </div>
    </div>
  );
};
