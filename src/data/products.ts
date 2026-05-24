import { TranslationDictionary } from '../translations';

export interface ProductItem {
  id: string;
  name: string;
  desc: string;
  leadTime: number;
  specs: string[];
  estimatedCost: number;
  voltage: string;
  amperage: number;
  discipline: 'industrial' | 'renewable' | 'datacenter' | 'commercial';
  imageSrc: string;
}

export function getProductCollection(t: TranslationDictionary): ProductItem[] {
  return [
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
}
