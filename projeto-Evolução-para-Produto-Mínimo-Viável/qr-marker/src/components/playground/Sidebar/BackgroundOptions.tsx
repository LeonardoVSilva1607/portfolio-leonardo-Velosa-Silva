import React from 'react';
import { useQR } from '../../../context/QRContext';
import { ColorSettings } from './ColorSettings';

export const BackgroundOptions: React.FC = () => {
  const { state, updateState } = useQR();

  return (
    <div className="space-y-5">
      <ColorSettings
        label="Background"
        colorType={state.backgroundOptions.colorType || 'single'}
        color={state.backgroundOptions.color}
        gradient={state.backgroundOptions.gradient}
        onChange={(updates) => {
          updateState({
            backgroundOptions: {
              ...state.backgroundOptions,
              ...updates,
            },
          });
        }}
      />
    </div>
  );
};
