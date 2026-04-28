import React from 'react';
import { useQR } from '../../../context/QRContext';
import { ErrorCorrectionLevel, QRMode } from '../../../types/qr';

const ECL_LEVELS: ErrorCorrectionLevel[] = ['L', 'M', 'Q', 'H'];
const QR_MODES: QRMode[] = ['Numeric', 'Alphanumeric', 'Byte', 'Kanji'];

export const QROptions: React.FC = () => {
  const { state, updateState } = useQR();

  return (
    <div className="space-y-6">
      {/* Mode */}
      <div className="space-y-2">
        <label className="text-[10px] font-bold uppercase text-gray-400 tracking-tight">Mode</label>
        <select
          value={state.qrOptions.mode}
          onChange={(e) => updateState({
            qrOptions: { ...state.qrOptions, mode: e.target.value as QRMode }
          })}
          className="w-full bg-black border border-white/10 p-2 text-xs text-white outline-none focus:border-blue-500 transition-colors appearance-none cursor-pointer"
        >
          {QR_MODES.map((mode) => (
            <option key={mode} value={mode}>
              {mode}
            </option>
          ))}
        </select>
      </div>

      {/* Error Correction Level */}
      <div className="space-y-2">
        <label className="text-[10px] font-bold uppercase text-gray-400 tracking-tight">Error Correction Level</label>
        <div className="grid grid-cols-4 gap-2">
          {ECL_LEVELS.map((level) => (
            <button
              key={level}
              onClick={() => updateState({
                qrOptions: { ...state.qrOptions, errorCorrectionLevel: level }
              })}
              className={`py-2 text-[10px] font-bold border transition-colors ${
                state.qrOptions.errorCorrectionLevel === level
                  ? 'bg-red-600 text-white border-red-600'
                  : 'bg-black text-gray-400 border-white/10 hover:border-blue-500'
              }`}
            >
              {level}
            </button>
          ))}
        </div>
      </div>

      {/* Type Number */}
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <label className="text-[10px] font-bold uppercase text-gray-400 tracking-tight">Type Number</label>
          <span className="text-[10px] font-mono text-gray-500">{state.qrOptions.typeNumber === 0 ? 'Auto' : state.qrOptions.typeNumber}</span>
        </div>
        <input
          type="range"
          min="0"
          max="40"
          value={state.qrOptions.typeNumber}
          onChange={(e) => updateState({
            qrOptions: { ...state.qrOptions, typeNumber: Number(e.target.value) }
          })}
          className="w-full h-1 bg-white/10 rounded-none appearance-none cursor-pointer accent-red-500"
        />
      </div>
    </div>
  );
};
