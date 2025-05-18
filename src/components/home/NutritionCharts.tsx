"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  LabelList,
} from "recharts";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

const nutritionData = [
  {
    name: "আম",
    calories: 60,
    protein: 0.8,
    carbs: 15,
    fiber: 1.6,
    sugar: 14,
    fat: 0.4,
    vitaminC: 60,
  },
  {
    name: "কলা",
    calories: 89,
    protein: 1.1,
    carbs: 22.8,
    fiber: 2.6,
    sugar: 12.2,
    fat: 0.3,
    vitaminC: 10,
  },
  {
    name: "কাঁঠাল",
    calories: 95,
    protein: 1.7,
    carbs: 23.2,
    fiber: 1.5,
    sugar: 19.1,
    fat: 0.6,
    vitaminC: 13,
  },
  {
    name: "আনারস",
    calories: 50,
    protein: 0.5,
    carbs: 13,
    fiber: 1.4,
    sugar: 10,
    fat: 0.1,
    vitaminC: 80,
  },
  {
    name: "লিচু",
    calories: 66,
    protein: 0.8,
    carbs: 16.5,
    fiber: 1.3,
    sugar: 15.2,
    fat: 0.4,
    vitaminC: 71,
  },
];

const macronutrientsData = nutritionData.map((fruit) => [
  { name: "শর্করা", value: fruit.carbs },
  { name: "প্রোটিন", value: fruit.protein },
  { name: "চর্বি", value: fruit.fat },
  { name: "আঁশ", value: fruit.fiber },
]);

const COLORS = [
  "hsl(var(--chart-1))",
  "hsl(var(--chart-2))",
  "hsl(var(--chart-3))",
  "hsl(var(--chart-4))",
  "hsl(var(--chart-5))",
];

const vitaminData = [
  { fruit: "আম", value: 60 },
  { fruit: "লিচু", value: 71 },
  { fruit: "আনারস", value: 80 },
  { fruit: "কাঁঠাল", value: 13 },
  { fruit: "কলা", value: 10 },
];

