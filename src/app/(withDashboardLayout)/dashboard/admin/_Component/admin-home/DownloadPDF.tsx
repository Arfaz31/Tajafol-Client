/* eslint-disable @typescript-eslint/no-explicit-any */
// src/components/Dashboard/DashboardPDF.tsx
import React from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

// Define types for our chart data and statistics
export interface ChartDataItem {
  name: string;
  sales: number;
  income: number;
  orders: number;
}

export interface CardDataItem {
  label: string;
  value: string | number;
}

export interface StatusDataItem {
  name: string;
  value: number;
}

export interface CustomerStats {
  cardData: CardDataItem[];
}

export interface OrderStats {
  cardData: CardDataItem[];
  statusData: StatusDataItem[];
  paymentData: StatusDataItem[];
  rawData: Record<string, any>;
}

// Define styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#ffffff",
    padding: 30,
  },
  header: {
    marginBottom: 20,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
    borderBottomStyle: "solid",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 12,
    color: "#6b7280",
    textAlign: "center",
  },
  section: {
    margin: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderStyle: "solid",
    borderRadius: 5,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  statsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  statItem: {
    width: "30%",
    marginBottom: 10,
    padding: 10,
    backgroundColor: "#f9fafb",
    borderRadius: 5,
  },
  statLabel: {
    fontSize: 10,
    color: "#6b7280",
    marginBottom: 3,
  },
  statValue: {
    fontSize: 18,
    fontWeight: "bold",
  },
  chartContainer: {
    width: "100%",
    height: 200,
    marginVertical: 15,
  },
  footer: {
    position: "absolute",
    bottom: 20,
    left: 0,
    right: 0,
    textAlign: "center",
    fontSize: 10,
    color: "#6b7280",
  },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginHorizontal: -10,
  },
  gridItem: {
    width: "50%",
    paddingHorizontal: 10,
  },
});

// Create chart components with proper TypeScript interfaces
interface LineChartProps {
  data: ChartDataItem[];
}

const LineChartComponent: React.FC<LineChartProps> = ({ data = [] }) => (
  <View style={styles.chartContainer}>
    <Text style={{ textAlign: "center", marginBottom: 10 }}>
      Sales & Revenue Chart (PDF chart preview)
    </Text>
    <Text style={{ fontSize: 10, color: "#6b7280" }}>
      {data.map((item, index) => (
        `${item.name}: ৳${item.sales.toLocaleString()} sales, ৳${item.income.toLocaleString()} income${index < data.length - 1 ? ' | ' : ''}`
      ))}
    </Text>
  </View>
);

interface PieChartProps {
  data: StatusDataItem[];
  title?: string;
}

const PieChartComponent: React.FC<PieChartProps> = ({ data = [], title = "Chart" }) => (
  <View style={styles.chartContainer}>
    <Text style={{ textAlign: "center", marginBottom: 10 }}>
      {title}
    </Text>
    <Text style={{ fontSize: 10, color: "#6b7280" }}>
      {data.map((item, index) => (
        `${item.name}: ${item.value} orders${index < data.length - 1 ? ' | ' : ''}`
      ))}
    </Text>
  </View>
);

interface BarChartProps {
  data: ChartDataItem[];
}

const BarChartComponent: React.FC<BarChartProps> = ({ data = [] }) => (
  <View style={styles.chartContainer}>
    <Text style={{ textAlign: "center", marginBottom: 10 }}>
      Order Trends (PDF chart preview)
    </Text>
    <Text style={{ fontSize: 10, color: "#6b7280" }}>
      {data.map((item, index) => (
        `${item.name}: ${item.orders} orders${index < data.length - 1 ? ' | ' : ''}`
      ))}
    </Text>
  </View>
);

interface DashboardPDFProps {
  customerStats: CustomerStats;
  orderStats: OrderStats;
  chartData: ChartDataItem[];
  timeRange: string;
}

const DashboardPDF: React.FC<DashboardPDFProps> = ({
  customerStats = { cardData: [] },
  orderStats = { cardData: [], statusData: [], paymentData: [], rawData: {} },
  chartData = [],
  timeRange = "monthly",
}) => {
  const currentDate = new Date().toLocaleDateString();

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Admin Dashboard Report</Text>
          <Text style={styles.headerSubtitle}>
            Generated on {currentDate} • Time Range: {timeRange ? timeRange.charAt(0).toUpperCase() + timeRange.slice(1) : "Monthly"}
          </Text>
        </View>

        {/* Order Stats Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Order Statistics</Text>
          <View style={styles.statsContainer}>
            {orderStats.cardData.map((stat, index) => (
              <View key={index} style={styles.statItem}>
                <Text style={styles.statLabel}>{stat.label}</Text>
                <Text style={styles.statValue}>{stat.value}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Sales & Revenue Chart */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Sales & Revenue Overview</Text>
          <LineChartComponent data={chartData} />
        </View>

        {/* Status Charts */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Order & Payment Status</Text>
          <View style={styles.gridContainer}>
            <View style={styles.gridItem}>
              <PieChartComponent 
                data={orderStats.statusData} 
                title="Order Status Distribution" 
              />
            </View>
            <View style={styles.gridItem}>
              <PieChartComponent 
                data={orderStats.paymentData} 
                title="Payment Status Distribution" 
              />
            </View>
          </View>
        </View>

        {/* Order Trends */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Order Trends</Text>
          <BarChartComponent data={chartData} />
        </View>

        {/* Customer Stats Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Customer Statistics</Text>
          <View style={styles.statsContainer}>
            {customerStats.cardData.map((stat, index) => (
              <View key={index} style={styles.statItem}>
                <Text style={styles.statLabel}>{stat.label}</Text>
                <Text style={styles.statValue}>{stat.value}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Footer */}
        <Text style={styles.footer}>
          © {new Date().getFullYear()} Your Company Name - Confidential
        </Text>
      </Page>
    </Document>
  );
};

export default DashboardPDF;