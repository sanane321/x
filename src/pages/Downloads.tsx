import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useApp } from '../context/AppContext';
import { 
  FileText, 
  Search, 
  Download, 
  CheckCircle2, 
  Loader2, 
  Layers, 
  SlidersHorizontal,
  FileCode2,
  Award
} from 'lucide-react';

interface DownloadItem {
  id: string;
  titleKey: 'mvsSpecTitle' | 'megapackManualTitle' | 'bimFamilyTitle' | 'isoCertTitle' | 'gridTopoTitle';
  descKey: 'mvsSpecDesc' | 'megapackManualDesc' | 'bimFamilyDesc' | 'isoCertDesc' | 'gridTopoDesc';
  category: 'specs' | 'bim' | 'certificates';
  size: string;
  extension: string;
  filename: string;
}

export default function Downloads() {
  const { t } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'specs' | 'bim' | 'certificates'>('all');
  const [downloadingStates, setDownloadingStates] = useState<Record<string, 'idle' | 'loading' | 'completed'>>({});

  const downloadItems: DownloadItem[] = [
    {
      id: 'mvs-spec',
      titleKey: 'mvsSpecTitle',
      descKey: 'mvsSpecDesc',
      category: 'specs',
      size: '4.8 MB',
      extension: 'PDF',
      filename: 'XE_MVS_24kV_Specs.pdf'
    },
    {
      id: 'megapack-manual',
      titleKey: 'megapackManualTitle',
      descKey: 'megapackManualDesc',
      category: 'specs',
      size: '12.4 MB',
      extension: 'PDF',
      filename: 'XE_MegaPack_5MW_Manual.pdf'
    },
    {
      id: 'mvs-bim',
      titleKey: 'bimFamilyTitle',
      descKey: 'bimFamilyDesc',
      category: 'bim',
      size: '32.1 MB',
      extension: 'RFA',
      filename: 'XE-MVS_Clearance_LOD400.rfa'
    },
    {
      id: 'iso-qa',
      titleKey: 'isoCertTitle',
      descKey: 'isoCertDesc',
      category: 'certificates',
      size: '1.2 MB',
      extension: 'PDF',
      filename: 'XE_ISO_9001_Declaration.pdf'
    },
    {
      id: 'datacenter-topo',
      titleKey: 'gridTopoTitle',
      descKey: 'gridTopoDesc',
      category: 'certificates',
      size: '8.7 MB',
      extension: 'PDF',
      filename: 'HD_Datacenter_Topologies.pdf'
    }
  ];

  const handleDownloadTrigger = (item: DownloadItem) => {
    if (downloadingStates[item.id] === 'loading' || downloadingStates[item.id] === 'completed') return;

    // Start loading state
    setDownloadingStates(prev => ({ ...prev, [item.id]: 'loading' }));

    // Simulate download timeout
    setTimeout(() => {
      setDownloadingStates(prev => ({ ...prev, [item.id]: 'completed' }));
      
      // Actively trigger download inside browser using blob/dataURI to make it highly real!
      try {
        const dummyText = `X ELEKTRIK INDUSTRIAL BLUEPRINT GATEWAY\n\nFilename: ${item.filename}\nSpec Category: ${item.category}\nCompliance standard: ISO 9001:2015, NEC, IEC v2026\nVerify hash: ${Math.random().toString(36).substring(7).toUpperCase()}\n\nThis is a certified engineering asset stub representing X Elektrik technical catalog documentation.`;
        const blob = new Blob([dummyText], { type: 'text/plain' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = item.filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      } catch (err) {
        console.error('Trigger download failed', err);
      }
    }, 1200);
  };

  // Filtering Logic
  const filteredItems = downloadItems.filter(item => {
    const title = t.downloads.items[item.titleKey] || '';
    const desc = t.downloads.items[item.descKey] || '';
    const matchesSearch = 
      title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      desc.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = activeTab === 'all' || item.category === activeTab;
    
    return matchesSearch && matchesCategory;
  });

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'specs':
        return <FileText className="h-5 w-5 text-[#0012FF]" />;
      case 'bim':
        return <FileCode2 className="h-5 w-5 text-cyan-500" />;
      case 'certificates':
        return <Award className="h-5 w-5 text-emerald-500" />;
      default:
        return <FileText className="h-5 w-5 text-gray-500" />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.4 }}
      className="space-y-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
      id="downloads-page"
    >
      {/* Page Header */}
      <div className="max-w-3xl text-left space-y-3">
        <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#0012FF] block">
          {t.downloads.tag}
        </span>
        <h1 className="text-3xl sm:text-5xl font-display font-medium tracking-tight text-gray-900 dark:text-white leading-tight">
          {t.downloads.title}
        </h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm sm:text-base leading-relaxed max-w-2xl">
          {t.downloads.desc}
        </p>
      </div>

      {/* Control Panel: Search & Filter Tabs */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-gray-150 dark:border-white/10">
        
        {/* Category Filter Tabs */}
        <div className="flex flex-wrap gap-2">
          {(['all', 'specs', 'bim', 'certificates'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-2 px-4 rounded-xl text-xs font-bold uppercase tracking-wide transition-all cursor-pointer border ${
                activeTab === tab
                  ? 'bg-gray-950 dark:bg-cyan-400 text-white dark:text-slate-950 border-gray-950 dark:border-cyan-400 shadow-sm'
                  : 'bg-white dark:bg-slate-900 text-gray-500 dark:text-gray-400 border-gray-200 dark:border-white/10 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              {tab === 'all' && t.downloads.categories.all}
              {tab === 'specs' && t.downloads.categories.specs}
              {tab === 'bim' && t.downloads.categories.bim}
              {tab === 'certificates' && t.downloads.categories.certificates}
            </button>
          ))}
        </div>

        {/* Floating Custom Search input */}
        <div className="relative w-full md:max-w-sm">
          <input
            type="text"
            placeholder={t.downloads.searchPlaceholder}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-gray-200 dark:border-white/15 bg-white dark:bg-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#0012FF] dark:focus:ring-cyan-400 placeholder-gray-400 text-gray-800 dark:text-white transition-all"
          />
          <Search className="absolute left-3.5 top-3 h-4 w-4 text-gray-400" />
        </div>

      </div>

      {/* Downloads Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {filteredItems.map((item) => {
            const downloadStatus = downloadingStates[item.id] || 'idle';
            return (
              <motion.div
                layout
                key={item.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="bg-white dark:bg-slate-900 border border-gray-150 dark:border-white/10 p-6 rounded-2xl flex flex-col justify-between hover:shadow-md dark:hover:border-cyan-400/30 transition-shadow text-left group"
              >
                <div className="space-y-4">
                  
                  {/* Category Pill and Type details */}
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase font-bold text-gray-500 dark:text-gray-400">
                      {getCategoryIcon(item.category)}
                      {t.downloads.categories[item.category]}
                    </span>
                    <span className="bg-gray-100 dark:bg-slate-800 text-gray-500 dark:text-gray-400 text-[10px] font-mono font-bold px-2 py-0.5 rounded">
                      {item.extension}
                    </span>
                  </div>

                  {/* Document Metas */}
                  <div className="space-y-1">
                    <h3 className="text-base font-bold text-gray-900 dark:text-white leading-snug group-hover:text-[#0012FF] dark:group-hover:text-cyan-400 transition-colors">
                      {t.downloads.items[item.titleKey]}
                    </h3>
                    <p className="text-xs text-gray-400 leading-relaxed min-h-[48px]">
                      {t.downloads.items[item.descKey]}
                    </p>
                  </div>

                </div>

                {/* Bottom Trigger Panel */}
                <div className="mt-6 pt-4 border-t border-gray-100 dark:border-white/5 flex items-center justify-between">
                  <div className="font-mono text-[11px] text-gray-400">
                    <span>{t.downloads.fileSize}: </span>
                    <strong className="text-gray-700 dark:text-gray-300">{item.size}</strong>
                  </div>

                  {/* Interactive Button */}
                  <button
                    onClick={() => handleDownloadTrigger(item)}
                    disabled={downloadStatus === 'loading'}
                    className={`py-2 px-4 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer border ${
                      downloadStatus === 'completed'
                        ? 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20 dark:text-emerald-400'
                        : downloadStatus === 'loading'
                        ? 'bg-gray-100 dark:bg-slate-800 text-gray-400 border-transparent'
                        : 'bg-[#0012FF]/5 hover:bg-[#0012FF] hover:text-white dark:bg-cyan-500/5 dark:hover:bg-cyan-400 dark:text-cyan-400 dark:hover:text-slate-950 border-[#0012FF]/10 dark:border-cyan-400/20 text-[#0012FF]'
                    }`}
                  >
                    {downloadStatus === 'loading' && (
                      <>
                        <Loader2 className="h-3.5 w-3.5 animate-spin" />
                        <span>{t.downloads.downloadingBtn}</span>
                      </>
                    )}
                    {downloadStatus === 'completed' && (
                      <>
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                        <span>{t.downloads.downloadedBtn}</span>
                      </>
                    )}
                    {downloadStatus === 'idle' && (
                      <>
                        <Download className="h-3.5 w-3.5" />
                        <span>{t.downloads.downloadBtn}</span>
                      </>
                    )}
                  </button>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Empty State Banner */}
      {filteredItems.length === 0 && (
        <div className="bg-gray-50 dark:bg-slate-900 border border-gray-150 dark:border-white/5 rounded-2xl py-12 px-6 text-center space-y-4">
          <Layers className="h-10 w-10 text-gray-300 mx-auto" />
          <div className="space-y-1">
            <h4 className="font-bold text-gray-700 dark:text-gray-300">No results found</h4>
            <p className="text-xs text-gray-400">Try adjusting your search filters or try another word.</p>
          </div>
          <button
            onClick={() => { setSearchQuery(''); setActiveTab('all'); }}
            className="text-xs font-bold text-[#0012FF] dark:text-cyan-400 hover:underline bg-transparent border-0 cursor-pointer"
          >
            Clear Search Filter
          </button>
        </div>
      )}

    </motion.div>
  );
}
