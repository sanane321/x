/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { useApp } from '../context/AppContext';
import { Award, ShieldAlert, Cpu, Heart, CheckCircle } from 'lucide-react';

export default function About() {
  const { t } = useApp();

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.4 }}
      className="space-y-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
    >
      {/* Intro Header */}
      <div className="max-w-3xl text-left space-y-3">
        <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#0012FF] dark:text-cyan-400 block animate-pulse">
          {t.about.tag}
        </span>
        <h1 className="text-3xl sm:text-5xl font-display font-medium tracking-tight text-gray-900 dark:text-white leading-tight">
          {t.about.title}
        </h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm sm:text-base leading-relaxed max-w-2xl">
          {t.about.desc}
        </p>
      </div>

      {/* Safety & TRIR Highlight Grid */}
      <div className="bg-white dark:bg-slate-900 border border-gray-150 dark:border-white/10 p-6 sm:p-8 rounded-3xl grid grid-cols-1 md:grid-cols-3 gap-6 items-center text-left transition-colors">
        <div className="space-y-2">
          <span className="text-xs font-mono uppercase text-gray-400 dark:text-gray-500 block font-bold">
            {t.about.safetyFirst}
          </span>
          <span className="text-3xl font-mono font-black text-[#0012FF] dark:text-cyan-400 block">
            {t.about.safetyRate}
          </span>
          <p className="text-xs text-gray-500 dark:text-gray-400">{t.about.safetyDays}</p>
        </div>
        <div className="h-px md:h-12 w-full md:w-px bg-gray-150 dark:bg-white/10" />
        <div className="space-y-2">
          <span className="text-xs font-mono uppercase text-gray-400 dark:text-gray-500 block font-bold">
            {t.about.standardsTitle}
          </span>
          <span className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-1.5">
            <CheckCircle className="h-5 w-5 text-[#00FF00]" />
            ISO 9001, IEC & NEC Approved
          </span>
          <p className="text-xs text-gray-500 dark:text-gray-400">{t.about.standardsDesc}</p>
        </div>
      </div>

      {/* Heritage / Story Split */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* Story details */}
        <div className="space-y-6 text-left">
          <div className="bg-white dark:bg-slate-900 border border-gray-150 dark:border-white/10 p-8 rounded-2xl hover:shadow-md transition duration-300">
            <span className="text-xs font-mono font-bold text-[#0012FF] dark:text-cyan-400 uppercase block mb-2">
              01 / {t.about.missionTitle}
            </span>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
              {t.about.missionTitle}
            </h3>
            <p className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm leading-relaxed">
              {t.about.missionDesc}
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 border border-gray-150 dark:border-white/10 p-8 rounded-2xl hover:shadow-md transition duration-300">
            <span className="text-xs font-mono font-bold text-[#00FF00] uppercase block mb-2">
              02 / {t.about.visionTitle}
            </span>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
              {t.about.visionTitle}
            </h3>
            <p className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm leading-relaxed">
              {t.about.visionDesc}
            </p>
          </div>
        </div>

        {/* Story background with industrial theme */}
        <div className="bg-gray-905 dark:bg-slate-950 text-white p-8 sm:p-12 rounded-3xl text-left relative overflow-hidden h-full min-h-[350px] flex flex-col justify-between">
          <div className="absolute inset-0 opacity-10 pointer-events-none font-mono">
            {/* Minimal SVG Grid layout overlay */}
            <span className="text-xs select-none block tracking-widest text-[#00FF00] opacity-30">X_SYSTEM_SECURED</span>
          </div>

          <div className="relative z-10 space-y-4">
            <div className="inline-flex items-center gap-1.5 bg-[#0012FF]/30 border border-[#0012FF] rounded-full px-3.5 py-1 text-[10px] font-mono font-bold uppercase text-[#4D64FF]">
              <Cpu className="h-3.5 w-3.5 text-[#00FF00]" />
              <span>{t.about.historyTitle}</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-display font-medium tracking-tight">
              {t.about.historyTitle}
            </h3>
            <p className="text-gray-300 text-xs sm:text-sm leading-relaxed">
              {t.about.historyDesc}
            </p>
          </div>

          <div className="relative z-10 pt-8 border-t border-white/10 flex items-center gap-4 text-xs font-mono text-gray-400">
            <div>
              <span className="font-bold text-white block">ISO 9001:2015</span>
              <span>Quality Assurance</span>
            </div>
            <div className="h-6 w-0.5 bg-white/20" />
            <div>
              <span className="font-bold text-white block">IEC SYSTEM</span>
              <span>Certified Integration</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
