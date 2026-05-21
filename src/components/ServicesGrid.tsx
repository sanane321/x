/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Building2, 
  Settings2, 
  ServerCrash, 
  Leaf, 
  ChevronDown, 
  Layers, 
  ShieldAlert, 
  Gauge, 
  ArrowUpRight 
} from 'lucide-react';
import { ServiceDetail } from '../types';

export default function ServicesGrid() {
  const [activeServiceId, setActiveServiceId] = useState<string | null>(null);

  const services: ServiceDetail[] = [
    {
      id: 'commercial',
      title: 'Commercial Facilities',
      shortDesc: 'Complete smart riser structures, architectural lighting, and 3-phase tenant fit-outs.',
      longDesc: 'Engineered grids for enterprise hubs and multi-tier developments. We custom-fabricate major electrical risers, distribute power across complex floor layouts, and integrate state-of-the-art building wellness systems.',
      voltageRange: '120/208V to 277/480V 3-Phase',
      iconName: 'Building2',
      specifications: [
        'Main Switchboard Fabrication & Fitting',
        'Intelligent Building Automation System ties',
        'Custom architectural LED linear dimming matrices',
        'Sub-metering networks for multi-tenant properties',
        'Emergency Exit/Egress backup battery arrays'
      ],
      equipment: [
        'Siemens Sentron Switchboards',
        'Lutron Athena Quantum lighting panels',
        'Eaton Pow-R-Line distribution modules'
      ]
    },
    {
      id: 'industrial',
      title: 'Industrial Infrastructure',
      shortDesc: 'High-voltage substations, structural busways, and heavy equipment automation lines.',
      longDesc: 'Heavy-duty infrastructure for high-demand processing plants, manufacturing facilities, and warehouses. Our certified crews carry out heavy structural conduit runs, transformer sizing, and motor control installations.',
      voltageRange: '480V to 13.8kV Medium-Voltage Utility',
      iconName: 'Settings2',
      specifications: [
        'Step-down utility substation layouts',
        'Overhead heavy copper plug-in busway systems',
        'Multi-cabinet programmable logic controllers (PLCs)',
        'Class I Division II hazardous-location wiring',
        'High-amp thermal imaging grid audits'
      ],
      equipment: [
        'Schneider Electric Square D Busways',
        'ABB medium-voltage vacuum circuit breakers',
        'Allen-Bradley GuardLogix heavy controller cabinets'
      ]
    },
    {
      id: 'datacenter',
      title: 'Mission-Critical Datacenters',
      shortDesc: 'Dual-feed (2N) electrical systems, heavy automatic transfer switches (ATS), and modular UPS grids.',
      longDesc: 'Zero-downtime mechanical/electrical power architecture. We connect high-containment, heavy redundant systems including dual utility feeds, diesel generator synchronization boards, and high-capacity static switches.',
      voltageRange: '415V/240V high-density server power',
      iconName: 'ServerCrash',
      specifications: [
        'A + B completely isolated path cable distributions',
        'Heavy-duty Automatic Transfer Switch (ATS) commissioning',
        'Centralized Static Transfer Switch (STS) installations',
        'Double-redundant central battery UPS grids',
        'Dynamic thermal-load responsive breakers'
      ],
      equipment: [
        'Vertiv Liebert heavy-duty utility switchgears',
        'Cummins sync-panel paralleling controllers',
        'Eaton Power Xpert intelligent branch telemetry'
      ]
    },
    {
      id: 'renewable',
      title: 'Sustainable Grids & EV charging',
      shortDesc: 'Rooftop solar integration, high-output grid net metering, and custom EV fleet chargers.',
      longDesc: 'Forward-looking clean-energy electrical installation. X Elektrik constructs high-output rooftop solar fields, couples grid net-metering switchboards, and deploys high-speed commercial fleet charging infrastructures.',
      voltageRange: '480V DC Level-3 EV Fast Chargers',
      iconName: 'Leaf',
      specifications: [
        'Utility-connected PV inverters & high-amp recombiners',
        'High-efficiency bidirection battery storage linkages',
        'Utility peak-shaving automation schedules',
        'Liquid-cooled Level-3 DC Supercharger arrays',
        'Grid-safety isolation & automatic island shutdown'
      ],
      equipment: [
        'Tesla Megapack utility interfaces',
        'SMA Sunny Central high-amp solar inverters',
        'Kempower satellite DC fast-charge hubs'
      ]
    }
  ];

  const getIcon = (name: string) => {
    switch (name) {
      case 'Building2': return <Building2 className="h-6 w-6 text-[#0012FF]" />;
      case 'Settings2': return <Settings2 className="h-6 w-6 text-[#0012FF]" />;
      case 'ServerCrash': return <ServerCrash className="h-6 w-6 text-[#0012FF]" />;
      case 'Leaf': return <Leaf className="h-6 w-6 text-[#0012FF]" />;
      default: return <Building2 className="h-6 w-6 text-[#0012FF]" />;
    }
  };

  const toggleService = (id: string) => {
    if (activeServiceId === id) {
      setActiveServiceId(null);
    } else {
      setActiveServiceId(id);
    }
  };

  return (
    <div className="space-y-6" id="services-grid">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {services.map((svc) => {
          const isOpen = activeServiceId === svc.id;
          return (
            <div 
              key={svc.id}
              className={`bg-white border text-left p-6 rounded-2xl transition-all select-none duration-300 ${
                isOpen 
                  ? 'border-[#0012FF] shadow-lg ring-1 ring-[#0012FF]' 
                  : 'border-gray-100 hover:border-gray-200 shadow-sm'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-3.5 bg-gray-50 rounded-xl flex-shrink-0">
                    {getIcon(svc.iconName)}
                  </div>
                  <div>
                    <h4 className="text-xl font-display font-semibold text-gray-900">{svc.title}</h4>
                    <span className="text-[10px] font-mono tracking-wider font-bold text-gray-400 bg-gray-50 px-2.5 py-1 rounded-full inline-block mt-1">
                      {svc.voltageRange}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => toggleService(svc.id)}
                  className={`p-2 rounded-lg bg-gray-50 hover:bg-gray-100 transition-all cursor-pointer ${
                    isOpen ? 'rotate-180 bg-[#0012FF]/5 text-[#0012FF]' : 'text-gray-400'
                  }`}
                  aria-label="Toggle details"
                >
                  <ChevronDown className="h-5 w-5" />
                </button>
              </div>

              <p className="text-gray-600 text-sm mt-4 leading-relaxed">{svc.shortDesc}</p>

              {/* Collapsible expanded detail */}
              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="mt-5 pt-5 border-t border-gray-100 space-y-4">
                      <p className="text-sm text-gray-700 leading-relaxed bg-[#0012FF]/0.5 p-3 rounded-xl border border-dashed border-gray-100">
                        {svc.longDesc}
                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-sans">
                        <div>
                          <span className="font-mono text-[10px] text-gray-400 uppercase block mb-2 font-bold">Standard Solutions:</span>
                          <ul className="space-y-2">
                            {svc.specifications.map((spec, i) => (
                              <li key={i} className="flex items-start gap-2 text-gray-600">
                                <span className="h-1.5 w-1.5 rounded-full bg-[#00FF00] mt-1.5 flex-shrink-0" />
                                <span>{spec}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <span className="font-mono text-[10px] text-gray-400 uppercase block mb-2 font-bold">Industrial Hardware Used:</span>
                          <div className="space-y-2">
                            {svc.equipment.map((eq, i) => (
                              <div key={i} className="p-2.5 bg-gray-50 border border-gray-100 rounded-lg text-gray-800">
                                <span className="font-semibold block">{eq}</span>
                                <span className="text-[10px] text-gray-400">Certified deployment specification</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="pt-4 border-t border-gray-150 flex items-center justify-between">
                        <span className="text-[10px] text-gray-400 font-mono flex items-center gap-1">
                          <Gauge className="h-3.5 w-3.5 text-[#0012FF]" />
                          NEC compliant & OSHA accredited fitting standards
                        </span>
                        <a 
                          href="#smartgrid-estimator"
                          className="text-xs font-semibold text-[#0012FF] inline-flex items-center gap-1 hover:underline"
                        >
                          Configure in Estimator
                          <ArrowUpRight className="h-3.5 w-3.5" />
                        </a>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}
