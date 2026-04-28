import React, { useEffect, useRef } from 'react';
import QRCodeStyling from 'qr-code-styling';
import { useQR } from '../../../context/QRContext';

export const QRPreview: React.FC = () => {
  const { state } = useQR();
  const qrRef = useRef<HTMLDivElement>(null);
  const qrCode = useRef<QRCodeStyling | null>(null);

  const [error, setError] = React.useState<string | null>(null);

  const getOptions = (s: any) => {
    const options = JSON.parse(JSON.stringify(s));
    
    const clean = (opt: any) => {
      if (!opt) return opt;
      if (opt.colorType === 'single') {
        delete opt.gradient;
      } else {
        delete opt.color;
      }
      delete opt.colorType;
      return opt;
    };

    options.dotsOptions = clean(options.dotsOptions);
    options.cornersSquareOptions = clean(options.cornersSquareOptions);
    options.cornersDotOptions = clean(options.cornersDotOptions);
    options.backgroundOptions = clean(options.backgroundOptions);

    return options;
  };

  // Calculate dynamic display dimensions based on aspect ratio to show stretching
  const maxDisplay = 320;
  const aspectRatio = state.width / state.height || 1;
  
  let displayWidth = maxDisplay;
  let displayHeight = maxDisplay;

  if (aspectRatio > 1) {
    // Landscape
    displayHeight = maxDisplay / aspectRatio;
  } else {
    // Portrait
    displayWidth = maxDisplay * aspectRatio;
  }

  useEffect(() => {
    try {
      qrCode.current = new QRCodeStyling({
        ...getOptions(state),
        image: state.image,
      });

      if (qrRef.current) {
        qrRef.current.innerHTML = '';
        qrCode.current.append(qrRef.current);
      }
      setError(null);
    } catch (err) {
      console.error('QR Generation Error:', err);
      const msg = err instanceof Error ? err.message : String(err);
      setError(msg.includes('too small') ? 'Dimensions are too small' : 'Content too large for selected options');
    }
  }, []);

  useEffect(() => {
    if (qrCode.current) {
      try {
        qrCode.current.update({
          ...getOptions(state),
          image: state.image,
        });
        setError(null);
      } catch (err) {
        console.error('QR Update Error:', err);
        const msg = err instanceof Error ? err.message : String(err);
        setError(msg.includes('too small') ? 'Dimensions are too small' : 'Content too large for selected options');
      }
    }
  }, [state]);

  const handleDownload = (extension: string) => {
    if (qrCode.current && !error) {
      qrCode.current.download({
        name: 'qr-code',
        extension: extension as any,
      });
    }
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center min-h-[500px] gap-8 py-8">
      <div className="text-center">
        <div 
          style={{ width: `${displayWidth}px`, height: `${displayHeight}px` }}
          className="flex items-center justify-center relative bg-[#0a0a0a] border border-white/5 shadow-2xl overflow-hidden transition-all duration-200"
        >
          <div 
            ref={qrRef} 
            className={`w-full h-full flex items-center justify-center [&>canvas]:w-full! [&>canvas]:h-full! [&>svg]:w-full! [&>svg]:h-full! ${error ? 'opacity-20' : 'opacity-100'}`}
          />
          {error && (
            <div className="absolute inset-0 flex items-center justify-center p-4 text-center bg-black/80">
              <div className="bg-red-900/20 border border-red-500/50 p-4 shadow-sm">
                <p className="text-red-500 text-[10px] font-bold uppercase tracking-wider">{error}</p>
                <p className="text-gray-400 text-[9px] mt-1">Try increasing "Type Number" or decreasing "Error Correction Level"</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Download Section */}
      <div className={`flex items-center border border-white/10 rounded-none overflow-hidden shadow-2xl bg-[#121212] ${error ? 'opacity-50 pointer-events-none' : ''}`}>
        <button 
          onClick={() => {
            const select = document.getElementById('format-select') as HTMLSelectElement;
            handleDownload(select.value);
          }}
          className="bg-red-600 text-white px-8 py-3 text-xs font-bold hover:bg-red-700 transition-colors uppercase tracking-wider"
        >
          Download
        </button>
        <div className="h-full w-[1px] bg-white/10" />
        <select 
          id="format-select"
          className="bg-transparent border-none text-white text-xs font-bold uppercase tracking-tight p-3 focus:ring-0 cursor-pointer outline-none"
        >
          <option value="png" className="bg-[#121212]">PNG</option>
          <option value="jpeg" className="bg-[#121212]">JPEG</option>
          <option value="svg" className="bg-[#121212]">SVG</option>
        </select>
      </div>
    </div>
  );
};
