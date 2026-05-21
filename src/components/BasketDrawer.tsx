/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useApp } from '../context/AppContext';
import { X, Trash2, Plus, Minus, ClipboardCheck, ArrowRight, Zap, Calendar, ShoppingBag } from 'lucide-react';

interface BasketDrawerProps {
  onAddInquiry: (inquiry: {
    id: string;
    clientName: string;
    clientEmail: string;
    projectType: string;
    scaleSqFt: number;
    specs: string;
    estimatedCost: number;
    timeline: string;
    timestamp: string;
  }) => void;
}

export default function BasketDrawer({ onAddInquiry }: BasketDrawerProps) {
  const {
    t,
    language,
    basket,
    isBasketOpen,
    setBasketOpen,
    updateBasketQuantity,
    removeFromBasket,
    clearBasket
  } = useApp();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isBasketOpen) return null;

  // Calculatings
  const totalCost = basket.reduce((acc, item) => acc + (item.estimatedCost * item.quantity), 0);
  const totalItems = basket.reduce((acc, item) => acc + item.quantity, 0);
  
  // Lead time is usually determined by the item with the maximum lead time (the critical path)
  const maxLeadTime = basket.length > 0 
    ? Math.max(...basket.map(item => item.leadTime))
    : 0;

  const handleSubmitRfq = (e: React.FormEvent) => {
    e.preventDefault();
    if (basket.length === 0 || !name || !email) return;

    // Create a detailed specifications string of all cart products
    const itemsDescription = basket
      .map(item => `${item.quantity}× ${item.name} (${item.voltage})`)
      .join(', ');

    const now = new Date();
    const nowStr = now.toLocaleTimeString(language === 'tr' ? 'tr-TR' : 'en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });

    onAddInquiry({
      id: `RFP-${Math.floor(1000 + Math.random() * 9000)}`,
      clientName: name,
      clientEmail: email,
      projectType: 'Basket RFQ',
      scaleSqFt: basket.length * 1200, // Simulated footprint scale
      specs: `${language === 'tr' ? 'Sepet Siparişi' : 'Cart RFQ'}: ${itemsDescription}. Notes: ${notes || 'None'}`,
      estimatedCost: totalCost,
      timeline: `${maxLeadTime} ${t.products.weeks} Lead Time`,
      timestamp: `Today at ${nowStr}`
    });

    setSubmitted(true);
    setTimeout(() => {
      clearBasket();
      setSubmitted(false);
      setName('');
      setEmail('');
      setNotes('');
      setBasketOpen(false);
    }, 4000);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex justify-end">
        {/* Backdrop overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setBasketOpen(false)}
          className="absolute inset-0 bg-gray-950/60 backdrop-blur-xs"
          id="basket-drawer-overlay"
        />

        {/* Drawer Panel */}
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="relative w-full max-w-lg h-full bg-white dark:bg-[#0c1322] shadow-2xl flex flex-col z-10 border-l border-gray-150 dark:border-white/10 text-left"
          id="basket-drawer-panel"
        >
          {/* Drawer Header */}
          <div className="p-6 border-b border-gray-150 dark:border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-[#0012FF]/5 dark:bg-cyan-400/5 text-[#0012FF] dark:text-cyan-400">
                <ShoppingBag className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-lg font-display font-bold text-gray-900 dark:text-white leading-none">
                  {language === 'tr' ? 'Teklif Sepetiniz' : 'Your Order Basket'}
                </h2>
                <span className="text-[10px] font-mono uppercase text-gray-400 dark:text-gray-500 font-bold tracking-wider">
                  {totalItems} {language === 'tr' ? 'Kalem Ekipman' : 'Staged Systems'}
                </span>
              </div>
            </div>
            <button
              onClick={() => setBasketOpen(false)}
              className="p-2 rounded-xl text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5 transition border-0 bg-transparent cursor-pointer"
              aria-label="Close Basket"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Drawer Body */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="h-full flex flex-col items-center justify-center text-center space-y-4"
              >
                <div className="h-16 w-16 bg-[#00FF00]/10 rounded-full flex items-center justify-center text-[#00FF00] border border-[#00FF00]/20">
                  <ClipboardCheck className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-display font-medium text-gray-900 dark:text-white">
                  {language === 'tr' ? 'RFP Taslağı Gönderildi!' : 'RFP Package Dispatched!'}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 max-w-xs leading-relaxed">
                  {language === 'tr' 
                    ? 'Tüm sepet sistemleri birleştirildi ve teklif panosuna eklendi. İncelemeler bittiğinde sizinle irtibat kurulacaktır.' 
                    : 'The multi-system hardware array has been compiled and staged on the Corporate Inquiries Board. Our engineering bidding desk is on it.'}
                </p>
                <div className="pt-2 text-xs font-mono text-cyan-500">
                  {language === 'tr' ? 'Sepetiniz sıfırlanıyor...' : 'Refreshing current stack...'}
                </div>
              </motion.div>
            ) : basket.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-4 text-gray-400 py-16">
                <ShoppingBag className="h-12 w-12 stroke-[1.5] text-gray-300 dark:text-gray-650" />
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white text-sm">
                    {language === 'tr' ? 'Sepetiniz boş' : 'Your basket is empty'}
                  </h4>
                  <p className="text-xs text-gray-400 dark:text-gray-500 max-w-xs mt-1">
                    {language === 'tr' 
                      ? 'Ürünler sayfamızdan yüksek gerilim ekipmanları ve güç sistemlerini sepetinize ekleyerek toplu RFQ oluşturabilirsiniz.' 
                      : 'Add premium substation equipment or grid batteries from our catalog to build a synchronized multi-system quotation.'}
                  </p>
                </div>
                <button
                  onClick={() => {
                    const hashUrl = window.location.hash;
                    if (hashUrl !== '#/products') {
                      window.location.hash = '#/products';
                    }
                    setBasketOpen(false);
                  }}
                  className="py-2 px-4 rounded-xl border border-[#0012FF]/20 hover:border-[#0012FF] text-[#0012FF] dark:text-cyan-400 hover:bg-[#0012FF]/5 text-xs font-bold uppercase transition cursor-pointer bg-white dark:bg-slate-900 mt-2"
                >
                  {language === 'tr' ? 'Kataloğu Keşfet' : 'Browse Hardware Catalog'}
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                {/* List of items */}
                <div className="space-y-3.5">
                  <span className="text-[10px] font-mono font-extrabold uppercase text-gray-400 dark:text-gray-500 tracking-wider">
                    {language === 'tr' ? 'SEÇİLEN SİSTEMLER' : 'SELECTED HARDWARE LOOPS'}
                  </span>
                  <div className="space-y-2.5">
                    {basket.map((item) => (
                      <div
                        key={item.id}
                        className="bg-gray-50 dark:bg-slate-950 p-4 rounded-2xl border border-gray-150 dark:border-white/5 flex gap-4 animate-fade-in"
                      >
                        {item.imageSrc && (
                          <div className="w-16 h-16 rounded-xl overflow-hidden bg-white dark:bg-slate-900 border border-gray-150/50 dark:border-white/5 flex-shrink-0">
                            <img src={item.imageSrc} alt={item.name} className="w-full h-full object-cover" />
                          </div>
                        )}
                        <div className="flex-1 min-w-0 space-y-1">
                          <div className="flex items-start justify-between gap-1">
                            <h4 className="text-xs sm:text-sm font-display font-bold text-gray-900 dark:text-white truncate">
                              {item.name}
                            </h4>
                            <button
                              onClick={() => removeFromBasket(item.id)}
                              className="text-gray-400 hover:text-red-500 p-1 transition border-0 bg-transparent cursor-pointer"
                              title="Remove item"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          </div>
                          
                          <div className="flex items-center gap-1.5 text-[10px] font-mono text-[#0012FF] dark:text-cyan-300 font-bold">
                            <Zap className="h-3 w-3" />
                            <span>{item.voltage} • {item.amperage}A</span>
                          </div>

                          <div className="flex items-center justify-between pt-2">
                            {/* Quantity Controls */}
                            <div className="flex items-center gap-2 border border-gray-200 dark:border-white/10 rounded-lg p-0.5 bg-white dark:bg-slate-900">
                              <button
                                onClick={() => updateBasketQuantity(item.id, item.quantity - 1)}
                                className="w-5 h-5 flex items-center justify-center rounded bg-gray-50 hover:bg-gray-100 dark:bg-slate-800 dark:hover:bg-slate-700 text-gray-800 dark:text-white border-none cursor-pointer text-[10px]"
                              >
                                <Minus className="h-2.5 w-2.5" />
                              </button>
                              <span className="font-mono text-xs font-bold px-1 min-w-4 text-center text-gray-900 dark:text-white">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => updateBasketQuantity(item.id, item.quantity + 1)}
                                className="w-5 h-5 flex items-center justify-center rounded bg-gray-50 hover:bg-gray-100 dark:bg-slate-800 dark:hover:bg-slate-700 text-gray-800 dark:text-white border-none cursor-pointer text-[10px]"
                              >
                                <Plus className="h-2.5 w-2.5" />
                              </button>
                            </div>

                            {/* Price */}
                            <span className="text-xs font-mono font-semibold text-gray-900 dark:text-white">
                              ${(item.estimatedCost * item.quantity).toLocaleString()}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Logistics & Metrics Cards */}
                <div className="grid grid-cols-2 gap-3.5">
                  <div className="bg-gray-50 dark:bg-slate-950 p-3.5 rounded-xl border border-gray-150 dark:border-white/5 space-y-1">
                    <span className="text-[9px] font-mono text-gray-400 dark:text-gray-500 font-bold uppercase block">
                      {language === 'tr' ? 'TEKİL TESLİMAT SÜRESİ' : 'LEAD TIME CRITICAL PATH'}
                    </span>
                    <div className="flex items-center gap-1.5 text-gray-900 dark:text-white">
                      <Calendar className="h-4 w-4 text-orange-500" />
                      <span className="text-xs sm:text-sm font-mono font-bold">{maxLeadTime} {t.products.weeks}</span>
                    </div>
                  </div>
                  <div className="bg-gray-50 dark:bg-slate-950 p-3.5 rounded-xl border border-[#00FF00]/10 dark:border-white/5 space-y-1">
                    <span className="text-[9px] font-mono text-gray-400 dark:text-gray-500 font-bold uppercase block">
                      {language === 'tr' ? 'TOPLAM HARDWARE MALİYETİ' : 'TOTAL ESTIMATED COST'}
                    </span>
                    <div className="flex items-center gap-1.5 text-[#0012FF] dark:text-[#00FF00]">
                      <span className="text-xs sm:text-sm font-mono font-bold">${totalCost.toLocaleString()}</span>
                      <span className="text-[9px] font-sans text-gray-400 uppercase font-bold">USD</span>
                    </div>
                  </div>
                </div>

                {/* RFQ compilation form */}
                <form onSubmit={handleSubmitRfq} className="border-t border-gray-150 dark:border-white/10 pt-6 space-y-4">
                  <div className="space-y-1">
                    <h4 className="text-xs font-mono font-extrabold uppercase text-[#0012FF] dark:text-cyan-400 tracking-wider">
                      {language === 'tr' ? 'KURUMSAL TEKLİF TALEBİ / RFQ' : 'DISPATCH JOINT COMMISSIONING RFQ'}
                    </h4>
                    <p className="text-[11px] text-gray-500 dark:text-gray-400">
                      {language === 'tr'
                        ? 'Sepetinizdeki tüm alt sistemlerin tek bir teknik bütçe teklifi haline getirilmesi için şirket bilgilerinizi giriniz.'
                        : 'Submit details below to bundle this hardware stack into a unified architectural proposal with BIM model matching.'}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 gap-3">
                    <div className="space-y-1">
                      <label className="text-[10px] font-mono uppercase tracking-wider text-gray-400 font-bold block">
                        {t.contact.fullName}
                      </label>
                      <input
                        required
                        type="text"
                        placeholder="John Doe"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full bg-gray-50/50 dark:bg-slate-950 border border-gray-200 dark:border-white/10 rounded-xl px-3 py-2 text-xs focus:ring-1 focus:ring-[#0012FF] outline-none text-gray-900 dark:text-white"
                      />
                    </div>
                    
                    <div className="space-y-1">
                      <label className="text-[10px] font-mono uppercase tracking-wider text-gray-400 font-bold block">
                        {t.contact.emailAddress}
                      </label>
                      <input
                        required
                        type="email"
                        placeholder="john@company.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-gray-50/50 dark:bg-slate-950 border border-gray-200 dark:border-white/10 rounded-xl px-3 py-2 text-xs focus:ring-1 focus:ring-[#0012FF] outline-none text-gray-900 dark:text-white"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-mono uppercase tracking-wider text-gray-400 font-bold block">
                        {language === 'tr' ? 'PROJE NOTU / İSTEKLER' : 'SITE INGRESS / SPECIAL REQUIREMENTS'}
                      </label>
                      <textarea
                        rows={2}
                        placeholder={language === 'tr' ? 'Örn: Trafo odası mesafesi, çift hat kurulumu...' : 'e.g. Substation clearances, specific NEMA enclosure classes required...'}
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        className="w-full bg-gray-50/50 dark:bg-slate-950 border border-gray-200 dark:border-white/10 rounded-xl px-3 py-2 text-xs focus:ring-1 focus:ring-[#0012FF] outline-none text-gray-900 dark:text-white"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 px-4 rounded-xl bg-[#0012FF] dark:bg-cyan-400 hover:bg-opacity-90 text-white dark:text-slate-950 font-bold text-xs transition uppercase flex items-center justify-center gap-2 cursor-pointer border-0 mt-2"
                  >
                    <span>{language === 'tr' ? 'Bileşik RFP Paketini Gönder' : 'Submit Composite RFP Package'}</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </form>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
