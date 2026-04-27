'use client';

import React from 'react';
import Confetti from 'react-confetti';
import { useWindowSize } from '@/hooks/use-window-size';

interface ConfettiEffectProps {
  /**
   * Whether to run the confetti animation.
   * @default true
   */
  run?: boolean;
  /**
   * Whether to recycle confetti pieces. 
   * Set to false for a "one-shot" explosion.
   * @default true
   */
  recycle?: boolean;
  /**
   * Number of confetti pieces to render.
   * @default 200
   */
  numberOfPieces?: boolean | number;
  /**
   * Callback when confetti animation completes (only if recycle is false).
   */
  onConfettiComplete?: (confetti: unknown) => void;
  /**
   * Array of colors to use for confetti pieces.
   */
  colors?: string[];
  /**
   * Gravity of the confetti pieces.
   * @default 0.1
   */
  gravity?: number;
  /**
   * Wind speed.
   * @default 0
   */
  wind?: number;
  /**
   * Source position of the confetti.
   */
  confettiSource?: {
    x: number;
    y: number;
    w: number;
    h: number;
  };
  /**
   * Custom shape drawing function.
   */
  drawShape?: (ctx: CanvasRenderingContext2D) => void;
  /**
   * Opacity of the confetti.
   * @default 1.0
   */
  opacity?: number;
  /**
   * CSS class name for the wrapper.
   */
  className?: string;
  /**
   * Style for the confetti canvas.
   */
  style?: React.CSSProperties;
}

/**
 * A generic and responsive Confetti component.
 * Uses window dimensions by default and handles resizing.
 * Perfect for celebrating successes like top-ups, creations, unlocks, etc.
 */
const ConfettiEffect: React.FC<ConfettiEffectProps> = ({
  run = true,
  recycle = true,
  numberOfPieces = 200,
  onConfettiComplete,
  colors,
  gravity = 0.1,
  wind = 0,
  confettiSource,
  drawShape,
  opacity = 1.0,
  className,
  style,
}) => {
  const { width, height } = useWindowSize();

  // Don't render until we have window dimensions to avoid flash or misplaced canvas
  if (width === undefined || height === undefined) {
    return null;
  }

  return (
    <div 
      className={className} 
      style={{ 
        position: 'fixed', 
        top: 0, 
        left: 0, 
        width: '100vw', 
        height: '100vh', 
        pointerEvents: 'none', 
        zIndex: 9999,
        ...style 
      }}
    >
      <Confetti
        width={width}
        height={height}
        run={run}
        recycle={recycle}
        numberOfPieces={typeof numberOfPieces === 'boolean' ? (numberOfPieces ? 200 : 0) : numberOfPieces}
        onConfettiComplete={onConfettiComplete}
        colors={colors}
        gravity={gravity}
        wind={wind}
        confettiSource={confettiSource}
        drawShape={drawShape}
        opacity={opacity}
      />
    </div>
  );
};

export default ConfettiEffect;
