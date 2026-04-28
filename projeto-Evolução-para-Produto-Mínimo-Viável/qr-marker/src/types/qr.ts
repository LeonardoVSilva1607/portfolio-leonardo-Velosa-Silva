export type DotType = 'dots' | 'rounded' | 'classy' | 'classy-rounded' | 'square' | 'extra-rounded';
export type CornerSquareType = 'dot' | 'square' | 'extra-rounded';
export type CornerDotType = 'dot' | 'square';
export type ErrorCorrectionLevel = 'L' | 'M' | 'Q' | 'H';
export type DrawType = 'canvas' | 'svg';
export type QRMode = 'Numeric' | 'Alphanumeric' | 'Byte' | 'Kanji';

export type ColorType = 'single' | 'gradient';
export type GradientType = 'linear' | 'radial';

export interface GradientOptions {
  type: GradientType;
  rotation: number;
  colorStops: { offset: number; color: string }[];
}

export interface QRState {
  data: string;
  width: number;
  height: number;
  margin: number;
  type: DrawType;
  dotsOptions: {
    color: string;
    type: DotType;
    colorType?: ColorType;
    gradient?: GradientOptions;
  };
  cornersSquareOptions: {
    color: string;
    type: CornerSquareType;
    colorType?: ColorType;
    gradient?: GradientOptions;
  };
  cornersDotOptions: {
    color: string;
    type: CornerDotType;
    colorType?: ColorType;
    gradient?: GradientOptions;
  };
  backgroundOptions: {
    color: string;
    colorType?: ColorType;
    gradient?: GradientOptions;
  };
  imageOptions: {
    hideBackgroundDots: boolean;
    imageSize: number;
    margin: number;
  };
  qrOptions: {
    typeNumber: number;
    mode?: QRMode;
    errorCorrectionLevel: ErrorCorrectionLevel;
  };
  image?: string;
}
