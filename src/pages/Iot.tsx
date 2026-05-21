import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useApp } from '../context/AppContext';
import { 
  Zap, 
  Cpu, 
  Battery, 
  Sun, 
  Settings, 
  Activity, 
  Thermometer, 
  Wind, 
  AlertTriangle, 
  CheckCircle2, 
  RefreshCw,
  Bell,
  Power,
  Sliders,
  Play,
  RotateCcw
} from 'lucide-react';

interface TelemetryLog {
  id: string;
  timestamp: string;
  node: string;
  message: string;
  type: 'info' | 'success' | 'warn' | 'action';
}

interface GridNodeData {
  id: string;
  nameKey: 'nodeMvs' | 'nodeBattery' | 'nodeCharger';
  voltage: string;
  amperage: number;
  freq: number;
  pf: number;
  temp: number;
  auxLoad: number;
  health: number;
}

export default function Iot() {
  const { t, selectedIotUseCase, setSelectedIotUseCase } = useApp();
  const [selectedNodeId, setSelectedNodeId] = useState<'mvs' | 'battery' | 'charger'>('mvs');
  
  // Real-time Interactivity variables 
  const [coolingSpeed, setCoolingSpeed] = useState<number>(60); // 10% - 100%
  const [dischargeRate, setDischargeRate] = useState<number>(45); // MW rate
  const [reactiveComp, setReactiveComp] = useState<boolean>(true);
  const [breakerTrip, setBreakerTrip] = useState<boolean>(false);
  const [batterySOC, setBatterySOC] = useState<number>(84.2);
  const [activeAlarms, setActiveAlarms] = useState<string[]>([]);
  const [activeUseCaseId, setActiveUseCaseId] = useState<string | null>(null);
  
  // Real-world industrial IoT usecase presets definition
  const iotUseCases = [
    {
      id: 'thermal',
      title: 'Predictive Substation Core Cool-Down',
      badge: 'THERMAL SAFETY',
      summary: 'Trigger reactive liquid cooling sweeps on thermal sensor alerts.',
      details: 'The IoT sensors track core copper winding heat. When a threshold of 65°C is exceeded, the server spins cooling fans to 95% to avoid thermal de-rating.',
      metrics: { cooling: 95, load: '30 MW', pf: '0.992 (On)' },
      colorClass: 'border-cyan-500/30 text-cyan-600 dark:text-cyan-400 bg-cyan-500/5'
    },
    {
      id: 'peak-shaving',
      title: 'Renewable Load Peak-Shaving (BESS Support)',
      badge: 'PEAK GRID FLOW',
      summary: 'Intersperse stored solar power into local distribution sub-buses.',
      details: 'At peak industrial hours, the BESS discharges a heavy 92MW offset to cushion the town utility substation, protecting grid frequency from drop-outs.',
      metrics: { cooling: 75, load: '92 MW', pf: '0.992 (On)' },
      colorClass: 'border-emerald-500/30 text-emerald-600 dark:text-emerald-400 bg-emerald-500/5'
    },
    {
      id: 'var-control',
      title: 'Dynamic VAR Correction (Phase-Angle Align)',
      badge: 'POWER HARMONY',
      summary: 'Counter power-loss lag dynamically using grid capacitors.',
      details: 'Large induction motors from regional factories create phase lags. Instantly switch capacitor arrays back online to raise power factor from 0.91 to 0.99.',
      metrics: { cooling: 55, load: '40 MW', pf: '0.992 (On)' },
      colorClass: 'border-indigo-500/30 text-indigo-600 dark:text-indigo-400 bg-indigo-500/5'
    },
    {
      id: 'islanding',
      title: 'Interlock System Isolation (Trip Scenario)',
      badge: 'EMERGENCY SHED',
      summary: 'Physical breaker trip triggers to shield critical telemetry feeds.',
      details: 'Isolate main high-tension busbars during an outdoor transformer lightning strike hazard. The SCADA trips main contactors in under 12 milliseconds.',
      metrics: { cooling: 10, load: '0 MW', pf: 'Off Line' },
      colorClass: 'border-rose-500/30 text-rose-600 dark:text-rose-400 bg-rose-500/5'
    }
  ];

  const handleApplyUseCase = (usecaseId: string) => {
    setActiveUseCaseId(usecaseId);
    if (usecaseId === 'thermal') {
      setCoolingSpeed(95);
      setDischargeRate(30);
      setReactiveComp(true);
      setBreakerTrip(false);
      setActiveAlarms([]);
      addLog('X-IoT Presets', 'SCADA automation: High core heat detected. Dynamic liquid pumps deployed at 95% capacity.', 'action');
    } else if (usecaseId === 'peak-shaving') {
      setCoolingSpeed(75);
      setDischargeRate(92);
      setReactiveComp(true);
      setBreakerTrip(false);
      setBatterySOC(88.4);
      setActiveAlarms([]);
      addLog('X-IoT Presets', 'Peak Shaving engaged: Dispatching 92 MW from auxiliary BESS cells to primary substation.', 'success');
    } else if (usecaseId === 'var-control') {
      setCoolingSpeed(55);
      setDischargeRate(40);
      setReactiveComp(true);
      setBreakerTrip(false);
      setActiveAlarms([]);
      addLog('X-IoT Presets', 'VAR Optimized: Capacitor arrays active. Ingress phase lag minimized successfully.', 'success');
    } else if (usecaseId === 'islanding') {
      setCoolingSpeed(10);
      setDischargeRate(0);
      setReactiveComp(false);
      setBreakerTrip(true);
      setActiveAlarms(['SEVERE_TRANSFORMER_PHASE_MISALIGN', 'MANUAL_INTERLOCK_TRIP']);
      addLog('X-IoT Presets', 'EMERGENCY SHEDDING: Mechanical vacuum breakers tripped manually to isolate substation.', 'warn');
    }
  };

  // Sync menu state with active scenario presets
  useEffect(() => {
    if (selectedIotUseCase) {
      handleApplyUseCase(selectedIotUseCase);
    }
  }, [selectedIotUseCase]);
  
  // Fluctuating metric offsets
  const [timeTick, setTimeTick] = useState<number>(0);
  const [logs, setLogs] = useState<TelemetryLog[]>([
    { id: '1', timestamp: '03:32:10', node: 'XE-MVS High Tension', message: 'Pre-commissioning harmonic validation complete. Secondary status NOMINAL.', type: 'success' },
    { id: '2', timestamp: '03:35:15', node: 'MegaPack BESS', message: 'System switched to dynamic Peak Shaving charge offset mode.', type: 'info' }
  ]);

  // Real-time telemetry generator loop
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeTick(prev => (prev + 1) % 360);
      
      // Simulate battery SOC fluctuation depending on discharge rate
      setBatterySOC(prev => {
        const chargingEffect = dischargeRate > 50 ? -0.012 : 0.008;
        const nextVal = prev + chargingEffect;
        return Number(Math.max(10, Math.min(100, nextVal)).toFixed(3));
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [dischargeRate]);

  // Dynamic calculations based on user inputs
  const simulatedTemp = Math.max(12, Math.min(85, (42 + (dischargeRate * 0.45) - (coolingSpeed * 0.35))));
  const calculatedPowerFactor = reactiveComp ? 0.992 : 0.914;
  const currentHarmonicsTHD = breakerTrip ? 0.1 : (reactiveComp ? 1.4 : 3.8); // Trip reduces load and THD
  const systemFrequency = 50.00 + Math.sin(timeTick * 0.2) * 0.018; // Oscillates around 50Hz nominal
  
  const addLog = (node: string, message: string, type: 'info' | 'success' | 'warn' | 'action') => {
    const now = new Date();
    const timeStr = now.toTimeString().split(' ')[0];
    const newLog: TelemetryLog = {
      id: Math.random().toString(),
      timestamp: timeStr,
      node,
      message,
      type
    };
    setLogs(prev => [newLog, ...prev.slice(0, 14)]);
  };

  // Node Switching Alert triggers
  const selectNode = (node: 'mvs' | 'battery' | 'charger') => {
    setSelectedNodeId(node);
    let nodeName = t.iot.nodeMvs;
    if (node === 'battery') nodeName = t.iot.nodeBattery;
    if (node === 'charger') nodeName = t.iot.nodeCharger;
    addLog(nodeName, `Active diagnostic connection established. Streaming bus telemetry.`, 'info');
  };

  // Interactive Action handlers
  const handleToggleReactiveComp = () => {
    const nextState = !reactiveComp;
    setReactiveComp(nextState);
    const msg = nextState 
      ? 'Static VAR Reactive compensators ONLINE. Power factor optimized.' 
      : 'Reactive compensators BYPASSED. Reactive loss penalty warning.';
    addLog('Grid Controls', msg, nextState ? 'success' : 'warn');
  };

  const handleToggleBreaker = () => {
    const nextState = !breakerTrip;
    setBreakerTrip(nextState);
    if (nextState) {
      setActiveAlarms(['BUSBAR_BREAKER_TRIP_WARNING', 'AUXILIARY_OVER_VOLTAGE']);
      addLog('Primary Breaker', 'EMERGENCY SHEDDING: Ingress Main Feeder tripped manually.', 'warn');
    } else {
      setActiveAlarms([]);
      addLog('Primary Breaker', 'Breaker reset. Sequential hot-loop soft start synchronized.', 'success');
    }
  };

  const handleAdjustDischarge = (val: number) => {
    setDischargeRate(val);
    if (val > 80 && coolingSpeed < 40) {
      if (!activeAlarms.includes('BESS_OVER_TEMP_RISK')) {
        setActiveAlarms(prev => [...prev, 'BESS_OVER_TEMP_RISK']);
        addLog('Thermal Warning', 'Discharge rate excessive for current cooling velocity. Please accelerate liquid-coolant pump.', 'warn');
      }
    } else {
      setActiveAlarms(prev => prev.filter(a => a !== 'BESS_OVER_TEMP_RISK'));
    }
  };

  const clearLogHistory = () => {
    setLogs([]);
    addLog('System Logs', 'Dashboard local logs truncated.', 'info');
  };

  // Dynamic SVG Waveform Builder to represent precise 3-phase high tension cycles dynamically modifying with actual THD
  const generateWaveformPoints = () => {
    const width = 1200;
    const height = 180;
    const midY = height / 2;
    const points: string[] = [];
    
    // Waveform altered by current harmonic distortion (THD / noise factor)
    const noise = currentHarmonicsTHD * 0.8; 

    for (let x = 0; x <= width; x += 3) {
      const angle = (x / width) * Math.PI * 12 + (timeTick * 0.08);
      // Pure fundamental + standard 3rd harmonic + 5th harmonic noise based on THD
      const harmonicNoise = Math.sin(angle * 3) * (noise * 1.5) + Math.cos(angle * 5) * (noise * 0.8);
      const y = midY + Math.sin(angle) * (height * 0.35) + harmonicNoise;
      points.push(`${x},${y}`);
    }
    return points.join(' ');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.4 }}
      className="space-y-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
      id="iot-page"
    >
      {/* Page Header */}
      <div className="max-w-3xl text-left space-y-3">
        <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#0012FF] dark:text-cyan-400 block">
          {t.iot.tag}
        </span>
        <h1 className="text-3xl sm:text-5xl font-display font-medium tracking-tight text-gray-900 dark:text-white leading-tight">
          {t.iot.title}
        </h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm sm:text-base leading-relaxed max-w-2xl">
          {t.iot.desc}
        </p>
      </div>

      {/* Grid Controller Main Top Hub: Telemetry Widgets */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Metric 1: Frequency */}
        <div className="bg-white dark:bg-slate-900 border border-gray-150 dark:border-white/10 p-5 rounded-2xl flex flex-col justify-between text-left">
          <div className="flex items-center justify-between text-gray-400">
            <span className="text-xs font-mono uppercase">{t.iot.gridFrequency}</span>
            <Activity className="h-4 w-4 text-[#0012FF] dark:text-cyan-400" />
          </div>
          <div className="mt-4">
            <span className="text-3xl font-mono font-bold text-gray-900 dark:text-white">
              {breakerTrip ? '0.00' : systemFrequency.toFixed(3)}
            </span>
            <span className="text-xs text-gray-400 font-mono ml-1">Hz</span>
          </div>
          <div className="mt-2 text-[10px] font-mono flex items-center gap-1">
            <span className={`h-1.5 w-1.5 rounded-full ${breakerTrip ? 'bg-red-500' : 'bg-[#00FF00] animate-pulse'}`} />
            <span className={breakerTrip ? 'text-red-500' : 'text-[#00FF00]'}>
              {breakerTrip ? 'SHUTDOWN' : 'NOMINAL GRID HARMONY'}
            </span>
          </div>
        </div>

        {/* Metric 2: Active Load */}
        <div className="bg-white dark:bg-slate-900 border border-gray-150 dark:border-white/10 p-5 rounded-2xl flex flex-col justify-between text-left">
          <div className="flex items-center justify-between text-gray-400">
            <span className="text-xs font-mono uppercase">{t.iot.systemLoad}</span>
            <Zap className="h-4 w-4 text-[#0012FF] dark:text-cyan-400" />
          </div>
          <div className="mt-4">
            <span className="text-3xl font-mono font-bold text-gray-900 dark:text-white">
              {breakerTrip ? '0' : (selectedNodeId === 'mvs' ? 1420 + Math.floor(Math.sin(timeTick) * 15) : selectedNodeId === 'battery' ? (150 + dischargeRate * 4) : 480).toLocaleString()}
            </span>
            <span className="text-xs text-gray-400 font-mono ml-1">kVA</span>
          </div>
          <div className="mt-2 text-[10px] font-mono text-gray-400">
            Real-time feed offset: <strong className="text-gray-700 dark:text-gray-200">{(selectedNodeId === 'battery' && dischargeRate > 60) ? 'BESS Discharging' : 'Main Grid Ingress'}</strong>
          </div>
        </div>

        {/* Metric 3: Power Factor */}
        <div className="bg-white dark:bg-slate-900 border border-gray-150 dark:border-white/10 p-5 rounded-2xl flex flex-col justify-between text-left">
          <div className="flex items-center justify-between text-gray-400">
            <span className="text-xs font-mono uppercase">{t.iot.powerFactor}</span>
            <Cpu className="h-4 w-4 text-[#0012FF] dark:text-cyan-400" />
          </div>
          <div className="mt-4">
            <span className="text-3xl font-mono font-bold text-gray-900 dark:text-white">
              {breakerTrip ? '0.000' : calculatedPowerFactor.toFixed(3)}
            </span>
          </div>
          <div className={`mt-2 text-[10px] font-mono flex items-center gap-1 ${reactiveComp ? 'text-[#00FF00]' : 'text-amber-500'}`}>
            <span className={`h-1.5 w-1.5 rounded-full ${reactiveComp ? 'bg-[#00FF00]' : 'bg-amber-500'}`} />
            <span>{reactiveComp ? '99% Pure Phase Align' : 'Lagging (Reactive Loss)'}</span>
          </div>
        </div>

        {/* Metric 4: Ambient thermal state index */}
        <div className="bg-white dark:bg-slate-900 border border-gray-150 dark:border-white/10 p-5 rounded-2xl flex flex-col justify-between text-left">
          <div className="flex items-center justify-between text-gray-400">
            <span className="text-xs font-mono uppercase">{t.iot.temperature}</span>
            <Thermometer className="h-4 w-4 text-[#0012FF] dark:text-cyan-400" />
          </div>
          <div className="mt-4">
            <span className="text-3xl font-mono font-bold text-gray-900 dark:text-white">
              {simulatedTemp.toFixed(1)}
            </span>
            <span className="text-xs text-gray-400 font-mono ml-1">°C</span>
          </div>
          <div className="mt-2 text-[10px] font-mono text-gray-400 flex justify-between">
            <span>Flow velocity: <strong className="text-gray-700 dark:text-gray-200">{coolingSpeed}%</strong></span>
            <span className={simulatedTemp > 60 ? 'text-red-400 blink' : ''}>
              {simulatedTemp > 60 ? 'HIGH CONDENSING' : 'OK'}
            </span>
          </div>
        </div>

      </div>

      {/* Node Selector Panel & Waveform Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left 1/3 Side controls and node select */}
        <div className="bg-white dark:bg-slate-900 border border-gray-150 dark:border-white/10 rounded-3xl p-6 sm:p-8 space-y-6 text-left shadow-sm">
          
          <div className="space-y-2">
            <span className="text-xs font-mono font-bold tracking-wider text-gray-400 block uppercase">
              {t.iot.activeNodes}
            </span>
            <h2 className="text-xl font-display font-medium text-gray-900 dark:text-white">
              {t.iot.nodeSelect}
            </h2>
          </div>

          {/* Node Radio Buttons */}
          <div className="space-y-3">
            {[
              { id: 'mvs', name: t.iot.nodeMvs, desc: 'XE-MVS High Voltage', icon: Zap },
              { id: 'battery', name: t.iot.nodeBattery, desc: `MegaPack BESS • SOC: ${batterySOC}%`, icon: Battery },
              { id: 'charger', name: t.iot.nodeCharger, desc: 'Megavolt Charging Grid', icon: Sun },
            ].map(nodeItem => {
              const Icon = nodeItem.icon;
              const isSelected = selectedNodeId === nodeItem.id;
              return (
                <button
                  key={nodeItem.id}
                  onClick={() => selectNode(nodeItem.id as any)}
                  className={`w-full p-4 rounded-2xl text-left border flex items-center justify-between transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-gray-950 dark:bg-cyan-500 border-gray-950 dark:border-cyan-400 text-white dark:text-slate-950 shadow-md'
                      : 'bg-white dark:bg-slate-950 border-gray-200 dark:border-white/5 text-gray-700 dark:text-gray-300 hover:border-[#0012FF]/30'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-xl ${isSelected ? 'bg-white/10 text-white dark:text-slate-950' : 'bg-gray-100 dark:bg-slate-900 text-gray-500'}`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-xs font-mono font-bold uppercase tracking-wide leading-tight">{nodeItem.name}</p>
                      <p className={`text-[10px] ${isSelected ? 'text-white/70 dark:text-slate-950/80 font-semibold' : 'text-gray-400'}`}>{nodeItem.desc}</p>
                    </div>
                  </div>
                  <div className={`h-2.5 w-2.5 rounded-full ${isSelected ? 'bg-[#00FF00]' : 'bg-gray-300'}`} />
                </button>
              );
            })}
          </div>

          {/* Active Alarms Drawer inside panel */}
          <div className="pt-4 border-t border-gray-150 dark:border-white/10 space-y-3">
            <span className="text-[10px] font-mono uppercase font-bold text-gray-400 tracking-wider flex items-center gap-1.5 leading-none">
              <Bell className="h-3.5 w-3.5" />
              {t.iot.activeAlarms} ({activeAlarms.length})
            </span>
            
            <AnimatePresence mode="popLayout">
              {activeAlarms.length === 0 ? (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center gap-2 text-xs text-emerald-600 dark:text-emerald-400 font-mono bg-emerald-500/5 p-3 rounded-xl border border-emerald-500/10"
                >
                  <CheckCircle2 className="h-4 w-4 shrink-0 stroke-[2.5]" />
                  <span>ALL ENCLOSURES SECURE: NO COMPROMISES</span>
                </motion.div>
              ) : (
                <div className="space-y-1.5">
                  {activeAlarms.map(alarm => (
                    <motion.div
                      key={alarm}
                      initial={{ opacity: 0, x: -5 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="flex items-center gap-2 text-xs text-red-600 dark:text-red-400 font-mono bg-red-500/5 p-3 rounded-xl border border-red-500/10"
                    >
                      <AlertTriangle className="h-4 w-4 shrink-0 text-red-500 animate-pulse" />
                      <span className="uppercase text-[10px] font-extrabold">{alarm.replace(/_/g, ' ')}</span>
                    </motion.div>
                  ))}
                </div>
              )}
            </AnimatePresence>
          </div>

        </div>

        {/* Right 2/3 Main control tools and oscillograph screen */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Main Control Board container Card */}
          <div className="bg-white dark:bg-slate-900 border border-gray-150 dark:border-white/10 rounded-3xl p-6 sm:p-8 space-y-8 text-left">
            <div className="flex justify-between items-center pb-4 border-b border-gray-100 dark:border-white/5">
              <div className="space-y-1">
                <span className="text-[10px] font-mono font-extrabold text-[#0012FF] dark:text-cyan-400 tracking-wider uppercase block">
                  {t.iot.commands}
                </span>
                <h3 className="text-xl font-display font-medium text-gray-900 dark:text-white">
                  Supervisory Terminal Controller
                </h3>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={handleToggleBreaker}
                  className={`p-2.5 rounded-xl border text-xs font-mono font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                    breakerTrip 
                      ? 'bg-red-500 text-white border-red-500 shadow-sm' 
                      : 'bg-[#0012FF]/5 hover:bg-[#0012FF]/10 text-[#0012FF] border-[#0012FF]/10 dark:text-red-400 dark:bg-red-500/5 dark:border-red-500/15'
                  }`}
                  title="Force Trip Ingress Breaker Relay"
                >
                  <Power className="h-4 w-4" />
                  <span>{breakerTrip ? 'RESET BREAKER' : 'TRIP BREAKER'}</span>
                </button>
              </div>
            </div>

            {/* Slider / Swith controls row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Controller 1: Cooling Fans Speed */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-[11px] font-mono uppercase font-bold text-gray-400">{t.iot.coolingSpeed}</span>
                  <span className="font-mono text-xs font-bold text-gray-800 dark:text-cyan-400">{coolingSpeed}%</span>
                </div>
                <div className="flex items-center gap-3">
                  <Wind className="h-4 w-4 text-cyan-500 shrink-0" />
                  <input
                    type="range"
                    min="10"
                    max="100"
                    value={coolingSpeed}
                    onChange={(e) => {
                      const val = parseInt(e.target.value);
                      setCoolingSpeed(val);
                      if (val < 30) {
                        addLog('BESS Liquid-Cooling', 'Auxiliary pump speed reduced. Thermal rise anticipated.', 'info');
                      }
                    }}
                    className="w-full accent-[#0012FF] dark:accent-cyan-400 cursor-ew-resize bg-gray-100 dark:bg-slate-950 h-1.5 rounded-lg appearance-none"
                  />
                </div>
                <p className="text-[10px] text-gray-400 leading-normal">
                  Pumping flow speed for thermal housing of circuit grids.
                </p>
              </div>

              {/* Controller 2: Forced Discharging Rate */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-[11px] font-mono uppercase font-bold text-gray-400">{t.iot.dischargeControl}</span>
                  <span className="font-mono text-xs font-bold text-gray-800 dark:text-emerald-400">{dischargeRate} MW</span>
                </div>
                <div className="flex items-center gap-3">
                  <Sliders className="h-4 w-4 text-emerald-500 shrink-0" />
                  <input
                    type="range"
                    min="5"
                    max="100"
                    value={dischargeRate}
                    onChange={(e) => handleAdjustDischarge(parseInt(e.target.value))}
                    className="w-full accent-[#0012FF] dark:accent-[#00FF00] cursor-ew-resize bg-gray-100 dark:bg-slate-950 h-1.5 rounded-lg appearance-none"
                  />
                </div>
                <p className="text-[10px] text-gray-400 leading-normal">
                  Peak-load shaving discharge load injected directly to main sub-bus.
                </p>
              </div>

              {/* Controller 3: Static VAR compensation Switch */}
              <div className="space-y-3 flex flex-col justify-between">
                <div>
                  <span className="text-[11px] font-mono uppercase font-bold text-gray-400 block mb-1">
                    {t.iot.reactiveSwitch}
                  </span>
                  <p className="text-[10px] text-gray-400 leading-normal">
                    Inject active capacitance to counter industrial inductive magnetic fields.
                  </p>
                </div>
                <button
                  onClick={handleToggleReactiveComp}
                  className={`w-full py-2 px-3 text-xs font-mono font-bold uppercase rounded-xl border flex items-center justify-center gap-2 transition-all cursor-pointer ${
                    reactiveComp 
                      ? 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20 dark:text-[#00FF00] dark:border-[#00FF00]/25' 
                      : 'bg-white dark:bg-slate-950 border-gray-200 dark:border-white/5 text-gray-400'
                  }`}
                >
                  <div className={`h-2 w-2 rounded-full ${reactiveComp ? 'bg-[#00FF00] animate-ping' : 'bg-gray-400'}`} />
                  <span>{reactiveComp ? 'Active COMP ON (0.99 pf)' : 'Bypass Switch Open'}</span>
                </button>
              </div>

            </div>

          </div>

          {/* SVG WAVEFORM FLOW DISPLAY PANEL: Oscilloscope Wave Form */}
          <div className="bg-slate-950 border border-white/10 rounded-3xl p-6 space-y-4 text-left overflow-hidden relative">
            <div className="absolute top-4 right-4 flex items-center gap-2">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
              </span>
              <span className="text-[10px] text-cyan-400 font-mono font-bold tracking-widest uppercase">
                {breakerTrip ? 'BREAKER SHUT OFF' : 'LIVE FEED SINE'}
              </span>
            </div>

            <div className="space-y-1">
              <span className="text-[9px] font-mono text-gray-500 uppercase tracking-wider block">
                {t.iot.liveTelemetry}
              </span>
              <h4 className="text-sm font-semibold text-gray-200">
                Phase-A Harmonic Waveform (LOD Real-Time)
              </h4>
            </div>

            {/* Simulated Grid Oscilloscope Canvas */}
            <div className="bg-slate-900 border border-white/5 rounded-2xl h-[180px] w-full relative flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0 bg-grid-svg opacity-10 pointer-events-none" />
              
              {breakerTrip ? (
                <div className="text-center space-y-2 z-10 text-red-500">
                  <AlertTriangle className="h-6 w-6 mx-auto animate-bounce text-red-500" />
                  <p className="font-mono text-xs font-bold uppercase tracking-widest">ZERO INGRESS VOLTAGE DETECTED</p>
                  <p className="text-[10px] text-gray-400">Main high voltage breaker open circuit</p>
                </div>
              ) : (
                <svg className="absolute w-full h-[180px] left-0 top-0 overflow-visible" id="oscilloscope-svg">
                  {/* Grid background reference horizontal line */}
                  <line x1="0" y1="90" x2="100%" y2="90" stroke="rgba(255,255,255,0.06)" strokeDasharray="4 4" strokeWidth="1" />
                  
                  {/* Glowing dynamic sine path */}
                  <polyline
                    fill="none"
                    stroke={reactiveComp ? '#00f6ff' : '#ffaf00'}
                    strokeWidth="2.5"
                    points={generateWaveformPoints()}
                    className="transition-all"
                  />
                  
                  {/* Harmonic Distortion noise factor metrics text overlaid */}
                  <g fill="rgba(255, 255, 255, 0.4)" fontSize="9" fontFamily="monospace">
                    <text x="15" y="25">THD: {currentHarmonicsTHD.toFixed(2)}%</text>
                    <text x="15" y="40">V_RMS: 13,812 V</text>
                    <text x="15" y="55">V_PEAK: 19,533 V</text>
                    <text x="110" y="25">FREQ: {systemFrequency.toFixed(3)} Hz</text>
                    <text x="110" y="40">COS_PHI: {calculatedPowerFactor}</text>
                  </g>
                </svg>
              )}
            </div>

            <div className="flex justify-between text-[10px] font-mono text-gray-500 uppercase">
              <span>Primary bus harmonic distortion scale nominal range: 0.5% - 4.5%</span>
              <span className={reactiveComp ? 'text-[#00FF00]' : 'text-amber-400'}>
                {reactiveComp ? 'Optimum sine (compensated)' : 'Distorted load (harmonics rise)'}
              </span>
            </div>
          </div>

          {/* Interactive Logs Table Console */}
          <div className="bg-white dark:bg-slate-900 border border-gray-150 dark:border-white/10 p-6 rounded-3xl space-y-4 text-left">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100 dark:border-white/5">
              <div className="flex items-center gap-2">
                <Settings className="h-4 w-4 text-[#0012FF] dark:text-cyan-400" />
                <h4 className="text-sm font-bold text-gray-800 dark:text-white uppercase font-sans tracking-wide">
                  {t.iot.logs}
                </h4>
              </div>
              <button
                onClick={clearLogHistory}
                className="text-[10px] font-mono bg-transparent border-0 hover:underline text-gray-400 hover:text-gray-600 dark:hover:text-white cursor-pointer"
              >
                Clear Log History
              </button>
            </div>

            <div className="space-y-1.5 max-h-[180px] overflow-y-auto pr-2 custom-scrollbar">
              <AnimatePresence initial={false}>
                {logs.map((log) => {
                  let badgeColor = 'bg-gray-100 dark:bg-slate-800 text-gray-500 dark:text-gray-400';
                  if (log.type === 'success') badgeColor = 'bg-emerald-500/10 text-emerald-600 dark:text-[#00FF00]';
                  if (log.type === 'warn') badgeColor = 'bg-red-500/10 text-red-600 dark:text-red-400';
                  if (log.type === 'action') badgeColor = 'bg-[#0012FF]/10 text-[#0012FF] dark:text-cyan-400';
                  return (
                    <motion.div
                      key={log.id}
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0 }}
                      className="text-[11px] font-mono py-1 flex items-start justify-between border-b border-gray-50 dark:border-white/5 last:border-0"
                    >
                      <div className="flex gap-2 items-start">
                        <span className="text-gray-400 font-normal shrink-0">{log.timestamp}</span>
                        <span className={`px-1.5 py-0.2 rounded text-[9px] uppercase font-bold tracking-wide shrink-0 ${badgeColor}`}>
                          {log.node.split(' ')[0]}
                        </span>
                        <span className="text-gray-700 dark:text-gray-300 leading-normal">{log.message}</span>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          </div>

        </div>

      </div>

      {/* Industrial IoT Use Case Simulations Section */}
      <div className="border-t border-gray-200 dark:border-white/10 pt-12 space-y-6">
        <div className="max-w-3xl text-left space-y-1">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#0012FF] dark:text-cyan-400 block">
            REACTIVE TELEMETRY PLAYGROUND
          </span>
          <h2 className="text-2xl sm:text-3xl font-display font-medium text-gray-900 dark:text-white">
            Active Industrial IoT Deployment Cases
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
            Select an automated SCADA preset below to simulate extreme power distribution workloads, heat de-ratings, and physical interlock situations. Observe real-time changes across the waveform and metric logs above.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {iotUseCases.map((usecase) => {
            const isActive = activeUseCaseId === usecase.id;
            return (
              <div 
                key={usecase.id} 
                className={`border rounded-2xl p-6 text-left flex flex-col justify-between transition-all ${
                  isActive 
                    ? 'border-gray-950 dark:border-cyan-400 bg-gray-50/50 dark:bg-slate-950 shadow-sm' 
                    : 'border-gray-200 dark:border-white/5 bg-white dark:bg-slate-900/40 hover:border-gray-300 dark:hover:border-white/10'
                }`}
              >
                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <span className={`px-2 py-0.5 rounded text-[9px] font-mono font-extrabold tracking-widest ${usecase.colorClass}`}>
                      {usecase.badge}
                    </span>
                    {isActive && (
                      <span className="text-[10px] font-mono text-[#0012FF] dark:text-cyan-400 font-bold flex items-center gap-1">
                        <span className="h-1.5 w-1.5 rounded-full bg-[#00FF00] animate-ping" />
                        ACTIVE SIMULATION RUNNING
                      </span>
                    )}
                  </div>
                  
                  <div className="space-y-1">
                    <h3 className="font-display font-semibold text-base text-gray-900 dark:text-white leading-tight">
                      {usecase.title}
                    </h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                      {usecase.summary}
                    </p>
                  </div>

                  <p className="text-xs text-gray-400 dark:text-gray-500 leading-relaxed font-sans">
                    {usecase.details}
                  </p>

                  <div className="bg-gray-50 dark:bg-slate-950 p-3 rounded-xl border border-gray-100 dark:border-white/5 space-y-1.5">
                    <span className="text-[9px] text-gray-400 font-mono uppercase block font-bold">Preset Parameters Deployed:</span>
                    <div className="grid grid-cols-3 gap-2 text-center text-[10px] font-mono text-gray-600 dark:text-gray-300">
                      <div>
                        <span className="block text-gray-400 dark:text-gray-500 text-[8px] uppercase">Cooling Pump</span>
                        <strong className="text-gray-800 dark:text-cyan-300">{usecase.metrics.cooling}%</strong>
                      </div>
                      <div>
                        <span className="block text-gray-400 dark:text-gray-500 text-[8px] uppercase">Peak Discharge</span>
                        <strong className="text-gray-800 dark:text-emerald-400">{usecase.metrics.load}</strong>
                      </div>
                      <div>
                        <span className="block text-gray-400 dark:text-gray-500 text-[8px] uppercase">Phase Comp</span>
                        <strong className="text-gray-800 dark:text-indigo-400">{usecase.metrics.pf}</strong>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <button 
                    onClick={() => handleApplyUseCase(usecase.id)}
                    className={`w-full py-2.5 px-4 rounded-xl text-xs font-mono font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                      isActive 
                        ? 'bg-gray-950 dark:bg-cyan-500 text-white dark:text-slate-950 font-extrabold shadow-sm' 
                        : 'bg-gray-100 hover:bg-gray-200 dark:bg-slate-950 dark:hover:bg-slate-800 text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    <span>{isActive ? 'Preset Active - Re-trigger Signals' : 'Deploy Grid preset Simulation'}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </motion.div>
  );
}
