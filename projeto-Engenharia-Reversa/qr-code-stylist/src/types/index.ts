export type DotType = 'dots' | 'rounded' | 'classy' | 'classy-rounded' | 'square' | 'extra-rounded';
export type CornerDotType = 'dot' | 'square';
export type CornerSquareType = 'dot' | 'square' | 'extra-rounded';

export interface QROptions {
  data: string;
  width: number;
  height: number;
  margin: number;
  dotsColor: string;
  dotsType: DotType;
  backgroundColor: string;
  cornersSquareColor: string;
  cornersSquareType: CornerSquareType;
  cornersDotColor: string;
  cornersDotType: CornerDotType;
  logo?: string;
}
