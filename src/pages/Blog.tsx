/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useApp } from '../context/AppContext';
import { BookOpen, Search, Filter, Calendar, Clock, ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';

interface Article {
  id: string;
  category: 'substation' | 'bim' | 'grid';
  titleEn: string;
  titleTr: string;
  summaryEn: string;
  summaryTr: string;
  readTime: number;
  date: string;
  contentEn: string;
  contentTr: string;
}

export default function Blog() {
  const { t, language } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCat, setSelectedCat] = useState<'all' | 'substation' | 'bim' | 'grid'>('all');
  const [activeArticleId, setActiveArticleId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const PAGE_SIZE = 2;

  const articles: Article[] = [
    {
      id: 'art-1',
      category: 'substation',
      titleEn: 'Calculating 3-Phase Transformer Secondary Settings',
      titleTr: '3 Fazlı Trafo Sekonder Ayarlarının Hesaplanması',
      summaryEn: 'An in-depth look into standard substation secondary torque limits, impedance calculations, and load balancing ratios.',
      summaryTr: 'Standart trafo merkezi sekonder tork limitleri, empedans hesaplamaları ve yük dengeleme oranlarına derinlemesine bakış.',
      readTime: 6,
      date: '2026-05-18',
      contentEn: `### Understanding Transformer Impedance and Short-Circuit Current
Substation transformers are engineered to step down high-voltage grids safely under shifting industrial factors. This technical report covers winding impedance formulas and phase matching calculations.

#### Core Formula Selection:
The symmetrical three-phase short-circuit fault current ($I_{sc}$) is calculated using the system secondary voltage and winding parameters:
$$I_{sc} = \\frac{I_{rated}}{\\%Z} \\times 100$$

Where $I_{rated}$ represents the rated full-load current of the transformer secondary, and $\\%Z$ represents the percent impedance on the manufacturer datasheet. Proper calibrations protect upstream breakers from magnetic trip sags and coordination failures.`,
      contentTr: `### Transformatör Empedansı ve Kısa Devre Akımının Anlaşılması
Trafo merkezi transformatörleri, değişen endüstriyel faktörler altında yüksek voltajlı şebekeleri güvenli bir şekilde düşürmek üzere tasarlanmıştır. Bu teknik rapor, sargı empedansı formüllerini ve faz eşleştirme hesaplamalarını kapsar.

#### Temel Formül Seçimi:
Simetrik üç fazlı kısa devre arıza akımı ($I_{sc}$), sistem sekonder voltajı ve sargı parametreleri kullanılarak hesaplanır:
$$I_{sc} = \\frac{I_{rated}}{\\%Z} \\times 100$$

Burada $I_{rated}$ transformatör sekonderinin nominal tam yük akımını, $\\%Z$ ise üretici veri sayfasındaki yüzde empedansı temsil eder. Doğgun kalibrasyonlar, üst akım kesicileri manyetik açma dalgalanmalarından ve koordinasyon hatalarından korur.`,
    },
    {
      id: 'art-2',
      category: 'bim',
      titleEn: 'LOD 400 Coordination Protocols in Modern BIM Workflows',
      titleTr: 'Modern BIM İş Akışlarında LOD 400 Koordinasyon Protokolleri',
      summaryEn: 'How solving physical spatial collisions inside Autodesk Revit environment prior to fabrication reduces on-site construction delays.',
      summaryTr: 'Autodesk Revit ortamında imalat öncesinde fiziksel boyutsal çakışmaları çözmenin şantiye gecikmelerini nasıl azalttığı üzerine analiz.',
      readTime: 8,
      date: '2026-05-12',
      contentEn: `### Driving Collision Rate Down to Absolute Zero
LOD 400 (Level of Development) implies high accuracy detail where components are modeled with precise fabrication, assembly, and installation details. We analyze spatial tolerances for cable tray routing and busway brackets.

#### Our BIM Quality Gates:
1. **Geometric Cleansing**: Rigid checking of conduit clearances.
2. **Access Clearance Zone**: Isolating switchgear access corridors.
3. **Weight Load Modeling**: Structuring overhead steel attachments under certified torque ratings.`,
      contentTr: `### Çakışma Oranını Mutlak Sıfıra İndirmek
LOD 400 (Level of Development), bileşenlerin kesin imalat, montaj ve kurulum detaylarıyla modellendiği yüksek hassasiyetli detayı ifade eder. Kablo tavası rotaları ve bara braketleri için alansal toleransları analiz ediyoruz.

#### BIM Kalite Geçitlerimiz:
1. **Geometrik Temizlik**: Boru hattı boşluklarının katı tespiti.
2. **Erişim Korumalı Bölge**: Switchgear erişim koridorlarının izole edilmesi.
3. **Ağırlık Yükü Modellemesi**: Sertifikalı tork değerleri altında asma çelik bağlantıların yapılandırılması.`,
    },
    {
      id: 'art-3',
      category: 'grid',
      titleEn: 'N+1 Resilient Architectures for Hyperscale Datacenters',
      titleTr: 'Hiper Ölçekli Veri Merkezleri İçin N+1 Yedeklilik Mimarileri',
      summaryEn: 'Integrating high-speed automatic transfer switches (ATS) and static UPS battery buffers for zero downtime operation.',
      summaryTr: 'Sıfır kesinti süreli çalışma için yüksek hızlı otomatik transfer şalterleri (ATS) ve statik UPS akü tamponlarının entegrasyonu.',
      readTime: 5,
      date: '2026-05-02',
      contentEn: `### High-Efficiency Power Riser Redundancy
Datacenter power sags result in catastrophic system loss. X Elektrik connects dual-feed (2N) primary circuits supported by parallel static switches and synchronous backup generator controls.

This article reviews the latency limitations during automated grid switching, mapping physical microgrid controller inputs, and circuit isolation protocols under NEC regulatory targets.`,
      contentTr: `### Yüksek Verimli Güç Sütun Yedekliliği
Veri merkezi güç dalgalanmaları feci sistem kayıplarına yol açar. X Elektrik, paralel statik transfer anahtarları ve senkronize yedek jeneratör kontrolleri ile desteklenen çift beslemeli (2N) birincil devreleri bağlar.

Bu makale, otomatik şebeke geçişi sırasındaki gecikme sınırlamalarını, fiziksel mikroşebeke denetleyici girişlerinin haritalandırılmasını ve NEC düzenleme hedefleri altındaki devre izolasyon protokollerini gözden geçirmektedir.`,
    },
  ];

  const filtered = articles.filter((art) => {
    const title = language === 'en' ? art.titleEn : art.titleTr;
    const summary = language === 'en' ? art.summaryEn : art.summaryTr;
    const matchesSearch =
      title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      summary.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = selectedCat === 'all' || art.category === selectedCat;
    return matchesSearch && matchesCat;
  });

  const activeArticle = articles.find((art) => art.id === activeArticleId);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const activePage = Math.min(currentPage, Math.max(totalPages, 1));
  const displayedArticles = filtered.slice(
    (activePage - 1) * PAGE_SIZE,
    activePage * PAGE_SIZE
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.4 }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
    >
      <AnimatePresence mode="wait">
        {activeArticle ? (
          <motion.div
            key="article-detail"
            initial={{ opacity: 0, x: -15 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 15 }}
            className="space-y-6 text-left max-w-3xl"
          >
            <button
              onClick={() => setActiveArticleId(null)}
              className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[#0012FF] dark:text-cyan-400 border border-gray-250 dark:border-white/10 rounded-xl px-4 py-2.5 bg-white dark:bg-slate-900 cursor-pointer"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>{t.blog.backToBlog}</span>
            </button>

            <div className="space-y-3 pt-4">
              <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-gray-150 dark:bg-white/10 text-gray-500 uppercase font-bold">
                {activeArticle.category}
              </span>
              <h1 className="text-2xl sm:text-4xl font-display font-bold text-gray-900 dark:text-white leading-tight">
                {language === 'en' ? activeArticle.titleEn : activeArticle.titleTr}
              </h1>
              <div className="flex items-center gap-4 text-xs font-mono text-gray-400">
                <span className="flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5" />
                  {activeArticle.date}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5" />
                  {activeArticle.readTime} {t.blog.minRead}
                </span>
              </div>
            </div>

            <div className="h-px bg-gray-150 dark:bg-white/10 my-6" />

            <div className="prose prose-slate dark:prose-invert space-y-4 text-sm sm:text-base text-gray-700 dark:text-gray-300 leading-relaxed font-sans">
              <p className="font-medium text-gray-900 dark:text-white">
                {language === 'en' ? activeArticle.summaryEn : activeArticle.summaryTr}
              </p>
              {language === 'en' ? (
                <div className="whitespace-pre-line">{activeArticle.contentEn}</div>
              ) : (
                <div className="whitespace-pre-line">{activeArticle.contentTr}</div>
              )}
            </div>
          </motion.div>
        ) : (
          <motion.div key="blog-grid" className="space-y-8 text-left">
            {/* Page Header */}
            <div className="max-w-3xl space-y-3">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#0012FF] dark:text-cyan-400 block">
                {t.blog.tag}
              </span>
              <h1 className="text-3xl sm:text-5xl font-display font-medium tracking-tight text-gray-900 dark:text-white leading-tight">
                {t.blog.title}
              </h1>
              <p className="text-gray-500 dark:text-gray-400 text-sm sm:text-base leading-relaxed max-w-2xl">
                {t.blog.desc}
              </p>
            </div>

            {/* Controls Bar */}
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between border-y border-gray-150 dark:border-white/10 py-4 select-none">
              {/* Search */}
              <div className="relative w-full sm:max-w-xs">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder={t.blog.searchPlaceholder}
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full bg-white dark:bg-slate-900 border border-gray-150 dark:border-white/10 rounded-xl pl-10 pr-4 py-2 text-xs focus:ring-1 focus:ring-[#0012FF] outline-none text-gray-800 dark:text-white"
                />
              </div>

              {/* Filter pills */}
              <div className="flex flex-wrap gap-2 w-full sm:w-auto">
                {(['all', 'substation', 'bim', 'grid'] as const).map((cat) => (
                  <button
                    key={cat}
                    onClick={() => {
                      setSelectedCat(cat);
                      setCurrentPage(1);
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono uppercase transition cursor-pointer ${
                      selectedCat === cat
                        ? 'bg-gray-950 text-white dark:bg-cyan-400 dark:text-black font-bold'
                        : 'bg-white dark:bg-slate-900 text-gray-500 dark:text-gray-400 border border-gray-150 dark:border-white/10 hover:bg-gray-50'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Articles Grid list */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayedArticles.map((art) => (
                <div
                  key={art.id}
                  className="bg-white dark:bg-slate-900 border border-gray-150 dark:border-white/10 rounded-2xl p-6 flex flex-col justify-between hover:shadow-md transition duration-300"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-xs font-mono text-gray-400">
                      <span className="uppercase text-gray-500">{art.category}</span>
                      <span>{art.date}</span>
                    </div>

                    <h3 className="text-lg font-bold text-gray-900 dark:text-white hover:text-[#0012FF] pointer-events-none transition line-clamp-2">
                      {language === 'en' ? art.titleEn : art.titleTr}
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400 text-xs leading-relaxed line-clamp-3">
                      {language === 'en' ? art.summaryEn : art.summaryTr}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-gray-100 dark:border-white/10 flex items-center justify-between">
                    <span className="text-xs text-gray-400 font-mono flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {art.readTime} {t.blog.minRead}
                    </span>
                    <button
                      onClick={() => setActiveArticleId(art.id)}
                      className="text-xs font-mono font-bold text-[#0012FF] dark:text-cyan-300 hover:underline cursor-pointer"
                    >
                      {t.blog.readMore} →
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 pt-4" id="blog-pagination">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={activePage === 1}
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
                      onClick={() => setCurrentPage(pageNum)}
                      className={`h-10 w-10 text-xs font-mono font-bold rounded-xl transition-all cursor-pointer border ${
                        activePage === pageNum
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
                  disabled={activePage === totalPages}
                  className="p-2.5 border border-gray-200 dark:border-white/10 rounded-xl disabled:opacity-40 hover:bg-[#0012FF]/5 dark:hover:bg-cyan-400/10 transition-colors cursor-pointer text-gray-700 dark:text-gray-300 bg-white dark:bg-slate-900"
                  aria-label="Next page"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
