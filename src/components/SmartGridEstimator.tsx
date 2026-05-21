/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Building, 
  Settings, 
  Sliders, 
  Cpu, 
  ShieldCheck, 
  Calendar, 
  DollarSign, 
  TrendingUp, 
  ChevronRight, 
  Check, 
  Info, 
  Zap, 
  Clock, 
  Share2,
  HardHat,
  Smartphone
} from 'lucide-react';
import { EstimateConfiguration, CostBreakdown } from '../types';

interface SmartGridEstimatorProps {
  onSubmittingInquiry: (config: EstimateConfiguration & { cost: CostBreakdown; timeline: string }) => void;
}

export default function SmartGridEstimator({ onSubmittingInquiry }: SmartGridEstimatorProps) {
  // Preset Project Options
  const projectTypes = [
    { id: 'commercial', name: 'Commercial Facility', icon: Building, baseRate: 18, desc: 'Offices, retail hubs, developments' },
    { id: 'industrial', name: 'Industrial Plant', icon: Settings, baseRate: 34, desc: 'Manufacturing, assembly lines, warehouse' },
    { id: 'datacenter', name: 'Datacenter Core', icon: Cpu, baseRate: 72, desc: 'Mission-critical redundancy, high-density' },
    { id: 'renewable', name: 'Renewable Grid Tie', icon: Zap, baseRate: 46, desc: 'Solar arrays, EV charging nodes, microgrids' },
  ];

  const ampOptions = [
    { val: 100, label: '100 A', addedCost: 0, desc: 'Standard business tap' },
    { val: 400, label: '400 A', addedCost: 8000, desc: 'Medium commercial' },
    { val: 800, label: '800 A', addedCost: 22000, desc: 'Heavy commercial / light industrial' },
    { val: 1200, label: '1200 A', addedCost: 55000, desc: 'Data hub / multi-tenant core' },
    { val: 2000, label: '2000 A+', addedCost: 115000, desc: 'Heavy industrial / high voltage site' },
  ];

  const voltageOptions = [
    { val: '120/208V', label: '120/208V (Low)', multiplier: 1.0 },
    { val: '277/480V', label: '277/480V (Med)', multiplier: 1.25 },
    { val: '13.8kV', label: '13.8kV Utility (High)', multiplier: 1.55 },
  ];

  // Estimator States
  const [projectType, setProjectType] = useState('commercial');
  const [areaSqFt, setAreaSqFt] = useState(25000);
  const [amperage, setAmperage] = useState(400);
  const [voltage, setVoltage] = useState('277/480V');
  
  // Custom optional systems
  const [resilientPower, setResilientPower] = useState(false);
  const [smartControls, setSmartControls] = useState(false);
  const [greenEnergy, setGreenEnergy] = useState(false);
  const [industrialMachinery, setIndustrialMachinery] = useState(false);
  const [networking, setNetworking] = useState(false);

  // Submission State
  const [submitted, setSubmitted] = useState(false);
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');

  // Calculations
  const calculatedOutput = useMemo(() => {
    // 1. Core Service Cost
    const selectedType = projectTypes.find(t => t.id === projectType) || projectTypes[0];
    let baseCost = areaSqFt * selectedType.baseRate;

    // 2. Amperage additions
    const selectedAmp = ampOptions.find(a => a.val === amperage) || ampOptions[1];
    baseCost += selectedAmp.addedCost;

    // 3. Voltage multiplier
    const selectedVolt = voltageOptions.find(v => v.val === voltage) || voltageOptions[1];
    baseCost *= selectedVolt.multiplier;

    // 4. Opt-in infrastructure add-ons (scaled by facility size)
    let addonsTotal = 0;
    if (resilientPower) addonsTotal += 45000 + areaSqFt * 1.8; // Backup generators, automatic transfer switch, modular UPS
    if (smartControls) addonsTotal += 15000 + areaSqFt * 0.95; // Digital BMS integration, lighting relay automation
    if (greenEnergy) addonsTotal += 35000 + areaSqFt * 2.2; // Solar array support, high speed EV level-3 chargers
    if (industrialMachinery) addonsTotal += 28000 + areaSqFt * 1.2; // 3-phase motor starters, busway feeds
    if (networking) addonsTotal += 12000 + areaSqFt * 0.5; // Cat6A fiber backbone, structured comm rack

    const totalEstimate = baseCost + addonsTotal;

    // Allocation percentages typical to electrical construction:
    const designPct = 0.11; // Architectural/Eng.
    const materialsPct = 0.44; // Switchgears, conduit, cables, fixtures
    const laborPct = 0.38; // Skilled technical field workforce (licensed electricians)
    const commissionPct = 0.07; // Calibration, certified safety sign-off

    const breakdown: CostBreakdown = {
      designCost: Math.round(totalEstimate * designPct),
      materialsCost: Math.round(totalEstimate * materialsPct),
      laborCost: Math.round(totalEstimate * laborPct),
      commissioningCost: Math.round(totalEstimate * commissionPct),
      totalCost: Math.round(totalEstimate),
    };

    // Timeline planning
    const baseWeeks = Math.max(4, Math.ceil(areaSqFt / 8000));
    const designWeeks = Math.ceil(baseWeeks * 0.25);
    const roughInWeeks = Math.ceil(baseWeeks * 0.50);
    const trimOutWeeks = Math.ceil(baseWeeks * 0.20);
    const complexMultiplier = (resilientPower ? 1.15 : 1) * (industrialMachinery ? 1.15 : 1);
    const totalWeeks = Math.ceil((designWeeks + roughInWeeks + trimOutWeeks + 2) * complexMultiplier);

    return {
      breakdown,
      timeline: {
        design: designWeeks,
        roughIn: roughInWeeks,
        trimOut: trimOutWeeks,
        testing: 2,
        total: totalWeeks
      }
    };
  }, [projectType, areaSqFt, amperage, voltage, resilientPower, smartControls, greenEnergy, industrialMachinery, networking]);

  const handleInquiryAction = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName || !clientEmail) return;

    onSubmittingInquiry({
      projectType,
      areaSqFt,
      amperage,
      voltage,
      resilientPower,
      smartControls,
      greenEnergy,
      industrialMachinery,
      networking,
      cost: calculatedOutput.breakdown,
      timeline: `${calculatedOutput.timeline.total} Weeks Estimated`
    });

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setClientName('');
      setClientEmail('');
    }, 6000);
  };

  return (
    <div className="bg-white rounded-3xl border border-gray-100 shadow-xl overflow-hidden" id="smartgrid-estimator">
      <div className="bg-gradient-to-r from-[#0012FF] to-[#000EAF] p-8 text-white relative">
        <div className="absolute right-0 bottom-0 top-0 w-1/3 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-green-400/10 via-transparent to-transparent pointer-events-none" />
        <div className="flex items-center gap-3 mb-2">
          <Zap className="h-6 w-6 text-[#00FF00] animate-pulse" />
          <span className="text-xs font-mono tracking-widest uppercase bg-white/10 px-2.5 py-1 rounded">Engineering Tool</span>
        </div>
        <h3 className="text-3xl font-display font-medium tracking-tight">SmartGrid™ Project Estimator</h3>
        <p className="text-white/80 text-sm mt-2 max-w-xl">
          Configure physical dimensions, load ratings, and specific modular subsystems to instantly simulate certified commercial project budgets and lead-times.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-gray-100">
        {/* Input Parameters Pane (7 Cols) */}
        <div className="lg:col-span-7 p-6 sm:p-8 space-y-8">
          
          {/* STEP 1: PROJECT DISCIPLINE */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-mono uppercase bg-gray-100 px-2 py-0.5 rounded text-gray-600">Step 1</span>
              <h4 className="text-sm font-semibold text-gray-800">Select Electrical Discipline</h4>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {projectTypes.map((type) => {
                const IconComponent = type.icon;
                const isSelected = projectType === type.id;
                return (
                  <button
                    key={type.id}
                    onClick={() => setProjectType(type.id)}
                    className={`flex flex-col text-left p-4 rounded-xl border text-sm transition-all relative ${
                      isSelected 
                        ? 'border-[#0012FF] bg-[#0012FF]/5 shadow-sm ring-1 ring-[#0012FF]' 
                        : 'border-gray-200 hover:border-gray-300 bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5 w-full">
                      <IconComponent className={`h-5 w-5 ${isSelected ? 'text-[#0012FF]' : 'text-gray-400'}`} />
                      {isSelected && (
                        <span className="h-1.5 w-1.5 rounded-full bg-[#00FF00]" />
                      )}
                    </div>
                    <span className="font-semibold text-gray-900 block">{type.name}</span>
                    <span className="text-xs text-gray-500 mt-1 line-clamp-2 leading-relaxed">{type.desc}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* STEP 2: SIZE & SCALE */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-mono uppercase bg-gray-100 px-2 py-0.5 rounded text-gray-600">Step 2</span>
                <h4 className="text-sm font-semibold text-gray-800">Operational Size / Covered Area</h4>
              </div>
              <span className="font-mono text-sm font-bold text-[#0012FF] bg-[#0012FF]/5 px-3 py-1 rounded-md">
                {areaSqFt.toLocaleString()} Sq.Ft.
              </span>
            </div>
            <input
              type="range"
              min={1000}
              max={250000}
              step={1000}
              value={areaSqFt}
              onChange={(e) => setAreaSqFt(Number(e.target.value))}
              className="w-full h-2 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-[#0012FF] focus:outline-none"
            />
            <div className="flex justify-between text-[10px] font-mono text-gray-400 mt-2">
              <span>1,000 SQFT (Workshop)</span>
              <span>100,000 SQFT (Medium Facility)</span>
              <span>250,000 SQFT+ (Large Complex)</span>
            </div>
          </div>

          {/* STEP 3: ELECTRICAL LOAD SPECS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            <div>
              <div className="flex items-center gap-1.5 mb-3">
                <span className="text-xs font-mono uppercase bg-gray-100 px-2 py-0.5 rounded text-gray-600">Step 3A</span>
                <h4 className="text-sm font-semibold text-gray-800">Inbound Amperage Panel</h4>
              </div>
              <div className="relative">
                <select
                  value={amperage}
                  onChange={(e) => setAmperage(Number(e.target.value))}
                  className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 font-medium focus:ring-2 focus:ring-[#0012FF] focus:border-[#0012FF] outline-none"
                >
                  {ampOptions.map((opt) => (
                    <option key={opt.val} value={opt.val}>
                      {opt.label} ({opt.desc})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-1.5 mb-3">
                <span className="text-xs font-mono uppercase bg-gray-100 px-2 py-0.5 rounded text-gray-600">Step 3B</span>
                <h4 className="text-sm font-semibold text-gray-800">Operational Voltage Standard</h4>
              </div>
              <div className="flex rounded-xl bg-gray-100 p-1">
                {voltageOptions.map((opt) => (
                  <button
                    type="button"
                    key={opt.val}
                    onClick={() => setVoltage(opt.val)}
                    className={`flex-1 text-center py-2.5 text-xs font-semibold rounded-lg transition-all ${
                      voltage === opt.val
                        ? 'bg-white text-gray-900 shadow-sm border border-gray-100'
                        : 'text-gray-500 hover:text-gray-800'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* STEP 4: CUSTOM SYSTEM EXTENSIONS */}
          <div>
            <div className="flex items-center gap-1.5 mb-4">
              <span className="text-xs font-mono uppercase bg-gray-100 px-2 py-0.5 rounded text-gray-600">Step 4</span>
              <h4 className="text-sm font-semibold text-gray-800">Premium Modular Sub-Systems</h4>
            </div>

            <div className="space-y-3.5">
              {/* Option 1 */}
              <label className="flex items-start gap-3.5 p-3.5 rounded-xl border border-gray-100 hover:border-gray-200 cursor-pointer transition bg-gray-50/30">
                <input
                  type="checkbox"
                  checked={resilientPower}
                  onChange={(e) => setResilientPower(e.target.checked)}
                  className="mt-1 h-4 w-4 rounded border-gray-300 text-[#0012FF] focus:ring-[#0012FF]"
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-gray-900">Resilient Power Backup (N+1 UPS & Genset)</span>
                    <span className="text-xs font-mono text-[#0012FF]">+ATS Switchgear</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                    Automatic generator integration with battery-bank UPS backup to ensure raw 24/7 power filtering and zero sag times.
                  </p>
                </div>
              </label>

              {/* Option 2 */}
              <label className="flex items-start gap-3.5 p-3.5 rounded-xl border border-gray-100 hover:border-gray-200 cursor-pointer transition bg-gray-50/30">
                <input
                  type="checkbox"
                  checked={smartControls}
                  onChange={(e) => setSmartControls(e.target.checked)}
                  className="mt-1 h-4 w-4 rounded border-gray-300 text-[#0012FF] focus:ring-[#0012FF]"
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-gray-900">Digital BMS & Smart Automation Relays</span>
                    <span className="text-xs font-mono text-[#0012FF]">+Intelligent Controls</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                    Intelligent sensor arrays, integrated light dimming schedules, digital circuit logging, and Ethernet system hubs.
                  </p>
                </div>
              </label>

              {/* Option 3 */}
              <label className="flex items-start gap-3.5 p-3.5 rounded-xl border border-gray-100 hover:border-gray-200 cursor-pointer transition bg-gray-50/30">
                <input
                  type="checkbox"
                  checked={greenEnergy}
                  onChange={(e) => setGreenEnergy(e.target.checked)}
                  className="mt-1 h-4 w-4 rounded border-gray-300 text-[#0012FF] focus:ring-[#0012FF]"
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-gray-900">Sustainable Microgrid Tie & Peak-Shaving</span>
                    <span className="text-xs font-mono text-[#0012FF]">+Greentech Node</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                    Solar canopy inverter matching, utility net-metering switchgear, and commercial Level-3 DC EV Charger power boards.
                  </p>
                </div>
              </label>

              {/* Option 4 */}
              <label className="flex items-start gap-3.5 p-3.5 rounded-xl border border-gray-100 hover:border-gray-200 cursor-pointer transition bg-gray-50/30">
                <input
                  type="checkbox"
                  checked={industrialMachinery}
                  onChange={(e) => setIndustrialMachinery(e.target.checked)}
                  className="mt-1 h-4 w-4 rounded border-gray-300 text-[#0012FF] focus:ring-[#0012FF]"
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-gray-900">Heavy Industrial Motor Feeds & Busways</span>
                    <span className="text-xs font-mono text-[#0012FF]">+High Amperage Trays</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                    Heavy gauge copper conduit runs, specialized bus ducts, overhead cable trays, and localized emergency cut-off circuits.
                  </p>
                </div>
              </label>

              {/* Option 5 */}
              <label className="flex items-start gap-3.5 p-3.5 rounded-xl border border-gray-100 hover:border-gray-200 cursor-pointer transition bg-gray-50/30">
                <input
                  type="checkbox"
                  checked={networking}
                  onChange={(e) => setNetworking(e.target.checked)}
                  className="mt-1 h-4 w-4 rounded border-gray-300 text-[#0012FF] focus:ring-[#0012FF]"
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-gray-900">Cat6A Structured Cabling & Fiber Rack</span>
                    <span className="text-xs font-mono text-[#0012FF]">+Fiber Backbone</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                    High speed telecom data outlets, fiber optic terminal distribution cabinets, and certified compliance reports.
                  </p>
                </div>
              </label>
            </div>
          </div>

        </div>

        {/* Output Metrics Pane (5 Cols, Dark-Engineered style) */}
        <div className="lg:col-span-5 p-6 sm:p-8 bg-gray-950 text-white flex flex-col justify-between">
          <div className="space-y-6">
            <div className="border-b border-white/10 pb-4">
              <span className="text-[10px] font-mono tracking-widest text-[#00FF00] uppercase block mb-1">Live Estimation Report</span>
              <div className="flex items-baseline gap-1.5">
                <span className="text-4xl font-mono font-black text-white">
                  ${calculatedOutput.breakdown.totalCost.toLocaleString()}
                </span>
                <span className="text-xs font-mono text-gray-400">USD</span>
              </div>
              <p className="text-xs text-gray-400 mt-1">Estimated comprehensive engineering + turn-key construction project budget.</p>
            </div>

            {/* Interactive Visual Gauge (Custom High-End SVG Circuit Chart) */}
            <div className="space-y-4">
              <span className="text-[10px] font-mono tracking-widest text-gray-400 uppercase block">Engineered Cost Allocation</span>
              
              <div className="space-y-3.5">
                {/* Visual Segment 1: Design & Engineering */}
                <div>
                  <div className="flex justify-between text-xs font-mono mb-1 text-gray-300">
                    <span className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 bg-cyan-400 rounded-xs" /> Design & Engineering (11%)
                    </span>
                    <span>${calculatedOutput.breakdown.designCost.toLocaleString()}</span>
                  </div>
                  <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                    <div className="bg-cyan-400 h-full rounded-full transition-all duration-500" style={{ width: '11%' }} />
                  </div>
                </div>

                {/* Visual Segment 2: Materials & Switchgears */}
                <div>
                  <div className="flex justify-between text-xs font-mono mb-1 text-gray-300">
                    <span className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 bg-[#0012FF] rounded-xs" /> Equip. & Materials (44%)
                    </span>
                    <span>${calculatedOutput.breakdown.materialsCost.toLocaleString()}</span>
                  </div>
                  <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                    <div className="bg-[#0012FF] h-full rounded-full transition-all duration-500" style={{ width: '44%' }} />
                  </div>
                </div>

                {/* Visual Segment 3: Licensed Field Labor */}
                <div>
                  <div className="flex justify-between text-xs font-mono mb-1 text-gray-300">
                    <span className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 bg-[#00FF00] rounded-xs" /> Union Field Labor (38%)
                    </span>
                    <span>${calculatedOutput.breakdown.laborCost.toLocaleString()}</span>
                  </div>
                  <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                    <div className="bg-[#00FF00] h-full rounded-full transition-all duration-500" style={{ width: '38%' }} />
                  </div>
                </div>

                {/* Visual Segment 4: Testing & Calibration */}
                <div>
                  <div className="flex justify-between text-xs font-mono mb-1 text-gray-300">
                    <span className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 bg-yellow-400 rounded-xs" /> Calibration & Safety (7%)
                    </span>
                    <span>${calculatedOutput.breakdown.commissioningCost.toLocaleString()}</span>
                  </div>
                  <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                    <div className="bg-yellow-400 h-full rounded-full transition-all duration-500" style={{ width: '7%' }} />
                  </div>
                </div>
              </div>
            </div>

            {/* Simulated Phases/Timeline timeline grid */}
            <div className="border-t border-white/10 pt-4 space-y-3">
              <span className="text-[10px] font-mono tracking-widest text-gray-400 uppercase block">Scheduled Lead-Times</span>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="bg-white/5 p-2.5 rounded-lg border border-white/5 flex items-start gap-2">
                  <Clock className="h-4 w-4 text-[#00FF00] mt-0.5" />
                  <div>
                    <span className="text-[10px] text-gray-400 block uppercase">Total Lead-Time</span>
                    <span className="font-mono font-bold text-white text-base">{calculatedOutput.timeline.total} Weeks</span>
                  </div>
                </div>
                <div className="bg-white/5 p-2.5 rounded-lg border border-white/5 flex items-start gap-2">
                  <Calendar className="h-4 w-4 text-cyan-400 mt-0.5" />
                  <div>
                    <span className="text-[10px] text-gray-400 block uppercase">BIM Eng. Phase</span>
                    <span className="font-mono font-bold text-white text-base">{calculatedOutput.timeline.design} Weeks</span>
                  </div>
                </div>
              </div>

              {/* Step indicator sequence */}
              <div className="flex justify-between relative mt-4 pt-4 border-t border-white/5">
                <div className="flex flex-col items-center">
                  <div className="w-5 h-5 rounded-full bg-[#0012FF] text-[10px] flex items-center justify-center font-bold">1</div>
                  <span className="text-[9px] text-gray-400 mt-1">Design</span>
                </div>
                <div className="flex-1 border-t border-dashed border-white/20 mt-2.5 mx-2" />
                <div className="flex flex-col items-center">
                  <div className="w-5 h-5 rounded-full bg-[#00FF00] text-gray-900 text-[10px] flex items-center justify-center font-bold">2</div>
                  <span className="text-[9px] text-gray-400 mt-1">Rough-In</span>
                </div>
                <div className="flex-1 border-t border-dashed border-white/20 mt-2.5 mx-2" />
                <div className="flex flex-col items-center">
                  <div className="w-5 h-5 rounded-full bg-white/10 text-gray-300 text-[10px] flex items-center justify-center font-mono">3</div>
                  <span className="text-[9px] text-gray-400 mt-1">Trim-Out</span>
                </div>
                <div className="flex-1 border-t border-dashed border-white/20 mt-2.5 mx-2" />
                <div className="flex flex-col items-center">
                  <div className="w-5 h-5 rounded-full bg-white/10 text-gray-300 text-[10px] flex items-center justify-center font-mono">4</div>
                  <span className="text-[9px] text-gray-400 mt-1">Certify</span>
                </div>
              </div>
            </div>
          </div>

          {/* Submission and inquiry form */}
          <div className="mt-8 border-t border-white/10 pt-6">
            <span className="text-[10px] font-mono tracking-widest text-[#00FF00] uppercase block mb-3">Instant Corporate RFP</span>
            
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="bg-[#00FF00]/10 border border-[#00FF00]/20 p-4 rounded-xl text-center text-sm text-[#00FF00]"
                >
                  <Check className="h-5 w-5 mx-auto mb-1.5 text-[#00FF00] stroke-[3]" />
                  <span className="font-semibold block text-white mb-0.5">Configuration Staged Successfully!</span>
                  Your simulated diagnostic package has been shared in the Corporate Inquiries Board on this page.
                </motion.div>
              ) : (
                <form onSubmit={handleInquiryAction} className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      required
                      type="text"
                      placeholder="Your Name"
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs focus:ring-1 focus:ring-[#00FF00] outline-none text-white focus:bg-white/10 transition"
                    />
                    <input
                      required
                      type="email"
                      placeholder="Company Email"
                      value={clientEmail}
                      onChange={(e) => setClientEmail(e.target.value)}
                      className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs focus:ring-1 focus:ring-[#00FF00] outline-none text-white focus:bg-white/10 transition"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-3 px-4 rounded-xl bg-[#00FF00] text-gray-900 font-bold hover:bg-[#00E000] active:scale-98 transition flex items-center justify-center gap-2 text-sm uppercase cursor-pointer"
                  >
                    <span>Submit RFP Config</span>
                    <ChevronRight className="h-4 w-4" />
                  </button>
                  <div className="flex items-center gap-1.5 justify-center text-[10px] text-gray-500 mt-2">
                    <ShieldCheck className="h-3.5 w-3.5 text-gray-400" />
                    <span>0 records shared externally. Confidential blueprint simulation.</span>
                  </div>
                </form>
              )}
            </AnimatePresence>
          </div>

        </div>
      </div>
    </div>
  );
}
