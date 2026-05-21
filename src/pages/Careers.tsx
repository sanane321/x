import React from 'react';
import { motion } from 'motion/react';
import CareersSection from '../components/CareersSection';
import { ShieldCheck, UserCheck, Award } from 'lucide-react';

export default function Careers() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.4 }}
      className="space-y-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
    >
      <div className="max-w-3xl text-left space-y-3">
        <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#0012FF] block">
          PEOPLE & STANDARDS
        </span>
        <h1 className="text-3xl sm:text-5xl font-display font-medium tracking-tight text-gray-900 leading-tight">
          Empowering Licensed <br />Tradespeople & Engineers
        </h1>
        <p className="text-gray-500 text-sm sm:text-base leading-relaxed max-w-2xl">
          X Elektrik recruits elite engineering talent and trade technicians. We support continuing trade education, offer exceptional benefit scales, and maintain an uncompromising approach to work safety.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Safety & Info panel (5 Cols) */}
        <div className="lg:col-span-5 space-y-6 text-left">
          
          <div className="bg-white border border-gray-150 p-6 rounded-2xl space-y-4">
            <h4 className="font-bold text-gray-900 text-sm tracking-wider uppercase font-mono text-[#0012FF]">Safety Milestones</h4>
            <div className="flex items-center gap-3">
              <span className="text-4xl font-black text-emerald-500 font-mono">0.0</span>
              <div>
                <span className="font-bold text-gray-900 text-xs block">TRIR Incident Rate</span>
                <span className="text-[10px] text-gray-400 block">Perfect OSHA recording sequence</span>
              </div>
            </div>
            <div className="h-px bg-gray-150" />
            <div className="flex items-center gap-3">
              <span className="text-4xl font-black text-cyan-400 font-mono">2.5K+</span>
              <div>
                <span className="font-bold text-gray-900 text-xs block">Days Incident-Free</span>
                <span className="text-[10px] text-gray-400 block">Uncompromising safety discipline</span>
              </div>
            </div>
          </div>

          {/* Partner associations / standards bullet grid */}
          <div className="space-y-4 pl-4 border-l-2 border-[#0012FF]/30">
            <div className="flex items-start gap-3">
              <ShieldCheck className="h-5 w-5 text-[#0012FF] flex-shrink-0 mt-0.5" />
              <div>
                <h5 className="font-bold text-gray-900 text-sm">IEC & NEC Code Conformity</h5>
                <p className="text-xs text-gray-500 mt-0.5">Every layout aligns precisely with National Electrical Code safety specs.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <UserCheck className="h-5 w-5 text-[#0012FF] flex-shrink-0 mt-0.5" />
              <div>
                <h5 className="font-bold text-gray-900 text-sm">OSHA 30 Field Supervision</h5>
                <p className="text-xs text-gray-500 mt-0.5">All field lead roles maintain high-tier certified safety credentials.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Award className="h-5 w-5 text-[#0012FF] flex-shrink-0 mt-0.5" />
              <div>
                <h5 className="font-bold text-gray-900 text-sm">Registered ISO 9001 Alignment</h5>
                <p className="text-xs text-gray-500 mt-0.5">Continuous quality metrics govern our switchgear assembly.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Careers job board list (7 Cols) */}
        <div className="lg:col-span-7">
          <CareersSection />
        </div>
      </div>
    </motion.div>
  );
}
