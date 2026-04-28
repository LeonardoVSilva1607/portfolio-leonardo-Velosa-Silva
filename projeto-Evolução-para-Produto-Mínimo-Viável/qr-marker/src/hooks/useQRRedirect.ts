import { useEffect } from 'react';
import { useQR } from '../context/QRContext';
import { useAuth } from '../context/AuthContext';

export const useQRRedirect = () => {
  const { getDesign } = useAuth();
  const { updateState } = useQR();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const shareId = params.get('share');
    
    // Handle Shared Designs
    if (shareId) {
      getDesign(shareId).then(design => {
        if (design) {
          updateState(design.config);
          // Remove param from URL without refresh to keep it clean
          window.history.replaceState({}, document.title, window.location.pathname);
        }
      });
    }

    // Handle Dynamic QR Redirects
    const path = window.location.pathname;
    if (path.startsWith('/r/')) {
      const designId = path.split('/r/')[1];
      if (designId) {
        getDesign(designId).then(design => {
          if (design && design.isDynamic && design.targetUrl) {
            window.location.href = design.targetUrl;
          }
        });
      }
    }
  }, [getDesign, updateState]);
};
