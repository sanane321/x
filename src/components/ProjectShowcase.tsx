/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, Zap, AlertTriangle, Lightbulb, ArrowRight, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { ProjectDetail } from '../types';

export default function ProjectShowcase() {
  const [selectedProject, setSelectedProject] = useState<ProjectDetail | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const PAGE_SIZE = 2;

  // Exact generated asset references matching the generated files:
  const projects: ProjectDetail[] = [
    {
      slug: 'apex-datacenter',
      title: 'Apex Megawatt Data Center Core',
      location: 'Dublin Tech Zone',
      category: 'Mission-Critical Power',
      imageSrc: '/src/assets/images/project_data_center_1779333053234.png',
      powerRating: '15.0 MW Continuous',
      challenge: 'Deploy an N+1 completely isolated redundant sub-feed loop with dual automatic transfer switch controllers with zero acceptable interruption tolerance under peak 5,000A grid swap tests.',
      solution: 'Configured dual isolated ABB vacuum circuit line feeds backed by triple parallelized Cummins heavy generators. Programmed custom PLC scripts to achieve a record-breaking 4.2ms synchronization transfer upon grid disconnect simulation.',
      stats: [
        { label: 'Cumulative Power', value: '15.0 MW' },
        { label: 'ATS Transfer Speed', value: '4.2 ms' },
        { label: 'Cabling Distance', value: '14.2 Miles' },
        { label: 'Redundancy Rating', value: 'Tier IV Compliant' }
      ]
    },
    {
      slug: 'ecogrid-canopy',
      title: 'EcoGrid Supercharger Plaza & Net-Meter',
      location: 'Silicon District Corporate Park',
      category: 'Sustainable Infrastructure',
      imageSrc: '/src/assets/images/project_green_energy_1779333073620.png',
      powerRating: '4.5 MW Grid-Tie',
      challenge: 'Unify a 1,200kW solar photovoltaic roof canopy array with twelve Level-3 liquid-cooled EV fast chargers, while maintaining peak load protection during high-density afternoon charging surges.',
      solution: 'Constructed an on-site bidrectional Tesla Megapack storage bank. Integrated custom digital controllers engineered to shave peak utility demands by feeding solar reserves directly into EV terminals during peak pricing hours.',
      stats: [
        { label: 'Active Solar Peak', value: '1,200 kW' },
        { label: 'EV Superchargers', value: '12 Ports (L3)' },
        { label: 'CO2 Offset/Year', value: '450 Metric Tons' },
        { label: 'Storage Reserves', value: '2.5 MWh Battery' }
      ]
    },
    {
      slug: 'neo-industrial',
      title: 'Neo-Volt High Voltage Switchyard',
      location: 'Industrial Port Hub 4',
      category: 'Industrial Substation',
      imageSrc: '/src/assets/images/hero_electrical_1779333030707.png',
      powerRating: '110 kV Utility Tap',
      challenge: 'Deliver full step-down substation engineering to convert incoming 110kV regional power to 13.8V and 480V networks across a new 220,000 sq ft heavy machinery assembly complex.',
      solution: 'Crafted dual outdoor step-down transformers with full lightning arrestors, oil-insulated containment pits, and customized heavy-duty overhead copper plug-in busway distributions spanning the assembly hall floor.',
      stats: [
        { label: 'Inbound Line Feed', value: '110 kV Feed' },
        { label: 'Sub-Distribution', value: '13.8 kV / 480 V' },
        { label: 'Incident Free Hours', value: '42,000 Hours' },
        { label: 'BIM Model Efficiency', value: '100% LOD 400' }
      ]
    }
  ];

  const totalPages = Math.ceil(projects.length / PAGE_SIZE);
  const displayedProjects = projects.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  return (
    <div className="space-y-8" id="project-showcase">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {displayedProjects.map((proj) => (
          <div 
            key={proj.slug}
            className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col group cursor-pointer"
            onClick={() => setSelectedProject(proj)}
          >
            {/* Project Image Wrapper */}
            <div className="relative aspect-4/3 overflow-hidden bg-gray-100">
              <img 
                src={proj.imageSrc} 
                alt={proj.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
              />
              <div className="absolute top-3 left-3 bg-gray-900/80 backdrop-blur-xs text-white text-[10px] font-mono uppercase tracking-wider py-1 px-2.5 rounded">
                {proj.category}
              </div>
            </div>

            {/* Core Card Details */}
            <div className="p-5 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-1">
                  <MapPin className="h-3.5 w-3.5" />
                  <span>{proj.location}</span>
                </div>
                <h4 className="text-lg font-display font-bold text-gray-900 leading-snug group-hover:text-[#0012FF] transition-colors">
                  {proj.title}
                </h4>
              </div>

              <div className="pt-4 border-t border-gray-100 mt-4 flex items-center justify-between">
                <div className="flex items-center gap-1.5 font-mono text-xs text-[#0012FF]">
                  <Zap className="h-4 w-4 fill-blue-100" />
                  <span className="font-bold">{proj.powerRating}</span>
                </div>
                <span className="text-xs text-gray-400 inline-flex items-center gap-1 group-hover:text-gray-700 transition-colors">
                  Technical Brief <ArrowRight className="h-3.5 w-3.5 stroke-[2.5]" />
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 pt-4" id="portfolio-pagination">
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="p-2.5 border border-gray-200 dark:border-white/10 rounded-xl disabled:opacity-40 hover:bg-[#0012FF]/5 dark:hover:bg-cyan-400/10 transition-colors cursor-pointer text-gray-700 dark:text-gray-300 bg-white dark:bg-slate-900"
            aria-label="Previous page"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          
          {Array.from({ length: totalPages }).map((_, index) => {
            const pageNum = index + 1;
            return (
              <button
                key={pageNum}
                onClick={() => setCurrentPage(pageNum)}
                className={`h-10 w-10 text-xs font-mono font-bold rounded-xl transition-all cursor-pointer border ${
                  currentPage === pageNum
                    ? 'bg-gray-950 dark:bg-cyan-400 text-white dark:text-slate-950 border-gray-950 dark:border-cyan-400 shadow-sm font-extrabold'
                    : 'bg-white dark:bg-slate-900 border-gray-200 dark:border-white/10 text-gray-500 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                {pageNum}
              </button>
            );
          })}
          
          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="p-2.5 border border-gray-200 dark:border-white/10 rounded-xl disabled:opacity-40 hover:bg-[#0012FF]/5 dark:hover:bg-cyan-400/10 transition-colors cursor-pointer text-gray-700 dark:text-gray-300 bg-white dark:bg-slate-900"
            aria-label="Next page"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      )}

      {/* High-Fidelity Technical Case-Study Dialog Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="absolute inset-0 bg-gray-950/60 backdrop-blur-sm"
            />

            {/* Modal Body */}
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 15 }}
              className="bg-white rounded-3xl border border-gray-100 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative z-10 text-left"
            >
              {/* Image Banner */}
              <div className="relative h-64 sm:h-72 w-full bg-gray-100">
                <img 
                  src={selectedProject.imageSrc} 
                  alt={selectedProject.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-4 right-4 p-2 rounded-full bg-gray-900/80 hover:bg-gray-900 text-white transition cursor-pointer"
                  aria-label="Close modal"
                >
                  <X className="h-5 w-5" />
                </button>
                <div className="absolute bottom-4 left-4 bg-gray-900/80 backdrop-blur-xs text-white text-[10px] font-mono uppercase tracking-widest py-1.5 px-3 rounded">
                  {selectedProject.category}
                </div>
              </div>

              {/* Content body */}
              <div className="p-6 sm:p-8 space-y-6">
                <div>
                  <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-1">
                    <MapPin className="h-4 w-4" />
                    <span>{selectedProject.location}</span>
                  </div>
                  <h3 className="text-2xl font-display font-medium tracking-tight text-gray-900">
                    {selectedProject.title}
                  </h3>
                </div>

                {/* Key specs grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {selectedProject.stats.map((st, i) => (
                    <div key={i} className="bg-gray-50 p-3 rounded-xl border border-gray-100/60 text-center sm:text-left">
                      <span className="text-[10px] text-gray-400 uppercase tracking-wider block font-medium">{st.label}</span>
                      <span className="font-mono text-sm font-bold text-gray-900 mt-0.5 block">{st.value}</span>
                    </div>
                  ))}
                </div>

                {/* Challenge Block */}
                <div className="space-y-2 bg-amber-500/5 border border-amber-500/10 p-4 rounded-xl">
                  <span className="text-xs font-mono text-amber-600 font-bold uppercase tracking-wider flex items-center gap-1.5">
                    <AlertTriangle className="h-4 w-4" /> Engineering Challenge
                  </span>
                  <p className="text-sm text-gray-700 leading-relaxed font-sans">{selectedProject.challenge}</p>
                </div>

                {/* Solution Block */}
                <div className="space-y-2 bg-emerald-500/5 border border-emerald-500/10 p-4 rounded-xl">
                  <span className="text-xs font-mono text-emerald-600 font-bold uppercase tracking-wider flex items-center gap-1.5">
                    <Lightbulb className="h-4 w-4" /> Delivered Solution
                  </span>
                  <p className="text-sm text-gray-700 leading-relaxed font-sans">{selectedProject.solution}</p>
                </div>

                {/* CTA */}
                <div className="pt-4 border-t border-gray-100 flex justify-between items-center text-xs text-gray-400">
                  <span>NEC Compliance certified audit: #XEK-99{- (Math.floor(Math.random()*800))}</span>
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="font-semibold text-[#0012FF] hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    Close Technical Brief
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
