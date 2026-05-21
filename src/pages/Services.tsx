/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useApp } from '../context/AppContext';
import { ShieldCheck, ArrowUpRight, Check, Zap, Eye, RefreshCw, Cpu, Server, ChevronLeft, ChevronRight } from 'lucide-react';

interface ServicesProps {
  onNavigate: (page: string) => void;
  key?: string;
}

export default function Services({ onNavigate }: ServicesProps) {
  const { t } = useApp();
  const [currentPage, setCurrentPage] = useState(1);
  const PAGE_SIZE = 2;

  const servicesCollection = [
    {
      id: 'comm',
      icon: Eye,
      title: t.services.commTitle,
      short: t.services.commShort,
      detail: t.services.commLong,
      voltage: '120V / 208V / 480V',
      specs: [
        'Main riser board integrations',
        'Commercial lighting automation & control panels',
        'Sub-tenant load distribution mapping',
        'High-density office wellness grids',
      ],
      hardware: ['Modular bus ducts', 'Digital thermal breakers', 'Lighting automation grids'],
    },
    {
      id: 'ind',
      icon: Cpu,
      title: t.services.indTitle,
      short: t.services.indShort,
      detail: t.services.indLong,
      voltage: '480V / 4160V / 13.8kV',
      specs: [
        'Steel-conduit structural high-voltage routing',
        'Power-factor correction capacitor arrays',
        'Motor load centers & automated control hubs',
        'Structural overhead wireway suspensions',
      ],
      hardware: ['Metal-clad MV switchboards', 'Synchronous motor regulators', 'High-capacitance banks'],
    },
    {
      id: 'datacenter',
      icon: Server,
      title: t.services.datacenterTitle,
      short: t.services.datacenterShort,
      detail: t.services.datacenterLong,
      voltage: '480V standard / 2N redundancy feeds',
      specs: [
        'Dual utility feed synchronization engineering',
        'Static transfer switch latency matching under 4ms',
        'Modular flywheel UPS cell alignments',
        'Continuous thermal modeling and laser scan surveys',
      ],
      hardware: ['Fast-action ATS key modules', 'Isolated path Form 4 copper busbars', 'Double fiber remote telemetry racks'],
    },
    {
      id: 'renew',
      icon: RefreshCw,
      title: t.services.renewTitle,
      short: t.services.renewShort,
      detail: t.services.renewLong,
      voltage: 'Up to 1500V DC / Grid utility ties',
      specs: [
        'Megawatt scale solar inverter integration',
        'Grid tie-in net metering switchgear',
        'Level-3 DC liquid-cooled fast EV chargers (350kW)',
        'Battery energy storage peak-shaving integration',
      ],
      hardware: ['Active grid-tied solar inverters', 'Bi-directional peak-shaving batteries', 'High output liquid-cooled EV chargers'],
    },
  ];

  const totalPages = Math.ceil(servicesCollection.length / PAGE_SIZE);
  const displayedServices = servicesCollection.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.4 }}
      className="space-y-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
    >
      {/* Page Header */}
      <div className="max-w-3xl text-left space-y-3">
        <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#0012FF] dark:text-cyan-400 block">
          {t.services.tag}
        </span>
        <h1 className="text-3xl sm:text-5xl font-display font-medium tracking-tight text-gray-900 dark:text-white leading-tight">
          {t.services.title}
        </h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm sm:text-base leading-relaxed max-w-2xl">
          {t.services.desc}
        </p>
      </div>

      {/* Services detailed rows */}
      <div className="space-y-12">
        {displayedServices.map((serv, index) => {
          const Icon = serv.icon;
          const itemIndex = (currentPage - 1) * PAGE_SIZE + index;
          const isEven = itemIndex % 2 === 0;

          return (
            <div
              key={serv.id}
              className={`flex flex-col lg:flex-row gap-8 items-stretch ${
                isEven ? '' : 'lg:flex-row-reverse'
              }`}
            >
              {/* Left/Content Box */}
              <div className="w-full lg:w-1/2 flex flex-col justify-between bg-white dark:bg-slate-900 border border-gray-150 dark:border-white/10 rounded-3xl p-6 sm:p-8 hover:shadow-md transition-shadow duration-300 text-left">
                <div className="space-y-4">
                  <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-gray-50 dark:bg-slate-950 border border-gray-150 dark:border-white/5">
                    <Icon className="h-6 w-6 text-[#0012FF] dark:text-cyan-400" />
                  </div>

                  <h3 className="text-xl sm:text-2xl font-display font-bold text-gray-900 dark:text-white">
                    {serv.title}
                  </h3>
                  <p className="text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300">
                    {serv.short}
                  </p>
                  <p className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm leading-relaxed font-sans">
                    {serv.detail}
                  </p>
                </div>

                <div className="mt-8 pt-6 border-t border-gray-100 dark:border-white/10 flex flex-wrap gap-4 items-center justify-between select-none">
                  <div className="space-y-1 text-left">
                    <span className="text-[10px] font-mono text-gray-400 dark:text-gray-500 uppercase block font-bold">
                      {t.services.voltRange}
                    </span>
                    <span className="text-xs font-mono font-bold text-[#0012FF] dark:text-[#00FF00]">
                      {serv.voltage}
                    </span>
                  </div>
                  <button
                    onClick={() => onNavigate('#estimator')}
                    className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-[#0012FF] dark:text-cyan-300 hover:underline cursor-pointer"
                  >
                    <span>{t.services.configureEstimator}</span>
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>

              {/* Right/Technical specifications Box */}
              <div className="w-full lg:w-1/2 bg-gray-905 dark:bg-slate-950 text-white rounded-3xl p-6 sm:p-8 flex flex-col justify-between text-left">
                <div className="space-y-5">
                  <div className="space-y-1.5">
                    <span className="text-[#00FF00] font-mono text-[10px] font-black uppercase tracking-widest block">
                      {t.services.specTitle}
                    </span>
                    <h4 className="text-base sm:text-lg font-bold">{t.services.certifiedSpec}</h4>
                  </div>

                  <ul className="space-y-3.5">
                    {serv.specs.map((spec, sIdx) => (
                      <li key={sIdx} className="flex items-start gap-3 text-xs sm:text-sm text-gray-300">
                        <Check className="h-4 w-4 md:h-5 md:w-5 text-[#00FF00] flex-shrink-0 mt-0.5" />
                        <span>{spec}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8 pt-6 border-t border-white/10">
                  <span className="text-[10px] font-mono text-gray-500 uppercase block mb-2 font-bold">
                    {t.services.hardwareTitle}
                  </span>
                  <div className="flex flex-wrap gap-2 text-[10px] font-mono">
                    {serv.hardware.map((hw, hIdx) => (
                      <span
                        key={hIdx}
                        className="bg-white/5 border border-white/10 px-2.5 py-1 rounded-md text-gray-300 font-medium"
                      >
                        {hw}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 pt-4" id="services-pagination">
          <button
            onClick={() => {
              setCurrentPage(prev => Math.max(prev - 1, 1));
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            disabled={currentPage === 1}
            className="p-2.5 border border-gray-200 dark:border-white/10 rounded-xl disabled:opacity-40 hover:bg-[#0012FF]/5 dark:hover:bg-cyan-400/10 transition-colors cursor-pointer text-gray-700 dark:text-gray-300 bg-white dark:bg-slate-900"
            aria-label="Previous page"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          
          {Array.from({ length: totalPages }).map((_, idx) => {
            const pageNum = idx + 1;
            return (
              <button
                key={pageNum}
                onClick={() => {
                  setCurrentPage(pageNum);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
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
            onClick={() => {
              setCurrentPage(prev => Math.min(prev + 1, totalPages));
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            disabled={currentPage === totalPages}
            className="p-2.5 border border-gray-200 dark:border-white/10 rounded-xl disabled:opacity-40 hover:bg-[#0012FF]/5 dark:hover:bg-cyan-400/10 transition-colors cursor-pointer text-gray-700 dark:text-gray-300 bg-white dark:bg-slate-900"
            aria-label="Next page"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      )}

      {/* Safety Compliance block banner */}
      <div className="bg-[#0012FF]/5 border border-[#0012FF]/20 dark:bg-slate-900 rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between gap-6 text-left">
        <div className="space-y-2">
          <span className="text-[10px] font-mono font-bold text-[#0012FF] dark:text-cyan-400 uppercase tracking-widest block">
            {t.services.regulatoryTag}
          </span>
          <h3 className="text-lg sm:text-2xl font-display font-bold text-gray-900 dark:text-white">
            {t.services.regulatoryTitle}
          </h3>
          <p className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm leading-relaxed max-w-2xl">
            {t.services.regulatoryDesc}
          </p>
        </div>
        <div className="flex-shrink-0 bg-white dark:bg-slate-950 border border-gray-150 dark:border-white/10 p-4 rounded-2xl flex items-center gap-3">
          <ShieldCheck className="h-10 w-10 text-[#00FF00]" />
          <div className="space-y-0.5">
            <span className="text-xs font-mono font-bold block text-gray-900 dark:text-white">
              S-491-OSHA
            </span>
            <span className="text-[10px] text-gray-400 uppercase block font-medium">
              {t.services.complianceFooter}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
