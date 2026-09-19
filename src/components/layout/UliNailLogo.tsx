import React from "react";

interface UliNailLogoProps {
  inverted?: boolean;
  className?: string;
  size?: "sm" | "md" | "lg";
}

export default function UliNailLogo({
  inverted = false,
  className = "",
  size = "md",
}: UliNailLogoProps) {
  const textColor = inverted ? "text-white" : "text-[#1E293B]";
  const subColor = inverted ? "text-white/70" : "text-[#64748B]";

  const sizeClasses = {
    sm: "text-xl",
    md: "text-2xl md:text-3xl",
    lg: "text-3xl md:text-4xl",
  };

  return (
    <div className={`flex items-center select-none group ${className}`}>
      <div className="flex flex-col">
        <div className={`flex items-center font-black tracking-wider ${sizeClasses[size]} ${textColor}`}>
          {/* Stylized 'U' with iridescent crescent moon motif */}
          <span className="relative inline-flex items-center justify-center">
            <span className="font-extrabold tracking-tight">U</span>
            {/* Embedded glowing crescent moon arc */}
            <svg
              className="absolute -top-0.5 -right-1 w-3.5 h-3.5 md:w-4 md:h-4 text-brand-pink transition-transform duration-300 group-hover:rotate-12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="url(#moon-gradient)"
              strokeWidth="2.5"
              strokeLinecap="round"
            >
              <defs>
                <linearGradient id="moon-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FF5E8E" />
                  <stop offset="50%" stopColor="#C084FC" />
                  <stop offset="100%" stopColor="#00B4D8" />
                </linearGradient>
              </defs>
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" fill="url(#moon-gradient)" fillOpacity="0.4" />
            </svg>
          </span>
          <span className="font-extrabold tracking-normal">LI</span>
          <span className="ml-2 font-black tracking-widest bg-gradient-to-r from-brand-pink via-[#FF758C] to-brand-cyan bg-clip-text text-transparent">
            NAIL
          </span>
        </div>
        <span
          className={`text-[8px] uppercase tracking-[0.35em] font-semibold -mt-1 ${subColor}`}
        >
          PREMIUM PROFESSIONAL
        </span>
      </div>
    </div>
  );
}
