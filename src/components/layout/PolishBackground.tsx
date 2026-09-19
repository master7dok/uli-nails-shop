"use client";

import React from "react";
import { motion } from "framer-motion";

export default function PolishBackground() {
  return (
    <div
      className="fixed inset-0 pointer-events-none -z-10 overflow-hidden select-none"
      aria-hidden="true"
    >
      {/* Base Canvas Subtle Shimmer */}
      <div className="absolute inset-0 bg-[#FAF9F6]/80" />

      {/* Polish Smear 1: Top-Right Cyan/Aquamarine Fluid Wave */}
      <motion.div
        animate={{
          scale: [1, 1.08, 1],
          x: [0, 20, 0],
          y: [0, -15, 0],
          rotate: [15, 20, 15],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-32 -right-24 w-[600px] h-[500px] rounded-[40%_60%_70%_30%/40%_50%_60%_50%] bg-gradient-to-br from-[#38BDF8]/20 via-[#00B4D8]/15 to-transparent blur-[100px]"
      />

      {/* Polish Smear 2: Center-Left Vibrant Coral-Pink Nail Polish Stroke */}
      <motion.div
        animate={{
          scale: [1, 1.12, 1],
          x: [0, -25, 0],
          y: [0, 20, 0],
          rotate: [-12, -8, -12],
        }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute top-[28%] -left-32 w-[650px] h-[600px] rounded-[60%_40%_30%_70%/60%_30%_70%_40%] bg-gradient-to-tr from-[#FF5E8E]/22 via-[#FB7185]/16 to-transparent blur-[115px]"
      />

      {/* Polish Smear 3: Middle-Right Lilac / Lavender Gel Polish Spill */}
      <motion.div
        animate={{
          scale: [1, 1.06, 1],
          x: [0, 15, 0],
          y: [0, 25, 0],
          rotate: [8, 14, 8],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute top-[52%] -right-28 w-[580px] h-[550px] rounded-[50%_50%_40%_60%/40%_60%_50%_50%] bg-gradient-to-bl from-[#C084FC]/18 via-[#E879F9]/12 to-transparent blur-[110px]"
      />

      {/* Polish Smear 4: Lower Center-Left Soft Nude-Rose Pearl Swirl */}
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          x: [0, 20, 0],
          y: [0, -20, 0],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut", delay: 3 }}
        className="absolute top-[75%] left-[10%] w-[500px] h-[450px] rounded-[70%_30%_50%_50%/30%_60%_40%_70%] bg-gradient-to-r from-[#FDA4AF]/18 via-[#F472B6]/12 to-transparent blur-[105px]"
      />

      {/* Floating Glossy 3D Droplet Accents */}
      <div className="absolute top-[18%] left-[8%] w-8 h-8 rounded-full bg-gradient-to-tr from-[#FF5E8E]/30 to-white/60 blur-[1px] shadow-sm animate-pulse opacity-60" />
      <div className="absolute top-[42%] right-[6%] w-12 h-12 rounded-full bg-gradient-to-br from-[#00B4D8]/30 via-white/50 to-transparent blur-[1px] shadow-sm opacity-50" />
      <div className="absolute top-[68%] right-[15%] w-6 h-6 rounded-full bg-gradient-to-tr from-[#C084FC]/40 to-white/70 blur-[1px] shadow-sm opacity-60" />
    </div>
  );
}
