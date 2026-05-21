import React from 'react';
import { motion } from 'motion/react';
import ServicesGrid from '../components/ServicesGrid';
import { ShieldAlert, Zap, Cpu, Hammer } from 'lucide-react';

export default function Capabilities() {
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
          ENGINEERED SOLUTIONS
        </span>
        <h1 className="text-3xl sm:text-5xl font-display font-medium tracking-tight text-gray-900 leading-tight">
          High-Tolerance <br />Technical Disciples
        </h1>
        <p className="text-gray-500 text-sm sm:text-base leading-relaxed max-w-2xl">
          From heavy manufacturing busduct grids and utility substations to hyperscale server halls and vehicle fast-charging arrays, X Elektrik deploys licensed, union-standard technicians and BIM coordinators.
        </p>
      </div>

      <div className="bg-white border border-gray-150 p-6 rounded-2xl flex flex-wrap gap-6 items-center justify-between text-left">
        <div className="flex items-center gap-3">
          <Zap className="h-6 w-6 text-[#0012FF]" />
          <div>
            <span className="text-xs font-mono uppercase text-gray-400 block font-bold">Switchgear Standard</span>
            <span className="text-sm font-bold text-gray-900">Siemens, ABB & Eaton Approved</span>
          </div>
        </div>
        <div className="h-8 w-px bg-gray-150 hidden md:block" />
        <div className="flex items-center gap-3">
          <Cpu className="h-6 w-6 text-emerald-500" />
          <div>
            <span className="text-xs font-mono uppercase text-gray-400 block font-bold">CAD / BIM Depth</span>
            <span className="text-sm font-bold text-gray-900">LOD 400 • Revit & Navisworks</span>
          </div>
        </div>
        <div className="h-8 w-px bg-gray-150 hidden md:block" />
        <div className="flex items-center gap-3">
          <Hammer className="h-6 w-6 text-amber-500" />
          <div>
            <span className="text-xs font-mono uppercase text-gray-400 block font-bold">Labor Sourcing</span>
            <span className="text-sm font-bold text-gray-900">100% Certified Union Journeymen</span>
          </div>
        </div>
      </div>

      {/* Services Grid Component */}
      <ServicesGrid />

      {/* Standards & Endorsements Section */}
      <div className="bg-gray-900 text-white p-8 sm:p-12 rounded-3xl text-left relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-5">
          <ShieldAlert className="h-48 w-48 text-white" />
        </div>
        <div className="relative z-10 max-w-2xl space-y-4">
          <span className="text-xs font-mono font-bold text-[#00FF00] uppercase tracking-wider">REGULATORY ACCREDITATIONS</span>
          <h3 className="text-2xl sm:text-3xl font-bold">Strict High-voltage IEC & NEC Conformity</h3>
          <p className="text-gray-300 text-xs sm:text-sm leading-relaxed">
            Every terminal torque, cable tension, and transformer secondary setting we engineer is cataloged, double-checked, and autographed by a registered QA specialist. This absolute discipline guarantees that your insurance compliance has full support.
          </p>
        </div>
      </div>
    </motion.div>
  );
}
