// src/components/Dashboard/types.ts

import { ReactNode } from 'react';

// Chart data types
export interface ChartDataItem {
  name: string;
  sales: number;
  income: number;
  orders: number;
}

export interface StatusDataItem {
  name: string;
  value: number;
  color: string;
}

// Stat card types
export interface StatCardItem {
  label: string;
  value: string | number;
  icon: ReactNode;
  color: string;
  bgColor: string;
}

// Processed statistics types
export interface CustomerStats {
  cardData: StatCardItem[];
}

export interface OrderStats {
  statusData: StatusDataItem[];
  paymentData: StatusDataItem[];
  cardData: StatCardItem[];
  rawData: {
    totalOrders: number;
    pendingOrders: number;
    confirmedOrders: number;
    shippedOrders: number;
    cancelledOrders: number;
    paidOrders: number;
    unpaidOrders: number;
    totalIncome: number;
    potentialIncome: number;
  };
}