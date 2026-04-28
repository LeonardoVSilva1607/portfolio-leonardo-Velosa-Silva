import { QRState } from '../types/qr';

export interface Template {
  id: string;
  name: string;
  description: string;
  config: Partial<QRState>;
}

export const PRESET_TEMPLATES: Template[] = [
  {
    id: 'minimalist',
    name: 'Minimalist',
    description: 'Clean black and white design',
    config: {
      dotsOptions: {
        type: 'square',
        color: '#000000',
        colorType: 'single'
      },
      backgroundOptions: {
        color: '#ffffff',
        colorType: 'single'
      },
      cornersSquareOptions: {
        type: 'square',
        color: '#000000',
        colorType: 'single'
      },
      cornersDotOptions: {
        type: 'square',
        color: '#000000',
        colorType: 'single'
      }
    }
  },
  {
    id: 'neon-blue',
    name: 'Neon Blue',
    description: 'Glowing cyan on dark background',
    config: {
      dotsOptions: {
        type: 'dots',
        color: '#00f2ff',
        colorType: 'single'
      },
      backgroundOptions: {
        color: '#000000',
        colorType: 'single'
      },
      cornersSquareOptions: {
        type: 'extra-rounded',
        color: '#00f2ff',
        colorType: 'single'
      },
      cornersDotOptions: {
        type: 'dot',
        color: '#00f2ff',
        colorType: 'single'
      }
    }
  },
  {
    id: 'corporate',
    name: 'Corporate',
    description: 'Professional navy blue style',
    config: {
      dotsOptions: {
        type: 'rounded',
        color: '#1a365d',
        colorType: 'single'
      },
      backgroundOptions: {
        color: '#f7fafc',
        colorType: 'single'
      },
      cornersSquareOptions: {
        type: 'square',
        color: '#2c5282',
        colorType: 'single'
      },
      cornersDotOptions: {
        type: 'square',
        color: '#2c5282',
        colorType: 'single'
      }
    }
  },
  {
    id: 'instagram',
    name: 'Instagram',
    description: 'Vibrant gradient aesthetic',
    config: {
      dotsOptions: {
        type: 'classy-rounded',
        color: '#bc1888', // Fallback color
        colorType: 'gradient',
        gradient: {
          type: 'linear',
          rotation: 45,
          colorStops: [
            { offset: 0, color: '#f09433' },
            { offset: 1, color: '#bc1888' }
          ]
        }
      },
      backgroundOptions: {
        color: '#ffffff',
        colorType: 'single'
      },
      cornersSquareOptions: {
        type: 'extra-rounded',
        color: '#bc1888',
        colorType: 'single'
      },
      cornersDotOptions: {
        type: 'dot',
        color: '#bc1888',
        colorType: 'single'
      }
    }
  },
  {
    id: 'cyberpunk',
    name: 'Cyberpunk',
    description: 'High contrast yellow and black',
    config: {
      dotsOptions: {
        type: 'classy',
        color: '#fcee0a',
        colorType: 'single'
      },
      backgroundOptions: {
        color: '#000000',
        colorType: 'single'
      },
      cornersSquareOptions: {
        type: 'square',
        color: '#00f2ff',
        colorType: 'single'
      },
      cornersDotOptions: {
        type: 'square',
        color: '#ff003c',
        colorType: 'single'
      }
    }
  },
  {
    id: 'red-marker',
    name: 'Red Marker',
    description: 'Signature red and dark style',
    config: {
      dotsOptions: {
        type: 'rounded',
        color: '#dc2626',
        colorType: 'single'
      },
      backgroundOptions: {
        color: '#0a0a0a',
        colorType: 'single'
      },
      cornersSquareOptions: {
        type: 'extra-rounded',
        color: '#dc2626',
        colorType: 'single'
      },
      cornersDotOptions: {
        type: 'dot',
        color: '#ffffff',
        colorType: 'single'
      }
    }
  }
];
