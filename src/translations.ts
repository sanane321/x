/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface TranslationDictionary {
  nav: {
    vision: string;
    services: string;
    products: string;
    estimator: string;
    works: string;
    blog: string;
    about: string;
    careers: string;
    contact: string;
    actionBtn: string;
    downloads: string;
    iot: string;
  };
  footer: {
    brief: string;
    address: string;
    solutionsTitle: string;
    corporateTitle: string;
    corporateText: string;
    rights: string;
    privacy: string;
    terms: string;
    accreditation: string;
  };
  home: {
    gridSystems: string;
    heroTitle: string;
    heroTitleAccent: string;
    heroDesc: string;
    accessEstimator: string;
    reviewWorks: string;
    safetyStat: string;
    bimStat: string;
    yearsStat: string;
    safetyTitle: string;
    safetyDesc: string;
    bimTitle: string;
    bimDesc: string;
    uptimeTitle: string;
    uptimeDesc: string;
  };
  services: {
    tag: string;
    title: string;
    desc: string;
    specTitle: string;
    hardwareTitle: string;
    regulatoryTag: string;
    regulatoryTitle: string;
    regulatoryDesc: string;
    voltRange: string;
    certifiedSpec: string;
    complianceFooter: string;
    configureEstimator: string;
    // Specific service titles/descriptions
    commTitle: string;
    commShort: string;
    commLong: string;
    indTitle: string;
    indShort: string;
    indLong: string;
    datacenterTitle: string;
    datacenterShort: string;
    datacenterLong: string;
    renewTitle: string;
    renewShort: string;
    renewLong: string;
  };
  products: {
    tag: string;
    title: string;
    desc: string;
    specifications: string;
    inquireBtn: string;
    inquirySuccess: string;
    inquiryTitle: string;
    inquiryDesc: string;
    techDetails: string;
    estimatedLead: string;
    weeks: string;
    // Products
    p1Name: string;
    p1Desc: string;
    p2Name: string;
    p2Desc: string;
    p3Name: string;
    p3Desc: string;
    p4Name: string;
    p4Desc: string;
    p5Name: string;
    p5Desc: string;
  };
  blog: {
    tag: string;
    title: string;
    desc: string;
    readMore: string;
    backToBlog: string;
    searchPlaceholder: string;
    categories: string;
    minRead: string;
    pubDate: string;
  };
  about: {
    tag: string;
    title: string;
    desc: string;
    missionTitle: string;
    missionDesc: string;
    visionTitle: string;
    visionDesc: string;
    historyTitle: string;
    historyDesc: string;
    safetyFirst: string;
    safetyRate: string;
    safetyDays: string;
    standardsTitle: string;
    standardsDesc: string;
  };
  estimator: {
    tag: string;
    title: string;
    desc: string;
    step1: string;
    step1Title: string;
    step2: string;
    step2Title: string;
    step3a: string;
    step3aTitle: string;
    step3b: string;
    step3bTitle: string;
    step4: string;
    step4Title: string;
    liveReport: string;
    costTotal: string;
    costDesc: string;
    allocationTitle: string;
    leadTimesTitle: string;
    totalLeadTime: string;
    bimPhaseTime: string;
    interactiveSteps: {
      design: string;
      roughIn: string;
      trimOut: string;
      certify: string;
    };
    addonResilient: string;
    addonResilientDesc: string;
    addonSmart: string;
    addonSmartDesc: string;
    addonGreen: string;
    addonGreenDesc: string;
    addonHeavy: string;
    addonHeavyDesc: string;
    addonNet: string;
    addonNetDesc: string;
    formTag: string;
    formSuccess: string;
    formSuccessDesc: string;
    formName: string;
    formEmail: string;
    formSubmit: string;
    formNotice: string;
    sidebarTitle: string;
  };
  contact: {
    tag: string;
    title: string;
    desc: string;
    formSubtitle: string;
    fullName: string;
    emailAddress: string;
    phoneNumber: string;
    projectScaleTitle: string;
    message: string;
    submitInquiry: string;
    successTitle: string;
    successDesc: string;
    headquarters: string;
    hqAddress: string;
    phoneLabel: string;
    emailLabel: string;
    workingHours: string;
    workingHoursVal: string;
    faqTitle: string;
    faqText: string;
  };
  downloads: {
    tag: string;
    title: string;
    desc: string;
    searchPlaceholder: string;
    fileSize: string;
    downloadBtn: string;
    downloadingBtn: string;
    downloadedBtn: string;
    categories: {
      all: string;
      specs: string;
      bim: string;
      certificates: string;
    };
    items: {
      mvsSpecTitle: string;
      mvsSpecDesc: string;
      megapackManualTitle: string;
      megapackManualDesc: string;
      bimFamilyTitle: string;
      bimFamilyDesc: string;
      isoCertTitle: string;
      isoCertDesc: string;
      gridTopoTitle: string;
      gridTopoDesc: string;
    };
  };
  iot: {
    tag: string;
    title: string;
    desc: string;
    activeNodes: string;
    gridFrequency: string;
    systemLoad: string;
    powerFactor: string;
    temperature: string;
    solarInput: string;
    batteryLevel: string;
    activeAlarms: string;
    thdText: string;
    relayStatus: string;
    commands: string;
    logs: string;
    nodeSelect: string;
    nodeMvs: string;
    nodeBattery: string;
    nodeCharger: string;
    dischargeControl: string;
    coolingSpeed: string;
    reactiveSwitch: string;
    liveTelemetry: string;
  };
}

