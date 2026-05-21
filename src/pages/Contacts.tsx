/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useApp } from '../context/AppContext';
import { ShieldCheck, MapPin, Phone, Mail, Clock, HelpCircle, Send } from 'lucide-react';

interface FaqItem {
  qEn: string;
  qTr: string;
  aEn: string;
  aTr: string;
}

export default function Contacts() {
  const { t, language } = useApp();
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formPhone, setFormPhone] = useState('');
  const [formScale, setFormScale] = useState('');
  const [formMessage, setFormMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const faqs: FaqItem[] = [
    {
      qEn: 'Do you offer emergency on-site repair?',
      qTr: 'Acil yerinde onarım ve arıza giderme hizmeti sunuyor musunuz?',
      aEn: 'Yes, we support contract partners with classified 24-hour technician standby arrays across metropolitan industrial hubs.',
      aTr: 'Evet, büyük endüstriyel merkezlerde anlaşmalı iş ortaklarımıza sertifikalı teknisyenlerimizle 7/24 kesintisiz arıza müdahale desteği sunuyoruz.',
    },
    {
      qEn: 'What is your typical lead-time on switchgear parts?',
      qTr: 'Pano odası switchgear yedek parçası tedarik süreleriniz nedir?',
      aEn: 'Medium-voltage units carry an initial 8-10 week design, test, and freight period. Low-voltage panels average 5-6 weeks.',
      aTr: 'Orta gerilim panoları için 8-10 haftalık tasarım, test ve yükleme süreci mevcuttur. Alçak gerilim panolarında ise ortalama süre 5-6 haftadır.',
    },
    {
      qEn: 'Are your designs fully NEC or IEC accredited?',
      qTr: 'Tasarım şablonlarınız tamamen NEC veya IEC akreditasyonuna sahip mi?',
      aEn: 'Every terminal assembly, single line schematic, and panel routing complies with modern international NEC and IEC code layers.',
      aTr: 'Tasarladığımız tüm şema ve panolar, uluslararası geçerliliğe sahip güncel NEC ve IEC standartlarına yüzde yüz uygun şekilde imal edilir.',
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName || !formEmail) return;
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormName('');
      setFormEmail('');
      setFormPhone('');
      setFormScale('');
      setFormMessage('');
    }, 4500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.4 }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12"
    >
      {/* Intro Header */}
      <div className="max-w-3xl text-left space-y-3">
        <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#0012FF] dark:text-cyan-400 block animate-pulse">
          {t.contact.tag}
        </span>
        <h1 className="text-3xl sm:text-5xl font-display font-medium tracking-tight text-gray-900 dark:text-white leading-tight">
          {t.contact.title}
        </h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm sm:text-base leading-relaxed max-w-2xl">
          {t.contact.desc}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
        {/* Contact Form Desk (Left/Colspan 3) */}
        <div className="lg:col-span-3 bg-white dark:bg-slate-900 border border-gray-150 dark:border-white/10 p-6 sm:p-8 rounded-3xl text-left">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
            {t.contact.formSubtitle}
          </h3>

          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.div
                key="contact-success"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="bg-[#00FF00]/10 border border-[#00FF00]/20 p-8 rounded-2xl text-center space-y-3"
              >
                <div className="h-12 w-12 bg-[#00FF00]/20 rounded-full flex items-center justify-center mx-auto text-[#00FF00]">
                  <ShieldCheck className="h-6 w-6 stroke-[2.5]" />
                </div>
                <h4 className="text-lg font-bold text-gray-900 dark:text-white">
                  {t.contact.successTitle}
                </h4>
                <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 leading-relaxed max-w-md mx-auto">
                  {t.contact.successDesc}
                </p>
              </motion.div>
            ) : (
              <motion.form key="contact-form" onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1 text-left">
                    <label className="text-xs font-mono font-bold text-gray-400 dark:text-gray-500 block">
                      {t.contact.fullName}
                    </label>
                    <input
                      required
                      type="text"
                      value={formName}
                      onChange={(e) => setFormName(e.target.value)}
                      className="w-full bg-gray-50 dark:bg-slate-950 border border-gray-250 dark:border-white/10 rounded-xl px-4 py-2.5 text-xs outline-none focus:ring-1 focus:ring-[#0012FF]"
                    />
                  </div>
                  <div className="space-y-1 text-left">
                    <label className="text-xs font-mono font-bold text-gray-400 dark:text-gray-500 block">
                      {t.contact.emailAddress}
                    </label>
                    <input
                      required
                      type="email"
                      value={formEmail}
                      onChange={(e) => setFormEmail(e.target.value)}
                      className="w-full bg-gray-50 dark:bg-slate-950 border border-gray-250 dark:border-white/10 rounded-xl px-4 py-2.5 text-xs outline-none focus:ring-1 focus:ring-[#0012FF]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1 text-left">
                    <label className="text-xs font-mono font-bold text-gray-400 dark:text-gray-500 block">
                      {t.contact.phoneNumber}
                    </label>
                    <input
                      type="tel"
                      value={formPhone}
                      onChange={(e) => setFormPhone(e.target.value)}
                      className="w-full bg-gray-50 dark:bg-slate-950 border border-gray-250 dark:border-white/10 rounded-xl px-4 py-2.5 text-xs outline-none focus:ring-1 focus:ring-[#0012FF]"
                    />
                  </div>
                  <div className="space-y-1 text-left">
                    <label className="text-xs font-mono font-bold text-gray-400 dark:text-gray-500 block">
                      {t.contact.projectScaleTitle}
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 25,000 sq ft"
                      value={formScale}
                      onChange={(e) => setFormScale(e.target.value)}
                      className="w-full bg-gray-50 dark:bg-slate-950 border border-gray-250 dark:border-white/10 rounded-xl px-4 py-2.5 text-xs outline-none focus:ring-1 focus:ring-[#0012FF]"
                    />
                  </div>
                </div>

                <div className="space-y-1 text-left">
                  <label className="text-xs font-mono font-bold text-gray-400 dark:text-gray-500 block">
                    {t.contact.message}
                  </label>
                  <textarea
                    rows={4}
                    value={formMessage}
                    onChange={(e) => setFormMessage(e.target.value)}
                    className="w-full bg-gray-50 dark:bg-slate-950 border border-gray-250 dark:border-white/10 rounded-xl px-4 py-2.5 text-xs outline-none focus:ring-1 focus:ring-[#0012FF] resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 px-4 rounded-xl bg-gray-950 dark:bg-[#00FF00] dark:text-gray-950 text-white font-extrabold text-xs transition uppercase flex items-center justify-center gap-2 hover:bg-gray-800 dark:hover:bg-[#00D000] cursor-pointer"
                >
                  <Send className="h-4 w-4" />
                  <span>{t.contact.submitInquiry}</span>
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>

        {/* Info Sidebar Desk (Right/Colspan 2) */}
        <div className="lg:col-span-2 space-y-6 text-left">
          {/* Corporate Addresses */}
          <div className="bg-gray-905 dark:bg-slate-950 text-white p-6 sm:p-8 rounded-3xl space-y-4">
            <h4 className="text-xs font-mono font-black tracking-widest text-[#00FF00] uppercase">
              {t.contact.headquarters}
            </h4>
            <div className="space-y-3.5 text-xs sm:text-sm text-gray-300">
              <div className="flex items-start gap-2.5">
                <MapPin className="h-5 w-5 text-[#4D64FF] flex-shrink-0" />
                <span>{t.contact.hqAddress}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="h-5 w-5 text-[#4D64FF] flex-shrink-0" />
                <span>{t.contact.phoneLabel}: +353 (0) 1 897 0214</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="h-5 w-5 text-[#4D64FF] flex-shrink-0" />
                <span>{t.contact.emailLabel}: bidding@xelektrik.com</span>
              </div>
            </div>

            <div className="h-px bg-white/10 my-4" />

            <div className="space-y-1.5 text-xs">
              <span className="font-mono text-gray-500 uppercase block">{t.contact.workingHours}</span>
              <div className="flex items-center gap-2 text-gray-200">
                <Clock className="h-4 w-4 text-[#00FF00]" />
                <span>{t.contact.workingHoursVal}</span>
              </div>
            </div>
          </div>

          {/* Interactive FAQs Accordion */}
          <div className="bg-white dark:bg-slate-900 border border-gray-150 dark:border-white/10 p-6 rounded-3xl space-y-4">
            <h4 className="text-xs font-mono font-bold tracking-widest text-gray-400 dark:text-gray-500 uppercase flex items-center gap-1.5 select-none">
              <HelpCircle className="h-4 w-4" />
              <span>{t.contact.faqTitle}</span>
            </h4>

            <div className="space-y-2.5">
              {faqs.map((item, id) => {
                const isOpen = activeFaq === id;
                return (
                  <div
                    key={id}
                    className="border-b border-gray-100 dark:border-white/5 pb-2.5 last:border-none"
                  >
                    <button
                      onClick={() => setActiveFaq(isOpen ? null : id)}
                      className="w-full text-left font-bold text-xs sm:text-sm text-gray-900 dark:text-white flex justify-between items-center py-1.5 outline-none cursor-pointer"
                    >
                      <span>{language === 'en' ? item.qEn : item.qTr}</span>
                      <span className="font-mono text-xs text-[#0012FF] dark:text-cyan-400">
                        {isOpen ? '[-]' : '[+]'}
                      </span>
                    </button>
                    <AnimatePresence>
                      {isOpen && (
                        <motion.p
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed pt-1.5"
                        >
                          {language === 'en' ? item.aEn : item.aTr}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
