import React from 'react';
import { motion } from 'motion/react';
import { useApp } from '../context/AppContext';
import { CircuitBoard, ChevronRight } from 'lucide-react';
import DiagnosticsBoard from '../components/DiagnosticsBoard';

interface HomeProps {
  onNavigate: (hash: string) => void;
  key?: string;
}

export default function Home({ onNavigate }: HomeProps) {
  const { t } = useApp();

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.4 }}
      className="space-y-16"
    >
      {/* HERO SECTION WITH INDUSTRIAL GRID ALIGNMENT */}
      <section className="relative pt-24 pb-20 sm:pt-32 sm:pb-28 overflow-hidden bg-gray-950 text-white rounded-3xl mx-4 sm:mx-6 lg:mx-8 shadow-2xl">
        {/* Full Cinematic generated hero image as layout background */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden bg-slate-900/40">
          <img 
            src="/src/assets/images/hero_electrical_1779333030707.png" 
            alt="X Elektrik Substation Subsystem" 
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center opacity-30 mix-blend-linear-burn"
          />
          {/* Neon overlays to draw eye to blueprint accents */}
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-gray-950 to-transparent" />
          <div className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-gray-950 to-transparent" />
        </div>

        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-7 space-y-6 text-left">
              <div className="inline-flex items-center gap-2 bg-[#0012FF]/30 border border-[#0012FF] rounded-full px-3.5 py-1 text-xs font-mono font-bold uppercase text-[#4D64FF]">
                <CircuitBoard className="h-4 w-4 text-[#00FF00] animate-pulse" />
                <span>{t.home.gridSystems}</span>
              </div>
              
              <h1 className="text-4xl sm:text-6xl font-display font-medium tracking-tight text-white leading-none">
                {t.home.heroTitle} <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00FFF0] to-[#00FF00] font-black">
                  {t.home.heroTitleAccent}
                </span>
              </h1>
              
              <p className="text-gray-300 text-base sm:text-lg max-w-xl leading-relaxed">
                {t.home.heroDesc}
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4">
                <button
                  onClick={() => onNavigate('#/estimator')}
                  className="py-3.5 px-7 rounded-xl bg-[#0012FF] text-white font-bold hover:bg-[#000EAF] hover:shadow-lg transition text-sm text-center uppercase flex items-center justify-center gap-2 cursor-pointer border-0"
                >
                  <span>{t.home.accessEstimator}</span>
                  <ChevronRight className="h-4 w-4" />
                </button>
                
                <button
                  onClick={() => onNavigate('#/portfolio')}
                  className="py-3.5 px-7 rounded-xl border border-white/20 hover:border-white hover:bg-white/5 font-semibold text-white transition text-sm text-center uppercase cursor-pointer"
                >
                  {t.home.reviewWorks}
                </button>
              </div>

              {/* Technical indicators badge rail */}
              <div className="grid grid-cols-3 gap-4 pt-8 border-t border-white/10 max-w-md">
                <div>
                  <span className="text-2xl font-mono font-black text-[#00FF00] block">{t.home.safetyStat}</span>
                  <span className="text-[10px] text-gray-400 block uppercase font-bold">OSHA Safety Rating</span>
                </div>
                <div>
                  <span className="text-2xl font-mono font-black text-cyan-400 block">{t.home.bimStat}</span>
                  <span className="text-[10px] text-gray-400 block uppercase font-bold">BIM Eng. Standard</span>
                </div>
                <div>
                  <span className="text-2xl font-mono font-black text-white block">{t.home.yearsStat}</span>
                  <span className="text-[10px] text-gray-400 block uppercase font-bold">Industrial Runs</span>
                </div>
              </div>

            </div>

            {/* Quick overview of live stats right on the Hero */}
            <div className="lg:col-span-5 h-full">
              <div className="relative">
                <div className="absolute -inset-1 rounded-2xl bg-gradient-to-b from-[#0012FF] to-[#00FF00] opacity-10 blur-xl pointer-events-none" />
                <DiagnosticsBoard />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ADDITIONAL HOME PAGE METRICS TO MAKE IT A RICH STANDALONE VIEW */}
      <section className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white dark:bg-slate-900 border border-gray-150 dark:border-white/10 p-8 rounded-2xl shadow-sm text-left hover:shadow-md transition-all">
            <span className="text-xs font-mono font-bold text-[#0012FF] dark:text-cyan-400 uppercase block tracking-wider mb-2">01 / SAFETY FIRST</span>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{t.home.safetyTitle}</h3>
            <p className="text-gray-500 dark:text-gray-400 text-xs leading-relaxed">
              {t.home.safetyDesc}
            </p>
          </div>
          <div className="bg-white dark:bg-slate-900 border border-gray-150 dark:border-white/10 p-8 rounded-2xl shadow-sm text-left hover:shadow-md transition-all">
            <span className="text-xs font-mono font-bold text-[#00FF00] uppercase block tracking-wider mb-2">02 / MODELING QUALITY</span>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{t.home.bimTitle}</h3>
            <p className="text-gray-500 dark:text-gray-400 text-xs leading-relaxed">
              {t.home.bimDesc}
            </p>
          </div>
          <div className="bg-white dark:bg-slate-900 border border-gray-150 dark:border-white/10 p-8 rounded-2xl shadow-sm text-left hover:shadow-md transition-all">
            <span className="text-xs font-mono font-bold text-cyan-400 uppercase block tracking-wider mb-2">03 / CAPABILITY EXCELLENCE</span>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{t.home.uptimeTitle}</h3>
            <p className="text-gray-500 dark:text-gray-400 text-xs leading-relaxed">
              {t.home.uptimeDesc}
            </p>
          </div>
        </div>
      </section>
    </motion.div>
  );
}
