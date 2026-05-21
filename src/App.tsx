/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowUpRight, 
  Menu, 
  X, 
  ShieldCheck, 
  MapPin,
  Sun,
  Moon,
  Globe2,
  ChevronDown,
  ShoppingCart
} from 'lucide-react';

import Logo from './components/Logo';
import { useApp } from './context/AppContext';
import { EstimateConfiguration, CostBreakdown } from './types';

// Standalone separate page views
import Home from './pages/Home';
import Services from './pages/Services';
import Products from './pages/Products';
import Estimator from './pages/Estimator';
import Portfolio from './pages/Portfolio';
import Blog from './pages/Blog';
import About from './pages/About';
import Careers from './pages/Careers';
import Contacts from './pages/Contacts';
import Downloads from './pages/Downloads';
import Iot from './pages/Iot';
import BasketDrawer from './components/BasketDrawer';

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

interface AppProps {
  ssrPath?: string;
}

export default function App({ ssrPath }: AppProps) {
  const { 
    t, 
    theme, 
    language, 
    toggleTheme, 
    toggleLanguage, 
    setSelectedIotUseCase, 
    setSelectedCategory, 
    basket, 
    isBasketOpen, 
    setBasketOpen 
  } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileIotSubmenuOpen, setMobileIotSubmenuOpen] = useState(false);
  const [mobileProductsSubmenuOpen, setMobileProductsSubmenuOpen] = useState(false);
  const [desktopIotSubmenuOpen, setDesktopIotSubmenuOpen] = useState(false);
  const [desktopProductsSubmenuOpen, setDesktopProductsSubmenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  
  // Custom router state synchronized with the URL path or hash
  const [currentPath, setCurrentPath] = useState<string>(() => {
    if (ssrPath) {
      const cleanSsr = ssrPath.startsWith('#') ? ssrPath : `#/${ssrPath.replace(/^\//, '')}`;
      return cleanSsr === '#/' ? '#/home' : cleanSsr;
    }
    if (typeof window === 'undefined') return '#/home';
    
    // Support direct clean URL path first (e.g. /services -> #/services)
    // To prevent hydration mismatches, we must ONLY use window.location.pathname during
    // initial render/hydration because URL hash is not visible to the server.
    const pathname = window.location.pathname;
    if (pathname && pathname !== '/') {
      return `#/${pathname.replace(/^\//, '')}`;
    }
    
    return '#/home';
  });

  // Handle URL hash changes
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // After mount (safe from hydration mismatches), sync with the actual client URL hash or pathname
    const hash = window.location.hash;
    const pathname = window.location.pathname;
    if (hash && hash !== '#/' && hash !== '') {
      setCurrentPath(hash);
    } else if (pathname && pathname !== '/') {
      setCurrentPath(`#/${pathname.replace(/^\//, '')}`);
    }

    const handleHashChange = () => {
      const hash = window.location.hash;
      const cleanHash = (hash === '' || hash === '#/') ? '#/home' : hash;
      setCurrentPath(cleanHash);
      window.scrollTo({ top: 0, behavior: 'instant' });
    };

    // If starting on empty/root hash or direct URL, align them
    if (pathname && pathname !== '/') {
      const clean = `#/${pathname.replace(/^\//, '')}`;
      if (hash !== clean) {
        window.location.hash = clean;
      }
    } else if (hash === '' || hash === '#/') {
      window.location.hash = '#/home';
    }

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Navigation utility - updates both actual browser URL path (for SEO structure) and hash
  const navigateTo = (pathOrHash: string) => {
    const route = pathOrHash.replace(/^#\//, '').replace(/^\//, ''); // e.g. "services"
    const cleanHash = `#/${route}`;
    const cleanPath = route === 'home' ? '/' : `/${route}`;
    
    if (typeof window !== 'undefined') {
      window.history.pushState(null, '', cleanPath);
      window.location.hash = cleanHash;
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
    
    setCurrentPath(cleanHash);
    setMobileMenuOpen(false);
  };

  // Custom interactive staged inquiries preserved at root level
  const [inquiries, setInquiries] = useState<InquiryItem[]>([
    {
      id: "RFP-9407",
      clientName: "Vertiv Systems Ltd",
      clientEmail: "bids@vertiv.com",
      projectType: "datacenter",
      scaleSqFt: 45000,
      specs: "1200 A - 277/480V • Backup N+1 Power",
      estimatedCost: 3520000,
      timeline: "14 Weeks Estimated",
      timestamp: "Today at 02:44 AM"
    },
    {
      id: "RFP-9118",
      clientName: "BMW Logistics Hub",
      clientEmail: "infra@bmw.ie",
      projectType: "renewable",
      scaleSqFt: 110000,
      specs: "400 A - 120/208V • Sustainable Microgrid",
      estimatedCost: 2189000,
      timeline: "11 Weeks Estimated",
      timestamp: "Yesterday"
    }
  ]);

  // Handle client scroll state for elegant header transitions
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handler for adding dynamic RFPs from the SmartGrid estimator
  const handleAddNewInquiry = (config: EstimateConfiguration & { cost: CostBreakdown; timeline: string }) => {
    const randomId = `RFP-${Math.floor(1000 + Math.random() * 9000)}`;
    const nowStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    const lineFeedSpecs = `${config.amperage} A - ${config.voltage} ${
      [
        config.resilientPower ? '• UPS' : '',
        config.smartControls ? '• Smart' : '',
        config.greenEnergy ? '• Solar' : '',
        config.industrialMachinery ? '• Heavys' : '',
        config.networking ? '• Comm' : '',
      ].filter(Boolean).join(' ')
    }`;

    const newInquiry: InquiryItem = {
      id: randomId,
      clientName: "You (Staged)",
      clientEmail: "local.sandbox@x-elektrik.com",
      projectType: config.projectType,
      scaleSqFt: config.areaSqFt,
      specs: lineFeedSpecs,
      estimatedCost: config.cost.totalCost,
      timeline: config.timeline,
      timestamp: `Today at ${nowStr}`,
      hasUserConfig: true
    };

    setInquiries(prev => [newInquiry, ...prev]);
  };

  const handleDismissInquiry = (id: string) => {
    setInquiries(prev => prev.filter(item => item.id !== id));
  };

  const handleAddBasketInquiry = (newInquiry: InquiryItem) => {
    setInquiries(prev => [newInquiry, ...prev]);
  };

  // Helper to determine active link states
  const isLinkActive = (hash: string) => currentPath === hash;

  // Render proper subpage component
  const renderPage = () => {
    switch (currentPath) {
      case '#/home':
        return <Home key="home" onNavigate={navigateTo} />;
      case '#/services':
        return <Services key="services" onNavigate={navigateTo} />;
      case '#/products':
        return <Products key="products" onAddNewInquiry={handleAddNewInquiry} />;
      case '#/estimator':
        return (
          <Estimator 
            key="estimator"
            inquiries={inquiries}
            onAddNewInquiry={handleAddNewInquiry}
            onDismissInquiry={handleDismissInquiry}
          />
        );
      case '#/portfolio':
        return <Portfolio key="portfolio" />;
      case '#/blog':
        return <Blog key="blog" />;
      case '#/about':
        return <About key="about" />;
      case '#/careers':
        return <Careers key="careers" />;
      case '#/contact':
        return <Contacts key="contact" />;
      case '#/downloads':
        return <Downloads key="downloads" />;
      case '#/iot':
        return <Iot key="iot" />;
      default:
        return <Home key="home" onNavigate={navigateTo} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-[#0b101d] text-gray-800 dark:text-gray-100 font-sans antialiased selection:bg-[#0012FF]/10 selection:text-[#0012FF] flex flex-col justify-between transition-colors duration-200">
      
      {/* DESKTOP PERSISTENT LEFT SIDEBAR */}
      <aside className="hidden xl:flex fixed top-0 left-0 bottom-0 w-72 bg-white dark:bg-[#0c1322] border-r border-gray-150 dark:border-white/10 flex-col justify-between p-6 z-30 overflow-y-auto">
        <div className="space-y-6">
          <div className="pb-4 border-b border-gray-150 dark:border-white/5 flex items-center justify-between">
            <a 
              href="/"
              onClick={(e) => { e.preventDefault(); navigateTo('#/home'); }} 
              className="flex-shrink-0 transition-opacity hover:opacity-90 cursor-pointer bg-transparent border-none p-0 block no-underline"
            >
              <Logo size="md" lightBackground={theme === 'light'} />
            </a>
          </div>
          
          <nav className="flex flex-col gap-1 text-[11px] font-sans font-bold tracking-wider uppercase">
            <a 
              href="/"
              onClick={(e) => { e.preventDefault(); navigateTo('#/home'); }} 
              className={`w-full text-left transition-colors cursor-pointer bg-transparent border-none px-4 py-2.5 rounded-xl no-underline block ${
                isLinkActive('#/home') ? 'text-[#0012FF] dark:text-cyan-400 bg-[#0012FF]/5 dark:bg-cyan-400/5 font-extrabold' : 'text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/5 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              {t.nav.vision}
            </a>
            <a 
              href="/services"
              onClick={(e) => { e.preventDefault(); navigateTo('#/services'); }} 
              className={`w-full text-left transition-colors cursor-pointer bg-transparent border-none px-4 py-2.5 rounded-xl no-underline block ${
                isLinkActive('#/services') ? 'text-[#0012FF] dark:text-cyan-400 bg-[#0012FF]/5 dark:bg-cyan-400/5 font-extrabold' : 'text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/5 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              {t.nav.services}
            </a>
            
            {/* Products Dropdown Accordion */}
            <div>
              <a 
                href="/products"
                onClick={(e) => {
                  e.preventDefault();
                  setDesktopProductsSubmenuOpen(!desktopProductsSubmenuOpen);
                  setSelectedCategory(null);
                  navigateTo('#/products');
                }} 
                className={`w-full flex items-center justify-between transition-colors cursor-pointer bg-transparent border-none px-4 py-2.5 rounded-xl no-underline ${
                  isLinkActive('#/products') ? 'text-[#0012FF] dark:text-cyan-400 bg-[#0012FF]/5 dark:bg-cyan-400/5 font-extrabold' : 'text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/5 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                <span>{t.nav.products}</span>
                <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${desktopProductsSubmenuOpen ? 'rotate-180' : ''}`} />
              </a>
              
              {desktopProductsSubmenuOpen && (
                <div className="pl-4 pr-1 mt-1 space-y-0.5 border-l border-gray-150 dark:border-white/10 flex flex-col">
                  <a 
                    href="/products"
                    onClick={(e) => {
                      e.preventDefault();
                      setSelectedCategory(null);
                      navigateTo('#/products');
                    }}
                    className="w-full text-left p-1.5 rounded-lg hover:bg-gray-50 dark:hover:bg-white/5 transition border-0 bg-transparent cursor-pointer text-[10px] font-mono font-medium text-gray-500 dark:text-gray-400 hover:text-[#0012FF] dark:hover:text-cyan-300 uppercase no-underline block"
                  >
                    🚀 {language === 'tr' ? '1. Tüm Sistemler' : '1. All Systems'}
                  </a>
                  <a 
                    href="/products?category=industrial"
                    onClick={(e) => {
                      e.preventDefault();
                      setSelectedCategory('industrial');
                      navigateTo('#/products');
                    }}
                    className="w-full text-left p-1.5 rounded-lg hover:bg-gray-50 dark:hover:bg-white/5 transition border-0 bg-transparent cursor-pointer text-[10px] font-mono font-medium text-gray-500 dark:text-gray-400 hover:text-[#0012FF] dark:hover:text-cyan-300 uppercase no-underline block"
                  >
                    🏭 {language === 'tr' ? '2. Ağır Sanayi' : '2. Heavy Industrial'}
                  </a>
                  <a 
                    href="/products?category=renewable"
                    onClick={(e) => {
                      e.preventDefault();
                      setSelectedCategory('renewable');
                      navigateTo('#/products');
                    }}
                    className="w-full text-left p-1.5 rounded-lg hover:bg-gray-50 dark:hover:bg-white/5 transition border-0 bg-transparent cursor-pointer text-[10px] font-mono font-medium text-gray-500 dark:text-gray-400 hover:text-[#0012FF] dark:hover:text-cyan-300 uppercase no-underline block"
                  >
                    ☀️ {language === 'tr' ? '3. Yenilenebilir' : '3. Renewable'}
                  </a>
                  <a 
                    href="/products?category=datacenter"
                    onClick={(e) => {
                      e.preventDefault();
                      setSelectedCategory('datacenter');
                      navigateTo('#/products');
                    }}
                    className="w-full text-left p-1.5 rounded-lg hover:bg-gray-50 dark:hover:bg-white/5 transition border-0 bg-transparent cursor-pointer text-[10px] font-mono font-medium text-gray-500 dark:text-gray-400 hover:text-[#0012FF] dark:hover:text-cyan-300 uppercase no-underline block"
                  >
                    💾 {language === 'tr' ? '4. Kritik Yedekleme' : '4. Critical Backup'}
                  </a>
                  <a 
                    href="/products?category=commercial"
                    onClick={(e) => {
                      e.preventDefault();
                      setSelectedCategory('commercial');
                      navigateTo('#/products');
                    }}
                    className="w-full text-left p-1.5 rounded-lg hover:bg-gray-50 dark:hover:bg-white/5 transition border-0 bg-transparent cursor-pointer text-[10px] font-mono font-medium text-gray-500 dark:text-gray-400 hover:text-[#0012FF] dark:hover:text-cyan-300 uppercase no-underline block"
                  >
                    🏢 {language === 'tr' ? '5. Akıllı Bina (BMS)' : '5. Smart BMS'}
                  </a>
                </div>
              )}
            </div>

            {/* IoT Grid Dropdown Accordion */}
            <div>
              <a 
                href="/iot"
                onClick={(e) => {
                  e.preventDefault();
                  setDesktopIotSubmenuOpen(!desktopIotSubmenuOpen);
                  navigateTo('#/iot');
                }} 
                className={`w-full flex items-center justify-between transition-colors cursor-pointer bg-transparent border-none px-4 py-2.5 rounded-xl no-underline ${
                  isLinkActive('#/iot') ? 'text-[#0012FF] dark:text-cyan-400 bg-[#0012FF]/5 dark:bg-cyan-400/5 font-extrabold' : 'text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/5 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                <span>{t.nav.iot}</span>
                <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${desktopIotSubmenuOpen ? 'rotate-180' : ''}`} />
              </a>
              
              {desktopIotSubmenuOpen && (
                <div className="pl-4 pr-1 mt-1 space-y-0.5 border-l border-gray-150 dark:border-white/10 flex flex-col">
                  <a 
                    href="/iot?usecase=thermal"
                    onClick={(e) => {
                      e.preventDefault();
                      setSelectedIotUseCase('thermal');
                      navigateTo('#/iot');
                    }}
                    className="w-full text-left p-1.5 rounded-lg hover:bg-gray-50 dark:hover:bg-white/5 transition border-0 bg-transparent cursor-pointer text-[10px] font-mono font-medium text-gray-500 dark:text-gray-400 hover:text-[#0012FF] dark:hover:text-cyan-300 uppercase no-underline block"
                  >
                    ❄️ 1. Predictive Cooling
                  </a>
                  <a 
                    href="/iot?usecase=peak-shaving"
                    onClick={(e) => {
                      e.preventDefault();
                      setSelectedIotUseCase('peak-shaving');
                      navigateTo('#/iot');
                    }}
                    className="w-full text-left p-1.5 rounded-lg hover:bg-gray-50 dark:hover:bg-white/5 transition border-0 bg-transparent cursor-pointer text-[10px] font-mono font-medium text-gray-500 dark:text-gray-400 hover:text-[#0012FF] dark:hover:text-cyan-300 uppercase no-underline block"
                  >
                    🔋 2. Peak Shaving
                  </a>
                  <a 
                    href="/iot?usecase=var-control"
                    onClick={(e) => {
                      e.preventDefault();
                      setSelectedIotUseCase('var-control');
                      navigateTo('#/iot');
                    }}
                    className="w-full text-left p-1.5 rounded-lg hover:bg-gray-50 dark:hover:bg-white/5 transition border-0 bg-transparent cursor-pointer text-[10px] font-mono font-medium text-gray-500 dark:text-gray-400 hover:text-[#0012FF] dark:hover:text-cyan-300 uppercase no-underline block"
                  >
                    ⚡ 3. CAP-Correction
                  </a>
                  <a 
                    href="/iot?usecase=islanding"
                    onClick={(e) => {
                      e.preventDefault();
                      setSelectedIotUseCase('islanding');
                      navigateTo('#/iot');
                    }}
                    className="w-full text-left p-1.5 rounded-lg hover:bg-gray-50 dark:hover:bg-white/5 transition border-0 bg-transparent cursor-pointer text-[10px] font-mono font-medium text-gray-500 dark:text-gray-400 hover:text-[#0012FF] dark:hover:text-cyan-300 uppercase no-underline block"
                  >
                    🛡️ 4. Islanding Isolation
                  </a>
                </div>
              )}
            </div>

            <a 
              href="/estimator"
              onClick={(e) => { e.preventDefault(); navigateTo('#/estimator'); }} 
              className={`w-full text-left transition-colors cursor-pointer bg-transparent border-none px-4 py-2.5 rounded-xl no-underline block ${
                isLinkActive('#/estimator') ? 'text-[#0012FF] dark:text-cyan-400 bg-[#0012FF]/5 dark:bg-cyan-400/5 font-extrabold' : 'text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/5 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              {t.nav.estimator}
            </a>
            <a 
              href="/portfolio"
              onClick={(e) => { e.preventDefault(); navigateTo('#/portfolio'); }} 
              className={`w-full text-left transition-colors cursor-pointer bg-transparent border-none px-4 py-2.5 rounded-xl no-underline block ${
                isLinkActive('#/portfolio') ? 'text-[#0012FF] dark:text-cyan-400 bg-[#0012FF]/5 dark:bg-cyan-400/5 font-extrabold' : 'text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/5 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              {t.nav.works}
            </a>
            <a 
              href="/blog"
              onClick={(e) => { e.preventDefault(); navigateTo('#/blog'); }} 
              className={`w-full text-left transition-colors cursor-pointer bg-transparent border-none px-4 py-2.5 rounded-xl no-underline block ${
                isLinkActive('#/blog') ? 'text-[#0012FF] dark:text-cyan-400 bg-[#0012FF]/5 dark:bg-cyan-400/5 font-extrabold' : 'text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/5 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              {t.nav.blog}
            </a>
            <a 
              href="/about"
              onClick={(e) => { e.preventDefault(); navigateTo('#/about'); }} 
              className={`w-full text-left transition-colors cursor-pointer bg-transparent border-none px-4 py-2.5 rounded-xl no-underline block ${
                isLinkActive('#/about') ? 'text-[#0012FF] dark:text-cyan-400 bg-[#0012FF]/5 dark:bg-cyan-400/5 font-extrabold' : 'text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/5 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              {t.nav.about}
            </a>
            <a 
              href="/careers"
              onClick={(e) => { e.preventDefault(); navigateTo('#/careers'); }} 
              className={`w-full text-left transition-colors cursor-pointer bg-transparent border-none px-4 py-2.5 rounded-xl no-underline block ${
                isLinkActive('#/careers') ? 'text-[#0012FF] dark:text-cyan-400 bg-[#0012FF]/5 dark:bg-cyan-400/5 font-extrabold' : 'text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/5 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              {t.nav.careers}
            </a>
            <a 
              href="/downloads"
              onClick={(e) => { e.preventDefault(); navigateTo('#/downloads'); }} 
              className={`w-full text-left transition-colors cursor-pointer bg-transparent border-none px-4 py-2.5 rounded-xl no-underline block ${
                isLinkActive('#/downloads') ? 'text-[#0012FF] dark:text-cyan-400 bg-[#0012FF]/5 dark:bg-cyan-400/5 font-extrabold' : 'text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/5 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              {t.nav.downloads}
            </a>
            <a 
              href="/contact"
              onClick={(e) => { e.preventDefault(); navigateTo('#/contact'); }} 
              className={`w-full text-left transition-colors cursor-pointer bg-transparent border-none px-4 py-2.5 rounded-xl no-underline block ${
                isLinkActive('#/contact') ? 'text-[#0012FF] dark:text-cyan-400 bg-[#0012FF]/5 dark:bg-cyan-400/5 font-extrabold' : 'text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/5 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              {t.nav.contact}
            </a>

            <button 
              onClick={() => setBasketOpen(true)}
              className={`w-full text-left transition-colors cursor-pointer bg-transparent border-none px-4 py-2.5 rounded-xl flex items-center justify-between ${
                basket.length > 0 
                  ? 'text-[#0012FF] dark:text-cyan-400 bg-[#0012FF]/5 dark:bg-cyan-400/5 font-bold border border-dashed border-[#0012FF]/30 dark:border-cyan-400/30' 
                  : 'text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/5 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              <span className="flex items-center gap-1.5 font-bold">
                <ShoppingCart className="h-3.5 w-3.5" />
                <span>{language === 'tr' ? 'Teklif Sepetiniz' : 'Order Basket'}</span>
              </span>
              {basket.length > 0 && (
                <span className="bg-[#0012FF] dark:bg-cyan-400 text-white dark:text-slate-950 px-2.5 py-0.5 rounded-full text-[9px] font-mono font-bold leading-none animate-pulse">
                  {basket.reduce((sum, item) => sum + item.quantity, 0)}
                </span>
              )}
            </button>
          </nav>
        </div>

        {/* Desktop Sidebar Utilities */}
        <div className="space-y-4 pt-4 border-t border-gray-150 dark:border-white/5">
          <div className="flex items-center justify-between gap-2">
            {/* Language Switch */}
            <button
              onClick={toggleLanguage}
              title="Switch Language"
              className="p-2 sm:px-3 sm:py-2 rounded-xl hover:bg-gray-100 dark:hover:bg-white/5 text-gray-500 dark:text-gray-300 transition flex items-center gap-1.5 cursor-pointer border-0 bg-transparent text-xs font-mono font-bold uppercase"
            >
              <Globe2 className="h-4 w-4" />
              <span>{language === 'en' ? 'EN' : 'TR'}</span>
            </button>

            {/* Theme Trigger */}
            <button
              onClick={toggleTheme}
              title="Toggle Theme Mode"
              className="p-2.5 rounded-xl hover:bg-gray-100 dark:hover:bg-white/5 text-gray-500 dark:text-gray-300 transition cursor-pointer border-0 bg-transparent"
            >
              {theme === 'light' ? <Moon className="h-4.5 w-4.5" /> : <Sun className="h-4.5 w-4.5 text-amber-400" />}
            </button>
          </div>

          <a
            href="/estimator"
            onClick={(e) => { e.preventDefault(); navigateTo('#/estimator'); }}
            className="w-full flex items-center justify-center py-2.5 px-4 rounded-xl border border-gray-200 dark:border-white/10 hover:border-[#0012FF] dark:hover:border-cyan-400 text-[10px] font-bold uppercase hover:bg-[#0012FF]/5 text-gray-800 dark:text-gray-200 transition-all gap-1 cursor-pointer bg-white dark:bg-slate-900 no-underline"
          >
            <span>{t.nav.actionBtn}</span>
            <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </div>
      </aside>

      {/* HEADER SECTION */}
      <header className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 xl:hidden ${
        isScrolled 
          ? 'bg-white/95 dark:bg-[#0c1322]/95 backdrop-blur-md shadow-md border-b border-gray-150 dark:border-white/10 py-3' 
          : 'bg-white/80 dark:bg-[#0c1322]/80 backdrop-blur-xs py-4 border-b border-gray-100 dark:border-white/5'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <a 
            href="/"
            onClick={(e) => { e.preventDefault(); navigateTo('#/home'); }} 
            className="flex-shrink-0 transition-opacity hover:opacity-90 cursor-pointer bg-transparent border-none p-0 no-underline block"
          >
            <Logo size="md" lightBackground={theme === 'light'} />
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-6 text-[11px] lg:text-[12px] font-sans font-bold tracking-wider uppercase">
            <a 
              href="/"
              onClick={(e) => { e.preventDefault(); navigateTo('#/home'); }} 
              className={`transition-colors cursor-pointer bg-transparent border-none py-1 no-underline ${
                isLinkActive('#/home') ? 'text-[#0012FF] dark:text-cyan-400 border-b-2 border-[#0012FF] dark:border-cyan-400' : 'text-gray-500 dark:text-gray-400 hover:text-[#0012FF] dark:hover:text-cyan-300'
              }`}
            >
              {t.nav.vision}
            </a>
            <a 
              href="/services"
              onClick={(e) => { e.preventDefault(); navigateTo('#/services'); }} 
              className={`transition-colors cursor-pointer bg-transparent border-none py-1 no-underline ${
                isLinkActive('#/services') ? 'text-[#0012FF] dark:text-cyan-400 border-b-2 border-[#0012FF] dark:border-cyan-400' : 'text-gray-500 dark:text-gray-400 hover:text-[#0012FF] dark:hover:text-cyan-300'
              }`}
            >
              {t.nav.services}
            </a>
            <div className="relative group py-1 flex items-center">
              <a 
                href="/products"
                onClick={(e) => {
                  e.preventDefault();
                  setSelectedCategory(null);
                  navigateTo('#/products');
                }} 
                className={`transition-colors cursor-pointer bg-transparent border-none py-1 flex items-center gap-1 no-underline ${
                  isLinkActive('#/products') ? 'text-[#0012FF] dark:text-cyan-400 border-b-2 border-[#0012FF] dark:border-cyan-400' : 'text-gray-500 dark:text-gray-400 hover:text-[#0012FF] dark:hover:text-cyan-300'
                }`}
              >
                <span>{t.nav.products}</span>
                <ChevronDown className="h-3 w-3 transition-transform duration-200 group-hover:rotate-180 opacity-70" />
              </a>
              
              {/* Desktop Products Submenu */}
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 w-80 bg-white dark:bg-[#0c1322] border border-gray-150 dark:border-white/10 rounded-2xl p-4 shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 pointer-events-none group-hover:pointer-events-auto">
                <span className="block text-[8px] font-mono text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-3 border-b border-gray-100 dark:border-white/5 pb-1 w-full text-left">
                  {language === 'tr' ? 'MÜHENDİSLİK ÜRÜN GRUPLARI' : 'ENGINEERING PRODUCT RANGES'}
                </span>
                <div className="space-y-1">
                  <a 
                    href="/products"
                    onClick={(e) => {
                      e.preventDefault();
                      setSelectedCategory(null);
                      navigateTo('#/products');
                    }}
                    className="w-full text-left p-2 rounded-xl hover:bg-gray-50 dark:hover:bg-white/5 transition border-0 bg-transparent cursor-pointer group/item flex flex-col items-start gap-0.5 no-underline block"
                  >
                    <span className="text-[10px] font-bold text-gray-800 dark:text-gray-200 group-hover/item:text-[#0012FF] dark:group-hover/item:text-cyan-300 transition-colors uppercase font-mono tracking-tight">
                      {language === 'tr' ? '1. TÜM SİSTEMLER' : '1. ALL SYSTEMS'}
                    </span>
                    <span className="text-[9px] text-gray-400 dark:text-gray-500 font-normal leading-relaxed text-left">
                      {language === 'tr' ? 'Tüm orta ve yüksek gerilim donanımları, kabinler ve depolama.' : 'Full Medium and High voltage hardware, stabilizers, and cabinets.'}
                    </span>
                  </a>

                  <a 
                    href="/products?category=industrial"
                    onClick={(e) => {
                      e.preventDefault();
                      setSelectedCategory('industrial');
                      navigateTo('#/products');
                    }}
                    className="w-full text-left p-2 rounded-xl hover:bg-gray-50 dark:hover:bg-white/5 transition border-0 bg-transparent cursor-pointer group/item flex flex-col items-start gap-0.5 no-underline block"
                  >
                    <span className="text-[10px] font-bold text-gray-800 dark:text-gray-200 group-hover/item:text-[#0012FF] dark:group-hover/item:text-cyan-300 transition-colors uppercase font-mono tracking-tight">
                      {language === 'tr' ? '2. AĞIR SANAYİ' : '2. HEAVY INDUSTRIAL'}
                    </span>
                    <span className="text-[9px] text-gray-400 dark:text-gray-500 font-normal leading-relaxed text-left">
                      {language === 'tr' ? 'Ağır sanayi 24kV orta gerilim switchgear elemanları.' : 'Heavy-duty 24kV medium-voltage plant switchgear.'}
                    </span>
                  </a>

                  <a 
                    href="/products?category=renewable"
                    onClick={(e) => {
                      e.preventDefault();
                      setSelectedCategory('renewable');
                      navigateTo('#/products');
                    }}
                    className="w-full text-left p-2 rounded-xl hover:bg-gray-50 dark:hover:bg-white/5 transition border-0 bg-transparent cursor-pointer group/item flex flex-col items-start gap-0.5 no-underline block"
                  >
                    <span className="text-[10px] font-bold text-gray-800 dark:text-gray-200 group-hover/item:text-[#0012FF] dark:group-hover/item:text-cyan-300 transition-colors uppercase font-mono tracking-tight">
                      {language === 'tr' ? '3. YENİLENEBİLİR ŞEBEKE' : '3. RENEWABLE GRID'}
                    </span>
                    <span className="text-[9px] text-gray-400 dark:text-gray-500 font-normal leading-relaxed text-left">
                      {language === 'tr' ? '5MW şebeke dengeleyici MegaPack bataryalar ve DC hızlı şarj üniteleri.' : '5MW peak stabilizer MegaPacks and DC fast chargers.'}
                    </span>
                  </a>

                  <a 
                    href="/products?category=datacenter"
                    onClick={(e) => {
                      e.preventDefault();
                      setSelectedCategory('datacenter');
                      navigateTo('#/products');
                    }}
                    className="w-full text-left p-2 rounded-xl hover:bg-gray-50 dark:hover:bg-white/5 transition border-0 bg-transparent cursor-pointer group/item flex flex-col items-start gap-0.5 no-underline block"
                  >
                    <span className="text-[10px] font-bold text-gray-800 dark:text-gray-200 group-hover/item:text-[#0012FF] dark:group-hover/item:text-cyan-300 transition-colors uppercase font-mono tracking-tight">
                      {language === 'tr' ? '4. KRİTİK VERİ MERKEZLERİ' : '4. CRITICAL DATA BACKUP'}
                    </span>
                    <span className="text-[9px] text-gray-400 dark:text-gray-500 font-normal leading-relaxed text-left">
                      {language === 'tr' ? '4ms altında gecikmeli yedekli ATS transfer şalterleri.' : 'Under 4ms transfer dynamic redundant switchgears.'}
                    </span>
                  </a>

                  <a 
                    href="/products?category=commercial"
                    onClick={(e) => {
                      e.preventDefault();
                      setSelectedCategory('commercial');
                      navigateTo('#/products');
                    }}
                    className="w-full text-left p-2 rounded-xl hover:bg-gray-50 dark:hover:bg-white/5 transition border-0 bg-transparent cursor-pointer group/item flex flex-col items-start gap-0.5 no-underline block"
                  >
                    <span className="text-[10px] font-bold text-gray-800 dark:text-gray-200 group-hover/item:text-[#0012FF] dark:group-hover/item:text-cyan-300 transition-colors uppercase font-mono tracking-tight text-left">
                      {language === 'tr' ? '5. AKILLI BİNA (BMS)' : '5. SMART BMS CONTROL'}
                    </span>
                    <span className="text-[9px] text-gray-400 dark:text-gray-500 font-normal leading-relaxed text-left">
                      {language === 'tr' ? 'Ethernet fiber ve akıllı sensörlü bina yönetim sistemleri.' : 'Fiber IoT integrated modern building cabinets.'}
                    </span>
                  </a>
                </div>
              </div>
            </div>
            <div className="relative group py-1 flex items-center">
              <a 
                href="/iot"
                onClick={(e) => { e.preventDefault(); navigateTo('#/iot'); }} 
                className={`transition-colors cursor-pointer bg-transparent border-none py-1 flex items-center gap-1 no-underline ${
                  isLinkActive('#/iot') ? 'text-[#0012FF] dark:text-cyan-400 border-b-2 border-[#0012FF] dark:border-cyan-400' : 'text-gray-500 dark:text-gray-400 hover:text-[#0012FF] dark:hover:text-cyan-300'
                }`}
              >
                <span>{t.nav.iot}</span>
                <ChevronDown className="h-3 w-3 transition-transform duration-200 group-hover:rotate-180 opacity-70" />
              </a>
              
              {/* Desktop Submenu */}
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 w-80 bg-white dark:bg-[#0c1322] border border-gray-150 dark:border-white/10 rounded-2xl p-4 shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 pointer-events-none group-hover:pointer-events-auto">
                <span className="block text-[8px] font-mono text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-3 border-b border-gray-100 dark:border-white/5 pb-1 w-full text-left">
                  Interactive Core Presets
                </span>
                <div className="space-y-1">
                  <a 
                    href="/iot?usecase=thermal"
                    onClick={(e) => {
                      e.preventDefault();
                      setSelectedIotUseCase('thermal');
                      navigateTo('#/iot');
                    }}
                    className="w-full text-left p-2 rounded-xl hover:bg-gray-50 dark:hover:bg-white/5 transition border-0 bg-transparent cursor-pointer group/item flex flex-col items-start gap-0.5 no-underline block"
                  >
                    <span className="text-[10px] font-bold text-gray-800 dark:text-gray-200 group-hover/item:text-[#0012FF] dark:group-hover/item:text-cyan-300 transition-colors uppercase font-mono tracking-tight">
                      1. Predictive Cooling
                    </span>
                    <span className="text-[9px] text-gray-400 dark:text-gray-500 font-normal leading-relaxed text-left">
                      Deploys high thermal liquid pump sweeps at 95% threshold.
                    </span>
                  </a>

                  <a 
                    href="/iot?usecase=peak-shaving"
                    onClick={(e) => {
                      e.preventDefault();
                      setSelectedIotUseCase('peak-shaving');
                      navigateTo('#/iot');
                    }}
                    className="w-full text-left p-2 rounded-xl hover:bg-gray-50 dark:hover:bg-white/5 transition border-0 bg-transparent cursor-pointer group/item flex flex-col items-start gap-0.5 no-underline block"
                  >
                    <span className="text-[10px] font-bold text-gray-800 dark:text-gray-200 group-hover/item:text-[#0012FF] dark:group-hover/item:text-cyan-300 transition-colors uppercase font-mono tracking-tight">
                      2. Peak Shaving
                    </span>
                    <span className="text-[9px] text-gray-400 dark:text-gray-500 font-normal leading-relaxed text-left">
                      Offset substation core demands using lithium battery cells.
                    </span>
                  </a>

                  <a 
                    href="/iot?usecase=var-control"
                    onClick={(e) => {
                      e.preventDefault();
                      setSelectedIotUseCase('var-control');
                      navigateTo('#/iot');
                    }}
                    className="w-full text-left p-2 rounded-xl hover:bg-gray-50 dark:hover:bg-white/5 transition border-0 bg-transparent cursor-pointer group/item flex flex-col items-start gap-0.5 no-underline block"
                  >
                    <span className="text-[10px] font-bold text-gray-800 dark:text-gray-200 group-hover/item:text-[#0012FF] dark:group-hover/item:text-cyan-300 transition-colors uppercase font-mono tracking-tight">
                      3. CAP-Correction
                    </span>
                    <span className="text-[9px] text-gray-400 dark:text-gray-500 font-normal leading-relaxed text-left">
                      Deploy shunt capacitors to maximize lagging phase balance.
                    </span>
                  </a>

                  <a 
                    href="/iot?usecase=islanding"
                    onClick={(e) => {
                      e.preventDefault();
                      setSelectedIotUseCase('islanding');
                      navigateTo('#/iot');
                    }}
                    className="w-full text-left p-2 rounded-xl hover:bg-gray-50 dark:hover:bg-white/5 transition border-0 bg-transparent cursor-pointer group/item flex flex-col items-start gap-0.5 no-underline block"
                  >
                    <span className="text-[10px] font-bold text-gray-800 dark:text-gray-200 group-hover/item:text-[#0012FF] dark:group-hover/item:text-cyan-300 transition-colors uppercase font-mono tracking-tight text-left">
                      4. Islanding Isolation
                    </span>
                    <span className="text-[9px] text-gray-400 dark:text-gray-500 font-normal leading-relaxed text-left">
                      Tripping mechanical contactors under transformer hazard.
                    </span>
                  </a>
                </div>
              </div>
            </div>
            <a 
              href="/estimator"
              onClick={(e) => { e.preventDefault(); navigateTo('#/estimator'); }} 
              className={`transition-colors cursor-pointer bg-transparent border-none py-1 no-underline ${
                isLinkActive('#/estimator') ? 'text-[#0012FF] dark:text-cyan-400 border-b-2 border-[#0012FF] dark:border-cyan-400' : 'text-gray-500 dark:text-gray-400 hover:text-[#0012FF] dark:hover:text-cyan-300'
              }`}
            >
              {t.nav.estimator}
            </a>
            <a 
              href="/portfolio"
              onClick={(e) => { e.preventDefault(); navigateTo('#/portfolio'); }} 
              className={`transition-colors cursor-pointer bg-transparent border-none py-1 no-underline ${
                isLinkActive('#/portfolio') ? 'text-[#0012FF] dark:text-cyan-400 border-b-2 border-[#0012FF] dark:border-cyan-400' : 'text-gray-500 dark:text-gray-400 hover:text-[#0012FF] dark:hover:text-cyan-300'
              }`}
            >
              {t.nav.works}
            </a>
            <a 
              href="/blog"
              onClick={(e) => { e.preventDefault(); navigateTo('#/blog'); }} 
              className={`transition-colors cursor-pointer bg-transparent border-none py-1 no-underline ${
                isLinkActive('#/blog') ? 'text-[#0012FF] dark:text-cyan-400 border-b-2 border-[#0012FF] dark:border-cyan-400' : 'text-gray-500 dark:text-gray-400 hover:text-[#0012FF] dark:hover:text-cyan-300'
              }`}
            >
              {t.nav.blog}
            </a>
            <a 
              href="/about"
              onClick={(e) => { e.preventDefault(); navigateTo('#/about'); }} 
              className={`transition-colors cursor-pointer bg-transparent border-none py-1 no-underline ${
                isLinkActive('#/about') ? 'text-[#0012FF] dark:text-cyan-400 border-b-2 border-[#0012FF] dark:border-cyan-400' : 'text-gray-500 dark:text-gray-400 hover:text-[#0012FF] dark:hover:text-cyan-300'
              }`}
            >
              {t.nav.about}
            </a>
            <a 
              href="/careers"
              onClick={(e) => { e.preventDefault(); navigateTo('#/careers'); }} 
              className={`transition-colors cursor-pointer bg-transparent border-none py-1 no-underline ${
                isLinkActive('#/careers') ? 'text-[#0012FF] dark:text-cyan-400 border-b-2 border-[#0012FF] dark:border-cyan-400' : 'text-gray-500 dark:text-gray-400 hover:text-[#0012FF] dark:hover:text-cyan-300'
              }`}
            >
              {t.nav.careers}
            </a>
            <a 
              href="/downloads"
              onClick={(e) => { e.preventDefault(); navigateTo('#/downloads'); }} 
              className={`transition-colors cursor-pointer bg-transparent border-none py-1 no-underline ${
                isLinkActive('#/downloads') ? 'text-[#0012FF] dark:text-cyan-400 border-b-2 border-[#0012FF] dark:border-cyan-400' : 'text-gray-500 dark:text-gray-400 hover:text-[#0012FF] dark:hover:text-cyan-300'
              }`}
            >
              {t.nav.downloads}
            </a>
            <a 
              href="/contact"
              onClick={(e) => { e.preventDefault(); navigateTo('#/contact'); }} 
              className={`transition-colors cursor-pointer bg-transparent border-none py-1 no-underline ${
                isLinkActive('#/contact') ? 'text-[#0012FF] dark:text-cyan-400 border-b-2 border-[#0012FF] dark:border-cyan-400' : 'text-gray-500 dark:text-gray-400 hover:text-[#0012FF] dark:hover:text-cyan-300'
              }`}
            >
              {t.nav.contact}
            </a>
          </nav>

          {/* Action CTA & Utility toggles */}
          <div className="flex items-center gap-4">
            {/* Language Switch */}
            <button
              onClick={toggleLanguage}
              title="Switch Language"
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800 text-gray-500 dark:text-gray-300 transition flex items-center gap-1.5 cursor-pointer border-0 bg-transparent text-xs font-mono font-bold uppercase"
            >
              <Globe2 className="h-4 w-4" />
              <span>{language === 'en' ? 'EN' : 'TR'}</span>
            </button>

            {/* Theme Trigger */}
            <button
              onClick={toggleTheme}
              title="Toggle Theme Mode"
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800 text-gray-500 dark:text-gray-300 transition cursor-pointer border-0 bg-transparent"
            >
              {theme === 'light' ? <Moon className="h-4.5 w-4.5" /> : <Sun className="h-4.5 w-4.5 text-amber-400" />}
            </button>

            {/* Mobile Basket Trigger */}
            <button
              onClick={() => setBasketOpen(true)}
              title="Open Order Basket"
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800 text-gray-500 dark:text-gray-300 transition cursor-pointer border-0 bg-transparent relative flex items-center justify-center"
            >
              <ShoppingCart className="h-4.5 w-4.5" />
              {basket.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#0012FF] dark:bg-cyan-400 text-white dark:text-slate-950 h-4 w-4 rounded-full text-[8px] font-mono font-bold flex items-center justify-center leading-none animate-pulse">
                  {basket.reduce((sum, item) => sum + item.quantity, 0)}
                </span>
              )}
            </button>

            {/* Standard Estimator link */}
            <button
              onClick={() => navigateTo('#/estimator')}
              className="hidden lg:flex py-2 px-4 rounded-full border border-gray-200 dark:border-white/10 hover:border-[#0012FF] dark:hover:border-cyan-400 text-xs font-bold uppercase hover:bg-[#0012FF]/5 text-gray-800 dark:text-gray-200 transition-all items-center gap-1 cursor-pointer bg-white dark:bg-slate-900"
            >
              <span>{t.nav.actionBtn}</span>
              <ArrowUpRight className="h-3 w-3" />
            </button>
          </div>

          {/* Mobile hamburger menu */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-2 text-gray-600 dark:text-gray-300 hover:text-gray-950 dark:hover:text-white focus:outline bg-transparent border-none cursor-pointer"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="xl:hidden border-b border-gray-100 dark:border-white/10 bg-white dark:bg-[#0c1322]"
            >
              <nav className="flex flex-col gap-4 px-6 py-5 font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wide text-xs">
                <a 
                  href="/"
                  onClick={(e) => { e.preventDefault(); navigateTo('#/home'); setMobileMenuOpen(false); }} 
                  className={`text-left hover:text-[#0012FF] bg-transparent border-none py-1 cursor-pointer no-underline block ${
                    isLinkActive('#/home') ? 'text-[#0012FF] dark:text-cyan-400 font-bold' : ''
                  }`}
                >
                  {t.nav.vision}
                </a>
                <a 
                  href="/services"
                  onClick={(e) => { e.preventDefault(); navigateTo('#/services'); setMobileMenuOpen(false); }} 
                  className={`text-left hover:text-[#0012FF] bg-transparent border-none py-1 cursor-pointer no-underline block ${
                    isLinkActive('#/services') ? 'text-[#0012FF] dark:text-cyan-400 font-bold' : ''
                  }`}
                >
                  {t.nav.services}
                </a>
                <div className="flex flex-col gap-1 text-left">
                  <a 
                    href="/products"
                    onClick={(e) => {
                      e.preventDefault();
                      setMobileProductsSubmenuOpen(!mobileProductsSubmenuOpen);
                    }} 
                    className={`text-left hover:text-[#0012FF] bg-transparent border-none py-1 cursor-pointer flex items-center justify-between no-underline block ${
                      isLinkActive('#/products') ? 'text-[#0012FF] dark:text-cyan-400 font-bold' : ''
                    }`}
                  >
                    <span>{t.nav.products}</span>
                    <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${mobileProductsSubmenuOpen ? 'rotate-180' : ''}`} />
                  </a>
                  
                  {mobileProductsSubmenuOpen && (
                    <div className="pl-4 mt-2 mb-1 border-l border-gray-150 dark:border-white/10 flex flex-col gap-2.5 py-1 text-[11px] normal-case tracking-normal">
                      <a 
                        href="/products"
                        onClick={(e) => {
                          e.preventDefault();
                          setSelectedCategory(null);
                          navigateTo('#/products');
                          setMobileMenuOpen(false);
                        }}
                        className="text-left bg-transparent border-none py-1.2 font-medium text-gray-600 dark:text-gray-300 hover:text-[#0012FF] dark:hover:text-cyan-300 cursor-pointer no-underline block"
                      >
                        ⚡ {language === 'tr' ? '1. Tüm Sistemler' : '1. All Systems'}
                      </a>
                      <a 
                        href="/products?category=industrial"
                        onClick={(e) => {
                          e.preventDefault();
                          setSelectedCategory('industrial');
                          navigateTo('#/products');
                          setMobileMenuOpen(false);
                        }}
                        className="text-left bg-transparent border-none py-1.2 font-medium text-gray-600 dark:text-gray-300 hover:text-[#0012FF] dark:hover:text-cyan-300 cursor-pointer no-underline block"
                      >
                        ⚡ {language === 'tr' ? '2. Ağır Sanayi' : '2. Heavy Industrial'}
                      </a>
                      <a 
                        href="/products?category=renewable"
                        onClick={(e) => {
                          e.preventDefault();
                          setSelectedCategory('renewable');
                          navigateTo('#/products');
                          setMobileMenuOpen(false);
                        }}
                        className="text-left bg-transparent border-none py-1.2 font-medium text-gray-600 dark:text-gray-300 hover:text-[#0012FF] dark:hover:text-cyan-300 cursor-pointer no-underline block"
                      >
                        ⚡ {language === 'tr' ? '3. Yenilenebilir Şebeke' : '3. Renewable Grid'}
                      </a>
                      <a 
                        href="/products?category=datacenter"
                        onClick={(e) => {
                          e.preventDefault();
                          setSelectedCategory('datacenter');
                          navigateTo('#/products');
                          setMobileMenuOpen(false);
                        }}
                        className="text-left bg-transparent border-none py-1.2 font-medium text-gray-600 dark:text-gray-300 hover:text-[#0012FF] dark:hover:text-cyan-300 cursor-pointer no-underline block"
                      >
                        ⚡ {language === 'tr' ? '4. Kritik Veri Girişi' : '4. Critical Backup'}
                      </a>
                      <a 
                        href="/products?category=commercial"
                        onClick={(e) => {
                          e.preventDefault();
                          setSelectedCategory('commercial');
                          navigateTo('#/products');
                          setMobileMenuOpen(false);
                        }}
                        className="text-left bg-transparent border-none py-1.2 font-medium text-gray-600 dark:text-gray-300 hover:text-[#0012FF] dark:hover:text-cyan-300 cursor-pointer no-underline block"
                      >
                        ⚡ {language === 'tr' ? '5. Akıllı Bina (BMS)' : '5. Smart BMS Panel'}
                      </a>
                    </div>
                  )}
                </div>
                <div className="flex flex-col gap-1 text-left">
                  <a 
                    href="/iot"
                    onClick={(e) => {
                      e.preventDefault();
                      setMobileIotSubmenuOpen(!mobileIotSubmenuOpen);
                    }} 
                    className={`text-left hover:text-[#0012FF] bg-transparent border-none py-1 cursor-pointer flex items-center justify-between no-underline block ${
                      isLinkActive('#/iot') ? 'text-[#0012FF] dark:text-cyan-400 font-bold' : ''
                    }`}
                  >
                    <span>{t.nav.iot}</span>
                    <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${mobileIotSubmenuOpen ? 'rotate-180' : ''}`} />
                  </a>
                  
                  {mobileIotSubmenuOpen && (
                    <div className="pl-4 mt-2 mb-1 border-l border-gray-150 dark:border-white/10 flex flex-col gap-2.5 py-1 text-[11px] normal-case tracking-normal">
                      <a 
                        href="/iot?usecase=thermal"
                        onClick={(e) => {
                          e.preventDefault();
                          setSelectedIotUseCase('thermal');
                          navigateTo('#/iot');
                          setMobileMenuOpen(false);
                        }}
                        className="text-left bg-transparent border-none py-1.5 font-medium text-gray-600 dark:text-gray-300 hover:text-[#0012FF] dark:hover:text-cyan-300 cursor-pointer no-underline block"
                      >
                        ⚡ 1. Predictive Cooling Sweep
                      </a>
                      <a 
                        href="/iot?usecase=peak-shaving"
                        onClick={(e) => {
                          e.preventDefault();
                          setSelectedIotUseCase('peak-shaving');
                          navigateTo('#/iot');
                          setMobileMenuOpen(false);
                        }}
                        className="text-left bg-transparent border-none py-1.5 font-medium text-gray-600 dark:text-gray-300 hover:text-[#0012FF] dark:hover:text-cyan-300 cursor-pointer no-underline block"
                      >
                        ⚡ 2. Renewable Peak-Shaving BESS
                      </a>
                      <a 
                        href="/iot?usecase=var-control"
                        onClick={(e) => {
                          e.preventDefault();
                          setSelectedIotUseCase('var-control');
                          navigateTo('#/iot');
                          setMobileMenuOpen(false);
                        }}
                        className="text-left bg-transparent border-none py-1.5 font-medium text-gray-600 dark:text-gray-300 hover:text-[#0012FF] dark:hover:text-cyan-300 cursor-pointer no-underline block"
                      >
                        ⚡ 3. CAP-Correction Sync
                      </a>
                      <a 
                        href="/iot?usecase=islanding"
                        onClick={(e) => {
                          e.preventDefault();
                          setSelectedIotUseCase('islanding');
                          navigateTo('#/iot');
                          setMobileMenuOpen(false);
                        }}
                        className="text-left bg-transparent border-none py-1.5 font-medium text-gray-600 dark:text-gray-300 hover:text-[#0012FF] dark:hover:text-cyan-300 cursor-pointer no-underline block"
                      >
                        ⚡ 4. Islanding Breaker Isolation
                      </a>
                    </div>
                  )}
                </div>
                <a 
                  href="/estimator"
                  onClick={(e) => { e.preventDefault(); navigateTo('#/estimator'); setMobileMenuOpen(false); }} 
                  className={`text-left hover:text-[#0012FF] bg-transparent border-none py-1 cursor-pointer no-underline block ${
                    isLinkActive('#/estimator') ? 'text-[#0012FF] dark:text-cyan-400 font-bold' : ''
                  }`}
                >
                  {t.nav.estimator}
                </a>
                <a 
                  href="/portfolio"
                  onClick={(e) => { e.preventDefault(); navigateTo('#/portfolio'); setMobileMenuOpen(false); }} 
                  className={`text-left hover:text-[#0012FF] bg-transparent border-none py-1 cursor-pointer no-underline block ${
                    isLinkActive('#/portfolio') ? 'text-[#0012FF] dark:text-cyan-400 font-bold' : ''
                  }`}
                >
                  {t.nav.works}
                </a>
                <a 
                  href="/blog"
                  onClick={(e) => { e.preventDefault(); navigateTo('#/blog'); setMobileMenuOpen(false); }} 
                  className={`text-left hover:text-[#0012FF] bg-transparent border-none py-1 cursor-pointer no-underline block ${
                    isLinkActive('#/blog') ? 'text-[#0012FF] dark:text-cyan-400 font-bold' : ''
                  }`}
                >
                  {t.nav.blog}
                </a>
                <a 
                  href="/about"
                  onClick={(e) => { e.preventDefault(); navigateTo('#/about'); setMobileMenuOpen(false); }} 
                  className={`text-left hover:text-[#0012FF] bg-transparent border-none py-1 cursor-pointer no-underline block ${
                    isLinkActive('#/about') ? 'text-[#0012FF] dark:text-cyan-400 font-bold' : ''
                  }`}
                >
                  {t.nav.about}
                </a>
                <a 
                  href="/careers"
                  onClick={(e) => { e.preventDefault(); navigateTo('#/careers'); setMobileMenuOpen(false); }} 
                  className={`text-left hover:text-[#0012FF] bg-transparent border-none py-1 cursor-pointer no-underline block ${
                    isLinkActive('#/careers') ? 'text-[#0012FF] dark:text-cyan-400 font-bold' : ''
                  }`}
                >
                  {t.nav.careers}
                </a>
                <a 
                  href="/downloads"
                  onClick={(e) => { e.preventDefault(); navigateTo('#/downloads'); setMobileMenuOpen(false); }} 
                  className={`text-left hover:text-[#0012FF] bg-transparent border-none py-1 cursor-pointer no-underline block ${
                    isLinkActive('#/downloads') ? 'text-[#0012FF] dark:text-cyan-400 font-bold' : ''
                  }`}
                >
                  {t.nav.downloads}
                </a>
                <a 
                  href="/contact"
                  onClick={(e) => { e.preventDefault(); navigateTo('#/contact'); setMobileMenuOpen(false); }} 
                  className={`text-left hover:text-[#0012FF] bg-transparent border-none py-1 cursor-pointer no-underline block ${
                    isLinkActive('#/contact') ? 'text-[#0012FF] dark:text-cyan-400 font-bold' : ''
                  }`}
                >
                  {t.nav.contact}
                </a>
                
                <hr className="border-gray-100 dark:border-white/5 my-1" />
                
                <a
                  href="/estimator"
                  onClick={(e) => { e.preventDefault(); navigateTo('#/estimator'); setMobileMenuOpen(false); }}
                  className="py-3 px-4 rounded-xl bg-gray-900 dark:bg-cyan-400 dark:text-slate-950 text-white text-center font-bold hover:bg-gray-800 transition uppercase text-xs cursor-pointer border-0 no-underline block"
                >
                  {t.nav.actionBtn}
                </a>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* DETACHED MAIN TRANSITIONAL CONTENT LAYER */}
      <main className="flex-grow pt-24 sm:pt-28 xl:pt-12 xl:pl-72 pb-12 w-full">
        <AnimatePresence mode="wait">
          {renderPage()}
        </AnimatePresence>
      </main>

      {/* FOOTER SECTION */}
      <footer className="xl:pl-72 bg-gray-950 text-gray-400 py-16 border-t border-gray-900 relative">
        <div className="absolute inset-x-0 top-0 h-[100px] bg-gradient-to-b from-gray-55/5 to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 relative z-10 text-left w-full">
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 border-b border-white/5 pb-12">
            
            {/* Col 1: Logo & Brief */}
            <div className="md:col-span-5 space-y-4">
              <button 
                onClick={() => navigateTo('#/home')} 
                className="transition-opacity hover:opacity-90 bg-transparent border-none p-0 block cursor-pointer"
              >
                <Logo size="md" lightBackground={false} />
              </button>
              <p className="text-xs leading-relaxed max-w-sm text-gray-400">
                {t.footer.brief}
              </p>
              <div className="flex items-center gap-1.5 text-[10px] font-mono text-gray-500">
                <MapPin className="h-3.5 w-3.5" />
                <span>{t.footer.address}</span>
              </div>
            </div>

            {/* Col 2: Capabilities links */}
            <div className="md:col-span-3 space-y-3">
              <span className="text-[10px] font-mono tracking-wider text-white uppercase font-bold">{t.footer.solutionsTitle}</span>
              <ul className="space-y-2 text-xs">
                <li><button onClick={() => navigateTo('#/services')} className="hover:text-white transition-colors bg-transparent border-none p-0 text-left cursor-pointer">{t.services.commTitle}</button></li>
                <li><button onClick={() => navigateTo('#/services')} className="hover:text-white transition-colors bg-transparent border-none p-0 text-left cursor-pointer">{t.services.indTitle}</button></li>
                <li><button onClick={() => navigateTo('#/services')} className="hover:text-white transition-colors text-cyan-400 bg-transparent border-none p-0 text-left cursor-pointer font-bold">{t.services.datacenterTitle}</button></li>
                <li><button onClick={() => navigateTo('#/services')} className="hover:text-white transition-colors bg-transparent border-none p-0 text-left cursor-pointer">{t.services.renewTitle}</button></li>
              </ul>
            </div>

            {/* Col 3: Resources & Standards */}
            <div className="md:col-span-4 space-y-3">
              <span className="text-[10px] font-mono tracking-wider text-white uppercase font-bold">{t.footer.corporateTitle}</span>
              <p className="text-xs leading-relaxed max-w-xs text-gray-500">
                {t.footer.corporateText}
              </p>
              <span className="inline-flex items-center gap-1.5 font-mono text-white text-xs bg-white/5 border border-white/10 px-3.5 py-2 rounded-lg">
                <ShieldCheck className="h-4 w-4 text-[#00FF00]" />
                <strong>+353 1 902 4499</strong>
              </span>
            </div>

          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between text-[11px] text-gray-500 gap-4">
            <div>
              <span>{t.footer.rights}</span>
              <span className="mx-2">•</span>
              <button onClick={() => navigateTo('#/home')} className="hover:text-white transition-colors bg-transparent border-none p-0 cursor-pointer">{t.footer.privacy}</button>
              <span className="mx-2">•</span>
              <button onClick={() => navigateTo('#/estimator')} className="hover:text-white transition-colors bg-transparent border-none p-0 cursor-pointer">{t.footer.terms}</button>
            </div>
            
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1 text-[10px]">
                <ShieldCheck className="h-4 w-4 text-emerald-500" />
                <span>{t.footer.accreditation}</span>
              </span>
            </div>
          </div>

        </div>
      </footer>

      {/* Floating Order Basket Dynamic FAB */}
      <AnimatePresence>
        {basket.length > 0 && !isBasketOpen && (
          <motion.button
            key="basket-fab"
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50 }}
            onClick={() => setBasketOpen(true)}
            className="fixed bottom-6 right-6 z-40 p-4 rounded-full bg-[#0012FF] dark:bg-cyan-400 text-white dark:text-slate-950 shadow-2xl flex items-center gap-2 hover:scale-105 active:scale-95 transition-transform duration-200 border-0 cursor-pointer"
            id="order-basket-fab"
          >
            <ShoppingCart className="h-5 w-5" />
            <span className="text-xs font-bold uppercase tracking-wider font-mono hidden sm:inline">
              {language === 'tr' ? 'Sepeti İncele' : 'Review Basket'}
            </span>
            <span className="bg-white dark:bg-slate-900 text-[#0012FF] dark:text-cyan-400 h-5 w-5 rounded-full text-[10px] font-mono font-extrabold flex items-center justify-center leading-none shadow-inner">
              {basket.reduce((sum, item) => sum + item.quantity, 0)}
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Slide-out checkout Drawer */}
      <BasketDrawer onAddInquiry={handleAddBasketInquiry} />

    </div>
  );
}
