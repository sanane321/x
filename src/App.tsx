/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate, useLocation, Routes, Route, Navigate } from 'react-router';
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
  ShoppingCart,
  Home as HomeIcon,
  Layers,
  Cpu,
  Zap,
  Calculator,
  Briefcase,
  Newspaper,
  Info,
  Award,
  Download,
  Mail,
  Activity,
  Eye
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
import ProductDetails from './pages/ProductDetails';

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
  
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  // Scroll to top on path changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, [currentPath]);

  // Navigation utility with backward compatibility adapter for existing button triggers
  const navigateTo = (pathOrHash: string) => {
    let route = pathOrHash.replace(/^#\//, '').replace(/^\//, ''); // e.g. "services"
    if (route === '' || route === 'home') {
      route = '';
    }
    
    // Correctly resolve product ids in the adapter
    if (route.startsWith('products/') && !route.startsWith('products/c/') && !route.startsWith('products/p/') && !route.startsWith('products/details/')) {
      const prodId = route.substring('products/'.length);
      route = `products/details/${prodId}`;
    }
    
    navigate(`/${route}`);
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
  const isLinkActive = (hash: string) => {
    const cleanPath = hash.replace(/^#/, ''); // e.g. /home or /services
    const cleanCurrent = currentPath === '/' ? '/home' : currentPath;
    const cleanLeft = cleanPath === '/' ? '/home' : cleanPath;
    return cleanCurrent === cleanLeft || cleanCurrent.startsWith(cleanLeft + '/');
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#0b101d] text-gray-800 dark:text-gray-100 font-sans antialiased selection:bg-[#0012FF]/10 selection:text-[#0012FF] flex flex-col justify-between transition-colors duration-200">
      
      {/* DESKTOP PERSISTENT LEFT SIDEBAR */}
      <aside className="hidden xl:flex fixed top-0 left-0 bottom-0 w-72 bg-white dark:bg-[#0c1322] border-r border-gray-100 dark:border-white/10 flex-col justify-between p-6 z-30 overflow-y-auto">
        <div className="space-y-6">
          {/* Logo Branding Header */}
          <div className="pb-5 border-b border-gray-100 dark:border-white/5 flex items-center justify-between">
            <button 
              onClick={() => navigateTo('#/home')} 
              className="flex-shrink-0 transition-all duration-300 hover:scale-[1.02] active:scale-95 cursor-pointer bg-transparent border-none p-0"
            >
              <Logo size="md" lightBackground={theme === 'light'} />
            </button>
          </div>
          
          <nav className="flex flex-col gap-6 text-sm font-sans font-bold tracking-wider uppercase">
            
            {/* Category 1: CORE NAV */}
            <div className="space-y-1">
              <span className="block text-[10.5px] font-mono text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em] px-4 mb-3 font-bold">
                {language === 'tr' ? 'MÜHENDİSLİK GİRİŞ' : 'CORE NAV'}
              </span>
              
              <button 
                onClick={() => navigateTo('#/home')} 
                className={`group w-full flex items-center gap-3.5 transition-all duration-200 cursor-pointer bg-transparent border-none px-4 py-3 rounded-xl relative text-left select-none ${
                  isLinkActive('#/home') 
                    ? 'text-[#0012FF] dark:text-cyan-400 bg-[#0012FF]/5 dark:bg-cyan-400/5 font-extrabold' 
                    : 'text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/5 hover:text-gray-955 dark:hover:text-white'
                }`}
              >
                {isLinkActive('#/home') && (
                  <motion.span 
                    layoutId="desktopActiveIndicator"
                    className="absolute left-0 top-2.5 bottom-2.5 w-1 rounded-r-full bg-[#0012FF] dark:bg-cyan-400"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <HomeIcon className={`h-[18px] w-[18px] transition-transform duration-200 group-hover:scale-110 ${isLinkActive('#/home') ? 'text-[#0012FF] dark:text-cyan-400' : 'text-gray-400 dark:text-gray-500 group-hover:text-gray-750 dark:group-hover:text-gray-300'}`} />
                <span>{t.nav.vision}</span>
              </button>

              <button 
                onClick={() => navigateTo('#/services')} 
                className={`group w-full flex items-center gap-3.5 transition-all duration-200 cursor-pointer bg-transparent border-none px-4 py-3 rounded-xl relative text-left select-none ${
                  isLinkActive('#/services') 
                    ? 'text-[#0012FF] dark:text-cyan-400 bg-[#0012FF]/5 dark:bg-cyan-400/5 font-extrabold' 
                    : 'text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/5 hover:text-gray-955 dark:hover:text-white'
                }`}
              >
                {isLinkActive('#/services') && (
                  <motion.span 
                    layoutId="desktopActiveIndicator"
                    className="absolute left-0 top-2.5 bottom-2.5 w-1 rounded-r-full bg-[#0012FF] dark:bg-cyan-400"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <Layers className={`h-[18px] w-[18px] transition-transform duration-200 group-hover:scale-110 ${isLinkActive('#/services') ? 'text-[#0012FF] dark:text-cyan-400' : 'text-gray-400 dark:text-gray-500 group-hover:text-gray-750 dark:group-hover:text-gray-300'}`} />
                <span>{t.nav.services}</span>
              </button>
            </div>

            {/* Category 2: SYSTEMS & ENGINEERING */}
            <div className="space-y-1">
              <span className="block text-[10.5px] font-mono text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em] px-4 mb-3 font-bold">
                {language === 'tr' ? 'SİSTEMLER VE ŞEBEKE' : 'SYSTEMS & GRID'}
              </span>

              {/* Products Dropdown Accordion */}
              <div className="flex flex-col">
                <button 
                  onClick={() => {
                    setDesktopProductsSubmenuOpen(!desktopProductsSubmenuOpen);
                    setSelectedCategory(null);
                    navigateTo('#/products');
                  }} 
                  className={`group w-full flex items-center justify-between transition-all duration-200 cursor-pointer bg-transparent border-none px-4 py-3 rounded-xl relative text-left select-none ${
                    isLinkActive('#/products') 
                      ? 'text-[#0012FF] dark:text-cyan-400 bg-[#0012FF]/5 dark:bg-cyan-400/5 font-extrabold' 
                      : 'text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/5 hover:text-gray-955 dark:hover:text-white'
                  }`}
                >
                  {isLinkActive('#/products') && (
                    <motion.span 
                      layoutId="desktopActiveIndicator"
                      className="absolute left-0 top-2.5 bottom-2.5 w-1 rounded-r-full bg-[#0012FF] dark:bg-cyan-400"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="flex items-center gap-3.5">
                    <Cpu className={`h-[18px] w-[18px] transition-transform duration-200 group-hover:rotate-12 ${isLinkActive('#/products') ? 'text-[#0012FF] dark:text-cyan-400' : 'text-gray-400 dark:text-gray-500 group-hover:text-gray-650 dark:group-hover:text-gray-300'}`} />
                    <span>{t.nav.products}</span>
                  </span>
                  <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${desktopProductsSubmenuOpen ? 'rotate-180 text-[#0012FF] dark:text-cyan-400' : 'text-gray-450 dark:text-gray-500'}`} />
                </button>
                
                <AnimatePresence initial={false}>
                  {desktopProductsSubmenuOpen && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2, ease: "easeInOut" }}
                      className="pl-4 pr-1 mt-1 space-y-0.5 border-l border-gray-150 dark:border-white/10 flex flex-col ml-6"
                    >
                      <button 
                        onClick={() => {
                          setSelectedCategory(null);
                          navigateTo('#/products');
                        }}
                        className="group w-full text-left py-2.5 px-3 rounded-xl hover:bg-[#0012FF]/5 dark:hover:bg-cyan-400/5 transition duration-150 border-0 bg-transparent cursor-pointer text-[12px] font-mono font-bold text-gray-500 dark:text-gray-400 hover:text-[#0012FF] dark:hover:text-cyan-350 uppercase flex items-center justify-between"
                      >
                        <span>{language === 'tr' ? '1. Sistemler' : '1. All Systems'}</span>
                        <span className="text-[11px] opacity-20 group-hover:opacity-100 transition-opacity">🚀</span>
                      </button>
                      <button 
                        onClick={() => {
                          setSelectedCategory('industrial');
                          navigateTo('#/products');
                        }}
                        className="group w-full text-left py-2.5 px-3 rounded-xl hover:bg-[#0012FF]/5 dark:hover:bg-cyan-400/5 transition duration-150 border-0 bg-transparent cursor-pointer text-[12px] font-mono font-bold text-gray-500 dark:text-gray-400 hover:text-[#0012FF] dark:hover:text-cyan-350 uppercase flex items-center justify-between"
                      >
                        <span>{language === 'tr' ? '2. Ağır Sanayi' : '2. Heavy Ind'}</span>
                        <span className="text-[11px] opacity-20 group-hover:opacity-100 transition-opacity font-bold">🏭</span>
                      </button>
                      <button 
                        onClick={() => {
                          setSelectedCategory('renewable');
                          navigateTo('#/products');
                        }}
                        className="group w-full text-left py-2.5 px-3 rounded-xl hover:bg-[#0012FF]/5 dark:hover:bg-cyan-400/5 transition duration-150 border-0 bg-transparent cursor-pointer text-[12px] font-mono font-bold text-gray-500 dark:text-gray-400 hover:text-[#0012FF] dark:hover:text-cyan-350 uppercase flex items-center justify-between"
                      >
                        <span>{language === 'tr' ? '3. Yenilenebilir' : '3. Renewable'}</span>
                        <span className="text-[11px] opacity-20 group-hover:opacity-100 transition-opacity font-bold">☀️</span>
                      </button>
                      <button 
                        onClick={() => {
                          setSelectedCategory('datacenter');
                          navigateTo('#/products');
                        }}
                        className="group w-full text-left py-2.5 px-3 rounded-xl hover:bg-[#0012FF]/5 dark:hover:bg-cyan-400/5 transition duration-150 border-0 bg-transparent cursor-pointer text-[12px] font-mono font-bold text-gray-500 dark:text-gray-400 hover:text-[#0012FF] dark:hover:text-cyan-350 uppercase flex items-center justify-between"
                      >
                        <span>{language === 'tr' ? '4. Kritik Yedek' : '4. Critical'}</span>
                        <span className="text-[11px] opacity-20 group-hover:opacity-100 transition-opacity font-bold">💾</span>
                      </button>
                      <button 
                        onClick={() => {
                          setSelectedCategory('commercial');
                          navigateTo('#/products');
                        }}
                        className="group w-full text-left py-2.5 px-3 rounded-xl hover:bg-[#0012FF]/5 dark:hover:bg-cyan-400/5 transition duration-150 border-0 bg-transparent cursor-pointer text-[12px] font-mono font-bold text-gray-500 dark:text-gray-400 hover:text-[#0012FF] dark:hover:text-cyan-350 uppercase flex items-center justify-between"
                      >
                        <span>{language === 'tr' ? '5. Akıllı BMS' : '5. Smart BMS'}</span>
                        <span className="text-[11px] opacity-20 group-hover:opacity-100 transition-opacity font-bold">🏢</span>
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* IoT Grid Dropdown Accordion */}
              <div className="flex flex-col">
                <button 
                  onClick={() => {
                    setDesktopIotSubmenuOpen(!desktopIotSubmenuOpen);
                    navigateTo('#/iot');
                  }} 
                  className={`group w-full flex items-center justify-between transition-all duration-200 cursor-pointer bg-transparent border-none px-4 py-3 rounded-xl relative text-left select-none ${
                    isLinkActive('#/iot') 
                      ? 'text-[#0012FF] dark:text-cyan-400 bg-[#0012FF]/5 dark:bg-cyan-400/5 font-extrabold' 
                      : 'text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/5 hover:text-gray-955 dark:hover:text-white'
                  }`}
                >
                  {isLinkActive('#/iot') && (
                    <motion.span 
                      layoutId="desktopActiveIndicator"
                      className="absolute left-0 top-2.5 bottom-2.5 w-1 rounded-r-full bg-[#0012FF] dark:bg-cyan-400"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="flex items-center gap-3.5">
                    <Activity className={`h-[18px] w-[18px] transition-transform duration-200 group-hover:scale-110 ${isLinkActive('#/iot') ? 'text-[#0012FF] dark:text-cyan-400' : 'text-gray-400 dark:text-gray-500 group-hover:text-gray-650 dark:group-hover:text-gray-300'}`} />
                    <span>{t.nav.iot}</span>
                  </span>
                  <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${desktopIotSubmenuOpen ? 'rotate-180 text-[#0012FF] dark:text-cyan-400' : 'text-gray-450 dark:text-gray-500'}`} />
                </button>
                
                <AnimatePresence initial={false}>
                  {desktopIotSubmenuOpen && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2, ease: "easeInOut" }}
                      className="pl-4 pr-1 mt-1 space-y-0.5 border-l border-gray-150 dark:border-white/10 flex flex-col ml-6"
                    >
                      <button 
                        onClick={() => {
                          setSelectedIotUseCase('thermal');
                          navigateTo('#/iot');
                        }}
                        className="group w-full text-left py-2.5 px-3 rounded-xl hover:bg-[#0012FF]/5 dark:hover:bg-cyan-400/5 transition duration-150 border-0 bg-transparent cursor-pointer text-[12px] font-mono font-bold text-gray-500 dark:text-gray-400 hover:text-[#0012FF] dark:hover:text-cyan-305 uppercase flex items-center justify-between"
                      >
                        <span>❄️ 1. Cooling</span>
                        <span className="text-[9px] opacity-60 font-bold">THERMAL</span>
                      </button>
                      <button 
                        onClick={() => {
                          setSelectedIotUseCase('peak-shaving');
                          navigateTo('#/iot');
                        }}
                        className="group w-full text-left py-2.5 px-3 rounded-xl hover:bg-[#0012FF]/5 dark:hover:bg-cyan-400/5 transition duration-150 border-0 bg-transparent cursor-pointer text-[12px] font-mono font-bold text-gray-500 dark:text-gray-400 hover:text-[#0012FF] dark:hover:text-cyan-305 uppercase flex items-center justify-between"
                      >
                        <span>🔋 2. Shaving</span>
                        <span className="text-[9px] opacity-60 font-bold">PEAK</span>
                      </button>
                      <button 
                        onClick={() => {
                          setSelectedIotUseCase('var-control');
                          navigateTo('#/iot');
                        }}
                        className="group w-full text-left py-2.5 px-3 rounded-xl hover:bg-[#0012FF]/5 dark:hover:bg-cyan-400/5 transition duration-150 border-0 bg-transparent cursor-pointer text-[12px] font-mono font-bold text-gray-500 dark:text-gray-400 hover:text-[#0012FF] dark:hover:text-cyan-305 uppercase flex items-center justify-between"
                      >
                        <span>⚡ 3. CAP-Corr</span>
                        <span className="text-[9px] opacity-60 font-bold">VAR</span>
                      </button>
                      <button 
                        onClick={() => {
                          setSelectedIotUseCase('islanding');
                          navigateTo('#/iot');
                        }}
                        className="group w-full text-left py-2.5 px-3 rounded-xl hover:bg-[#0012FF]/5 dark:hover:bg-cyan-400/5 transition duration-150 border-0 bg-transparent cursor-pointer text-[12px] font-mono font-bold text-gray-500 dark:text-gray-400 hover:text-[#0012FF] dark:hover:text-cyan-355 uppercase flex items-center justify-between"
                      >
                        <span>🛡️ 4. Isolated</span>
                        <span className="text-[9px] opacity-60 font-bold">ISLAND</span>
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <button 
                onClick={() => navigateTo('#/estimator')} 
                className={`group w-full flex items-center gap-3.5 transition-all duration-200 cursor-pointer bg-transparent border-none px-4 py-3 rounded-xl relative text-left select-none ${
                  isLinkActive('#/estimator') 
                    ? 'text-[#0012FF] dark:text-cyan-400 bg-[#0012FF]/5 dark:bg-cyan-400/5 font-extrabold' 
                    : 'text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/5 hover:text-gray-955 dark:hover:text-white'
                }`}
              >
                {isLinkActive('#/estimator') && (
                  <motion.span 
                    layoutId="desktopActiveIndicator"
                    className="absolute left-0 top-2.5 bottom-2.5 w-1 rounded-r-full bg-[#0012FF] dark:bg-cyan-400"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <Calculator className={`h-[18px] w-[18px] transition-transform duration-200 group-hover:scale-110 ${isLinkActive('#/estimator') ? 'text-[#0012FF] dark:text-cyan-400' : 'text-gray-400 dark:text-gray-500 group-hover:text-gray-750 dark:group-hover:text-gray-300'}`} />
                <span>{t.nav.estimator}</span>
              </button>
            </div>

            {/* Category 3: CORP DETAILS */}
            <div className="space-y-1">
              <span className="block text-[10.5px] font-mono text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em] px-4 mb-3 font-bold">
                {language === 'tr' ? 'KURUMSAL KİMLİK' : 'COMPANY INFO'}
              </span>

              <button 
                onClick={() => navigateTo('#/portfolio')} 
                className={`group w-full flex items-center gap-3.5 transition-all duration-200 cursor-pointer bg-transparent border-none px-4 py-3 rounded-xl relative text-left select-none ${
                  isLinkActive('#/portfolio') 
                    ? 'text-[#0012FF] dark:text-cyan-400 bg-[#0012FF]/5 dark:bg-cyan-400/5 font-extrabold' 
                    : 'text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/5 hover:text-gray-955 dark:hover:text-white'
                }`}
              >
                {isLinkActive('#/portfolio') && (
                  <motion.span 
                    layoutId="desktopActiveIndicator"
                    className="absolute left-0 top-2.5 bottom-2.5 w-1 rounded-r-full bg-[#0012FF] dark:bg-cyan-400"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <Briefcase className={`h-[18px] w-[18px] transition-transform duration-200 group-hover:scale-110 ${isLinkActive('#/portfolio') ? 'text-[#0012FF] dark:text-cyan-400' : 'text-gray-400 dark:text-gray-500 group-hover:text-gray-750 dark:group-hover:text-gray-300'}`} />
                <span>{t.nav.works}</span>
              </button>

              <button 
                onClick={() => navigateTo('#/blog')} 
                className={`group w-full flex items-center gap-3.5 transition-all duration-200 cursor-pointer bg-transparent border-none px-4 py-3 rounded-xl relative text-left select-none ${
                  isLinkActive('#/blog') 
                    ? 'text-[#0012FF] dark:text-cyan-400 bg-[#0012FF]/5 dark:bg-cyan-400/5 font-extrabold' 
                    : 'text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/5 hover:text-gray-955 dark:hover:text-white'
                }`}
              >
                {isLinkActive('#/blog') && (
                  <motion.span 
                    layoutId="desktopActiveIndicator"
                    className="absolute left-0 top-2.5 bottom-2.5 w-1 rounded-r-full bg-[#0012FF] dark:bg-cyan-400"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <Newspaper className={`h-[18px] w-[18px] transition-transform duration-200 group-hover:scale-110 ${isLinkActive('#/blog') ? 'text-[#0012FF] dark:text-cyan-400' : 'text-gray-400 dark:text-gray-500 group-hover:text-gray-750 dark:group-hover:text-gray-300'}`} />
                <span>{t.nav.blog}</span>
              </button>

              <button 
                onClick={() => navigateTo('#/about')} 
                className={`group w-full flex items-center gap-3.5 transition-all duration-200 cursor-pointer bg-transparent border-none px-4 py-3 rounded-xl relative text-left select-none ${
                  isLinkActive('#/about') 
                    ? 'text-[#0012FF] dark:text-cyan-400 bg-[#0012FF]/5 dark:bg-cyan-400/5 font-extrabold' 
                    : 'text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/5 hover:text-gray-955 dark:hover:text-white'
                }`}
              >
                {isLinkActive('#/about') && (
                  <motion.span 
                    layoutId="desktopActiveIndicator"
                    className="absolute left-0 top-2.5 bottom-2.5 w-1 rounded-r-full bg-[#0012FF] dark:bg-cyan-400"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <Info className={`h-[18px] w-[18px] transition-transform duration-200 group-hover:scale-110 ${isLinkActive('#/about') ? 'text-[#0012FF] dark:text-cyan-400' : 'text-gray-400 dark:text-gray-500 group-hover:text-gray-750 dark:group-hover:text-gray-300'}`} />
                <span>{t.nav.about}</span>
              </button>

              <button 
                onClick={() => navigateTo('#/careers')} 
                className={`group w-full flex items-center gap-3.5 transition-all duration-200 cursor-pointer bg-transparent border-none px-4 py-3 rounded-xl relative text-left select-none ${
                  isLinkActive('#/careers') 
                    ? 'text-[#0012FF] dark:text-cyan-400 bg-[#0012FF]/5 dark:bg-cyan-400/5 font-extrabold' 
                    : 'text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/5 hover:text-gray-955 dark:hover:text-white'
                }`}
              >
                {isLinkActive('#/careers') && (
                  <motion.span 
                    layoutId="desktopActiveIndicator"
                    className="absolute left-0 top-2.5 bottom-2.5 w-1 rounded-r-full bg-[#0012FF] dark:bg-cyan-400"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <Award className={`h-[18px] w-[18px] transition-transform duration-200 group-hover:scale-110 ${isLinkActive('#/careers') ? 'text-[#0012FF] dark:text-cyan-400' : 'text-gray-400 dark:text-gray-500 group-hover:text-gray-750 dark:group-hover:text-gray-300'}`} />
                <span>{t.nav.careers}</span>
              </button>

              <button 
                onClick={() => navigateTo('#/downloads')} 
                className={`group w-full flex items-center gap-3.5 transition-all duration-200 cursor-pointer bg-transparent border-none px-4 py-3 rounded-xl relative text-left select-none ${
                  isLinkActive('#/downloads') 
                    ? 'text-[#0012FF] dark:text-cyan-400 bg-[#0012FF]/5 dark:bg-cyan-400/5 font-extrabold' 
                    : 'text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/5 hover:text-gray-955 dark:hover:text-white'
                }`}
              >
                {isLinkActive('#/downloads') && (
                  <motion.span 
                    layoutId="desktopActiveIndicator"
                    className="absolute left-0 top-2.5 bottom-2.5 w-1 rounded-r-full bg-[#0012FF] dark:bg-cyan-400"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <Download className={`h-[18px] w-[18px] transition-transform duration-200 group-hover:scale-110 ${isLinkActive('#/downloads') ? 'text-[#0012FF] dark:text-cyan-400' : 'text-gray-400 dark:text-gray-500 group-hover:text-gray-750 dark:group-hover:text-gray-300'}`} />
                <span>{t.nav.downloads}</span>
              </button>

              <button 
                onClick={() => navigateTo('#/contact')} 
                className={`group w-full flex items-center gap-3.5 transition-all duration-200 cursor-pointer bg-transparent border-none px-4 py-3 rounded-xl relative text-left select-none ${
                  isLinkActive('#/contact') 
                    ? 'text-[#0012FF] dark:text-cyan-400 bg-[#0012FF]/5 dark:bg-cyan-400/5 font-extrabold' 
                    : 'text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/5 hover:text-gray-955 dark:hover:text-white'
                }`}
              >
                {isLinkActive('#/contact') && (
                  <motion.span 
                    layoutId="desktopActiveIndicator"
                    className="absolute left-0 top-2.5 bottom-2.5 w-1 rounded-r-full bg-[#0012FF] dark:bg-cyan-400"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <Mail className={`h-[18px] w-[18px] transition-transform duration-200 group-hover:scale-110 ${isLinkActive('#/contact') ? 'text-[#0012FF] dark:text-cyan-400' : 'text-gray-400 dark:text-gray-500 group-hover:text-gray-750 dark:group-hover:text-gray-300'}`} />
                <span>{t.nav.contact}</span>
              </button>
            </div>

            {/* Specialty Item: SHOPPING BASKET */}
            <div className="pt-2 border-t border-gray-100 dark:border-white/5">
              <button 
                onClick={() => setBasketOpen(true)}
                className={`w-full text-left transition-all duration-300 cursor-pointer bg-transparent border-hidden px-4 py-3 rounded-xl flex items-center justify-between group relative ${
                  basket.length > 0 
                    ? 'text-[#0012FF] dark:text-cyan-400 bg-[#0012FF]/10 dark:bg-cyan-400/5 border border-dashed border-[#0012FF]/40 dark:border-cyan-400/30' 
                    : 'text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/5 hover:text-gray-950 dark:hover:text-white'
                }`}
              >
                <span className="flex items-center gap-3.5 font-bold">
                  <ShoppingCart className={`h-[18px] w-[18px] transition-transform duration-300 group-hover:rotate-[-10deg] ${basket.length > 0 ? 'text-[#0012FF] dark:text-cyan-400 scale-110 animate-bounce' : 'text-gray-400 dark:text-gray-500'}`} />
                  <span className="text-[12px] uppercase font-mono tracking-wider">{language === 'tr' ? 'Teklif Sepetiniz' : 'Order Basket'}</span>
                </span>
                {basket.length > 0 ? (
                  <motion.span 
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    className="bg-[#0012FF] dark:bg-cyan-400 text-white dark:text-slate-950 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold leading-none"
                  >
                    {basket.reduce((sum, item) => sum + item.quantity, 0)}
                  </motion.span>
                ) : (
                  <span className="text-[10px] font-mono text-gray-400 dark:text-gray-500 opacity-80 uppercase tracking-tighter">Empty</span>
                )}
              </button>
            </div>
          </nav>
        </div>

        {/* Desktop Sidebar Utilities (Theme, Lang & Estimation CTA) */}
        <div className="space-y-4 pt-4 border-t border-gray-100 dark:border-white/5">
          <div className="flex items-center justify-between gap-1 bg-gray-50 dark:bg-[#10192e] p-1.5 rounded-2xl border border-gray-100 dark:border-white/5">
            {/* Language Switch */}
            <button
              onClick={toggleLanguage}
              title="Switch Language"
              className="flex-1 py-1.5 px-3 rounded-lg hover:bg-white dark:hover:bg-slate-800 text-gray-500 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:shadow-xs transition duration-200 flex items-center justify-center gap-1.5 cursor-pointer border-0 bg-transparent text-[11.5px] font-mono font-bold uppercase"
            >
              <Globe2 className="h-4 w-4" />
              <span>{language === 'en' ? 'EN' : 'TR'}</span>
            </button>

            {/* Vertical Line divider */}
            <span className="h-4 w-[1px] bg-gray-200 dark:bg-white/10" />

            {/* Theme Trigger */}
            <button
              onClick={toggleTheme}
              title="Toggle Theme Mode"
              className="flex-1 py-1.5 rounded-lg hover:bg-white dark:hover:bg-slate-800 text-gray-400 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:shadow-xs transition duration-200 flex items-center justify-center cursor-pointer border-0 bg-transparent"
            >
              {theme === 'light' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4 text-amber-400" />}
            </button>
          </div>

          <button
            onClick={() => navigateTo('#/estimator')}
            className="w-full h-12 flex items-center justify-center py-3 px-4 rounded-xl border-2 border-gray-900 dark:border-cyan-400 text-white dark:text-slate-950 bg-gray-955 dark:bg-cyan-400 hover:bg-white hover:text-gray-955 dark:hover:bg-transparent dark:hover:text-cyan-400 hover:border-gray-200 hover:shadow-lg transition-all duration-300 gap-1.5 cursor-pointer text-[12.5px] font-extrabold uppercase tracking-wider"
          >
            <span>{t.nav.actionBtn}</span>
            <ArrowUpRight className="h-4 w-4 stroke-[2.5]" />
          </button>
        </div>
      </aside>

      {/* HEADER SECTION */}
      <header className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 xl:hidden ${
        isScrolled 
          ? 'bg-white/95 dark:bg-[#0c1322]/95 backdrop-blur-md shadow-md border-b border-gray-150 dark:border-white/10 py-3' 
          : 'bg-white/80 dark:bg-[#0c1322]/80 backdrop-blur-xs py-4 border-b border-gray-100 dark:border-white/5'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <button 
            onClick={() => navigateTo('#/home')} 
            className="flex-shrink-0 transition-opacity hover:opacity-90 cursor-pointer bg-transparent border-none p-0"
          >
            <Logo size="md" lightBackground={theme === 'light'} />
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-6 text-[11px] lg:text-[12px] font-sans font-bold tracking-wider uppercase">
            <button 
              onClick={() => navigateTo('#/home')} 
              className={`transition-colors cursor-pointer bg-transparent border-none py-1 ${
                isLinkActive('#/home') ? 'text-[#0012FF] dark:text-cyan-400 border-b-2 border-[#0012FF] dark:border-cyan-400' : 'text-gray-500 dark:text-gray-400 hover:text-[#0012FF] dark:hover:text-cyan-300'
              }`}
            >
              {t.nav.vision}
            </button>
            <button 
              onClick={() => navigateTo('#/services')} 
              className={`transition-colors cursor-pointer bg-transparent border-none py-1 ${
                isLinkActive('#/services') ? 'text-[#0012FF] dark:text-cyan-400 border-b-2 border-[#0012FF] dark:border-cyan-400' : 'text-gray-500 dark:text-gray-400 hover:text-[#0012FF] dark:hover:text-cyan-300'
              }`}
            >
              {t.nav.services}
            </button>
            <div className="relative group py-1 flex items-center">
              <button 
                onClick={() => {
                  setSelectedCategory(null);
                  navigateTo('#/products');
                }} 
                className={`transition-colors cursor-pointer bg-transparent border-none py-1 flex items-center gap-1 ${
                  isLinkActive('#/products') ? 'text-[#0012FF] dark:text-cyan-400 border-b-2 border-[#0012FF] dark:border-cyan-400' : 'text-gray-500 dark:text-gray-400 hover:text-[#0012FF] dark:hover:text-cyan-300'
                }`}
              >
                <span>{t.nav.products}</span>
                <ChevronDown className="h-3 w-3 transition-transform duration-200 group-hover:rotate-180 opacity-70" />
              </button>
              
              {/* Desktop Products Submenu */}
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 w-80 bg-white dark:bg-[#0c1322] border border-gray-150 dark:border-white/10 rounded-2xl p-4 shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 pointer-events-none group-hover:pointer-events-auto">
                <span className="block text-[8px] font-mono text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-3 border-b border-gray-100 dark:border-white/5 pb-1 w-full text-left">
                  {language === 'tr' ? 'MÜHENDİSLİK ÜRÜN GRUPLARI' : 'ENGINEERING PRODUCT RANGES'}
                </span>
                <div className="space-y-1">
                  <button 
                    onClick={() => {
                      setSelectedCategory(null);
                      navigateTo('#/products');
                    }}
                    className="w-full text-left p-2 rounded-xl hover:bg-gray-50 dark:hover:bg-white/5 transition border-0 bg-transparent cursor-pointer group/item flex flex-col items-start gap-0.5"
                  >
                    <span className="text-[10px] font-bold text-gray-800 dark:text-gray-200 group-hover/item:text-[#0012FF] dark:group-hover/item:text-cyan-300 transition-colors uppercase font-mono tracking-tight">
                      {language === 'tr' ? '1. TÜM SİSTEMLER' : '1. ALL SYSTEMS'}
                    </span>
                    <span className="text-[9px] text-gray-400 dark:text-gray-500 font-normal leading-relaxed text-left">
                      {language === 'tr' ? 'Tüm orta ve yüksek gerilim donanımları, kabinler ve depolama.' : 'Full Medium and High voltage hardware, stabilizers, and cabinets.'}
                    </span>
                  </button>

                  <button 
                    onClick={() => {
                      setSelectedCategory('industrial');
                      navigateTo('#/products');
                    }}
                    className="w-full text-left p-2 rounded-xl hover:bg-gray-50 dark:hover:bg-white/5 transition border-0 bg-transparent cursor-pointer group/item flex flex-col items-start gap-0.5"
                  >
                    <span className="text-[10px] font-bold text-gray-800 dark:text-gray-200 group-hover/item:text-[#0012FF] dark:group-hover/item:text-cyan-300 transition-colors uppercase font-mono tracking-tight">
                      {language === 'tr' ? '2. AĞIR SANAYİ' : '2. HEAVY INDUSTRIAL'}
                    </span>
                    <span className="text-[9px] text-gray-400 dark:text-gray-500 font-normal leading-relaxed text-left">
                      {language === 'tr' ? 'Ağır sanayi 24kV orta gerilim switchgear elemanları.' : 'Heavy-duty 24kV medium-voltage plant switchgear.'}
                    </span>
                  </button>

                  <button 
                    onClick={() => {
                      setSelectedCategory('renewable');
                      navigateTo('#/products');
                    }}
                    className="w-full text-left p-2 rounded-xl hover:bg-gray-50 dark:hover:bg-white/5 transition border-0 bg-transparent cursor-pointer group/item flex flex-col items-start gap-0.5"
                  >
                    <span className="text-[10px] font-bold text-gray-800 dark:text-gray-200 group-hover/item:text-[#0012FF] dark:group-hover/item:text-cyan-300 transition-colors uppercase font-mono tracking-tight">
                      {language === 'tr' ? '3. YENİLENEBİLİR ŞEBEKE' : '3. RENEWABLE GRID'}
                    </span>
                    <span className="text-[9px] text-gray-400 dark:text-gray-500 font-normal leading-relaxed text-left">
                      {language === 'tr' ? '5MW şebeke dengeleyici MegaPack bataryalar ve DC hızlı şarj üniteleri.' : '5MW peak stabilizer MegaPacks and DC fast chargers.'}
                    </span>
                  </button>

                  <button 
                    onClick={() => {
                      setSelectedCategory('datacenter');
                      navigateTo('#/products');
                    }}
                    className="w-full text-left p-2 rounded-xl hover:bg-gray-50 dark:hover:bg-white/5 transition border-0 bg-transparent cursor-pointer group/item flex flex-col items-start gap-0.5"
                  >
                    <span className="text-[10px] font-bold text-gray-800 dark:text-gray-200 group-hover/item:text-[#0012FF] dark:group-hover/item:text-cyan-300 transition-colors uppercase font-mono tracking-tight">
                      {language === 'tr' ? '4. KRİTİK VERİ MERKEZLERİ' : '4. CRITICAL DATA BACKUP'}
                    </span>
                    <span className="text-[9px] text-gray-400 dark:text-gray-500 font-normal leading-relaxed text-left">
                      {language === 'tr' ? '4ms altında gecikmeli yedekli ATS transfer şalterleri.' : 'Under 4ms transfer dynamic redundant switchgears.'}
                    </span>
                  </button>

                  <button 
                    onClick={() => {
                      setSelectedCategory('commercial');
                      navigateTo('#/products');
                    }}
                    className="w-full text-left p-2 rounded-xl hover:bg-gray-50 dark:hover:bg-white/5 transition border-0 bg-transparent cursor-pointer group/item flex flex-col items-start gap-0.5"
                  >
                    <span className="text-[10px] font-bold text-gray-800 dark:text-gray-200 group-hover/item:text-[#0012FF] dark:group-hover/item:text-cyan-300 transition-colors uppercase font-mono tracking-tight text-left">
                      {language === 'tr' ? '5. AKILLI BİNA (BMS)' : '5. SMART BMS CONTROL'}
                    </span>
                    <span className="text-[9px] text-gray-400 dark:text-gray-500 font-normal leading-relaxed text-left">
                      {language === 'tr' ? 'Ethernet fiber ve akıllı sensörlü bina yönetim sistemleri.' : 'Fiber IoT integrated modern building cabinets.'}
                    </span>
                  </button>
                </div>
              </div>
            </div>
            <div className="relative group py-1 flex items-center">
              <button 
                onClick={() => navigateTo('#/iot')} 
                className={`transition-colors cursor-pointer bg-transparent border-none py-1 flex items-center gap-1 ${
                  isLinkActive('#/iot') ? 'text-[#0012FF] dark:text-cyan-400 border-b-2 border-[#0012FF] dark:border-cyan-400' : 'text-gray-500 dark:text-gray-400 hover:text-[#0012FF] dark:hover:text-cyan-300'
                }`}
              >
                <span>{t.nav.iot}</span>
                <ChevronDown className="h-3 w-3 transition-transform duration-200 group-hover:rotate-180 opacity-70" />
              </button>
              
              {/* Desktop Submenu */}
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 w-80 bg-white dark:bg-[#0c1322] border border-gray-150 dark:border-white/10 rounded-2xl p-4 shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 pointer-events-none group-hover:pointer-events-auto">
                <span className="block text-[8px] font-mono text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-3 border-b border-gray-100 dark:border-white/5 pb-1 w-full text-left">
                  Interactive Core Presets
                </span>
                <div className="space-y-1">
                  <button 
                    onClick={() => {
                      setSelectedIotUseCase('thermal');
                      navigateTo('#/iot');
                    }}
                    className="w-full text-left p-2 rounded-xl hover:bg-gray-50 dark:hover:bg-white/5 transition border-0 bg-transparent cursor-pointer group/item flex flex-col items-start gap-0.5"
                  >
                    <span className="text-[10px] font-bold text-gray-800 dark:text-gray-200 group-hover/item:text-[#0012FF] dark:group-hover/item:text-cyan-300 transition-colors uppercase font-mono tracking-tight">
                      1. Predictive Cooling
                    </span>
                    <span className="text-[9px] text-gray-400 dark:text-gray-500 font-normal leading-relaxed text-left">
                      Deploys high thermal liquid pump sweeps at 95% threshold.
                    </span>
                  </button>

                  <button 
                    onClick={() => {
                      setSelectedIotUseCase('peak-shaving');
                      navigateTo('#/iot');
                    }}
                    className="w-full text-left p-2 rounded-xl hover:bg-gray-50 dark:hover:bg-white/5 transition border-0 bg-transparent cursor-pointer group/item flex flex-col items-start gap-0.5"
                  >
                    <span className="text-[10px] font-bold text-gray-800 dark:text-gray-200 group-hover/item:text-[#0012FF] dark:group-hover/item:text-cyan-300 transition-colors uppercase font-mono tracking-tight">
                      2. Peak Shaving
                    </span>
                    <span className="text-[9px] text-gray-400 dark:text-gray-500 font-normal leading-relaxed text-left">
                      Offset substation core demands using lithium battery cells.
                    </span>
                  </button>

                  <button 
                    onClick={() => {
                      setSelectedIotUseCase('var-control');
                      navigateTo('#/iot');
                    }}
                    className="w-full text-left p-2 rounded-xl hover:bg-gray-50 dark:hover:bg-white/5 transition border-0 bg-transparent cursor-pointer group/item flex flex-col items-start gap-0.5"
                  >
                    <span className="text-[10px] font-bold text-gray-800 dark:text-gray-200 group-hover/item:text-[#0012FF] dark:group-hover/item:text-cyan-300 transition-colors uppercase font-mono tracking-tight">
                      3. CAP-Correction
                    </span>
                    <span className="text-[9px] text-gray-400 dark:text-gray-500 font-normal leading-relaxed text-left">
                      Deploy shunt capacitors to maximize lagging phase balance.
                    </span>
                  </button>

                  <button 
                    onClick={() => {
                      setSelectedIotUseCase('islanding');
                      navigateTo('#/iot');
                    }}
                    className="w-full text-left p-2 rounded-xl hover:bg-gray-50 dark:hover:bg-white/5 transition border-0 bg-transparent cursor-pointer group/item flex flex-col items-start gap-0.5"
                  >
                    <span className="text-[10px] font-bold text-gray-800 dark:text-gray-200 group-hover/item:text-[#0012FF] dark:group-hover/item:text-cyan-300 transition-colors uppercase font-mono tracking-tight text-left">
                      4. Islanding Isolation
                    </span>
                    <span className="text-[9px] text-gray-400 dark:text-gray-500 font-normal leading-relaxed text-left">
                      Tripping mechanical contactors under transformer hazard.
                    </span>
                  </button>
                </div>
              </div>
            </div>
            <button 
              onClick={() => navigateTo('#/estimator')} 
              className={`transition-colors cursor-pointer bg-transparent border-none py-1 ${
                isLinkActive('#/estimator') ? 'text-[#0012FF] dark:text-cyan-400 border-b-2 border-[#0012FF] dark:border-cyan-400' : 'text-gray-500 dark:text-gray-400 hover:text-[#0012FF] dark:hover:text-cyan-300'
              }`}
            >
              {t.nav.estimator}
            </button>
            <button 
              onClick={() => navigateTo('#/portfolio')} 
              className={`transition-colors cursor-pointer bg-transparent border-none py-1 ${
                isLinkActive('#/portfolio') ? 'text-[#0012FF] dark:text-cyan-400 border-b-2 border-[#0012FF] dark:border-cyan-400' : 'text-gray-500 dark:text-gray-400 hover:text-[#0012FF] dark:hover:text-cyan-300'
              }`}
            >
              {t.nav.works}
            </button>
            <button 
              onClick={() => navigateTo('#/blog')} 
              className={`transition-colors cursor-pointer bg-transparent border-none py-1 ${
                isLinkActive('#/blog') ? 'text-[#0012FF] dark:text-cyan-400 border-b-2 border-[#0012FF] dark:border-cyan-400' : 'text-gray-500 dark:text-gray-400 hover:text-[#0012FF] dark:hover:text-cyan-300'
              }`}
            >
              {t.nav.blog}
            </button>
            <button 
              onClick={() => navigateTo('#/about')} 
              className={`transition-colors cursor-pointer bg-transparent border-none py-1 ${
                isLinkActive('#/about') ? 'text-[#0012FF] dark:text-cyan-400 border-b-2 border-[#0012FF] dark:border-cyan-400' : 'text-gray-500 dark:text-gray-400 hover:text-[#0012FF] dark:hover:text-cyan-300'
              }`}
            >
              {t.nav.about}
            </button>
            <button 
              onClick={() => navigateTo('#/careers')} 
              className={`transition-colors cursor-pointer bg-transparent border-none py-1 ${
                isLinkActive('#/careers') ? 'text-[#0012FF] dark:text-cyan-400 border-b-2 border-[#0012FF] dark:border-cyan-400' : 'text-gray-500 dark:text-gray-400 hover:text-[#0012FF] dark:hover:text-cyan-300'
              }`}
            >
              {t.nav.careers}
            </button>
            <button 
              onClick={() => navigateTo('#/downloads')} 
              className={`transition-colors cursor-pointer bg-transparent border-none py-1 ${
                isLinkActive('#/downloads') ? 'text-[#0012FF] dark:text-cyan-400 border-b-2 border-[#0012FF] dark:border-cyan-400' : 'text-gray-500 dark:text-gray-400 hover:text-[#0012FF] dark:hover:text-cyan-300'
              }`}
            >
              {t.nav.downloads}
            </button>
            <button 
              onClick={() => navigateTo('#/contact')} 
              className={`transition-colors cursor-pointer bg-transparent border-none py-1 ${
                isLinkActive('#/contact') ? 'text-[#0012FF] dark:text-cyan-400 border-b-2 border-[#0012FF] dark:border-cyan-400' : 'text-gray-500 dark:text-gray-400 hover:text-[#0012FF] dark:hover:text-cyan-300'
              }`}
            >
              {t.nav.contact}
            </button>
          </nav>

          {/* Action CTA, Utility toggles and hamburger menu aligned right */}
          <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
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

            {/* Mobile hamburger menu */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-gray-600 dark:text-gray-300 hover:text-gray-955 dark:hover:text-white focus:outline-none bg-transparent border-none cursor-pointer flex items-center justify-center"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </header>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <>
              {/* Backing Backdrop Cover */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                exit={{ opacity: 0 }}
                onClick={() => setMobileMenuOpen(false)}
                className="fixed inset-0 bg-slate-950/40 backdrop-blur-sm z-50 xl:hidden"
              />

              {/* Drawer Sheet Body */}
              <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: "spring", stiffness: 380, damping: 35 }}
                className="fixed inset-y-0 right-0 w-full max-w-sm bg-white dark:bg-[#0c1322] shadow-2xl z-50 p-6 flex flex-col justify-between overflow-y-auto border-l border-gray-150 dark:border-white/10 xl:hidden"
              >
                {/* Header Section inside Drawer */}
                <div className="flex items-center justify-between pb-5 border-b border-gray-100 dark:border-white/5">
                  <Logo size="md" lightBackground={theme === 'light'} />
                  
                  <button 
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-2.5 rounded-xl bg-gray-50 dark:bg-slate-900 hover:bg-gray-100 dark:hover:bg-slate-800 text-gray-500 hover:text-gray-955 dark:text-gray-400 dark:hover:text-white transition-all cursor-pointer border-0 flex items-center justify-center"
                    aria-label="Close menu"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                {/* Subnav links Scroll Container */}
                <nav className="flex-grow py-6 flex flex-col gap-6 overflow-y-auto max-h-[calc(100vh-200px)] text-xs uppercase tracking-wider font-bold">
                  {/* Category Group 1: CORE NAVIGATION */}
                  <div className="space-y-1">
                    <span className="block text-[8px] font-mono text-gray-400 dark:text-gray-500 tracking-[0.25em] px-4 mb-2">
                      {language === 'tr' ? 'ANA MENÜ' : 'CORE NAVIGATION'}
                    </span>
                <button 
                  onClick={() => { navigateTo('#/home'); setMobileMenuOpen(false); }} 
                  className={`w-full flex items-center gap-3 py-2.5 px-4 rounded-xl transition-all cursor-pointer bg-transparent border-0 text-left ${
                    isLinkActive('#/home') 
                      ? 'text-[#0012FF] dark:text-cyan-400 bg-[#0012FF]/5 dark:bg-cyan-400/5 font-extrabold' 
                      : 'text-gray-500 hover:text-gray-955 dark:text-gray-400 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-white/5'
                  }`}
                >
                  <HomeIcon className="h-4 w-4" />
                  <span>{t.nav.vision}</span>
                </button>

                <button 
                  onClick={() => { navigateTo('#/services'); setMobileMenuOpen(false); }} 
                  className={`w-full flex items-center gap-3 py-2.5 px-4 rounded-xl transition-all cursor-pointer bg-transparent border-0 text-left ${
                    isLinkActive('#/services') 
                      ? 'text-[#0012FF] dark:text-cyan-400 bg-[#0012FF]/5 dark:bg-cyan-400/5 font-extrabold' 
                      : 'text-gray-500 hover:text-gray-955 dark:text-gray-400 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-white/5'
                  }`}
                >
                  <Layers className="h-4 w-4" />
                  <span>{t.nav.services}</span>
                </button>
              </div>

              {/* Category Group 2: SYSTEM CAPABILITIES */}
              <div className="space-y-1">
                <span className="block text-[8px] font-mono text-gray-400 dark:text-gray-500 tracking-[0.25em] px-4 mb-2">
                  {language === 'tr' ? 'SİSTEMLER VE ŞEBEKE' : 'SYSTEMS & GRID'}
                </span>

                {/* Products Accordion */}
                <div className="flex flex-col">
                  <button 
                    onClick={() => setMobileProductsSubmenuOpen(!mobileProductsSubmenuOpen)} 
                    className={`w-full flex items-center justify-between py-2.5 px-4 rounded-xl transition-all cursor-pointer bg-transparent border-0 text-left ${
                      isLinkActive('#/products') 
                        ? 'text-[#0012FF] dark:text-cyan-400 bg-[#0012FF]/5 dark:bg-cyan-400/5 font-extrabold' 
                        : 'text-gray-500 hover:text-gray-955 dark:text-gray-400 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-white/5'
                    }`}
                  >
                    <span className="flex items-center gap-3">
                      <Cpu className="h-4 w-4" />
                      <span>{t.nav.products}</span>
                    </span>
                    <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${mobileProductsSubmenuOpen ? 'rotate-180 text-[#0012FF] dark:text-cyan-400' : ''}`} />
                  </button>
                  
                  {mobileProductsSubmenuOpen && (
                    <div className="pl-6 mt-1.5 mb-1 border-l border-gray-150 dark:border-white/10 flex flex-col gap-1 ml-4 py-1.5 text-[10px]">
                      <button 
                        onClick={() => { setSelectedCategory(null); navigateTo('#/products'); setMobileMenuOpen(false); }}
                        className="text-left bg-transparent border-none py-2 px-3 hover:bg-gray-50 dark:hover:bg-white/5 rounded-lg font-bold text-gray-500 hover:text-gray-955 dark:text-gray-400 dark:hover:text-cyan-300 cursor-pointer"
                      >
                        🚀 {language === 'tr' ? '1. Tüm Sistemler' : '1. All Systems'}
                      </button>
                      <button 
                        onClick={() => { setSelectedCategory('industrial'); navigateTo('#/products'); setMobileMenuOpen(false); }}
                        className="text-left bg-transparent border-none py-2 px-3 hover:bg-gray-50 dark:hover:bg-white/5 rounded-lg font-bold text-gray-500 hover:text-gray-955 dark:text-gray-400 dark:hover:text-cyan-300 cursor-pointer"
                      >
                        🏭 {language === 'tr' ? '2. Ağır Sanayi' : '2. Heavy Industrial'}
                      </button>
                      <button 
                        onClick={() => { setSelectedCategory('renewable'); navigateTo('#/products'); setMobileMenuOpen(false); }}
                        className="text-left bg-transparent border-none py-2 px-3 hover:bg-gray-50 dark:hover:bg-white/5 rounded-lg font-bold text-gray-500 hover:text-gray-955 dark:text-gray-400 dark:hover:text-cyan-300 cursor-pointer"
                      >
                        ☀️ {language === 'tr' ? '3. Yenilenebilir Şebeke' : '3. Renewable Grid'}
                      </button>
                      <button 
                        onClick={() => { setSelectedCategory('datacenter'); navigateTo('#/products'); setMobileMenuOpen(false); }}
                        className="text-left bg-transparent border-none py-2 px-3 hover:bg-gray-50 dark:hover:bg-white/5 rounded-lg font-bold text-gray-500 hover:text-gray-955 dark:text-gray-400 dark:hover:text-cyan-300 cursor-pointer"
                      >
                        💾 {language === 'tr' ? '4. Kritik Yedekleme' : '4. Critical Backup'}
                      </button>
                      <button 
                        onClick={() => { setSelectedCategory('commercial'); navigateTo('#/products'); setMobileMenuOpen(false); }}
                        className="text-left bg-transparent border-none py-2 px-3 hover:bg-gray-55 dark:hover:bg-white/5 rounded-lg font-bold text-gray-500 hover:text-gray-955 dark:text-gray-400 dark:hover:text-cyan-300 cursor-pointer"
                      >
                        🏢 {language === 'tr' ? '5. Akıllı Bina (BMS)' : '5. Smart BMS Panel'}
                      </button>
                    </div>
                  )}
                </div>

                {/* IoT Accordion */}
                <div className="flex flex-col">
                  <button 
                    onClick={() => setMobileIotSubmenuOpen(!mobileIotSubmenuOpen)} 
                    className={`w-full flex items-center justify-between py-2.5 px-4 rounded-xl transition-all cursor-pointer bg-transparent border-0 text-left ${
                      isLinkActive('#/iot') 
                        ? 'text-[#0012FF] dark:text-cyan-400 bg-[#0012FF]/5 dark:bg-cyan-400/5 font-extrabold' 
                        : 'text-gray-500 hover:text-gray-955 dark:text-gray-400 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-white/5'
                    }`}
                  >
                    <span className="flex items-center gap-3">
                      <Activity className="h-4 w-4" />
                      <span>{t.nav.iot}</span>
                    </span>
                    <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${mobileIotSubmenuOpen ? 'rotate-180 text-[#0012FF] dark:text-cyan-400' : ''}`} />
                  </button>
                  
                  {mobileIotSubmenuOpen && (
                    <div className="pl-6 mt-1.5 mb-1 border-l border-gray-150 dark:border-white/10 flex flex-col gap-1 ml-4 py-1.5 text-[10px]">
                      <button 
                        onClick={() => { setSelectedIotUseCase('thermal'); navigateTo('#/iot'); setMobileMenuOpen(false); }}
                        className="text-left bg-transparent border-none py-2 px-3 hover:bg-gray-55 dark:hover:bg-white/5 rounded-lg font-bold text-gray-500 hover:text-gray-955 dark:text-gray-400 dark:hover:text-[#0012FF] cursor-pointer"
                      >
                        ❄️ 1. Predictive Cooling
                      </button>
                      <button 
                        onClick={() => { setSelectedIotUseCase('peak-shaving'); navigateTo('#/iot'); setMobileMenuOpen(false); }}
                        className="text-left bg-transparent border-none py-2 px-3 hover:bg-gray-55 dark:hover:bg-white/5 rounded-lg font-bold text-gray-500 hover:text-gray-955 dark:text-gray-400 dark:hover:text-[#0012FF] cursor-pointer"
                      >
                        🔋 2. Peak Shaving BESS
                      </button>
                      <button 
                        onClick={() => { setSelectedIotUseCase('var-control'); navigateTo('#/iot'); setMobileMenuOpen(false); }}
                        className="text-left bg-transparent border-none py-2 px-3 hover:bg-gray-55 dark:hover:bg-white/5 rounded-lg font-bold text-gray-500 hover:text-gray-955 dark:text-gray-400 dark:hover:text-[#0012FF] cursor-pointer"
                      >
                        ⚡ 3. CAP-Correction Sync
                      </button>
                      <button 
                        onClick={() => { setSelectedIotUseCase('islanding'); navigateTo('#/iot'); setMobileMenuOpen(false); }}
                        className="text-left bg-transparent border-none py-2 px-3 hover:bg-gray-55 dark:hover:bg-white/5 rounded-lg font-bold text-gray-500 hover:text-gray-955 dark:text-gray-400 dark:hover:text-[#0012FF] cursor-pointer"
                      >
                        🛡️ 4. Islanding Breaker
                      </button>
                    </div>
                  )}
                </div>

                <button 
                  onClick={() => { navigateTo('#/estimator'); setMobileMenuOpen(false); }} 
                  className={`w-full flex items-center gap-3 py-2.5 px-4 rounded-xl transition-all cursor-pointer bg-transparent border-0 text-left ${
                    isLinkActive('#/estimator') 
                      ? 'text-[#0012FF] dark:text-cyan-400 bg-[#0012FF]/5 dark:bg-cyan-400/5 font-extrabold' 
                      : 'text-gray-500 hover:text-gray-955 dark:text-gray-400 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-white/5'
                  }`}
                >
                  <Calculator className="h-4 w-4" />
                  <span>{t.nav.estimator}</span>
                </button>
              </div>

              {/* Category Group 3: COMPANY OUTLINE */}
              <div className="space-y-1">
                <span className="block text-[8px] font-mono text-gray-400 dark:text-gray-500 tracking-[0.25em] px-4 mb-2">
                  {language === 'tr' ? 'KURUMSAL KİMLİK' : 'COMPANY INFO'}
                </span>

                <button 
                  onClick={() => { navigateTo('#/portfolio'); setMobileMenuOpen(false); }} 
                  className={`w-full flex items-center gap-3 py-2.5 px-4 rounded-xl transition-all cursor-pointer bg-transparent border-0 text-left ${
                    isLinkActive('#/portfolio') 
                      ? 'text-[#0012FF] dark:text-cyan-400 bg-[#0012FF]/5 dark:bg-cyan-400/5 font-extrabold' 
                      : 'text-gray-500 hover:text-gray-955 dark:text-gray-400 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-white/5'
                  }`}
                >
                  <Briefcase className="h-4 w-4" />
                  <span>{t.nav.works}</span>
                </button>

                <button 
                  onClick={() => { navigateTo('#/blog'); setMobileMenuOpen(false); }} 
                  className={`w-full flex items-center gap-3 py-2.5 px-4 rounded-xl transition-all cursor-pointer bg-transparent border-0 text-left ${
                    isLinkActive('#/blog') 
                      ? 'text-[#0012FF] dark:text-cyan-400 bg-[#0012FF]/5 dark:bg-cyan-400/5 font-extrabold' 
                      : 'text-gray-500 hover:text-gray-955 dark:text-gray-400 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-white/5'
                  }`}
                >
                  <Newspaper className="h-4 w-4" />
                  <span>{t.nav.blog}</span>
                </button>

                <button 
                  onClick={() => { navigateTo('#/about'); setMobileMenuOpen(false); }} 
                  className={`w-full flex items-center gap-3 py-2.5 px-4 rounded-xl transition-all cursor-pointer bg-transparent border-0 text-left ${
                    isLinkActive('#/about') 
                      ? 'text-[#0012FF] dark:text-cyan-400 bg-[#0012FF]/5 dark:bg-cyan-400/5 font-extrabold' 
                      : 'text-gray-500 hover:text-gray-955 dark:text-gray-400 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-white/5'
                  }`}
                >
                  <Info className="h-4 w-4" />
                  <span>{t.nav.about}</span>
                </button>

                <button 
                  onClick={() => { navigateTo('#/careers'); setMobileMenuOpen(false); }} 
                  className={`w-full flex items-center gap-3 py-2.5 px-4 rounded-xl transition-all cursor-pointer bg-transparent border-0 text-left ${
                    isLinkActive('#/careers') 
                      ? 'text-[#0012FF] dark:text-cyan-400 bg-[#0012FF]/5 dark:bg-cyan-400/5 font-extrabold' 
                      : 'text-gray-500 hover:text-gray-955 dark:text-gray-400 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-white/5'
                  }`}
                >
                  <Award className="h-4 w-4" />
                  <span>{t.nav.careers}</span>
                </button>

                <button 
                  onClick={() => { navigateTo('#/downloads'); setMobileMenuOpen(false); }} 
                  className={`w-full flex items-center gap-3 py-2.5 px-4 rounded-xl transition-all cursor-pointer bg-transparent border-0 text-left ${
                    isLinkActive('#/downloads') 
                      ? 'text-[#0012FF] dark:text-cyan-400 bg-[#0012FF]/5 dark:bg-cyan-400/5 font-extrabold' 
                      : 'text-gray-550 hover:text-gray-955 dark:text-gray-400 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-white/5'
                  }`}
                >
                  <Download className="h-4 w-4" />
                  <span>{t.nav.downloads}</span>
                </button>

                <button 
                  onClick={() => { navigateTo('#/contact'); setMobileMenuOpen(false); }} 
                  className={`w-full flex items-center gap-3 py-2.5 px-4 rounded-xl transition-all cursor-pointer bg-transparent border-0 text-left ${
                    isLinkActive('#/contact') 
                      ? 'text-[#0012FF] dark:text-cyan-400 bg-[#0012FF]/5 dark:bg-cyan-400/5 font-extrabold' 
                      : 'text-gray-550 hover:text-gray-955 dark:text-gray-400 dark:hover:text-white hover:bg-gray-55 dark:hover:bg-white/5'
                  }`}
                >
                  <Mail className="h-4 w-4" />
                  <span>{t.nav.contact}</span>
                </button>
              </div>
            </nav>

            {/* Footer Section pinned inside Drawer */}
            <div className="pt-4 border-t border-gray-100 dark:border-white/5 space-y-3">
              <button
                onClick={() => { navigateTo('#/estimator'); setMobileMenuOpen(false); }}
                className="w-full h-11 flex items-center justify-center p-3 rounded-xl bg-[#0012FF] text-white dark:bg-cyan-400 dark:text-slate-950 font-bold hover:opacity-90 transition-all uppercase text-[10px] tracking-wider cursor-pointer border-0 gap-1"
              >
                <span>{t.nav.actionBtn}</span>
                <ArrowUpRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>

      {/* DETACHED MAIN TRANSITIONAL CONTENT LAYER */}
      <main className="flex-grow pt-24 sm:pt-28 xl:pt-12 xl:pl-72 pb-12 w-full">
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<Home onNavigate={navigateTo} />} />
            <Route path="/home" element={<Home onNavigate={navigateTo} />} />
            <Route path="/services" element={<Services onNavigate={navigateTo} />} />
            
            <Route path="/products" element={<Products onAddNewInquiry={handleAddNewInquiry} onNavigate={navigateTo} />} />
            <Route path="/products/c/:category" element={<Products onAddNewInquiry={handleAddNewInquiry} onNavigate={navigateTo} />} />
            <Route path="/products/p/:page" element={<Products onAddNewInquiry={handleAddNewInquiry} onNavigate={navigateTo} />} />
            <Route path="/products/c/:category/p/:page" element={<Products onAddNewInquiry={handleAddNewInquiry} onNavigate={navigateTo} />} />
            <Route path="/products/details/:productId" element={<ProductDetails onAddNewInquiry={handleAddNewInquiry} onNavigate={navigateTo} />} />
            <Route path="/products/:productId" element={<ProductDetails onAddNewInquiry={handleAddNewInquiry} onNavigate={navigateTo} />} />

            <Route path="/estimator" element={<Estimator inquiries={inquiries} onAddNewInquiry={handleAddNewInquiry} onDismissInquiry={handleDismissInquiry} />} />
            <Route path="/portfolio" element={<Portfolio />} />
            
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/c/:category" element={<Blog />} />
            <Route path="/blog/p/:page" element={<Blog />} />
            <Route path="/blog/c/:category/p/:page" element={<Blog />} />
            <Route path="/blog/article/:articleId" element={<Blog />} />

            <Route path="/downloads" element={<Downloads />} />
            <Route path="/downloads/c/:category" element={<Downloads />} />

            <Route path="/about" element={<About />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/contact" element={<Contacts />} />
            <Route path="/iot" element={<Iot />} />
            <Route path="/iot/:useCase" element={<Iot />} />
            <Route path="*" element={<Navigate to="/home" replace />} />
          </Routes>
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
