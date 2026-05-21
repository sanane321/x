import React from 'react';
import { motion } from 'motion/react';
import SmartGridEstimator from '../components/SmartGridEstimator';
import InquiryDrawer from '../components/InquiryDrawer';
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

interface EstimatorProps {
  inquiries: InquiryItem[];
  onAddNewInquiry: (config: EstimateConfiguration & { cost: CostBreakdown; timeline: string }) => void;
  onDismissInquiry: (id: string) => void;
  key?: string;
}

export default function Estimator({ inquiries, onAddNewInquiry, onDismissInquiry }: EstimatorProps) {
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
          INTERACTIVE SCHEDULER & MODELER
        </span>
        <h1 className="text-3xl sm:text-5xl font-display font-medium tracking-tight text-gray-900 leading-tight">
          SmartGrid™ Proposal <br />Simulator Room
        </h1>
        <p className="text-gray-500 text-sm sm:text-base leading-relaxed max-w-2xl">
          Configure physical parameters such as square footage, required switchgear amperage, standard system voltage configurations, and opt-in safety and resiliency modules to compute industrial estimates instantly.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* The SmartGrid Modeler (8 Cols) */}
        <div className="lg:col-span-8">
          <div className="bg-white border border-gray-150 rounded-2xl p-2 shadow-sm">
            <SmartGridEstimator onSubmittingInquiry={onAddNewInquiry} />
          </div>
        </div>

        {/* The RFP bulletin Board (4 Cols) */}
        <div className="lg:col-span-4 lg:sticky lg:top-24">
          <InquiryDrawer inquiries={inquiries} onDismiss={onDismissInquiry} />
        </div>
      </div>
    </motion.div>
  );
}
