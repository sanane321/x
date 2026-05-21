/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Activity, ShieldAlert, Award, Radio, Thermometer, TrendingUp, Cpu, Flame, CheckCircle } from 'lucide-react';

export default function DiagnosticsBoard() {
  const [frequency, setFrequency] = useState(60.00);
  const [phaseAVoltage, setPhaseAVoltage] = useState(277.2);
  const [phaseBVoltage, setPhaseBVoltage] = useState(277.5);
  const [phaseCVoltage, setPhaseCVoltage] = useState(276.8);
  const [currentLoad, setCurrentLoad] = useState(64.8);
  const [uptime, setUptime] = useState('99.9998');

  // Safely simulate slight micro-fluctuations typical of a healthy electrical grid
  useEffect(() => {
    const timer = setInterval(() => {
      setFrequency(prev => {
        const delta = (Math.random() - 0.5) * 0.04;
        return parseFloat(Math.min(60.05, Math.max(59.95, prev + delta)).toFixed(3));
      });

      setPhaseAVoltage(prev => {
        const delta = (Math.random() - 0.5) * 0.6;
        return parseFloat(Math.min(278.5, Math.max(275.5, prev + delta)).toFixed(1));
      });

      setPhaseBVoltage(prev => {
        const delta = (Math.random() - 0.5) * 0.6;
        return parseFloat(Math.min(278.5, Math.max(275.5, prev + delta)).toFixed(1));
      });

      setPhaseCVoltage(prev => {
        const delta = (Math.random() - 0.5) * 0.6;
        return parseFloat(Math.min(278.5, Math.max(275.5, prev + delta)).toFixed(1));
      });

      setCurrentLoad(prev => {
        const delta = (Math.random() - 0.5) * 1.2;
        return parseFloat(Math.min(78.0, Math.max(55.0, prev + delta)).toFixed(1));
      });
    }, 2500);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-gray-900 border border-gray-800 text-white rounded-2xl p-6 shadow-inner space-y-6" id="diagnostics-board">
      <div className="flex items-center justify-between border-b border-gray-800 pb-3">
        <div className="flex items-center gap-2">
          <Activity className="h-4 w-4 text-[#00FF00] animate-pulse" />
          <span className="text-xs font-mono font-bold tracking-wider uppercase text-gray-300">Live Grid Diagnostics Console</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-[#00FF00] animate-ping" />
          <span className="text-[10px] font-mono text-gray-400">ACTIVE FEED</span>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1 */}
        <div className="bg-black/30 p-3.5 rounded-xl border border-gray-800/80">
          <span className="text-[10px] font-mono text-gray-400 block uppercase">Utility Frequency</span>
          <div className="flex items-baseline gap-1 mt-1">
            <span className="text-xl font-mono text-white font-bold">{frequency.toFixed(3)}</span>
            <span className="text-[10px] font-mono text-gray-400">Hz</span>
          </div>
          <div className="w-full bg-gray-800 h-1 mt-2.5 rounded-full overflow-hidden">
            <motion.div 
              className="bg-[#00FF00] h-full"
              animate={{ width: `${Math.max(10, ((frequency - 59.9) / 0.2) * 100)}%` }}
              transition={{ duration: 1 }}
            />
          </div>
        </div>

        {/* Metric 2 */}
        <div className="bg-black/30 p-3.5 rounded-xl border border-gray-800/80">
          <span className="text-[10px] font-mono text-gray-400 block uppercase">Load Demands</span>
          <div className="flex items-baseline gap-1 mt-1">
            <span className="text-xl font-mono text-[#0012FF] font-bold">{currentLoad}%</span>
            <span className="text-[10px] font-mono text-gray-400">Cap</span>
          </div>
          <div className="w-full bg-gray-800 h-1 mt-2.5 rounded-full overflow-hidden">
            <motion.div 
              className="bg-[#0012FF] h-full"
              animate={{ width: `${currentLoad}%` }}
              transition={{ duration: 1 }}
            />
          </div>
        </div>

        {/* Metric 3 */}
        <div className="bg-black/30 p-3.5 rounded-xl border border-gray-800/80">
          <span className="text-[10px] font-mono text-gray-400 block uppercase">PHASE-A / B / C</span>
          <div className="flex flex-col gap-0.5 mt-1 font-mono text-xs">
            <div className="flex justify-between">
              <span className="text-gray-500">ØA:</span>
              <span className="text-white font-bold">{phaseAVoltage}V</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">ØB:</span>
              <span className="text-white font-bold">{phaseBVoltage}V</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">ØC:</span>
              <span className="text-white font-bold">{phaseCVoltage}V</span>
            </div>
          </div>
        </div>

        {/* Metric 4 */}
        <div className="bg-black/30 p-3.5 rounded-xl border border-gray-800/80 flex flex-col justify-between">
          <div>
            <span className="text-[10px] font-mono text-gray-400 block uppercase">Busbar Uptime</span>
            <span className="text-lg font-mono text-[#00FF00] font-black block mt-1">{uptime}%</span>
          </div>
          <span className="text-[9px] text-gray-500 font-mono block">Custom redundant feed</span>
        </div>
      </div>

      {/* Safety Statistics (0.0 TRIR Rating) */}
      <div className="bg-black/50 p-4 rounded-xl border border-gray-800 grid grid-cols-1 md:grid-cols-3 gap-4 text-center md:text-left">
        <div className="flex items-center gap-3 justify-center md:justify-start">
          <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-400">
            <Award className="h-5 w-5" />
          </div>
          <div>
            <span className="text-[10px] font-sans text-gray-400 block uppercase font-semibold">TRIR Incident Rate</span>
            <span className="text-base font-bold text-white tracking-tight">0.00 Perfect Run</span>
          </div>
        </div>
        <div className="flex items-center gap-3 justify-center md:justify-start border-t md:border-t-0 md:border-x border-gray-800 pt-3 md:pt-0 md:px-4">
          <div className="p-2 bg-cyan-500/10 rounded-lg text-cyan-400">
            <CheckCircle className="h-5 w-5" />
          </div>
          <div>
            <span className="text-[10px] font-sans text-gray-400 block uppercase font-semibold">Incident-Free Days</span>
            <span className="text-base font-bold text-white tracking-tight">2,544 Days (Safe Run)</span>
          </div>
        </div>
        <div className="flex items-center gap-3 justify-center md:justify-start border-t md:border-t-0 pt-3 md:pt-0">
          <div className="p-2 bg-[#0012FF]/10 rounded-lg text-blue-400">
            <Radio className="h-5 w-5 animate-pulse" />
          </div>
          <div>
            <span className="text-[10px] font-sans text-gray-400 block uppercase font-semibold">Active Field Crews</span>
            <span className="text-base font-bold text-white tracking-tight">14 Heavy-Duty Teams</span>
          </div>
        </div>
      </div>
    </div>
  );
}
