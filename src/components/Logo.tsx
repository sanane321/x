/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  lightBackground?: boolean;
}

export default function Logo({ size = 'md', className = '', lightBackground = true }: LogoProps) {
  // Scale classes
  const emblemSize = {
    sm: 'h-6 w-auto',
    md: 'h-9 w-auto',
    lg: 'h-14 w-auto',
  }[size];

  const fontSize = {
    sm: 'text-lg tracking-normal',
    md: 'text-2xl tracking-normal',
    lg: 'text-4xl tracking-normal leading-none',
  }[size];

  const textColor = lightBackground ? 'text-[#0012FF]' : 'text-white';
  const greenColor = '#00FF00'; // Pure bright neon-green

  return (
    <div className={`flex items-center gap-2 select-none ${className}`}>
      {/* Precision Recreated SVX X Emblem */}
      <svg
        viewBox="0 0 100 100"
        className={`${emblemSize} flex-shrink-0`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Main top-left to bottom-right diagonal bar of X (deep royal blue) */}
        <path
          d="M15 15 L32 15 L85 85 L68 85 Z"
          fill="#0012FF"
        />
        {/* Top-right to center-left bar of X (deep royal blue) */}
        <path
          d="M85 15 L68 15 L46 45 L63 45 Z"
          fill="#0012FF"
        />
        {/* Bottom-left accent parallelogram bar (vibrant neon green) */}
        <path
          d="M37 57 L15 85 L32 85 L54 57 Z"
          fill={greenColor}
        />
      </svg>

      {/* Modern Wordmark with Dotless 'ı' and Neon Green Square Dot */}
      <span className={`font-display font-black uppercase flex items-baseline ${fontSize} ${textColor}`}>
        <span>Elektr</span>
        <span className="relative inline-block leading-none mx-[0.02em]">
          ı
          <span 
            className="absolute top-[-0.15em] left-1/2 -translate-x-1/2 w-[0.24em] h-[0.24em]"
            style={{ backgroundColor: greenColor }}
          />
        </span>
        <span>k</span>
      </span>
    </div>
  );
}
