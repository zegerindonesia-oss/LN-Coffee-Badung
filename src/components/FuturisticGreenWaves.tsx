'use client';

import React from 'react';

export const FuturisticGreenWaves: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Top Right Futuristic Green Liquid Wave */}
      <svg
        className="absolute top-0 right-0 w-[800px] lg:w-[1100px] h-auto opacity-20 text-emerald-600 mix-blend-multiply transition-all duration-1000"
        viewBox="0 0 1000 1000"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0,0 Q300,200 600,100 T1000,300 L1000,0 Z"
          fill="url(#futuristic-wave-1)"
        />
        <path
          d="M0,0 Q400,350 750,200 T1000,500 L1000,0 Z"
          fill="url(#futuristic-wave-2)"
          opacity="0.7"
        />
        <defs>
          <linearGradient id="futuristic-wave-1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0F291E" />
            <stop offset="50%" stopColor="#059669" />
            <stop offset="100%" stopColor="#34D399" />
          </linearGradient>
          <linearGradient id="futuristic-wave-2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#047857" />
            <stop offset="100%" stopColor="#A7F3D0" />
          </linearGradient>
        </defs>
      </svg>

      {/* Middle Left Flowing Futuristic Wave Contour */}
      <svg
        className="absolute top-[35%] -left-20 w-[700px] lg:w-[950px] h-auto opacity-15 text-emerald-500 mix-blend-multiply"
        viewBox="0 0 1000 1000"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0,200 C300,100 500,400 800,250 C950,180 1000,300 1000,500 L0,500 Z"
          fill="url(#futuristic-wave-3)"
        />
        <defs>
          <linearGradient id="futuristic-wave-3" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#065F46" />
            <stop offset="100%" stopColor="#10B981" />
          </linearGradient>
        </defs>
      </svg>

      {/* Bottom Right Glowing Silk Wave */}
      <svg
        className="absolute bottom-0 right-0 w-[750px] lg:w-[1000px] h-auto opacity-20 text-emerald-600 mix-blend-multiply"
        viewBox="0 0 1000 1000"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M200,1000 C400,750 600,900 1000,600 L1000,1000 Z"
          fill="url(#futuristic-wave-4)"
        />
        <defs>
          <linearGradient id="futuristic-wave-4" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0F291E" />
            <stop offset="100%" stopColor="#34D399" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};
