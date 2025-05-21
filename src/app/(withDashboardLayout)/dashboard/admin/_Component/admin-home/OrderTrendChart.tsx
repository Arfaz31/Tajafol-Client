// src/components/Dashboard/OrderTrendsChart.tsx
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShoppingCart } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ChartDataItem } from "@/types";


interface OrderTrendsChartProps {
  data: ChartDataItem[];
}

const OrderTrendsChart: React.FC<OrderTrendsChartProps> = ({ data }) => {
  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Order Trends</span>
          <ShoppingCart className="h-5 w-5 text-gray-500" />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip 
                formatter={(value, name) => {
                  if (name === "orders") return [`${value} orders`, "Orders"];
                  return [`৳${value.toLocaleString()}`, name];
                }} 
              />
              <Legend />
              <Bar 
                dataKey="orders" 
                name="Number of Orders" 
                fill="#8884d8" 
                barSize={30}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderTrendsChart;