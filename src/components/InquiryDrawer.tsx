/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Network, ClipboardCheck, Sparkles, User, Briefcase, CalendarCheck } from 'lucide-react';
import { EstimateConfiguration, CostBreakdown } from '../types';

interface InquiryItem {
  id: string;
  clientName: string;
  clientEmail: string;
  projectType: string;
  scaleSqFt: number;
  specs: string;
  estimatedCost: number;
  timeline: string;
  timestamp: string;
  hasUserConfig?: boolean;
}

interface InquiryDrawerProps {
  inquiries: InquiryItem[];
  onDismiss: (id: string) => void;
}

export default function InquiryDrawer({ inquiries, onDismiss }: InquiryDrawerProps) {
  // Translate project type code to clean names
  const getTypeName = (code: string) => {
    switch (code) {
      case 'commercial': return 'Commercial Facility Grid';
      case 'industrial': return 'Industrial High-Voltage Sub';
      case 'datacenter': return 'Datacenter Redundant Core';
      case 'renewable': return 'Renewable Supercharger Node';
      default: return 'Custom Electrical Installation';
    }
  };

  return (
    <div className="bg-gray-50 border border-gray-100 rounded-2xl p-6 shadow-xs space-y-5" id="inquiry-drawer">
      <div className="flex items-center justify-between border-b border-gray-200 pb-3">
        <div className="flex items-center gap-2">
          <ClipboardCheck className="h-5 w-5 text-[#0012FF]" />
          <div>
            <h4 className="text-sm font-bold text-gray-900 leading-tight">Corporate RFP & Estimates Board</h4>
            <span className="text-[10px] text-gray-400 font-mono">Confidential simulator records</span>
          </div>
        </div>
        <span className="bg-[#0012FF]/10 text-[#0012FF] text-[10px] font-mono font-bold px-2 py-0.5 rounded-full">
          {inquiries.length} Configs Staged
        </span>
      </div>

      <div className="space-y-4 max-h-[420px] overflow-y-auto pr-1">
        <AnimatePresence initial={false}>
          {inquiries.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-10 border border-dashed border-gray-200 rounded-xl bg-white"
            >
              <Network className="h-8 w-8 mx-auto text-gray-300 stroke-[1.5] mb-2" />
              <p className="text-xs text-gray-500 font-semibold">No estimates currently staged.</p>
              <p className="text-[10px] text-gray-400 mt-1 max-w-[220px] mx-auto">
                Use the SmartGrid™ Estimator above to configure a proposal and post it here.
              </p>
            </motion.div>
          ) : (
            inquiries.map((inq) => (
              <motion.div
                key={inq.id}
                layout
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className={`border rounded-xl p-4 transition-all bg-white relative ${
                  inq.hasUserConfig 
                    ? 'border-[#0012FF] ring-1 ring-[#0012FF]/35' 
                    : 'border-gray-150'
                }`}
              >
                {inq.hasUserConfig && (
                  <span className="absolute -top-2 right-4 bg-[#00FF00] text-gray-900 border border-[#00E500] px-2 py-0.5 rounded-full text-[9px] font-mono font-black uppercase flex items-center gap-1">
                    <Sparkles className="h-2.5 w-2.5 fill-current" /> YOUR RFQ BluePrint
                  </span>
                )}

                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <span className="text-[10px] text-gray-400 font-mono block">RFP ID# {inq.id}</span>
                    <h5 className="text-sm font-bold text-gray-900 flex items-center gap-1.5 flex-wrap">
                      <Briefcase className="h-3.5 w-3.5 text-gray-400" />
                      {getTypeName(inq.projectType)}
                    </h5>
                  </div>
                  <button
                    onClick={() => onDismiss(inq.id)}
                    className="text-gray-400 hover:text-gray-600 font-mono text-xs p-1"
                    title="Dismiss record"
                  >
                    Dismiss
                  </button>
                </div>

                {/* Sub specs list */}
                <div className="grid grid-cols-2 gap-2 text-xs font-mono my-3 bg-gray-50 p-2.5 rounded-lg border border-gray-100">
                  <div>
                    <span className="text-gray-400 block text-[9px] uppercase font-bold">Facility Covered</span>
                    <span className="text-gray-800 font-bold">{inq.scaleSqFt.toLocaleString()} Sq.Ft.</span>
                  </div>
                  <div>
                    <span className="text-gray-400 block text-[9px] uppercase font-bold">Line Feed Specs</span>
                    <span className="text-gray-800 font-bold">{inq.specs}</span>
                  </div>
                  <div>
                    <span className="text-gray-400 block text-[9px] uppercase font-bold">Budget (Simulated)</span>
                    <span className="text-[#0012FF] font-black">${inq.estimatedCost.toLocaleString()}</span>
                  </div>
                  <div>
                    <span className="text-gray-400 block text-[9px] uppercase font-bold">Lead-Time Phase</span>
                    <span className="text-gray-800 font-bold">{inq.timeline}</span>
                  </div>
                </div>

                {/* Client detail footer */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center text-xs text-gray-500 pt-2 border-t border-gray-100 gap-1 font-sans">
                  <span className="flex items-center gap-1">
                    <User className="h-3.5 w-3.5 text-gray-400" />
                    <strong>{inq.clientName}</strong> ({inq.clientEmail})
                  </span>
                  <span className="flex items-center gap-1 text-[10px] font-mono text-gray-400">
                    <CalendarCheck className="h-3 w-3" />
                    {inq.timestamp}
                  </span>
                </div>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
