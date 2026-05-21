/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useApp } from '../context/AppContext';
import { Zap, ShoppingCart, Check, ChevronLeft, ChevronRight, Plus, Minus } from 'lucide-react';
import { EstimateConfiguration, CostBreakdown } from '../types';

interface ProductsProps {
  onAddNewInquiry: (config: EstimateConfiguration & { cost: CostBreakdown; timeline: string }) => void;
  key?: string;
}

export default function Products({ onAddNewInquiry }: ProductsProps) {
  const { t, language, selectedCategory, setSelectedCategory, basket, addToBasket, updateBasketQuantity } = useApp();
  const [activeInquiryId, setActiveInquiryId] = useState<string | null>(null);
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [submitted, setSubmitted] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const PAGE_SIZE = 2;

  const productCollection = [
    {
      id: 'prod-mvs',
      name: t.products.p1Name,
      desc: t.products.p1Desc,
      leadTime: 8,
      specs: [
        'Voltage Rating: up to 24kV Max continuous feed',
        'Current Rating: 1250A - 2500A Busbar rating',
        'Breaker: Highly reliable vacuum circuit breakers',
        'Enclosure: IEC 62271-200 Arc-resistant metal-clad config',
      ],
      estimatedCost: 85000,
      voltage: '13.8kV',
      amperage: 1200,
      discipline: 'industrial',
      imageSrc: '/src/assets/images/mvs_switchgear_1779335480278.png',
    },
    {
      id: 'prod-megapack',
      name: t.products.p2Name,
      desc: t.products.p2Desc,
      leadTime: 16,
      specs: [
        'Total Cap.: 5.0 Megawatt-hours modular liquid-cooled',
        'Inverter Ratio: Bi-directional high frequency coupling',
        'C-Rate: 1C rapid dispatch peak-shaving system',
        'Safety: Double structural fire barrier enclosure & thermal runaways',
      ],
      estimatedCost: 1150000,
      voltage: '277/480V',
      amperage: 2000,
      discipline: 'renewable',
      imageSrc: '/src/assets/images/grid_batteries_1779335502733.png',
    },
    {
      id: 'prod-ats',
      name: t.products.p3Name,
      desc: t.products.p3Desc,
      leadTime: 6,
      specs: [
        'Amp limits: 400A to 4000A structural scale options',
        'Transition delay: Built under 4ms latency switching limits',
        'Isolation level: Form 4 Type 7 segregated busbars',
        'Control board: Integrated double fiber telemetry gateway',
      ],
      estimatedCost: 48000,
      voltage: '277/480V',
      amperage: 800,
      discipline: 'datacenter',
      imageSrc: '/src/assets/images/transfer_switch_1779335521007.png',
    },
    {
      id: 'prod-charger',
      name: t.products.p4Name,
      desc: t.products.p4Desc,
      leadTime: 10,
      specs: [
        'Charging rate: Liquid cooled up to 350kW rapid DC output',
        'Connector ties: Dual CCS / NACS connections dynamic scheduling',
        'Power alignment: Integrated grid power-factor corrections',
        'Enclosure: Zero-vibration IP66 cast alloy shell',
      ],
      estimatedCost: 65000,
      voltage: '277/480V',
      amperage: 400,
      discipline: 'renewable',
      imageSrc: '/src/assets/images/dc_charger_1779335540876.png',
    },
    {
      id: 'prod-bms',
      name: t.products.p5Name,
      desc: t.products.p5Desc,
      leadTime: 5,
      specs: [
        'Interfaces: Gigabit Ethernet fiber ports + RS485 loops',
        'Monitoring: Dual core digital system boards thermal breakers',
        'Standards: BACnet, Modbus TCP, OPC UA native protocols',
        'Screen panel: 10 inch high contrast industrial diagnostic display',
      ],
      estimatedCost: 19500,
      voltage: '120/208V',
      amperage: 100,
      discipline: 'commercial',
      imageSrc: '/src/assets/images/bms_controller_1779335563008.png',
    },
  ];

  const categories = [
    { id: null, labelEn: 'All Systems', labelTr: 'Tüm Sistemler' },
    { id: 'industrial', labelEn: 'Heavy Industrial', labelTr: 'Ağır Sanayi' },
    { id: 'renewable', labelEn: 'Renewable Grid', labelTr: 'Yenilenebilir Enerji' },
    { id: 'datacenter', labelEn: 'Critical Backup', labelTr: 'Kritik Veri Girişi' },
    { id: 'commercial', labelEn: 'Smart BMS Panel', labelTr: 'Akıllı Bina Panosu' },
  ];

  const filteredProducts = selectedCategory
    ? productCollection.filter((prod) => prod.discipline === selectedCategory)
    : productCollection;

  React.useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory]);

  const totalPages = Math.ceil(filteredProducts.length / PAGE_SIZE);
  const displayedProducts = filteredProducts.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  const handleProductSubmit = (e: React.FormEvent, prod: typeof productCollection[0]) => {
    e.preventDefault();
    if (!clientName || !clientEmail) return;

    onAddNewInquiry({
      projectType: prod.discipline,
      areaSqFt: 15000,
      amperage: prod.amperage,
      voltage: prod.voltage,
      resilientPower: prod.discipline === 'datacenter',
      smartControls: prod.id === 'prod-bms',
      greenEnergy: prod.discipline === 'renewable',
      industrialMachinery: prod.discipline === 'industrial',
      networking: true,
      cost: {
        designCost: Math.round(prod.estimatedCost * 0.1),
        materialsCost: Math.round(prod.estimatedCost * 0.7),
        laborCost: Math.round(prod.estimatedCost * 0.15),
        commissioningCost: Math.round(prod.estimatedCost * 0.05),
        totalCost: prod.estimatedCost,
      },
      timeline: `${prod.leadTime} ${t.products.weeks}`,
    });

    setSubmitted(prod.id);
    setTimeout(() => {
      setSubmitted(null);
      setActiveInquiryId(null);
      setClientName('');
      setClientEmail('');
    }, 4000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.4 }}
      className="space-y-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
    >
      {/* Page Header */}
      <div className="max-w-3xl text-left space-y-3">
        <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#0012FF] dark:text-cyan-400 block">
          {t.products.tag}
        </span>
        <h1 className="text-3xl sm:text-5xl font-display font-medium tracking-tight text-gray-900 dark:text-white leading-tight">
          {t.products.title}
        </h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm sm:text-base leading-relaxed max-w-2xl">
          {t.products.desc}
        </p>
      </div>

      {/* Category Selector Pills */}
      <div className="flex flex-wrap items-center gap-2.5 bg-gray-50/50 dark:bg-slate-950/20 p-4 rounded-2xl border border-gray-150 dark:border-white/5">
        <span className="text-[10px] font-mono uppercase tracking-widest text-gray-400 dark:text-gray-500 font-bold ml-1">
          {language === 'tr' ? 'KATEGORİ FILTRESİ:' : 'CATEGORY RANGE:'}
        </span>
        <div className="flex flex-wrap gap-1.5 ml-1 sm:ml-4">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.id;
            const label = language === 'tr' ? cat.labelTr : cat.labelEn;
            return (
              <button
                key={cat.id ?? 'all'}
                onClick={() => setSelectedCategory(cat.id)}
                className={`py-1.5 px-3.5 rounded-xl text-xs font-mono font-semibold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-gray-950 dark:bg-cyan-400 text-white dark:text-slate-950 shadow-sm font-extrabold'
                    : 'bg-white dark:bg-slate-900 hover:bg-gray-100 dark:hover:bg-slate-800 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white border border-gray-150 dark:border-white/5'
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {displayedProducts.map((prod) => {
          const isFormOpen = activeInquiryId === prod.id;
          const isThisSubmitted = submitted === prod.id;

          return (
            <div
              key={prod.id}
              className="bg-white dark:bg-slate-900 border border-gray-150 dark:border-white/10 rounded-3xl p-6 sm:p-8 flex flex-col justify-between hover:shadow-lg transition-all duration-300 text-left"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="inline-flex items-center gap-1.5 bg-[#0012FF]/5 dark:bg-[#0012FF]/20 px-3 py-1 rounded-full text-xs font-mono font-bold text-[#0012FF] dark:text-cyan-300">
                    <Zap className="h-3.5 w-3.5" />
                    <span>{prod.voltage} • {prod.amperage}A</span>
                  </div>
                  <span className="text-xs text-gray-400 font-mono">
                    {t.products.estimatedLead}: <strong className="text-gray-900 dark:text-white">{prod.leadTime} {t.products.weeks}</strong>
                  </span>
                </div>

                {prod.imageSrc && (
                  <div className="relative overflow-hidden rounded-2xl aspect-[4/3] bg-gray-50 dark:bg-slate-950 border border-gray-150/40 dark:border-white/5 group mb-4">
                    <img 
                      src={prod.imageSrc} 
                      alt={prod.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-[1.03]"
                    />
                  </div>
                )}

                <h3 className="text-xl sm:text-2xl font-display font-semibold tracking-tight text-gray-900 dark:text-white">
                  {prod.name}
                </h3>
                <p className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm leading-relaxed">
                  {prod.desc}
                </p>

                <div className="bg-gray-50 dark:bg-slate-950 p-4 rounded-xl border border-gray-150/50 dark:border-white/5">
                  <span className="text-[10px] font-mono font-extrabold uppercase tracking-widest text-gray-400 dark:text-gray-500 block mb-2">
                    {t.products.specifications}
                  </span>
                  <ul className="space-y-1.5 text-xs text-gray-600 dark:text-gray-300">
                    {prod.specs.map((spec, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="h-1 w-1 bg-[#00FF00] rounded-full mt-1.5 flex-shrink-0" />
                        <span>{spec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                          <div className="mt-6 pt-6 border-t border-gray-100 dark:border-white/10 space-y-4">
                <div className="flex items-baseline justify-between select-none">
                  <span className="text-xs text-gray-400 font-mono uppercase">{t.products.techDetails}</span>
                  <span className="text-2xl font-mono font-bold text-[#0012FF] dark:text-[#00FF00]">
                    ${prod.estimatedCost.toLocaleString()} <span className="text-xs text-gray-400 font-sans font-normal">USD</span>
                  </span>
                </div>

                <div className="flex flex-col gap-2">
                  {/* Action row */}
                  <div className="grid grid-cols-2 gap-2">
                    {/* Add to basket block */}
                    {(() => {
                      const itemInBasket = basket.find(item => item.id === prod.id);
                      if (itemInBasket) {
                        return (
                          <div className="flex items-center justify-between bg-[#0012FF]/5 dark:bg-cyan-400/5 border border-[#0012FF]/20 dark:border-cyan-400/25 rounded-xl px-2 py-1 h-11">
                            <button
                              onClick={() => updateBasketQuantity(prod.id, itemInBasket.quantity - 1)}
                              className="w-7 h-7 flex items-center justify-center rounded-lg bg-gray-100 dark:bg-slate-800 hover:bg-[#0012FF]/10 text-gray-800 dark:text-white border-none cursor-pointer text-xs font-bold"
                              title="Decrease"
                            >
                              <Minus className="h-3 w-3" />
                            </button>
                            <span className="font-mono text-xs font-bold text-[#0012FF] dark:text-cyan-300">
                              {itemInBasket.quantity}×
                            </span>
                            <button
                              onClick={() => updateBasketQuantity(prod.id, itemInBasket.quantity + 1)}
                              className="w-7 h-7 flex items-center justify-center rounded-lg bg-gray-100 dark:bg-slate-800 hover:bg-[#0012FF]/10 text-gray-800 dark:text-white border-none cursor-pointer text-xs font-bold"
                              title="Increase"
                            >
                              <Plus className="h-3 w-3" />
                            </button>
                          </div>
                        );
                      } else {
                        return (
                          <button
                            onClick={() => addToBasket({
                              id: prod.id,
                              name: prod.name,
                              desc: prod.desc,
                              specs: prod.specs,
                              estimatedCost: prod.estimatedCost,
                              voltage: prod.voltage,
                              amperage: prod.amperage,
                              leadTime: prod.leadTime,
                              discipline: prod.discipline,
                              imageSrc: prod.imageSrc
                            })}
                            className="w-full py-2.5 px-3 rounded-xl bg-gray-950 dark:bg-cyan-400 text-white dark:text-slate-950 hover:bg-opacity-90 font-bold text-xs transition uppercase flex items-center justify-center gap-1.5 cursor-pointer border-0"
                          >
                            <ShoppingCart className="h-3.5 w-3.5" />
                            <span>{language === 'tr' ? 'Sepete Ekle' : 'Add to Basket'}</span>
                          </button>
                        );
                      }
                    })()}

                    {/* Direct RFQ form toggle */}
                    <button
                      onClick={() => setActiveInquiryId(isFormOpen ? null : prod.id)}
                      className={`py-2.5 px-3 rounded-xl border font-bold text-xs transition uppercase flex items-center justify-center gap-1.5 cursor-pointer bg-transparent truncate ${
                        isFormOpen
                          ? 'border-red-500/30 text-red-500 hover:bg-red-500/5'
                          : 'border-gray-200 dark:border-white/10 text-gray-700 dark:text-gray-300 hover:border-[#0012FF] dark:hover:border-cyan-400'
                      }`}
                    >
                      <span>{isFormOpen ? (language === 'tr' ? 'Kapat' : 'Close') : (language === 'tr' ? 'Hızlı Teklif' : 'Quick RFQ')}</span>
                    </button>
                  </div>

                  <AnimatePresence mode="wait">
                    {isThisSubmitted ? (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        className="p-3.5 bg-[#00FF00]/10 border border-[#00FF00]/20 rounded-xl text-center text-xs text-[#00FF00] font-semibold"
                      >
                        <Check className="h-4 w-4 mx-auto mb-1 stroke-[3]" />
                        <span>{t.products.inquirySuccess}</span>
                      </motion.div>
                    ) : isFormOpen ? (
                      <motion.form
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        onSubmit={(e) => handleProductSubmit(e, prod)}
                        className="bg-gray-50/50 dark:bg-slate-950 p-4 rounded-xl border border-gray-150 dark:border-white/5 space-y-3 mt-2 overflow-hidden"
                      >
                        <span className="text-[10px] uppercase font-mono tracking-wider font-extrabold text-[#0012FF] dark:text-cyan-400 block">
                          {t.products.inquiryTitle}
                        </span>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          <input
                            required
                            type="text"
                            placeholder={t.estimator.formName}
                            value={clientName}
                            onChange={(e) => setClientName(e.target.value)}
                            className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-white/10 rounded-lg px-2.5 py-1.5 text-xs focus:ring-1 focus:ring-[#0012FF] outline-none text-gray-800 dark:text-white"
                          />
                          <input
                            required
                            type="email"
                            placeholder={t.estimator.formEmail}
                            value={clientEmail}
                            onChange={(e) => setClientEmail(e.target.value)}
                            className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-white/10 rounded-lg px-2.5 py-1.5 text-xs focus:ring-1 focus:ring-[#0012FF] outline-none text-gray-800 dark:text-white"
                          />
                        </div>
                        <button
                          type="submit"
                          className="w-full py-2 px-3 rounded-lg bg-gray-900 dark:bg-[#00FF00] dark:text-gray-950 text-white font-bold hover:bg-gray-800 dark:hover:bg-[#00E000] text-xs transition uppercase cursor-pointer border-0"
                        >
                          {t.products.inquireBtn}
                        </button>
                      </motion.form>
                    ) : null}
                  </AnimatePresence>
                </div>
              </div>    </div>
            </div>
          );
        })}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 pt-8" id="products-pagination">
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
    </motion.div>
  );
}
