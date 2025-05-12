"use client"

import { useState } from "react"
import { motion } from "framer-motion"
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
  LabelList
} from "recharts"
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger
} from "@/components/ui/tabs"
import { cn } from "@/lib/utils"

const nutritionData = [
  { name: "Mango", calories: 60, protein: 0.8, carbs: 15, fiber: 1.6, sugar: 14, fat: 0.4, vitaminC: 60 },
  { name: "Banana", calories: 89, protein: 1.1, carbs: 22.8, fiber: 2.6, sugar: 12.2, fat: 0.3, vitaminC: 10 },
  { name: "Jackfruit", calories: 95, protein: 1.7, carbs: 23.2, fiber: 1.5, sugar: 19.1, fat: 0.6, vitaminC: 13 },
  { name: "Pineapple", calories: 50, protein: 0.5, carbs: 13, fiber: 1.4, sugar: 10, fat: 0.1, vitaminC: 80 },
  { name: "Litchi", calories: 66, protein: 0.8, carbs: 16.5, fiber: 1.3, sugar: 15.2, fat: 0.4, vitaminC: 71 },
]

const macronutrientsData = nutritionData.map(fruit => [
  { name: "Carbs", value: fruit.carbs },
  { name: "Protein", value: fruit.protein },
  { name: "Fat", value: fruit.fat },
  { name: "Fiber", value: fruit.fiber }
])

const COLORS = ["hsl(var(--chart-1))", "hsl(var(--chart-2))", "hsl(var(--chart-3))", "hsl(var(--chart-4))", "hsl(var(--chart-5))"]

const vitaminData = [
  { fruit: "Mango", value: 60 },
  { fruit: "Litchi", value: 71 },
  { fruit: "Pineapple", value: 80 },
  { fruit: "Jackfruit", value: 13 },
  { fruit: "Banana", value: 10 }
]

const caloriesData = nutritionData.map(fruit => ({
  name: fruit.name,
  calories: fruit.calories
}))

const NutritionCharts = () => {
  const [selectedFruit, setSelectedFruit] = useState(0)

  return (
    <section className="py-16 bg-white">
      <div className="container-custom">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="section-title">Nutrition Charts of Seasonal Fruits</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore the nutritional benefits of Bangladesh&apos;s seasonal fruits to make informed choices
          </p>
        </motion.div>

        <div className="bg-background rounded-xl shadow-sm p-6 md:p-8">
          <Tabs defaultValue="macros" className="w-full">
            <TabsList className="mb-8 w-full md:w-auto">
              <TabsTrigger value="macros">Macronutrients</TabsTrigger>
              <TabsTrigger value="vitamins">Vitamin C Content</TabsTrigger>
              <TabsTrigger value="calories">Calorie Comparison</TabsTrigger>
            </TabsList>
            
            <TabsContent value="macros" className="mt-0">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="col-span-1">
                  <h3 className="text-xl font-semibold mb-4">Fruit Macronutrients</h3>
                  <p className="text-muted-foreground mb-6">
                    This chart shows the breakdown of carbohydrates, protein, fat, and fiber in different seasonal fruits per 100g serving.
                  </p>
                  
                  <div className="space-y-2">
                    {nutritionData.map((fruit, index) => (
                      <button
                        key={fruit.name}
                        onClick={() => setSelectedFruit(index)}
                        className={cn(
                          "w-full text-left p-3 rounded-md transition-colors",
                          selectedFruit === index
                            ? "bg-primary/10 border-l-4 border-primary"
                            : "hover:bg-background"
                        )}
                      >
                        <div className="font-medium">{fruit.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {fruit.calories} calories per 100g
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className="col-span-1 lg:col-span-2 h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={macronutrientsData[selectedFruit]}
                        cx="50%"
                        cy="50%"
                        labelLine={true}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        outerRadius={150}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {macronutrientsData[selectedFruit].map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => [`${value}g`, "Amount"]} />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="vitamins" className="mt-0">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="col-span-1">
                  <h3 className="text-xl font-semibold mb-4">Vitamin C Content</h3>
                  <p className="text-muted-foreground mb-6">
                    Compare the vitamin C content of different seasonal fruits as a percentage of daily recommended value.
                  </p>
                  <div className="space-y-4">
                    <div className="bg-secondary/10 p-4 rounded-md">
                      <h4 className="font-medium mb-2">Why Vitamin C Matters</h4>
                      <p className="text-sm text-muted-foreground">
                        Vitamin C is essential for immune function, collagen production, and acts as an antioxidant protecting cells from damage.
                      </p>
                    </div>
                    <div className="bg-accent/10 p-4 rounded-md">
                      <h4 className="font-medium mb-2">Daily Recommendation</h4>
                      <p className="text-sm text-muted-foreground">
                        Adults should consume about 65-90mg of vitamin C daily. Many seasonal fruits can provide this in a single serving.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="col-span-1 lg:col-span-2 h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={vitaminData}
                      margin={{
                        top: 20,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="fruit" />
                      <YAxis label={{ value: '% Daily Value', angle: -90, position: 'insideLeft' }} />
                      <Tooltip formatter={(value) => [`${value}%`, "Daily Value"]} />
                      <Legend />
                      <Bar dataKey="value" name="Vitamin C" fill="hsl(var(--chart-2))">
                        
                      <LabelList dataKey="value" position="top" formatter={(value: number | string) => `${value}%`} />

                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="calories" className="mt-0">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="col-span-1">
                  <h3 className="text-xl font-semibold mb-4">Calorie Comparison</h3>
                  <p className="text-muted-foreground mb-6">
                    Compare the calorie content of different seasonal fruits per 100g serving.
                  </p>
                  <div className="space-y-4">
                    <div className="bg-primary/10 p-4 rounded-md">
                      <h4 className="font-medium mb-2">Low Calorie Options</h4>
                      <p className="text-sm text-muted-foreground">
                        Pineapple and mango are great low-calorie options that still provide natural sweetness and nutrients.
                      </p>
                    </div>
                    <div className="bg-secondary/10 p-4 rounded-md">
                      <h4 className="font-medium mb-2">Nutritional Density</h4>
                      <p className="text-sm text-muted-foreground">
                        Jackfruit has more calories but also offers more protein compared to other fruits, making it nutritionally dense.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="col-span-1 lg:col-span-2 h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart cx="50%" cy="50%" outerRadius="80%" data={nutritionData}>
                      <PolarGrid />
                      <PolarAngleAxis dataKey="name" />
                      <PolarRadiusAxis angle={30} domain={[0, 100]} />
                      <Radar
                        name="Calories"
                        dataKey="calories"
                        stroke="hsl(var(--chart-1))"
                        fill="hsl(var(--chart-1))"
                        fillOpacity={0.6}
                      />
                      <Tooltip formatter={(value) => [`${value} kcal`, "Calories"]} />
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
  )
}

export default NutritionCharts