const NutritionCharts = () => {
  const [selectedFruit, setSelectedFruit] = useState(0);

  return (
    <section className="py-8 sm:py-12 md:py-16 bg-white">
      <div className="container px-4 sm:px-6 mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-6 sm:mb-8 md:mb-12"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 sm:mb-3 md:mb-4">
            মৌসুমী ফলের পুষ্টিগত তালিকা
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base max-w-md sm:max-w-xl md:max-w-2xl mx-auto">
            বাংলাদেশের মৌসুমী ফলের পুষ্টিগুণ জানুন এবং সচেতন পছন্দ করুন
          </p>
        </motion.div>

        <div className="bg-background rounded-lg sm:rounded-xl shadow-sm p-4 sm:p-6 md:p-8">
          <Tabs defaultValue="macros" className="w-full">
            <div className="flex justify-center mb-4 sm:mb-6 md:mb-8 overflow-x-auto">
              <TabsList className="w-full pl-28  md:pl-0 sm:w-auto">
                <TabsTrigger
                  value="macros"
                  className="text-xs sm:text-sm whitespace-nowrap"
                >
                  মূল পুষ্টি উপাদান
                </TabsTrigger>
                <TabsTrigger
                  value="vitamins"
                  className="text-xs sm:text-sm whitespace-nowrap"
                >
                  ভিটামিন সি-এর পরিমাণ
                </TabsTrigger>
                <TabsTrigger
                  value="calories"
                  className="text-xs sm:text-sm whitespace-nowrap"
                >
                  ক্যালরি তুলনা
                </TabsTrigger>
              </TabsList>
            </div>

            {/* Macronutrients Tab */}
            <TabsContent value="macros" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
                <div className="col-span-1 order-2 md:order-1">
                  <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-4">
                    ফলের মূল পুষ্টি উপাদান
                  </h3>
                  <p className="text-muted-foreground text-xs sm:text-sm mb-4 sm:mb-6">
                    এই চার্টে বিভিন্ন মৌসুমী ফলের প্রতি ১০০ গ্রামে শর্করা, প্রোটিন, 
                    চর্বি এবং আঁশের পরিমাণ দেখানো হয়েছে।
                  </p>

                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-1 gap-2">
                    {nutritionData.map((fruit, index) => (
                      <button
                        key={fruit.name}
                        onClick={() => setSelectedFruit(index)}
                        className={cn(
                          "w-full text-left p-2 sm:p-3 rounded-md transition-colors",
                          selectedFruit === index
                            ? "bg-primary/10 border-l-2 sm:border-l-4 border-primary"
                            : "hover:bg-background"
                        )}
                      >
                        <div className="font-medium text-sm sm:text-base">
                          {fruit.name}
                        </div>
                        <div className="text-xs sm:text-sm text-muted-foreground">
                          প্রতি ১০০ গ্রামে {fruit.calories} ক্যালরি
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="col-span-1 md:col-span-1 lg:col-span-2 h-[250px] xs:h-[300px] sm:h-[350px] md:h-[400px] order-1 md:order-2">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={macronutrientsData[selectedFruit]}
                        cx="50%"
                        cy="50%"
                        labelLine={true}
                        label={({ name, percent }) =>
                          `${name}: ${(percent * 100).toFixed(0)}%`
                        }
                        outerRadius="70%"
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {macronutrientsData[selectedFruit].map(
                          (entry, index) => (
                            <Cell
                              key={`cell-${index}`}
                              fill={COLORS[index % COLORS.length]}
                            />
                          )
                        )}
                      </Pie>
                      <Tooltip formatter={(value) => [`${value} গ্রাম`, "পরিমাণ"]} />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </TabsContent>

            {/* Vitamins Tab */}
            <TabsContent value="vitamins" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
                <div className="col-span-1 order-2 md:order-1">
                  <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-4">
                    ভিটামিন সি-এর পরিমাণ
                  </h3>
                  <p className="text-muted-foreground text-xs sm:text-sm mb-3 sm:mb-4">
                    বিভিন্ন মৌসুমী ফলে ভিটামিন সি-এর পরিমাণ দৈনিক প্রয়োজনের 
                    শতকরা হিসাবে তুলনা করুন।
                  </p>
                  <div className="space-y-2 sm:space-y-4">
                    <div className="bg-secondary/10 p-3 sm:p-4 rounded-md">
                      <h4 className="font-medium text-sm sm:text-base mb-1 sm:mb-2">
                        ভিটামিন সি-এর গুরুত্ব
                      </h4>
                      <p className="text-xs sm:text-sm text-muted-foreground">
                        ভিটামিন সি রোগ প্রতিরোধ ক্ষমতা বৃদ্ধি, কোলাজেন তৈরি এবং 
                        কোষের ক্ষতি থেকে রক্ষার জন্য অত্যাবশ্যক।
                      </p>
                    </div>
                    <div className="bg-accent/10 p-3 sm:p-4 rounded-md">
                      <h4 className="font-medium text-sm sm:text-base mb-1 sm:mb-2">
                        দৈনিক প্রয়োজন
                      </h4>
                      <p className="text-xs sm:text-sm text-muted-foreground">
                        প্রাপ্তবয়স্কদের দৈনিক প্রায় ৬৫-৯০ মিলিগ্রাম ভিটামিন সি 
                        খাওয়া উচিত। অনেক মৌসুমী ফল একবারে এই পরিমাণ দিতে পারে।
                      </p>
                    </div>
                  </div>
                </div>

                <div className="col-span-1 md:col-span-1 lg:col-span-2 h-[250px] xs:h-[300px] sm:h-[350px] md:h-[400px] order-1 md:order-2">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={vitaminData}
                      margin={{
                        top: 20,
                        right: 20,
                        left: 5,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="fruit" tick={{ fontSize: 12 }} />
                      <YAxis
                        tick={{ fontSize: 12 }}
                        label={{
                          value: "% দৈনিক চাহিদা",
                          angle: -90,
                          position: "insideLeft",
                          style: { fontSize: "12px" },
                          dx: -10,
                        }}
                      />
                      <Tooltip
                        formatter={(value) => [`${value}%`, "দৈনিক চাহিদা"]}
                      />
                      <Legend />
                      <Bar
                        dataKey="value"
                        name="ভিটামিন সি"
                        fill="hsl(var(--chart-2))"
                      >
                        <LabelList
                          dataKey="value"
                          position="top"
                          formatter={(value: number) => `${value}%`}
                          style={{ fontSize: "10px" }}
                        />
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </TabsContent>

            {/* Calories Tab */}
            <TabsContent value="calories" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
                <div className="col-span-1 order-2 md:order-1">
                  <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-4">
                    ক্যালরি তুলনা
                  </h3>
                  <p className="text-muted-foreground text-xs sm:text-sm mb-3 sm:mb-4">
                    বিভিন্ন মৌসুমী ফলের প্রতি ১০০ গ্রামে ক্যালরির পরিমাণ তুলনা করুন।
                  </p>
                  <div className="space-y-2 sm:space-y-4">
                    <div className="bg-primary/10 p-3 sm:p-4 rounded-md">
                      <h4 className="font-medium text-sm sm:text-base mb-1 sm:mb-2">
                        কম ক্যালরির বিকল্প
                      </h4>
                      <p className="text-xs sm:text-sm text-muted-foreground">
                        আনারস এবং আম কম ক্যালরিযুক্ত চমৎকার বিকল্প যা প্রাকৃতিক 
                        মিষ্টতা এবং পুষ্টি প্রদান করে।
                      </p>
                    </div>
                    <div className="bg-secondary/10 p-3 sm:p-4 rounded-md">
                      <h4 className="font-medium text-sm sm:text-base mb-1 sm:mb-2">
                        পুষ্টির ঘনত্ব
                      </h4>
                      <p className="text-xs sm:text-sm text-muted-foreground">
                        কাঁঠালে বেশি ক্যালরি থাকলেও অন্যান্য ফলের তুলনায় বেশি 
                        প্রোটিন রয়েছে, যা এটিকে পুষ্টিগুণে ঘনীভূত করে।
                      </p>
                    </div>
                  </div>
                </div>

                <div className="col-span-1 md:col-span-1 lg:col-span-2 h-[250px] xs:h-[300px] sm:h-[350px] md:h-[400px] order-1 md:order-2">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart
                      cx="50%"
                      cy="50%"
                      outerRadius="70%"
                      data={nutritionData}
                    >
                      <PolarGrid />
                      <PolarAngleAxis dataKey="name" tick={{ fontSize: 12 }} />
                      <PolarRadiusAxis
                        angle={30}
                        domain={[0, 100]}
                        tick={{ fontSize: 10 }}
                      />
                      <Radar
                        name="ক্যালরি"
                        dataKey="calories"
                        stroke="hsl(var(--chart-1))"
                        fill="hsl(var(--chart-1))"
                        fillOpacity={0.6}
                      />
                      <Tooltip
                        formatter={(value) => [`${value} ক্যালরি`, "ক্যালরি"]}
                      />
                      <Legend />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  );
};

export default NutritionCharts;