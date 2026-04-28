import React, { useState } from 'react';
import { useQR } from '../../../context/QRContext';
import { useAuth } from '../../../context/AuthContext';
import { Save, Trash2, FolderOpen } from 'lucide-react';

export const MainOptions: React.FC = () => {
  const { state, updateState } = useQR();
  const { user } = useAuth();

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        updateState({ image: event.target?.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-5">
      {/* Data Input */}
      <div className="space-y-2">
        <label className="text-[10px] font-bold uppercase text-gray-400 tracking-tight">Data</label>
        <input
          type="text"
          value={state.data}
          onChange={(e) => updateState({ data: e.target.value })}
          className="w-full bg-black border border-white/10 p-2 text-xs text-white outline-none focus:border-blue-500 transition-colors"
          placeholder="Enter URL or text"
        />
      </div>

      {/* Image Upload */}
      <div className="space-y-2">
        <label className="text-[10px] font-bold uppercase text-gray-400 tracking-tight">Image File</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="w-full text-[10px] text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-none file:border-0 file:text-[10px] file:font-bold file:bg-[#1a1a1a] file:text-white hover:file:bg-black cursor-pointer"
        />
        {state.image && (
          <button 
            onClick={() => updateState({ image: undefined })}
            className="text-[9px] text-red-500 uppercase font-bold hover:underline"
          >
            Remove Image
          </button>
        )}
      </div>

      {/* Dimensions */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-[10px] font-bold uppercase text-gray-400 tracking-tight">Width</label>
          <input
            type="number"
            min="100"
            max="10000"
            value={state.width}
            onChange={(e) => {
              const val = Math.min(10000, Math.max(100, Number(e.target.value)));
              const maxMargin = Math.floor(Math.min(val, state.height) * 0.4);
              updateState({ 
                width: val,
                margin: Math.min(state.margin, maxMargin)
              });
            }}
            className="w-full bg-black border border-white/10 p-2 text-xs text-white outline-none focus:border-blue-500 transition-colors"
          />
        </div>
        <div className="space-y-2">
          <label className="text-[10px] font-bold uppercase text-gray-400 tracking-tight">Height</label>
          <input
            type="number"
            min="100"
            max="10000"
            value={state.height}
            onChange={(e) => {
              const val = Math.min(10000, Math.max(100, Number(e.target.value)));
              const maxMargin = Math.floor(Math.min(state.width, val) * 0.4);
              updateState({ 
                height: val,
                margin: Math.min(state.margin, maxMargin)
              });
            }}
            className="w-full bg-black border border-white/10 p-2 text-xs text-white outline-none focus:border-blue-500 transition-colors"
          />
        </div>
      </div>

      {/* Margin */}
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <label className="text-[10px] font-bold uppercase text-gray-400 tracking-tight">Margin</label>
          <span className="text-[10px] font-mono text-gray-500">{state.margin}px</span>
        </div>
        <input
          type="range"
          min="0"
          max={Math.floor(Math.min(state.width, state.height) * 0.4)}
          value={state.margin}
          onChange={(e) => updateState({ margin: Number(e.target.value) })}
          className="w-full h-1 bg-white/10 rounded-none appearance-none cursor-pointer accent-red-500"
        />
      </div>
    </div>
  );
};
