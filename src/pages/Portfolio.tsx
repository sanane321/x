import React from 'react';
import { motion } from 'motion/react';
import ProjectShowcase from '../components/ProjectShowcase';
import { Database, Lightbulb, CheckSquare } from 'lucide-react';

export default function Portfolio() {
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
          COMPLETED BLUEPRINTS & INFRASTRUCTURE
        </span>
        <h1 className="text-3xl sm:text-5xl font-display font-medium tracking-tight text-gray-900 leading-tight">
          Megawatt Grid <br />Implementations
        </h1>
        <p className="text-gray-500 text-sm sm:text-base leading-relaxed max-w-2xl">
          Review our real technical briefs detailing complex site conditions, physical substation challenges, and customized redundant power systems engineered by our crews.
        </p>
      </div>

      {/* Portfolio stat row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
        <div className="bg-white border border-gray-150 p-6 rounded-2xl">
          <Database className="h-6 w-6 text-[#0012FF] mb-2" />
          <h4 className="font-bold text-gray-900 text-base">450+ Megawatts</h4>
          <p className="text-xs text-gray-400 mt-1">Total combined power engineered and actively commissioned in current grids.</p>
        </div>
        <div className="bg-white border border-gray-150 p-6 rounded-2xl">
          <Lightbulb className="h-6 w-6 text-[#00FF00] mb-2" />
          <h4 className="font-bold text-gray-900 text-base">100% Critical Uptime</h4>
          <p className="text-xs text-gray-400 mt-1">Delivering flawless continuous backup operation across high-density facilities.</p>
        </div>
        <div className="bg-white border border-gray-150 p-6 rounded-2xl">
          <CheckSquare className="h-6 w-6 text-cyan-400  mb-2" />
          <h4 className="font-bold text-gray-900 text-base">LOD 400 Standards</h4>
          <p className="text-xs text-gray-400 mt-1">Every element built perfectly maps to our rich virtual BIM models prior to placement.</p>
        </div>
      </div>

      <ProjectShowcase />
    </motion.div>
  );
}
