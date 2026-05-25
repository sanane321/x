import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useParams } from 'react-router';
import { useApp } from '../context/AppContext';
import { 
  ArrowLeft, 
  Zap, 
  ShoppingCart, 
  Check, 
  Plus, 
  Minus, 
  Settings, 
  ShieldCheck, 
  Cpu, 
  Activity, 
  Info,
  Clock,
  Gauge,
  Thermometer,
  ShieldAlert
} from 'lucide-react';
import { getProductCollection, ProductItem } from '../data/products';
import { EstimateConfiguration, CostBreakdown } from '../types';

interface ProductDetailsProps {
  productId?: string;
  onAddNewInquiry: (config: EstimateConfiguration & { cost: CostBreakdown; timeline: string }) => void;
  onNavigate: (path: string) => void;
  key?: string;
}

export default function ProductDetails({ productId: propProductId, onAddNewInquiry, onNavigate }: ProductDetailsProps) {
  const { productId: routeProductId } = useParams<{ productId?: string }>();
  const productId = propProductId || routeProductId || '';
  
  const { t, language, basket, addToBasket, updateBasketQuantity } = useApp();
  
  const [product, setProduct] = useState<ProductItem | null>(null);
  const [qty, setQty] = useState(1);
  const [activeTab, setActiveTab] = useState<'specs' | 'telemetry' | 'applications'>('specs');
  
  // Custom config states
  const [warrantyLevel, setWarrantyLevel] = useState<'standard' | 'extended' | 'premium'>('standard');
  const [certRequired, setCertRequired] = useState<boolean>(true);
  const [customCasing, setCustomCasing] = useState<boolean>(false);
  
  // Quick RFQ states
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [submitted, setSubmitted] = useState<boolean>(false);

  // IoT Live Mock Telemetry variables
  const [telemetryValues, setTelemetryValues] = useState<Record<string, string | number>>({});

  useEffect(() => {
    const products = getProductCollection(t);
    const found = products.find(p => p.id === productId);
    if (found) {
      setProduct(found);
    } else {
      // Fallback
      setProduct(products[0]);
    }
  }, [productId, t]);

  // Handle live telemetry simulation tick
  useEffect(() => {
    if (!product) return;

    const interval = setInterval(() => {
      setTelemetryValues(prev => {
        const delta = (Math.random() - 0.5);
        if (product.id === 'prod-mvs') {
          return {
            operatingVoltage: (13.8 + delta * 0.05).toFixed(2) + ' kV',
            sf6Pressure: (5.2 + delta * 0.08).toFixed(2) + ' bar',
            breakerState: Math.random() > 0.98 ? 'TESTING' : 'CLOSED',
            thd: (1.8 + delta * 0.15).toFixed(2) + ' %',
            uptime: '99.9997 %'
          };
        } else if (product.id === 'prod-megapack') {
          return {
            soc: Math.floor(Math.max(10, Math.min(100, 78 + (Math.random() - 0.5) * 1))),
            temp: (21.4 + delta * 0.2).toFixed(1) + ' °C',
            coolantFlow: (42.5 + delta * 0.5).toFixed(1) + ' L/min',
            chargeRate: (4.2 + delta * 0.1).toFixed(2) + ' MW',
            activeCells: '1,024 / 1,024'
          };
        } else if (product.id === 'prod-ats') {
          return {
            sourceAVoltage: (482 + delta * 1.5).toFixed(0) + ' V',
            sourceBVoltage: (481 + delta * 1.5).toFixed(0) + ' V',
            latency: (3.4 + delta * 0.08).toFixed(2) + ' ms',
            activeSource: Math.random() > 0.99 ? 'GENSET' : 'UTILITY GRID',
            thyristorTemp: (41.6 + delta * 0.3).toFixed(1) + ' °C'
          };
        } else if (product.id === 'prod-charger') {
          return {
            powerOutput: (312 + delta * 3.5).toFixed(0) + ' kW',
            vehicleSoc: Math.floor(Math.max(0, Math.min(100, 42 + delta * 2.5))) + ' %',
            pumpSpeed: Math.floor(84 + delta * 2) + ' %',
            connectorTemp: (32.4 + delta * 0.4).toFixed(1) + ' °C',
            powerFactor: (0.99 + delta * 0.002).toFixed(3)
          };
        } else {
          return {
            packetsPerSec: Math.floor(142 + delta * 8) + ' pps',
            activeAlarms: Math.random() > 0.98 ? 1 : 0,
            networkNodes: 128,
            cpuTemp: (38.2 + delta * 0.2).toFixed(1) + ' °C',
            busEfficiency: '99.85 %'
          };
        }
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [product]);

  if (!product) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }

  // Calculate customized final price
  const baseCost = product.estimatedCost;
  let multiplier = 1.0;
  if (warrantyLevel === 'extended') multiplier += 0.08;
  if (warrantyLevel === 'premium') multiplier += 0.15;
  if (!certRequired) multiplier -= 0.03;
  if (customCasing) multiplier += 0.05;

  const finalCost = Math.round(baseCost * multiplier);

  // Recommendations logic (any items excluding current)
  const allProducts = getProductCollection(t);
  const recommendations = allProducts.filter(p => p.id !== product.id).slice(0, 2);

  const handleProductSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName || !clientEmail) return;

    onAddNewInquiry({
      projectType: product.discipline,
      areaSqFt: 15000,
      amperage: product.amperage,
      voltage: product.voltage,
      resilientPower: product.discipline === 'datacenter' || warrantyLevel === 'premium',
      smartControls: product.id === 'prod-bms' || customCasing,
      greenEnergy: product.discipline === 'renewable',
      industrialMachinery: product.discipline === 'industrial',
      networking: true,
      cost: {
        designCost: Math.round(finalCost * 0.1),
        materialsCost: Math.round(finalCost * 0.7),
        laborCost: Math.round(finalCost * 0.15),
        commissioningCost: Math.round(finalCost * 0.05),
        totalCost: finalCost * qty,
      },
      timeline: `${product.leadTime} ${t.products.weeks}`,
    });

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setClientName('');
      setClientEmail('');
    }, 4000);
  };

  const getDisciplineLabel = (disc: string) => {
    switch (disc) {
      case 'industrial':
        return language === 'tr' ? 'Ağır Sanayi' : 'Heavy Industrial';
      case 'renewable':
        return language === 'tr' ? 'Yenilenebilir' : 'Renewable';
      case 'datacenter':
        return language === 'tr' ? 'Kritik Yedek' : 'Critical Backup';
      default:
        return language === 'tr' ? 'Akıllı Bina' : 'Smart BMS';
    }
  };

  // Get current quantity in basket
  const itemInBasket = basket.find(item => item.id === product.id);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.4 }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12 text-left"
    >
      {/* Back Button & Navigation Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-100 dark:border-white/5 pb-6">
        <button
          onClick={() => onNavigate('#/products')}
          className="group inline-flex items-center gap-2 cursor-pointer text-sm font-mono font-medium text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors bg-transparent border-none p-0"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          <span>{language === 'tr' ? 'KATALOG LİSTESİNE DÖN' : 'BACK TO CATALOG LIST'}</span>
        </button>
        <div className="text-xs font-mono text-gray-400 dark:text-gray-500">
          <span>{language === 'tr' ? 'Ürün Kimliği' : 'Product ID'}:</span> <strong className="text-gray-700 dark:text-gray-300">{product.id.toUpperCase()}</strong>
        </div>
      </div>

      {/* Main Grid View */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Side: Image, Details Tabs & Active Telemetry */}
        <div className="lg:col-span-7 space-y-8">
          {/* Main Visual */}
          <div className="relative overflow-hidden rounded-3xl aspect-[16/10] bg-gray-50 dark:bg-slate-950 border border-gray-150/50 dark:border-white/5 shadow-inner">
            {product.imageSrc ? (
              <img 
                src={product.imageSrc} 
                alt={product.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-[1.02]"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400 dark:text-gray-600 font-mono text-xs">
                {language === 'tr' ? 'Görsel Temin Edilmedi' : 'No Image Provided'}
              </div>
            )}
            <div className="absolute top-4 left-4 bg-gray-900/90 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/10 flex items-center gap-1.5 text-xs text-[#00FF00] font-mono">
              <span className="h-1.5 w-1.5 bg-[#00FF00] rounded-full animate-ping" />
              <span>{language === 'tr' ? 'Simülasyon Aktif' : 'Simulator Active'}</span>
            </div>
          </div>

          {/* Interactive Specification Tabs */}
          <div className="bg-white dark:bg-slate-900 border border-gray-150 dark:border-white/5 rounded-3xl overflow-hidden shadow-sm">
            <div className="flex border-b border-gray-100 dark:border-white/5 bg-gray-50/50 dark:bg-slate-950/20 p-2">
              <button
                onClick={() => setActiveTab('specs')}
                className={`flex-1 py-3 text-xs font-mono font-bold tracking-wider uppercase rounded-2xl cursor-pointer border-none transition-all ${
                  activeTab === 'specs'
                    ? 'bg-white dark:bg-slate-800 text-[#0012FF] dark:text-cyan-400 shadow-sm'
                    : 'text-gray-400 dark:text-gray-500 hover:text-gray-900 dark:hover:text-white bg-transparent'
                }`}
              >
                {language === 'tr' ? 'Teknik Özellikler' : 'Technical Specs'}
              </button>
              <button
                onClick={() => setActiveTab('telemetry')}
                className={`flex-1 py-3 text-xs font-mono font-bold tracking-wider uppercase rounded-2xl cursor-pointer border-none transition-all flex items-center justify-center gap-1.5 ${
                  activeTab === 'telemetry'
                    ? 'bg-white dark:bg-slate-800 text-[#0012FF] dark:text-cyan-400 shadow-sm'
                    : 'text-gray-400 dark:text-gray-500 hover:text-gray-900 dark:hover:text-white bg-transparent'
                }`}
              >
                <Activity className="h-3.5 w-3.5" />
                <span>{language === 'tr' ? 'Endüstriyel Telemetri' : 'IoT Telemetry'}</span>
              </button>
              <button
                onClick={() => setActiveTab('applications')}
                className={`flex-1 py-3 text-xs font-mono font-bold tracking-wider uppercase rounded-2xl cursor-pointer border-none transition-all ${
                  activeTab === 'applications'
                    ? 'bg-white dark:bg-slate-800 text-[#0012FF] dark:text-cyan-400 shadow-sm'
                    : 'text-gray-400 dark:text-gray-500 hover:text-gray-900 dark:hover:text-white bg-transparent'
                }`}
              >
                {language === 'tr' ? 'Uygulama Alanları' : 'Applications'}
              </button>
            </div>

            <div className="p-6 sm:p-8">
              <AnimatePresence mode="wait">
                {activeTab === 'specs' && (
                  <motion.div
                    key="specs-tab"
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    className="grid grid-cols-1 sm:grid-cols-2 gap-6"
                  >
                    <div className="space-y-4">
                      <span className="text-[10px] uppercase tracking-wider text-gray-400 dark:text-gray-500 font-mono font-bold block">
                        {language === 'tr' ? 'YAPISAL PARAMETRELER:' : 'STRUCTURAL RATINGS:'}
                      </span>
                      <table className="w-full text-xs text-gray-500 dark:text-gray-400 font-mono space-y-2">
                        <tbody>
                          <tr className="border-b border-gray-100 dark:border-white/5 py-2 block">
                            <td className="w-1/2 font-semibold text-gray-700 dark:text-gray-300">{language === 'tr' ? 'Gerilim Değeri' : 'Voltage Standard'}</td>
                            <td className="text-right text-gray-950 dark:text-white">{product.voltage}</td>
                          </tr>
                          <tr className="border-b border-gray-100 dark:border-white/5 py-2 block">
                            <td className="w-1/2 font-semibold text-gray-700 dark:text-gray-300">{language === 'tr' ? 'Akım Kapasitesi' : 'Amperage Scale'}</td>
                            <td className="text-right text-gray-950 dark:text-white">{product.amperage} A</td>
                          </tr>
                          <tr className="border-b border-gray-100 dark:border-white/5 py-2 block">
                            <td className="w-1/2 font-semibold text-gray-700 dark:text-gray-300">{language === 'tr' ? 'Sertifikasyonlar' : 'Standards Code'}</td>
                            <td className="text-right text-gray-950 dark:text-white">IEC / UL Standards</td>
                          </tr>
                          <tr className="py-2 block">
                            <td className="w-1/2 font-semibold text-gray-700 dark:text-gray-300">{language === 'tr' ? 'İzolasyon Tipi' : 'Insulation Level'}</td>
                            <td className="text-right text-gray-950 dark:text-white">Form 4 Type 7 IP65</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    <div className="space-y-4">
                      <span className="text-[10px] uppercase tracking-wider text-gray-400 dark:text-gray-500 font-mono font-bold block">
                        {language === 'tr' ? 'FABRİKASYON DETAYLARI:' : 'FABRICATION SUMMARY:'}
                      </span>
                      <ul className="space-y-2.5 text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
                        {product.specs.map((item, idx) => (
                          <li key={idx} className="flex gap-2">
                            <span className="h-1.5 w-1.5 bg-cyan-400 rounded-full mt-2 flex-shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                )}

                {activeTab === 'telemetry' && (
                  <motion.div
                    key="telemetry-tab"
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    className="space-y-6"
                  >
                    <div className="flex items-center gap-3 bg-cyan-500/5 border border-cyan-500/25 p-4 rounded-2xl">
                      <Cpu className="h-5 w-5 text-cyan-400" />
                      <div className="text-xs">
                        <strong className="text-gray-900 dark:text-white font-mono block">XE.SYSTEM_TELEMETRY.DESK_v1</strong>
                        <span className="text-gray-500 dark:text-gray-400">
                          {language === 'tr' 
                            ? 'Bu ürün için tasarlanan canlı denetim modülleri tescilli ağ protokolleri üzerinden raporlanır.' 
                            : 'Live telemetry reporting for the active hardware unit over virtual Modbus interface.'}
                        </span>
                      </div>
                    </div>

                    {/* Numeric Diagnostics Panel */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                      {Object.keys(telemetryValues).length > 0 ? (
                        Object.entries(telemetryValues).map(([key, val]) => (
                          <div key={key} className="bg-gray-50 dark:bg-slate-950 p-4 rounded-xl border border-gray-150/50 dark:border-white/5 flex flex-col justify-between">
                            <span className="text-[9px] font-mono text-gray-400 uppercase tracking-wider block mb-1">
                              {key.replace(/([A-Z])/g, ' $1')}
                            </span>
                            <span className={`text-sm sm:text-base font-mono font-bold ${
                              typeof val === 'number' && val > 90 ? 'text-amber-500' : 'text-gray-900 dark:text-[#00FF00]'
                            }`}>
                              {val}
                            </span>
                          </div>
                        ))
                      ) : (
                        <div className="col-span-full py-8 text-center text-xs text-gray-400 font-mono flex items-center justify-center gap-2">
                          <span className="h-2 w-2 bg-yellow-400 rounded-full animate-pulse" />
                          <span>{language === 'tr' ? 'Sensör bağlantıları aranıyor...' : 'Calibrating system relays...'}</span>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}

                {activeTab === 'applications' && (
                  <motion.div
                    key="apps-tab"
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    className="prose prose-sm dark:prose-invert"
                  >
                    <p className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm leading-relaxed mb-4">
                      {product.discipline === 'industrial' && (
                        language === 'tr'
                          ? 'Ağır endüktif yükler taşıyan motor kontrol merkezleri, yüksek gerilim dağıtım trafoları ve çimento/çelik imalathanelerindeki ana dağıtım kabinleri için özel olarak optimize edilmiştir.'
                          : 'Specifically designed for utility interconnections, industrial machining plants, mineral production units, and heavy substations carrying significant inductive loads.'
                      )}
                      {product.discipline === 'renewable' && (
                        language === 'tr'
                          ? 'Güneş santrallerinin çift yönlü enerji transfer optimizasyonu, dev rüzgar gülleri ana busbar koordinasyonu ve megavat düzeyindeki batarya depolama modülü entegrasyonu için idealdir.'
                          : 'Engineered directly for renewable microgrid coupling, heavy utility PV farms, battery energy storage cells integration, and active load monitoring of charging infrastructures.'
                      )}
                      {product.discipline === 'datacenter' && (
                        language === 'tr'
                          ? 'Uptime öncelikli veri sunucu katları ve hastane acil durum kritik panolarında, milisaniyeler altında jeneratör geçişleri sağlayan kritik elektrik yüklerini yönetmek üzere imal edilmiştir.'
                          : 'Engineered for Tier 4 hyperscale environments, server centers, medical emergency arrays, and auxiliary grids requiring sub-millisecond automated transfer interlocking.'
                      )}
                      {product.discipline === 'commercial' && (
                        language === 'tr'
                          ? 'Çok katlı holding binaları, akıllı hastaneler ve endüstriyel kampüslerin entegre BMS otomasyonu, Modbus/OPC dijital sayaç kontrolleri ve akıllı iklimlendirme dağıtımları için uygundur.'
                          : 'Optimized for high-rise commercial structures, smart hospital complexes, automated facilities, and campus control cabinets looking to merge physical electrical monitoring into a unified digital panel.'
                      )}
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                      <div className="flex gap-2.5 items-start">
                        <div className="p-2 rounded-xl bg-[#0012FF]/5 dark:bg-cyan-400/5 text-[#0012FF] dark:text-cyan-400 flex-shrink-0">
                          <ShieldCheck className="h-4 w-4" />
                        </div>
                        <div>
                          <strong className="text-xs text-gray-900 dark:text-white block font-semibold">{language === 'tr' ? 'Siber Koruma Entegrasyonu' : 'IEC Cyber-Security Ready'}</strong>
                          <span className="text-[11px] text-gray-500 dark:text-gray-400 font-mono">Firmware levels conform directly to IEC 62443 standard core protections.</span>
                        </div>
                      </div>

                      <div className="flex gap-2.5 items-start">
                        <div className="p-2 rounded-xl bg-[#0012FF]/5 dark:bg-cyan-400/5 text-[#0012FF] dark:text-cyan-400 flex-shrink-0">
                          <Settings className="h-4 w-4" />
                        </div>
                        <div>
                          <strong className="text-xs text-gray-900 dark:text-white block font-semibold">{language === 'tr' ? 'BIM Entegrasyon Garantisi' : 'LOD 400 BIM Compliant'}</strong>
                          <span className="text-[11px] text-gray-500 dark:text-gray-400 font-mono">Includes native Revit modular families with zero spatial dimension overrides.</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Right Side: Configurator, Price Panel, Cart Controls & RFQ */}
        <div className="lg:col-span-5 space-y-8">
          {/* Main Product Info and Pricing */}
          <div className="bg-white dark:bg-slate-900 border border-gray-150 dark:border-white/10 rounded-3xl p-6 sm:p-8 flex flex-col justify-between hover:shadow-md transition-all duration-300">
            <div className="space-y-4">
              <div className="flex items-center gap-1.5 self-start">
                <span className="bg-[#0012FF]/5 dark:bg-[#0012FF]/20 px-3 py-1 rounded-full text-xs font-mono font-bold text-[#0012FF] dark:text-cyan-300">
                  {getDisciplineLabel(product.discipline)}
                </span>
                <span className="text-[10px] font-mono text-gray-400 dark:text-gray-500 border border-gray-150 dark:border-white/10 px-2 py-0.5 rounded-md">
                  {language === 'tr' ? 'Tedarik' : 'Lead'}: {product.leadTime} {t.products.weeks}
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-display font-medium tracking-tight text-gray-900 dark:text-white">
                {product.name}
              </h2>
              <p className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm leading-relaxed">
                {product.desc}
              </p>

              {/* Configurations Panel */}
              <div className="border-t border-b border-gray-100 dark:border-white/5 py-6 my-6 space-y-4">
                <span className="text-[10px] uppercase font-mono tracking-widest text-gray-400 dark:text-gray-500 block font-bold">
                  {language === 'tr' ? 'TASARIM YAPILANDIRMASI:' : 'SIMULATOR CONFIGURATIONS:'}
                </span>

                {/* Warranty Select */}
                <div className="space-y-1.5">
                  <label className="text-xs text-gray-600 dark:text-gray-400 flex items-center gap-1 font-semibold">
                    <ShieldCheck className="h-3.5 w-3.5 text-[#0012FF] dark:text-cyan-400" />
                    <span>{language === 'tr' ? 'Garanti Seviyesi:' : 'Contract Warranty Level:'}</span>
                  </label>
                  <div className="grid grid-cols-3 gap-1.5">
                    {(['standard', 'extended', 'premium'] as const).map((level) => (
                      <button
                        key={level}
                        type="button"
                        onClick={() => setWarrantyLevel(level)}
                        className={`py-1.5 px-2 rounded-xl text-[10px] font-mono font-bold uppercase cursor-pointer border transition-all ${
                          warrantyLevel === level
                            ? 'bg-gray-950 dark:bg-cyan-400 text-white dark:text-slate-950 border-gray-950 dark:border-cyan-400 font-extrabold'
                            : 'bg-transparent border-gray-150 dark:border-white/5 text-gray-500 hover:text-gray-900 dark:hover:text-white'
                        }`}
                      >
                        {level === 'standard' ? (language === 'tr' ? '1 YIL' : '1 YEAR') : 
                         level === 'extended' ? (language === 'tr' ? '3 YIL (+8%)' : '3 YEAR (+8%)') : 
                         (language === 'tr' ? '5 YIL (+15%)' : '5 YEAR (+15%)')}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Additional Checks */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {/* QA certification check */}
                  <label className="flex items-center gap-2.5 cursor-pointer select-none bg-gray-50 dark:bg-slate-950 p-2.5 rounded-xl border border-gray-150/40 dark:border-white/5">
                    <input 
                      type="checkbox" 
                      className="rounded border-gray-300 dark:border-white/10 text-[#0012FF] dark:text-cyan-400 focus:ring-0"
                      checked={certRequired} 
                      onChange={(e) => setCertRequired(e.checked ?? e.target.checked)}
                    />
                    <div className="text-left">
                      <span className="text-[11px] font-semibold text-gray-700 dark:text-gray-300 block leading-tight">{language === 'tr' ? 'Akreditasyon' : 'Certifications'}</span>
                      <span className="text-[9px] text-gray-400 font-mono">ISO & IEC testing (-3% off if none)</span>
                    </div>
                  </label>

                  {/* Casing check */}
                  <label className="flex items-center gap-2.5 cursor-pointer select-none bg-gray-50 dark:bg-slate-950 p-2.5 rounded-xl border border-gray-150/40 dark:border-white/5">
                    <input 
                      type="checkbox" 
                      className="rounded border-gray-300 dark:border-white/10 text-[#0012FF] dark:text-cyan-400 focus:ring-0"
                      checked={customCasing} 
                      onChange={(e) => setCustomCasing(e.checked ?? e.target.checked)}
                    />
                    <div className="text-left">
                      <span className="text-[11px] font-semibold text-gray-700 dark:text-gray-300 block leading-tight">{language === 'tr' ? 'Özel Kabin' : 'Heavy Casing'}</span>
                      <span className="text-[9px] text-gray-400 font-mono">Seismic dampening casing (+5%)</span>
                    </div>
                  </label>
                </div>
              </div>

              {/* Dynamic Price Calculation */}
              <div className="space-y-4 pt-2">
                <div className="flex items-baseline justify-between select-none p-3.5 rounded-2xl bg-gray-50 dark:bg-slate-950/60 border border-gray-150/55 dark:border-white/5">
                  <span className="text-xs text-gray-400 font-mono uppercase">{language === 'tr' ? 'SİMÜLE BÜTÇE' : 'CALCULATED PRICE'}</span>
                  <div className="text-right">
                    <span className="text-xl sm:text-2xl font-mono font-bold text-[#0012FF] dark:text-[#00FF00]">
                      ${(finalCost * qty).toLocaleString()} <span className="text-xs text-gray-400 font-sans font-normal">USD</span>
                    </span>
                    {qty > 1 && (
                      <span className="text-[10px] font-mono text-gray-400 block">${finalCost.toLocaleString()} / {language === 'tr' ? 'birim' : 'unit'}</span>
                    )}
                  </div>
                </div>

                {/* Add to Basket Actions */}
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 pt-1">
                  {/* Quantity selector */}
                  <div className="sm:col-span-5 flex items-center justify-between border border-gray-150 dark:border-white/10 rounded-xl px-3.5 py-1.5 bg-white dark:bg-slate-900 select-none h-11">
                    <button
                      onClick={() => setQty(prev => Math.max(1, prev - 1))}
                      className="w-8 h-8 flex items-center justify-center rounded-lg bg-gray-100 dark:bg-slate-800 hover:bg-[#0012FF]/10 text-gray-800 dark:text-white border-none cursor-pointer text-sm font-bold active:scale-90 transition-transform"
                      title="Decrease"
                    >
                      <Minus className="h-3.5 w-3.5" />
                    </button>
                    <span className="font-mono text-sm font-extrabold text-[#0012FF] dark:text-cyan-400">
                      {qty}
                    </span>
                    <button
                      onClick={() => setQty(prev => prev + 1)}
                      className="w-8 h-8 flex items-center justify-center rounded-lg bg-gray-100 dark:bg-slate-800 hover:bg-[#0012FF]/10 text-gray-800 dark:text-white border-none cursor-pointer text-sm font-bold active:scale-90 transition-transform"
                      title="Increase"
                    >
                      <Plus className="h-3.5 w-3.5" />
                    </button>
                  </div>

                  {/* Add / Update basket button */}
                  <div className="sm:col-span-7">
                    <button
                      onClick={() => {
                        const countInBasket = itemInBasket ? itemInBasket.quantity : 0;
                        if (countInBasket > 0) {
                          // Update
                          updateBasketQuantity(product.id, countInBasket + qty);
                        } else {
                          // Add
                          addToBasket({
                            id: product.id,
                            name: product.name,
                            desc: product.desc,
                            specs: product.specs,
                            estimatedCost: finalCost,
                            voltage: product.voltage,
                            amperage: product.amperage,
                            leadTime: product.leadTime,
                            discipline: product.discipline,
                            imageSrc: product.imageSrc
                          });
                          // Scale basket to exact requested if necessary
                          if (qty > 1) {
                            updateBasketQuantity(product.id, qty);
                          }
                        }
                      }}
                      className="w-full h-11 rounded-xl bg-gray-950 dark:bg-cyan-400 text-white dark:text-slate-950 hover:bg-opacity-90 font-bold text-xs transition uppercase flex items-center justify-center gap-2 cursor-pointer border-0 shadow-sm"
                    >
                      <ShoppingCart className="h-4 w-4" />
                      <span>
                        {itemInBasket 
                          ? (language === 'tr' ? 'Miktarı Arttır' : 'Increase Quantities') 
                          : (language === 'tr' ? 'Teklif Sepetine Ekle' : 'Add to Offer Basket')
                        }
                      </span>
                    </button>
                  </div>
                </div>

                {itemInBasket && (
                  <div className="text-[10px] font-mono text-gray-400 bg-gray-50 dark:bg-slate-950/40 border border-gray-150/40 dark:border-white/5 p-2 rounded-lg text-center flex items-center justify-center gap-1.5">
                    <Check className="h-3 w-3 text-emerald-400" />
                    <span>
                      {language === 'tr' 
                        ? `Bu üründen sepetinizde halihazırda ${itemInBasket.quantity} adet ekli durumda.` 
                        : `Already have ${itemInBasket.quantity} of this item staged in your basket.`}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Quick RFQ for this product */}
          <div className="bg-white dark:bg-slate-900 border border-gray-150 dark:border-white/5 rounded-3xl p-6 sm:p-8 space-y-4 text-left shadow-sm">
            <div className="space-y-1">
              <span className="text-[10px] uppercase font-mono tracking-widest text-[#0012FF] dark:text-cyan-400 font-extrabold block">
                {t.products.inquiryTitle}
              </span>
              <p className="text-gray-400 dark:text-gray-500 text-xs font-serif italic">
                {language === 'tr' ? 'Doğrudan mühendislik ekibimiz ile anlık tescilli interlok simülasyonu başlatın.' : 'Establish direct bidding specifications telemetry link below.'}
              </p>
            </div>

            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="p-4 bg-[#00FF00]/10 border border-[#00FF00]/20 rounded-2xl text-center text-xs text-[#00FF00] font-semibold space-y-1.5"
                >
                  <Check className="h-5 w-5 mx-auto text-[#00FF00] stroke-[3] animate-bounce" />
                  <strong className="block text-sm">{language === 'tr' ? 'Teklif Başarıyla Sıralandı!' : 'Spec Telemetry Locked'}</strong>
                  <p className="text-[10px] opacity-80 leading-relaxed font-mono">
                    {t.products.inquirySuccess}
                  </p>
                </motion.div>
              ) : (
                <motion.form
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleProductSubmit}
                  className="space-y-3.5"
                >
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono text-gray-400 uppercase tracking-widest block font-bold">{t.estimator.formName}</label>
                    <input
                      required
                      type="text"
                      placeholder="e.g. Vertiv Hub representative"
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      className="w-full bg-gray-50 dark:bg-slate-950 border border-gray-250 dark:border-white/10 rounded-xl px-3.5 py-2.5 text-xs focus:ring-1 focus:ring-[#0012FF] dark:focus:ring-cyan-500 outline-none text-gray-800 dark:text-white"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono text-gray-400 uppercase tracking-widest block font-bold">{t.estimator.formEmail}</label>
                    <input
                      required
                      type="email"
                      placeholder="e.g. rep@vertiv.com"
                      value={clientEmail}
                      onChange={(e) => setClientEmail(e.target.value)}
                      className="w-full bg-gray-50 dark:bg-slate-950 border border-gray-250 dark:border-white/10 rounded-xl px-3.5 py-2.5 text-xs focus:ring-1 focus:ring-[#0012FF] dark:focus:ring-cyan-500 outline-none text-gray-800 dark:text-white"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full py-3 px-4 rounded-xl bg-gray-900 dark:bg-[#00FF00] dark:text-gray-950 text-white font-bold hover:bg-gray-800 dark:hover:bg-[#00E000] text-xs tracking-wider transition-all uppercase cursor-pointer border-0 active:scale-[0.98] shadow-sm flex items-center justify-center gap-1.5"
                    >
                      <Zap className="h-3.5 w-3.5" />
                      <span>{t.products.inquireBtn}</span>
                    </button>
                    <span className="text-[9px] font-mono text-gray-400 text-center block mt-2">
                      {t.estimator.formNotice}
                    </span>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Alternative System Recommendations Panel */}
      <div className="border-t border-gray-100 dark:border-white/5 pt-12 space-y-6">
        <div className="flex items-baseline justify-between">
          <h3 className="text-lg sm:text-xl font-display font-semibold text-gray-900 dark:text-white">
            {language === 'tr' ? 'Önerilen Alternatif Sistemler' : 'Recommended Alternate Systems'}
          </h3>
          <button
            onClick={() => onNavigate('#/products')}
            className="text-xs font-mono font-bold text-[#0012FF] dark:text-cyan-400 hover:underline bg-transparent border-0 cursor-pointer"
          >
            {language === 'tr' ? 'Hepsini İncele' : 'Browse All Catalog'} &rarr;
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-4">
          {recommendations.map((rec) => (
            <div
              key={rec.id}
              onClick={() => onNavigate(`#/products/${rec.id}`)}
              className="bg-white dark:bg-slate-900/50 border border-gray-150 dark:border-white/5 rounded-2.5xl p-5 hover:bg-gray-50/50 dark:hover:bg-slate-900 transition-all cursor-pointer flex gap-4 text-left items-center group"
            >
              {rec.imageSrc && (
                <div className="w-24 sm:w-28 relative overflow-hidden rounded-xl aspect-[4/3] bg-gray-50 dark:bg-slate-950 border border-gray-150/40 dark:border-white/5 flex-shrink-0">
                  <img 
                    src={rec.imageSrc} 
                    alt={rec.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              )}
              <div className="space-y-1 truncate">
                <span className="text-[9px] font-mono uppercase bg-gray-100 dark:bg-white/5 px-2 py-0.5 rounded text-gray-500 dark:text-gray-400 font-bold inline-block">
                  {getDisciplineLabel(rec.discipline)}
                </span>
                <h4 className="text-sm sm:text-base font-display font-semibold tracking-tight text-gray-900 dark:text-white group-hover:text-[#0012FF] dark:group-hover:text-cyan-400 transition-colors truncate">
                  {rec.name}
                </h4>
                <p className="text-[11px] sm:text-xs text-gray-500 dark:text-gray-400 leading-normal line-clamp-2 pr-2">
                  {rec.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
