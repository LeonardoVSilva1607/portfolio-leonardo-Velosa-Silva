import React, { createContext, useContext, useState, ReactNode } from 'react';
import { QRState } from '../types/qr';

interface QRContextType {
  state: QRState;
  updateState: (newState: Partial<QRState>) => void;
  resetState: () => void;
}

const initialState: QRState = {
  data: 'https://qr-code-styling.com',
  width: 300,
  height: 300,
  margin: 0,
  type: 'canvas',
  dotsOptions: {
    color: '#4267b2',
    type: 'rounded',
    colorType: 'single',
    gradient: {
      type: 'linear',
      rotation: 0,
      colorStops: [
        { offset: 0, color: '#4267b2' },
        { offset: 1, color: '#000000' },
      ],
    },
  },
  cornersSquareOptions: {
    color: '#4267b2',
    type: 'extra-rounded',
    colorType: 'single',
    gradient: {
      type: 'linear',
      rotation: 0,
      colorStops: [
        { offset: 0, color: '#4267b2' },
        { offset: 1, color: '#000000' },
      ],
    },
  },
  cornersDotOptions: {
    color: '#4267b2',
    type: 'dot',
    colorType: 'single',
    gradient: {
      type: 'linear',
      rotation: 0,
      colorStops: [
        { offset: 0, color: '#4267b2' },
        { offset: 1, color: '#000000' },
      ],
    },
  },
  backgroundOptions: {
    color: '#ffffff',
    colorType: 'single',
    gradient: {
      type: 'linear',
      rotation: 0,
      colorStops: [
        { offset: 0, color: '#ffffff' },
        { offset: 1, color: '#eeeeee' },
      ],
    },
  },
  imageOptions: {
    hideBackgroundDots: true,
    imageSize: 0.4,
    margin: 0,
  },
  qrOptions: {
    typeNumber: 0,
    mode: 'Byte',
    errorCorrectionLevel: 'Q',
  },
};

const QRContext = createContext<QRContextType | undefined>(undefined);

export const QRProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, setState] = useState<QRState>(initialState);

  const updateState = (newState: Partial<QRState>) => {
    setState((prev) => ({ ...prev, ...newState }));
  };

  const resetState = () => {
    setState(initialState);
  };

  return (
    <QRContext.Provider value={{ state, updateState, resetState }}>
      {children}
    </QRContext.Provider>
  );
};

export const useQR = () => {
  const context = useContext(QRContext);
  if (!context) {
    throw new Error('useQR must be used within a QRProvider');
  }
  return context;
};
