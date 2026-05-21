/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface ServiceDetail {
  id: string;
  title: string;
  shortDesc: string;
  longDesc: string;
  specifications: string[];
  equipment: string[];
  voltageRange: string;
  iconName: string;
}

export interface ProjectDetail {
  slug: string;
  title: string;
  location: string;
  category: string;
  imageSrc: string;
  powerRating: string;
  challenge: string;
  solution: string;
  stats: {
    label: string;
    value: string;
  }[];
}

export interface JobOpening {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  experience: string;
  description: string;
  requirements: string[];
}

export interface DiagnosticMeter {
  label: string;
  value: number;
  unit: string;
  status: 'normal' | 'optimal' | 'warning' | 'critical';
  history: number[];
}

export interface EstimateConfiguration {
  projectType: string;
  areaSqFt: number;
  amperage: number;
  voltage: string;
  resilientPower: boolean;
  smartControls: boolean;
  greenEnergy: boolean;
  industrialMachinery: boolean;
  networking: boolean;
}

export interface CostBreakdown {
  designCost: number;
  materialsCost: number;
  laborCost: number;
  commissioningCost: number;
  totalCost: number;
}

export interface BasketItem {
  id: string;
  name: string;
  desc: string;
  specs: string[];
  estimatedCost: number;
  voltage: string;
  amperage: number;
  quantity: number;
  imageSrc?: string;
  leadTime: number;
  discipline: string;
}

