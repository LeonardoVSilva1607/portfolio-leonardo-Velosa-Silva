import React from 'react';
import { ColorType, GradientOptions, GradientType } from '../../../types/qr';

interface ColorSettingsProps {
  label: string;
  colorType: ColorType;
  color: string;
  gradient?: GradientOptions;
  onChange: (updates: { colorType?: ColorType; color?: string; gradient?: GradientOptions }) => void;
}

export const ColorSettings: React.FC<ColorSettingsProps> = ({
  label,
  colorType,
  color,
  gradient,
  onChange,
}) => {
  const handleColorTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange({ colorType: e.target.value as ColorType });
  };

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({ color: e.target.value });
  };

  const handleGradientTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (gradient) {
      onChange({
        gradient: {
          ...gradient,
          type: e.target.value as GradientType,
        },
      });
    }
  };

  const handleRotationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (gradient) {
      onChange({
        gradient: {
          ...gradient,
          rotation: Number(e.target.value),
        },
      });
    }
  };

  const handleStopColorChange = (index: number, newColor: string) => {
    if (gradient) {
      const newColorStops = [...gradient.colorStops];
      newColorStops[index] = { ...newColorStops[index], color: newColor };
      onChange({
        gradient: {
          ...gradient,
          colorStops: newColorStops,
        },
      });
    }
  };

  return (
    <div className="space-y-4 pt-4 border-t border-white/5 mt-4">
      <div className="space-y-2">
        <label className="text-[10px] font-bold uppercase text-gray-400 tracking-tight">
          {label} Color Type
        </label>
        <select
          value={colorType}
          onChange={handleColorTypeChange}
          className="w-full bg-black border border-white/10 p-2 text-xs text-white outline-none focus:border-blue-500 transition-colors appearance-none cursor-pointer"
        >
          <option value="single">Single Color</option>
          <option value="gradient">Color Gradient</option>
        </select>
      </div>

      {colorType === 'single' ? (
        <div className="space-y-2">
          <label className="text-[10px] font-bold uppercase text-gray-400 tracking-tight">Color</label>
          <div className="flex items-center gap-3">
            <input
              type="color"
              value={color}
              onChange={handleColorChange}
              className="w-10 h-10 bg-transparent border-none cursor-pointer p-0"
            />
            <input
              type="text"
              value={color}
              onChange={handleColorChange}
              className="flex-1 bg-black border border-white/10 p-2 text-xs text-white outline-none focus:border-blue-500 transition-colors uppercase"
            />
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase text-gray-400 tracking-tight">Gradient Type</label>
              <select
                value={gradient?.type}
                onChange={handleGradientTypeChange}
                className="w-full bg-black border border-white/10 p-2 text-xs text-white outline-none focus:border-blue-500 transition-colors appearance-none cursor-pointer"
              >
                <option value="linear">Linear</option>
                <option value="radial">Radial</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase text-gray-400 tracking-tight">Rotation</label>
              <input
                type="number"
                value={gradient?.rotation}
                onChange={handleRotationChange}
                className="w-full bg-black border border-white/10 p-2 text-xs text-white outline-none focus:border-blue-500 transition-colors"
              />
            </div>
          </div>

          <div className="space-y-3">
            {gradient?.colorStops.map((stop, index) => (
              <div key={index} className="space-y-2">
                <label className="text-[10px] font-bold uppercase text-gray-400 tracking-tight">
                  Color {index + 1}
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={stop.color}
                    onChange={(e) => handleStopColorChange(index, e.target.value)}
                    className="w-8 h-8 bg-transparent border-none cursor-pointer p-0"
                  />
                  <input
                    type="text"
                    value={stop.color}
                    onChange={(e) => handleStopColorChange(index, e.target.value)}
                    className="flex-1 bg-black border border-white/10 p-2 text-xs text-white outline-none focus:border-blue-500 transition-colors uppercase"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