export const translations: Record<'en' | 'tr', TranslationDictionary> = {
  en: {
    nav: {
      vision: 'Vision',
      services: 'Services',
      products: 'Products',
      estimator: 'Estimator',
      works: 'Works',
      blog: 'Blog',
      about: 'About',
      careers: 'Careers',
      contact: 'Contact',
      actionBtn: 'Estimate Project',
      downloads: 'Downloads',
      iot: 'IoT Grid',
    },
    footer: {
      brief: 'X Elektrik is a premium electrical engineering and industrial distribution contractor. We construct heavy energy, transmission, automated, and mission-critical datacenter systems worldwide.',
      address: 'Dublin HQ • Silicon District Technical Complex',
      solutionsTitle: 'Solutions Range',
      corporateTitle: 'Corporate Inquiries',
      corporateText: 'Submit RFP blueprints inside the SmartGrid™ Estimator directly or contact the bidding desk at our main corporate hub:',
      rights: '© 2026 X Elektrik Contractors. All Rights Reserved.',
      privacy: 'Privacy & NDA standards',
      terms: 'BIM Terms of service',
      accreditation: 'NEC & IEC Accredited Contractor',
    },
    home: {
      gridSystems: 'MEGAVATT GRID SYSTEMS',
      heroTitle: 'Industrial Electrical',
      heroTitleAccent: 'Engineering Core',
      heroDesc: 'X Elektrik builds massive-scale energy, transmission, and redundancy systems. We plan with extreme BIM (LOD 400) depth, routing 3-phase feeds, substations, data hubs, and renewable smart charging infrastructure.',
      accessEstimator: 'Access SmartGrid Estimator',
      reviewWorks: 'Review Case Studies',
      safetyStat: '0.0 TRIR',
      bimStat: 'LOD 400',
      yearsStat: '20+ Years',
      safetyTitle: 'Zero Malfunction Protocol',
      safetyDesc: 'Our engineering systems pass ISO 9001 quality gates and strict pre-commissioning voltage tests before physical hookup.',
      bimTitle: 'Full BIM Integration',
      bimDesc: 'We resolve complex spatial collisions ahead of time in high-precision Autodesk Revit environment models with full LOD 400 fidelity.',
      uptimeTitle: 'Heavy-Duty Commissioning',
      uptimeDesc: 'From N+1 resilient server farms to heavy industrial production feedlines, we engineer total power reliability.',
    },
    services: {
      tag: 'ENGINEERED SOLUTIONS',
      title: 'High-Tolerance Technical Disciplines',
      desc: 'From heavy manufacturing busduct grids and utility substations to hyperscale server halls and vehicle fast-charging arrays, X Elektrik deploys licensed, trade journeymen and BIM coordinators.',
      specTitle: 'Standard Solutions:',
      hardwareTitle: 'Industrial Hardware Used:',
      regulatoryTag: 'REGULATORY ACCREDITATIONS',
      regulatoryTitle: 'Strict High-voltage IEC & NEC Conformity',
      regulatoryDesc: 'Every terminal torque, cable tension, and transformer secondary setting we engineer is cataloged, double-checked, and autographed by a registered QA specialist. This absolute discipline guarantees that your insurance compliance has full support.',
      voltRange: 'Voltage range / spec',
      certifiedSpec: 'Certified deployment specification',
      complianceFooter: 'NEC compliant & OSHA accredited fitting standards',
      configureEstimator: 'Configure in Estimator',
      commTitle: 'Commercial Facilities',
      commShort: 'Complete smart riser structures, architectural lighting, and 3-phase tenant fit-outs.',
      commLong: 'Engineered grids for enterprise hubs and multi-tier developments. We custom-fabricate major electrical risers, distribute power across complex floor layouts, and integrate state-of-the-art building wellness systems.',
      indTitle: 'Industrial Infrastructure',
      indShort: 'High-voltage substations, structural busways, and heavy equipment automation lines.',
      indLong: 'Heavy-duty infrastructure for high-demand processing plants, manufacturing facilities, and warehouses. Our certified crews carry out heavy structural conduit runs, transformer sizing, and motor control installations.',
      datacenterTitle: 'Mission-Critical Datacenters',
      datacenterShort: 'Dual-feed (2N) electrical systems, heavy automatic transfer switches (ATS), and modular UPS grids.',
      datacenterLong: 'Zero-downtime mechanical/electrical power architecture. We connect high-containment, heavy redundant systems including dual utility feeds, diesel generator synchronization boards, and high-capacity static switches.',
      renewTitle: 'Sustainable Grids & EV',
      renewShort: 'Rooftop solar integration, high-output grid net metering, and custom EV fleet chargers.',
      renewLong: 'Forward-looking clean-energy electrical installation. X Elektrik constructs high-output rooftop solar fields, couples grid net-metering switchboards, and deploys high-speed commercial fleet charging infrastructures.',
    },
    products: {
      tag: 'INDUSTRIAL CATALOG',
      title: 'High-Voltage Switchgear & Power Hardware',
      desc: 'Browse our heavy machinery distribution catalog. We manufacture and supply industrial-grade power items, tested to certified international standards.',
      specifications: 'Technical Specifications',
      inquireBtn: 'Place RFP/RFQ on Product',
      inquirySuccess: 'RFQ Received! Staged under RFP bulletins.',
      inquiryTitle: 'Product RFQ Submitted',
      inquiryDesc: 'Your request has been staged under corporate inquiries. Our bidding desk will analyze this configuration.',
      techDetails: 'Certified Equipment Detail',
      estimatedLead: 'Est. Supply Time',
      weeks: 'weeks',
      p1Name: 'XE-MVS 24kV Medium-Voltage Switchgear',
      p1Desc: 'Metal-enclosed power distribution unit built for industrial plants and grid substations. Custom vacuum breakers with integrated microgrid relays.',
      p2Name: 'MegaPack Grid Stabilizer 5MW',
      p2Desc: 'Mega-scale modular peak-shaving battery unit. Built with dynamic inverter syncing and liquid cooling systems to balance high industrial grid sags.',
      p3Name: 'XE-ATS heavy automatic transfer switch',
      p3Desc: 'Resilient high-amperage switchgear for datacenters. Provides isolated path N+1 redundant power path switching under 4ms latency.',
      p4Name: 'HyperCharger Level-3 DC Pedestal',
      p4Desc: 'Liquid-cooled 350kW electric fleet charger. High-current grid-tied system supporting dual CCS / NACS connections for logistics hubs.',
      p5Name: 'XE-BMS Control Rack Cabinet',
      p5Desc: 'Modular building management system panel with Ethernet fiber interfaces, IoT telemetry, and digital thermal circuit breaker monitors.',
    },
    blog: {
      tag: 'X ELEKTRIK KNOWLEDGE BASE',
      title: 'Engineering Briefs & Industry Updates',
      desc: 'Discover technical reports from our licensed engineers regarding substation calculations, BIM standardizing, and high-voltage grid topologies.',
      readMore: 'Read Full Brief',
      backToBlog: 'Back to Knowledge Base',
      searchPlaceholder: 'Search technical articles...',
      categories: 'Categories',
      minRead: 'min read',
      pubDate: 'Published on',
    },
    about: {
      tag: 'CORPORATE OVERVIEW',
      title: 'Precision Over Tolerances',
      desc: 'X Elektrik was born out of a commitment to master-level technical quality. We do not just run wires; we engineer global electrical lifelines.',
      missionTitle: 'Our Bidding Mission',
      missionDesc: 'To deliver high-voltage grid resilience with flawless BIM planning (LOD 400), ensuring physical construction projects execute without spacing overrides or coordination failures.',
      visionTitle: 'The Electrical Horizon',
      visionDesc: 'Pioneering carbon-neutral heavy industrial microgrids. Coupling massive battery farms with commercial fast chargers, bridging megawatt solar arrays with legacy power grids.',
      historyTitle: 'Proven Heritage',
      historyDesc: 'Founded over twenty years ago, X Elektrik has scaled from high-rise electrical risers to supporting hyperscale database cores and massive utility network substations.',
      safetyFirst: 'Safety Metrics Rate',
      safetyRate: '0.0 Recording TRIR',
      safetyDays: '2,500+ Days Incident-Free',
      standardsTitle: 'Certifications & QA Standards',
      standardsDesc: 'Our assemblies and construction methods are certified ISO 9001 and rigorously align with NEC & IEC grid directives.',
    },
    estimator: {
      tag: 'INTERACTIVE SCHEDULER & MODELER',
      title: 'SmartGrid™ Proposal Simulator Room',
      desc: 'Configure physical parameters such as square footage, required switchgear amperage, standard system voltage configurations, and opt-in safety and resiliency modules to compute industrial estimates instantly.',
      step1: 'Step 1',
      step1Title: 'Select Electrical Discipline',
      step2: 'Step 2',
      step2Title: 'Operational Size / Covered Area',
      step3a: 'Step 3A',
      step3aTitle: 'Inbound Amperage Panel',
      step3b: 'Step 3B',
      step3bTitle: 'Operational Voltage Standard',
      step4: 'Step 4',
      step4Title: 'Premium Modular Sub-Systems',
      liveReport: 'Live Estimation Report',
      costTotal: 'USD Project Budget',
      costDesc: 'Estimated comprehensive engineering + turn-key construction project budget.',
      allocationTitle: 'Engineered Cost Allocation',
      leadTimesTitle: 'Scheduled Lead-Times',
      totalLeadTime: 'Total Lead-Time',
      bimPhaseTime: 'BIM Eng. Phase',
      interactiveSteps: {
        design: 'Design',
        roughIn: 'Rough-In',
        trimOut: 'Trim-Out',
        certify: 'Certify',
      },
      addonResilient: 'Resilient Power Backup (N+1 UPS & Genset)',
      addonResilientDesc: 'Automatic generator integration with battery-bank UPS backup to ensure raw 24/7 power filtering and zero sags.',
      addonSmart: 'Digital BMS & Smart Automation Relays',
      addonSmartDesc: 'Intelligent sensor arrays, integrated light dimming schedules, digital circuit logging, and Ethernet hub racks.',
      addonGreen: 'Sustainable Microgrid Tie & Peak-Shaving',
      addonGreenDesc: 'Solar canopy inverter matching, utility net-metering switchgear, and commercial Level-3 fast EV chargers.',
      addonHeavy: 'Heavy Industrial Motor Feeds & Busways',
      addonHeavyDesc: 'Heavy gauge copper conduit runs, specialized bus ducts, overhead cable trays, and localized emergency cuts.',
      addonNet: 'Cat6A Structured Cabling & Fiber Rack',
      addonNetDesc: 'High speed telecom data outlets, fiber optic terminal distribution cabinets, and certified report compliance.',
      formTag: 'Instant Corporate RFP',
      formSuccess: 'Configuration Staged Successfully!',
      formSuccessDesc: 'Your simulated diagnostic package has been shared in the Corporate Inquiries Board on this page.',
      formName: 'Your Name',
      formEmail: 'Company Email',
      formSubmit: 'Submit RFP Config',
      formNotice: '0 records shared externally. Confidential blueprint simulation.',
      sidebarTitle: 'Corporate Inquiries Board',
    },
    contact: {
      tag: 'CONTACT CORE HUB',
      title: 'Initiate Interlock',
      desc: 'Reach out to exchange critical project briefs, query bidding slots, or request high-voltage infrastructure audits. Use our secure telemetry validation desk below.',
      formSubtitle: 'Direct Substation Telemetry System',
      fullName: 'Full Name',
      emailAddress: 'Corporate Email Address',
      phoneNumber: 'Dedicated Phone Number',
      projectScaleTitle: 'Estimated Project Area / Scale',
      message: 'Critical Project Specifications & Site Conditions',
      submitInquiry: 'Execute Communications Link',
      successTitle: 'Inbound Telemetry Locked',
      successDesc: 'Your technical brief has been secured on our local corporate stack. An electrical lead will reach out shortly.',
      headquarters: 'Bidding Desk HQ',
      hqAddress: '77 Silicon District, Dublin D02 HE94',
      phoneLabel: 'Bidding Hotline',
      emailLabel: 'Bidding Gateway',
      workingHours: 'Operational Hours',
      workingHoursVal: 'Monday to Friday, 06:00 - 18:00 UTC',
      faqTitle: 'Frequently Interrogated Schematics',
      faqText: 'Do you offer emergency on-site repair? Yes, we support N+1 contract partners with certified 24-hour technician standby arrays.',
    },
    downloads: {
      tag: 'KNOWLEDGE RESOURCES & SPECS',
      title: 'Technical Document Repository',
      desc: 'Access official CAD blocks, BIM models, high-voltage switchgear specs, and international quality or compliance declarations for site coordination.',
      searchPlaceholder: 'Search catalogs, CAD blocks, whitepapers...',
      fileSize: 'File Size',
      downloadBtn: 'Download Document',
      downloadingBtn: 'Downloading...',
      downloadedBtn: 'Downloaded',
      categories: {
        all: 'All Files',
        specs: 'Datasheets & Specs',
        bim: 'BIM & CAD Models',
        certificates: 'Regulatory Certificates'
      },
      items: {
        mvsSpecTitle: 'XE-MVS 24kV Technical Specification Sheet',
        mvsSpecDesc: 'Complete blueprint, layout dimensions, safety clearance zones, and electrical tolerance profiles for Medium Voltage installation.',
        megapackManualTitle: 'MegaPack Grid Stabilizer 5MW Manual',
        megapackManualDesc: 'In-depth installation procedures, temperature management parameters, liquid-coolant specifications, and battery performance tables.',
        bimFamilyTitle: 'XE-MVS Revit BIM Families (LOD 400)',
        bimFamilyDesc: 'Fully coordinated Autodesk Revit families mapping clearance buffers, cable attachment elevations, and geometric properties.',
        isoCertTitle: 'ISO 9001:2015 QA Management License',
        isoCertDesc: 'Official company-wide quality assurance compliance folder outlining strict testing methodologies, audit trails, and certification standards.',
        gridTopoTitle: 'High-Density Datacenter Grid Topologies Whitepaper',
        gridTopoDesc: 'A rigorous academic and engineering case study demonstrating dynamic dual-feed isolated ATS path routing designs under peak loads.'
      }
    },
    iot: {
      tag: 'REAL-TIME GRID SYSTEM TELEMETRY',
      title: 'X-IoT Active Grid Control Center',
      desc: 'Active monitoring dashboard streaming voltage, frequency, phase-alignment, thermal parameters, and remote relay switching actions for certified utility feeds.',
      activeNodes: 'Active Monitoring Nodes',
      gridFrequency: 'Grid Frequency',
      systemLoad: 'Aggregate Load',
      powerFactor: 'Power Factor (cos φ)',
      temperature: 'Thermal Profile',
      solarInput: 'Solar Yield Offset',
      batteryLevel: 'BESS Charge State',
      activeAlarms: 'Active Safety Interlocks',
      thdText: 'Harmonic Distortion (THD)',
      relayStatus: 'Busbar Relays Status',
      commands: 'Supervisory Control Panel',
      logs: 'Chronological Command Log',
      nodeSelect: 'Select Primary Hub Node',
      nodeMvs: 'XE-MVS High Tension Ingress',
      nodeBattery: 'MegaPack 5MW Grid Stabilizer',
      nodeCharger: 'Megavolt DC Charger Station',
      dischargeControl: 'Forced Discharging Rate',
      coolingSpeed: 'Active Liquid-Cooling Speed',
      reactiveSwitch: 'Static VAR Reactive Compensation',
      liveTelemetry: 'Ingress Waveform Harmonic Analyzer',
    },
  },
  tr: {
    nav: {
      vision: 'Vizyon',
      services: 'Hizmetler',
      products: 'Ürünler',
      estimator: 'Hesaplayıcı',
      works: 'Projeler',
      blog: 'Mühendislik Blogu',
      about: 'Hakkımızda',
      careers: 'Kariyer',
      contact: 'İletişim',
      actionBtn: 'Proje Hesapla',
      downloads: 'Dosyalar',
      iot: 'IoT Şebeke',
    },
    footer: {
      brief: 'X Elektrık, birinci sınıf bir elektrik mühendisliği ve endüstriyel dağıtım yüklenicisidir. Dünya çapında devasa enerji, yüksek gerilim iletim hatları, otomasyon ve kritik veri merkezi sistemleri inşa ediyoruz.',
      address: 'Dublin Genel Merkez • Silicon Mahallesi Teknik Kompleksi',
      solutionsTitle: 'Çözüm Yelpazesi',
      corporateTitle: 'Kurumsal Talepler',
      corporateText: 'Proje bütçe tekliflerinizi doğrudan SmartGrid™ Hesaplayıcı üzerinden oluşturun veya merkezimizle iletişime geçin:',
      rights: '© 2026 X Elektrık Mühendislik Kontraktörleri. Tüm Hakları Saklıdır.',
      privacy: 'Gizlilik ve NDA Standartları',
      terms: 'BIM Hizmet Koşulları',
      accreditation: 'NEC & IEC Akredite Mühendislik Şirketi',
    },
    home: {
      gridSystems: 'MEGAWAT ŞEBEKE SİSTEMLERİ',
      heroTitle: 'Endüstriyel Elektrik',
      heroTitleAccent: 'Mühendislik Merkezi',
      heroDesc: 'X Elektrık, büyük ölçekli enerji, iletim ve yedeklilik sistemleri inşa eder. Projeleri üst düzey BIM (LOD 400) hassasiyetiyle planlıyor; 3 fazlı besleme hatları, trafo merkezleri, veri göbekleri ve yenilenebilir şarj altyapıları kuruyoruz.',
      accessEstimator: 'SmartGrid Hesaplayıcıyı Aç',
      reviewWorks: 'Vaka Çalışmalarını İncele',
      safetyStat: '0.0 TRIR',
      bimStat: 'LOD 400',
      yearsStat: '20+ Yıl Deneyim',
      safetyTitle: 'Sıfır Hata Protokolü',
      safetyDesc: 'Mühendislik sistemlerimiz, fiziksel kurulumdan önce ISO 9001 kalite kapılarından ve katı devreye alma voltaj testlerinden geçer.',
      bimTitle: 'BIM Entegrasyonu',
      bimDesc: 'Karmaşık kablo tavası ve ekipman çakışmalarını, LOD 400 doğruluğunda Autodesk Revit modellerinde önceden çözüyoruz.',
      uptimeTitle: 'Endüstriyel Devreye Alma',
      uptimeDesc: 'N+1 yedekli veri merkezlerinden ağır endüstriyel üretim hatlarına kadar eksiksiz güç güvenilirliği tasarlıyoruz.',
    },
    services: {
      tag: 'MÜHENDİSLİK ÇÖZÜMLERİ',
      title: 'Yüksek Hassasiyetli Teknik Disiplinler',
      desc: 'Ağır sanayi ana baraları ve trafo merkezlerinden, yüksek yoğunluklu veri merkezlerine ve araç hızlı şarj istasyonlarına kadar X Elektrık, lisanslı uzmanlar ve BIM koordinatörleriyle çalışır.',
      specTitle: 'Standart Çözümlere Dahil Hizmetler:',
      hardwareTitle: 'Kullanılan Endüstriyel Donanımlar:',
      regulatoryTag: 'YASAL AKREDİTASYONLAR',
      regulatoryTitle: 'Katı Yüksek Gerilim IEC & NEC Uyumluluğu',
      regulatoryDesc: 'Tasarladığımız her klemens torku, kablo gerilimi ve trafo sekonder ayarı kataloglanır, çift kontrol edilir ve tescilli KG uzmanları tarafından imzalanır. Bu disiplin, tesislerinizin sigorta ve standart uyumluluğunu teminat altına alır.',
      voltRange: 'Voltaj aralığı / teknik spec',
      certifiedSpec: 'Sertifikalı kurulum ayrıntıları',
      complianceFooter: 'NEC uyumlu & OSHA akredite montaj standartları',
      configureEstimator: 'Hesaplayıcıda Yapılandır',
      commTitle: 'Kurumsal Tesisler',
      commShort: 'Akıllı kolon hatları, mimari aydınlatma otomasyonu ve 3 fazlı ticari saha kurulumları.',
      commLong: 'Kurumsal merkezler ve çok katlı projeler için mühendislik harikası şebekeler. Ana elektrik şaftlarını imal ediyor, gücü kat hatlarına dağıtıyor ve akıllı bina yönetim sistemlerini entegre ediyoruz.',
      indTitle: 'Endüstriyel Altyapı',
      indShort: 'Yüksek gerilim trafoları, yapısal bara sistemleri ve ağır sanayi makine enerji hatları.',
      indLong: 'Yüksek tüketimli üretim tesisleri ve depolar için ağır hizmet altyapısı. Sertifikalı ekiplerimiz profil kablo kanalı montajı, trafo boyutlandırma ve motor kontrol panoları tasarlar.',
      datacenterTitle: 'Kritik Veri Merkezleri',
      datacenterShort: 'Çift hat (2N) elektrik şebekesi, yüksek amperajlı ATS sistemleri ve modüler UPS odaları.',
      datacenterLong: 'Sıfır kesinti hedefleyen mekanik/elektrik güç mimarileri. Çift şebeke girişi, jeneratör senkronizasyon panoları ve yüksek kapasiteli statik transfer anahtarları entegre ediyoruz.',
      renewTitle: 'Yenilenebilir Şebekeler & EV',
      renewShort: 'Çatı tipi güneş enerjisi entegrasyonu, şebeke çift yönlü sayaç bağlantıları ve EV şarj istasyonları.',
      renewLong: 'Geleceğe hazır temiz enerji kurulumları. Yüksek verimli GES tarlaları kuruyor, şebeke net-metering panolarını bağlıyor ve endüstriyel EV araç filoları için DC hızlı şarj üniteleri konumlandırıyoruz.',
    },
    products: {
      tag: 'ENDÜSTRİYEL ÜRÜN KATALOĞU',
      title: 'Yüksek Gerilim Switchgear & Güç Ekipmanları',
      desc: 'Ağır sanayi güç dağıtım kataloğumuzu inceleyin. Uluslararası sertifikalı standartlara göre test edilmiş, endüstriyel sınıf güç bileşenleri üretiyor ve tedarik ediyoruz.',
      specifications: 'Teknik Özellikler',
      inquireBtn: 'Ürün İçin RFP/RFQ Teklifi Al',
      inquirySuccess: 'Teklif Talebi Alındı! RFP panosuna eklendi.',
      inquiryTitle: 'Ürün Teklif Talebi Gönderildi',
      inquiryDesc: 'Talebiniz kurumsal panoya eklenmiştir. Teklif mühendislerimiz konfigürasyonu analiz edecektir.',
      techDetails: 'Sertifikalı Ekipman Detayı',
      estimatedLead: 'Tahmini Tedarik Süresi',
      weeks: 'hafta',
      p1Name: 'XE-MVS 24kV Orta Gerilim Hücresi (Switchgear)',
      p1Desc: 'Endüstriyel fabrikalar ve dağıtım şebekeleri için tasarlanmış metal mahfazalı dağıtım hücresi. Entegre mikroşebeke koruma rölelerine sahip vakumlu kesici.',
      p2Name: 'MegaPack Şebeke Kararlaştırıcı 5MW',
      p2Desc: 'Mega ölçekli modüler pik tıraşlama (peak-shaving) batarya ünitesi. Yüksek endüstriyel dalgalanmaları dengelemek için dinamik invertör senkronizasyonu ve sıvı soğutmalıdır.',
      p3Name: 'XE-ATS Ağır Hizmet Otomatik Transfer Şalteri',
      p3Desc: 'Veri merkezleri için yüksek dayanımlı otomatik şalter. 4ms altı gecikmeyle izole edilmiş N+1 yedekli güç geçişi sunar.',
      p4Name: 'HyperCharger Seviye-3 DC Şarj Pedestalı',
      p4Desc: 'Sıvı soğutmalı 350kW endüstriyel EV hızlı şarj istasyonu. Lojistik merkezleri için çift CCS / NACS soket destekli yüksek akımlı sistem.',
      p5Name: 'XE-BMS Akıllı Bina Kontrol Kabini',
      p5Desc: 'Ethernet fiber arayüzleri, IoT telemetrisi ve dijital termal şalter izleme mekanizmalarına sahip modüler bina yönetim panosu.',
    },
    blog: {
      tag: 'X ELEKTRIK TEKNİK KÜTÜPHANESİ',
      title: 'Mühendislik Raporları & Sektör Güncellemeleri',
      desc: 'Uzman mühendislerimizin hazırladığı trafo hesaplama modelleri, BIM standartları ve yüksek gerilim şebeke topolojilerini içeren teknik dokümanlar.',
      readMore: 'Makaleyi Oku',
      backToBlog: 'Teknik Kütüphaneye Dön',
      searchPlaceholder: 'Teknik makale ara...',
      categories: 'Kategoriler',
      minRead: 'dk okuma',
      pubDate: 'Yayınlanma tarihi',
    },
    about: {
      tag: 'KURUMSAL YAZILIM & DETAY',
      title: 'Töleransların Ötesinde Hassasiyet',
      desc: 'X Elektrık, usta düzeyinde teknik kaliteden ödün vermeme kararlılığıyla kuruldu. Biz sadece kablo döşemiyoruz; küresel elektrik can damarları inşa ediyoruz.',
      missionTitle: 'Teklif Yönetim Misyonumuz',
      missionDesc: 'Fiziksel şantiye montajlarında çakışma ve koordinasyon hatalarını sıfırlamak üzere, eksiksiz BIM planlaması (LOD 400) ile yüksek gerilim şebeke dayanıklılığı sunmak.',
      visionTitle: 'Elektrik Vizyonumuz',
      visionDesc: 'Sıfır karbonlu ağır sanayi mikroşebekelerine liderlik etmek. Dev batarya parklarını EV hızlı şarj merkezleriyle bağlamak, megavatlık GES tarlalarını ulusal şebekeye entegre etmek.',
      historyTitle: 'Kanıtlanmış Geçmiş',
      historyDesc: 'Yirmi yılı aşkın bir süre önce kurulan X Elektrık, gökdelen ana kolon hatlarından hiper ölçekli veri merkezlerine ve büyük şebeke trafolarına uzanan projeler gerçekleştirmiştir.',
      safetyFirst: 'İş Güvenliği Oranı',
      safetyRate: '0.0 TRIR (Kaza sıklık endeksi)',
      safetyDays: '2.500+ Gündür Kazasız Çalışma Sekansı',
      standardsTitle: 'Sertifikalar ve Kalite Güvencesi',
      standardsDesc: 'Tüm pano montajlarımız ve saha yöntemlerimiz ISO 9001 tescilli olup, NEC ve IEC şebeke direktiflerine yüzde yüz uyumludur.',
    },
    estimator: {
      tag: 'İNTERAKTİF HESAPLAYICI & PLANLAYICI',
      title: 'SmartGrid™ Proje Teklif Simülatörü',
      desc: 'Endüstriyel bütçe tahminlerini anında almak için bina metrekaresi, talep edilen pano amperajı, standart sistem voltajı ve ek güvenlik/güç yedeklilik modüllerini yapılandırın.',
      step1: 'Adım 1',
      step1Title: 'Elektrik Mühendislik Alanı',
      step2: 'Adım 2',
      step2Title: 'Kullanım Alanı Ölçüsü / Kapalı Alan',
      step3a: 'Adım 3A',
      step3aTitle: 'Giriş Amperaj Gücü',
      step3b: 'Adım 3B',
      step3bTitle: 'Operasyonel Voltaj Standardı',
      step4: 'Adım 4',
      step4Title: 'Premium Modüler Alt Sistemler',
      liveReport: 'Canlı Tahmin Raporu',
      costTotal: 'USD Tahmini Proje Bütçesi',
      costDesc: 'Mühendislik ve anahtar teslim inşaat/montaj dahil tahmini proje maliyet bütçesi.',
      allocationTitle: 'Maliyet Dağılım Tahmini',
      leadTimesTitle: 'Planlanan İş Bitiş Süreleri',
      totalLeadTime: 'Toplam Teslim Süresi',
      bimPhaseTime: 'BIM Mühendislik Aşaması',
      interactiveSteps: {
        design: 'Tasarım',
        roughIn: 'Kaba Kablo',
        trimOut: 'Montaj',
        certify: 'Onay/Kabul',
      },
      addonResilient: 'N+1 UPS & Jeneratör Güç Yedeklemesi',
      addonResilientDesc: 'Elektrik dalgalanmalarını sıfırlayıp 24/7 kesintisiz filtreleme sağlayan otomatik jeneratör ve akü grubu UPS grubu entegrasyonu.',
      addonSmart: 'Dijital BMS & Akıllı Akıllı Röleler',
      addonSmartDesc: 'Akıllı sensör dizileri, aydınlatma otomasyon devreleri, dijital güç izleme sistemleri ve Ethernet omurga kabini.',
      addonGreen: 'Sürdürülebilir Mikroşebeke & Pik Tıraşlama',
      addonGreenDesc: 'Çatı tipi güneş enerjisi invertör eşleşmesi, şebeke çift yönlü sayaç panosu ve ticari Seviye-3 EV hızlı şarj üniteleri.',
      addonHeavy: 'Sanayi Tipi Motor Beslemeleri & Baralar',
      addonHeavyDesc: 'Kalın kesitli bakır boru tavası geçişleri, ağır hizmet baraları, yüksek tavan askı kanalları ve lokal acil kesiciler.',
      addonNet: 'Cat6A Yapısal Kablolama & Fiber Kabin',
      addonNetDesc: 'Yüksek hızlı veri terminal priz montajları, fiber optik sonlandırma dolapları ve sertifikalı test raporu taahhüdü.',
      formTag: 'Anında Kurumsal RFP Teklifi',
      formSuccess: 'Konfigürasyon Başarıyla Eklendi!',
      formSuccessDesc: 'Simüle edilen proje paketiniz bu sayfadaki Kurumsal Talepler Tablosu paneline yerleştirilmiştir.',
      formName: 'Adınız Soyadınız',
      formEmail: 'Kurumsal E-posta',
      formSubmit: 'RFP Teklifini Gönder',
      formNotice: '0 veri dışarı aktarılır. Tamamen gizli yerel simülasyondur.',
      sidebarTitle: 'Kurumsal Talepler Panosu',
    },
    contact: {
      tag: 'İLETİŞİM MERKEZİ',
      title: 'İrtibat Kurun',
      desc: 'Proje detaylarınızı paylaşmak, ihale süreçlerini sorgulamak veya yüksek gerilim saha denetimi talep etmek için aşağıdaki güvenli iletişim hattını kullanın.',
      formSubtitle: 'Doğrudan Elektrik Altyapı İletişim Formu',
      fullName: 'Ad Soyad',
      emailAddress: 'Kurumsal E-posta Adresi',
      phoneNumber: 'Telefon Numarası',
      projectScaleTitle: 'Öngörülen Proje Alanı (Metrekare)',
      message: 'Kritik Proje Özellikleri ve Şantiye Saha Koşulları',
      submitInquiry: 'İletişim Bağlantısını Kur',
      successTitle: 'Veri İletimi Başarılı',
      successDesc: 'Teknik detaylarınız güvence altına alınmıştır. Mühendislerimiz en kısa sürede sizinle irtibata geçecektir.',
      headquarters: 'İhale Birimi Genel Merkez',
      hqAddress: '77 Silicon District, Dublin D02 HE94',
      phoneLabel: 'Teklif Hattı',
      emailLabel: 'Teklif E-Posta Ağ Geçidi',
      workingHours: 'Çalışma Saatleri',
      workingHoursVal: 'Pazartesi - Cuma, 06:00 - 18:00 UTC',
      faqTitle: 'Sıkça Sorulan Sorular',
      faqText: 'Yerinde acil bakım desteği sunuyor musunuz? Evet, N+1 sözleşmeli partnerlerimiz için sertifikalı 7/24 nöbetçi teknisyen ekiplerimiz mevcuttur.',
    },
    downloads: {
      tag: 'BİLGİ KAYNAKLARI VE ÖZELLİKLER',
      title: 'Teknik Doküman Havuzu',
      desc: 'Şantiye koordinasyonu için resmi CAD bloklarına, BIM modellerine, yüksek gerilim hücre teknik özelliklerine ve uluslararası kalite/uygunluk beyanlarına erişin.',
      searchPlaceholder: 'Kataloglar, CAD blokları, teknik raporlar arasında ara...',
      fileSize: 'Dosya Boyutu',
      downloadBtn: 'Dokümanı İndir',
      downloadingBtn: 'İndiriliyor...',
      downloadedBtn: 'İndirildi',
      categories: {
        all: 'Tüm Dosyalar',
        specs: 'Teknik Veri Sayfaları (Datasheet)',
        bim: 'BIM ve CAD Modelleri',
        certificates: 'Kalite ve Uygunluk Belgeleri'
      },
      items: {
        mvsSpecTitle: 'XE-MVS 24kV Teknik Özellik Sayfası',
        mvsSpecDesc: 'Orta Gerilim kurulumu için eksiksiz yerleşim planı, yerleşim boyutları, güvenlik açıklık bölgeleri ve elektriksel tolerans profilleri.',
        megapackManualTitle: 'MegaPack Şebeke Kararlaştırıcı 5MW Kılavuzu',
        megapackManualDesc: 'Derinlemesine kurulum prosedürleri, sıcaklık yönetimi parametreleri, sıvı soğutucu özellikleri ve akü performans tabloları.',
        bimFamilyTitle: 'XE-MVS Revit BIM Aileleri (LOD 400)',
        bimFamilyDesc: 'Güvenlik açıklık tamponlarını, kablo bağlantı yüksekliklerini ve geometrik özellikleri haritalandıran, tam koordineli Autodesk Revit aileleri.',
        isoCertTitle: 'ISO 9001:2015 Kalite Yönetim Sertifikası',
        isoCertDesc: 'Sıkı test metodolojilerini, denetim geçmişlerini ve sertifikasyon standartlarını özetleyen şirket çapında resmi kalite güvence uyumluluk dosyası.',
        gridTopoTitle: 'Yüksek Yoğunluklu Veri Merkezi Şebeke Topolojileri Raporu',
        gridTopoDesc: 'Tepe yükler altında dinamik çift beslemeli izole ATS yolu yönlendirme tasarımlarını gösteren titiz bir akademik ve mühendislik vaka çalışması.'
      }
    },
    iot: {
      tag: 'ANLIK SAHA VE ŞEBEKE TELEMETRİSİ',
      title: 'X-IoT Aktif Şebeke Kontrol Merkezi',
      desc: 'Lisanslı trafo merkezleri için voltaj, şebeke frekansı, faz uyumu, sıcaklık profilleri ve uzaktan röle tetikleme eylemlerini canlı izleme paneli.',
      activeNodes: 'Aktif Monitör Düğümleri',
      gridFrequency: 'Şebeke Frekansı',
      systemLoad: 'Agrega Şebeke Yükü',
      powerFactor: 'Güç Faktörü (cos φ)',
      temperature: 'Sıcaklık Profili',
      solarInput: 'Güneş Paneli Katkısı',
      batteryLevel: 'BESS Batarya Doluluk Oranı',
      activeAlarms: 'Aktif Güvenlik Kilitleri',
      thdText: 'Harmonık Bozulma (THD)',
      relayStatus: 'Bara Röle Durumları',
      commands: 'Süpervizör Kontrol Paneli',
      logs: 'Kronolojik Sistem Eylem Günlüğü',
      nodeSelect: 'Birincil Düğüm Seçimi',
      nodeMvs: 'XE-MVS Yüksek Gerilim Girişi',
      nodeBattery: 'MegaPack 5MW Şebeke Dengesi',
      nodeCharger: 'Megavolt DC Şarj İstasyonu',
      dischargeControl: 'Zorunlu Deşarj Hızı',
      coolingSpeed: 'Aktif Sıvı Soğutma Fan Hızı',
      reactiveSwitch: 'Statik VAR Reaktif Güç Kompanzasyonu',
      liveTelemetry: 'Giriş Voltajı Dalga Formu Harmonik Analizörü',
    },
  },
};
