'use client';

import React from 'react';

export const FuturisticGreenWaves: React.FC = () => {
  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden w-full h-full min-h-full">
      {/* 1. Top Hero Section Right Wave Sweep */}
      <svg
        className="absolute top-0 -right-10 w-[700px] sm:w-[900px] lg:w-[1100px] h-auto opacity-35 text-emerald-600 mix-blend-multiply"
        viewBox="0 0 1000 1000"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M 200,0 C 450,200 650,100 850,350 C 950,500 1000,700 1000,1000 L 1000,0 Z"
          fill="url(#top-green-wave-1)"
        />
        <path
          d="M 350,0 C 550,250 720,180 900,450 C 980,600 1000,800 1000,1000 L 1000,0 Z"
          fill="url(#top-green-wave-2)"
          opacity="0.75"
        />
        <defs>
          <linearGradient id="top-green-wave-1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0F291E" />
            <stop offset="50%" stopColor="#059669" />
            <stop offset="100%" stopColor="#A7F3D0" />
          </linearGradient>
          <linearGradient id="top-green-wave-2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#047857" />
            <stop offset="100%" stopColor="#6EE7B7" />
          </linearGradient>
        </defs>
      </svg>

      {/* 2. Signature & Story Section Left Organic Wave Ribbon */}
      <svg
        className="absolute top-[18%] -left-16 w-[650px] sm:w-[850px] lg:w-[1000px] h-auto opacity-30 text-emerald-500 mix-blend-multiply"
        viewBox="0 0 1000 1200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0,0 C250,200 450,450 350,750 C250,1000 100,1100 0,1200 Z"
          fill="url(#mid-left-wave-1)"
        />
        <path
          d="M0,100 C200,280 380,500 280,800 C180,1050 50,1150 0,1200 Z"
          fill="url(#mid-left-wave-2)"
          opacity="0.7"
        />
        <defs>
          <linearGradient id="mid-left-wave-1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#065F46" />
            <stop offset="100%" stopColor="#34D399" />
          </linearGradient>
          <linearGradient id="mid-left-wave-2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0F291E" />
            <stop offset="100%" stopColor="#10B981" />
          </linearGradient>
        </defs>
      </svg>

      {/* 3. Category Grid Section Right Silk Wave */}
      <svg
        className="absolute top-[42%] -right-16 w-[650px] sm:w-[850px] lg:w-[1000px] h-auto opacity-30 text-emerald-600 mix-blend-multiply"
        viewBox="0 0 1000 1200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M1000,0 C750,250 550,500 650,800 C750,1050 900,1150 1000,1200 Z"
          fill="url(#mid-right-wave-1)"
        />
        <defs>
          <linearGradient id="mid-right-wave-1" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#0F291E" />
            <stop offset="50%" stopColor="#047857" />
            <stop offset="100%" stopColor="#A7F3D0" />
          </linearGradient>
        </defs>
      </svg>

      {/* 4. Dining & How to Order Section Left Flowing Ribbon */}
      <svg
        className="absolute top-[65%] -left-20 w-[700px] sm:w-[900px] lg:w-[1050px] h-auto opacity-28 text-teal-600 mix-blend-multiply"
        viewBox="0 0 1000 1200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0,200 C350,100 550,450 400,850 C300,1080 100,1150 0,1200 Z"
          fill="url(#lower-left-wave-1)"
        />
        <defs>
          <linearGradient id="lower-left-wave-1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#065F46" />
            <stop offset="100%" stopColor="#34D399" />
          </linearGradient>
        </defs>
      </svg>

      {/* 5. Location Section Bottom-Right Wave Sweep */}
      <svg
        className="absolute bottom-0 -right-10 w-[750px] sm:w-[950px] lg:w-[1150px] h-auto opacity-35 text-emerald-600 mix-blend-multiply"
        viewBox="0 0 1000 1000"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M 150,1000 C 350,750 600,850 1000,550 L 1000,1000 Z"
          fill="url(#bottom-green-wave-1)"
        />
        <path
          d="M 300,1000 C 480,820 700,900 1000,680 L 1000,1000 Z"
          fill="url(#bottom-green-wave-2)"
          opacity="0.7"
        />
        <defs>
          <linearGradient id="bottom-green-wave-1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0F291E" />
            <stop offset="50%" stopColor="#059669" />
            <stop offset="100%" stopColor="#34D399" />
          </linearGradient>
          <linearGradient id="bottom-green-wave-2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#047857" />
            <stop offset="100%" stopColor="#A7F3D0" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};
