export interface Product {
  id: string
  name: string
  description: string
  price: number
  discountedPrice?: number
  images: string[]
  category: string
  unit: string
  stock: number
  featured: boolean
  rating: number
  reviews: number
  nutritionFacts?: {
    calories: number
    protein: number
    carbs: number
    fiber: number
    sugar: number
    fat: number
    vitamins: { name: string, percentage: number }[]
  }
}

export const products: Product[] = [
  {
    id: "p1",
    name: "Premium Himsagar Mango",
    description: "The legendary Himsagar mango from Rajshahi, known for its sweet taste and distinct aroma. Each mango is carefully selected and ripened naturally to ensure perfect sweetness.",
    price: 450,
    discountedPrice: 399,
    images: [
      "https://images.pexels.com/photos/2294471/pexels-photo-2294471.jpeg",
      "https://images.pexels.com/photos/918643/pexels-photo-918643.jpeg",
    ],
    category: "Mangoes",
    unit: "kg",
    stock: 50,
    featured: true,
    rating: 4.9,
    reviews: 128,
    nutritionFacts: {
      calories: 60,
      protein: 0.8,
      carbs: 15,
      fiber: 1.6,
      sugar: 14,
      fat: 0.4,
      vitamins: [
        { name: "Vitamin C", percentage: 60 },
        { name: "Vitamin A", percentage: 8 },
        { name: "Potassium", percentage: 5 },
      ]
    }
  },
  {
    id: "p2",
    name: "Organic Langra Mango",
    description: "Langra mangoes are known for their unique flavor profile and fibrous texture. Sourced from organic farms in Chapainawabganj.",
    price: 380,
    images: [
      "https://images.pexels.com/photos/8446853/pexels-photo-8446853.jpeg",
      "https://images.pexels.com/photos/2294477/pexels-photo-2294477.jpeg",
    ],
    category: "Mangoes",
    unit: "kg",
    stock: 35,
    featured: false,
    rating: 4.7,
    reviews: 89,
    nutritionFacts: {
      calories: 65,
      protein: 0.7,
      carbs: 16,
      fiber: 1.8,
      sugar: 15,
      fat: 0.3,
      vitamins: [
        { name: "Vitamin C", percentage: 55 },
        { name: "Vitamin A", percentage: 10 },
        { name: "Potassium", percentage: 6 },
      ]
    }
  },
  {
    id: "p3",
    name: "Sweet Honey Pineapple",
    description: "Honey pineapples from the Chittagong Hill Tracts, packed with tropical sweetness and just the right tanginess. Naturally ripened for the best flavor.",
    price: 220,
    images: [
      "https://images.pexels.com/photos/947879/pexels-photo-947879.jpeg",
      "https://images.pexels.com/photos/2469772/pexels-photo-2469772.jpeg",
    ],
    category: "Tropical Fruits",
    unit: "piece",
    stock: 40,
    featured: true,
    rating: 4.6,
    reviews: 72,
    nutritionFacts: {
      calories: 50,
      protein: 0.5,
      carbs: 13,
      fiber: 1.4,
      sugar: 10,
      fat: 0.1,
      vitamins: [
        { name: "Vitamin C", percentage: 80 },
        { name: "Manganese", percentage: 55 },
        { name: "Copper", percentage: 9 },
      ]
    }
  },
  {
    id: "p4",
    name: "Juicy Watermelon",
    description: "Farm-fresh watermelons from Gopalganj, perfect for hot summer days. Each watermelon is selected for ripeness and sweetness.",
    price: 180,
    images: [
      "https://images.pexels.com/photos/5946081/pexels-photo-5946081.jpeg",
      "https://images.pexels.com/photos/3734704/pexels-photo-3734704.jpeg",
    ],
    category: "Summer Fruits",
    unit: "piece",
    stock: 25,
    featured: true,
    rating: 4.5,
    reviews: 63,
    nutritionFacts: {
      calories: 30,
      protein: 0.6,
      carbs: 8,
      fiber: 0.4,
      sugar: 6,
      fat: 0.2,
      vitamins: [
        { name: "Vitamin C", percentage: 25 },
        { name: "Vitamin A", percentage: 5 },
        { name: "Potassium", percentage: 4 },
      ]
    }
  },
  {
    id: "p5",
    name: "Premium Litchi",
    description: "Premium Madrazi litchis from Dinajpur, known for their sweetness and large size. A seasonal delicacy in Bangladesh.",
    price: 350,
    discountedPrice: 320,
    images: [
      "https://images.pexels.com/photos/14258358/pexels-photo-14258358.jpeg", 
      "https://images.pexels.com/photos/134861/pexels-photo-134861.jpeg",
    ],
    category: "Summer Fruits",
    unit: "kg",
    stock: 30,
    featured: true,
    rating: 4.8,
    reviews: 95,
    nutritionFacts: {
      calories: 66,
      protein: 0.8,
      carbs: 16.5,
      fiber: 1.3,
      sugar: 15.2,
      fat: 0.4,
      vitamins: [
        { name: "Vitamin C", percentage: 71 },
        { name: "Copper", percentage: 18 },
        { name: "Potassium", percentage: 5 },
      ]
    }
  },
  {
    id: "p6",
    name: "Organic Bananas",
    description: "Organic Sagor bananas known for their sweet taste and soft texture. Great for smoothies, desserts, or as a quick healthy snack.",
    price: 120,
    images: [
      "https://images.pexels.com/photos/1093038/pexels-photo-1093038.jpeg",
      "https://images.pexels.com/photos/2238309/pexels-photo-2238309.jpeg",
    ],
    category: "Year-round Fruits",
    unit: "dozen",
    stock: 60,
    featured: false,
    rating: 4.3,
    reviews: 42,
    nutritionFacts: {
      calories: 89,
      protein: 1.1,
      carbs: 22.8,
      fiber: 2.6,
      sugar: 12.2,
      fat: 0.3,
      vitamins: [
        { name: "Vitamin B6", percentage: 20 },
        { name: "Vitamin C", percentage: 10 },
        { name: "Potassium", percentage: 9 },
      ]
    }
  },
  {
    id: "p7",
    name: "Sweet Orange",
    description: "Sweet and juicy oranges from Sylhet hills. Rich in vitamin C and perfect for fresh juice or as a healthy snack.",
    price: 250,
    images: [
      "https://images.pexels.com/photos/327098/pexels-photo-327098.jpeg",
      "https://images.pexels.com/photos/51958/oranges-fruit-vitamins-healthy-eating-51958.jpeg",
    ],
    category: "Citrus Fruits",
    unit: "kg",
    stock: 45,
    featured: false,
    rating: 4.4,
    reviews: 57,
    nutritionFacts: {
      calories: 47,
      protein: 0.9,
      carbs: 11.8,
      fiber: 2.4,
      sugar: 9.4,
      fat: 0.1,
      vitamins: [
        { name: "Vitamin C", percentage: 70 },
        { name: "Folate", percentage: 10 },
        { name: "Thiamine", percentage: 5 },
      ]
    }
  },
  {
    id: "p8",
    name: "Crisp Green Apple",
    description: "Imported crisp green apples - perfect balance of sweet and tangy flavors. Great for salads, desserts, or as a refreshing snack.",
    price: 280,
    images: [
      "https://images.pexels.com/photos/8094399/pexels-photo-8094399.jpeg",
      "https://images.pexels.com/photos/38068/pexels-photo-38068.jpeg",
    ],
    category: "Imported Fruits",
    unit: "kg",
    stock: 35,
    featured: false,
    rating: 4.5,
    reviews: 49,
    nutritionFacts: {
      calories: 52,
      protein: 0.3,
      carbs: 14,
      fiber: 2.4,
      sugar: 10.4,
      fat: 0.2,
      vitamins: [
        { name: "Vitamin C", percentage: 14 },
        { name: "Potassium", percentage: 4 },
        { name: "Vitamin K", percentage: 2 },
      ]
    }
  },
  {
    id: "p9",
    name: "Dragon Fruit",
    description: "Exotic dragon fruit from specialized farms in Bangladesh. Mildly sweet with a refreshing taste and stunning visual appeal.",
    price: 320,
    images: [
      "https://images.pexels.com/photos/2907428/pexels-photo-2907428.jpeg",
      "https://images.pexels.com/photos/7318986/pexels-photo-7318986.jpeg",
    ],
    category: "Exotic Fruits",
    unit: "piece",
    stock: 25,
    featured: true,
    rating: 4.7,
    reviews: 38,
    nutritionFacts: {
      calories: 60,
      protein: 1.2,
      carbs: 13,
      fiber: 3,
      sugar: 9,
      fat: 0.4,
      vitamins: [
        { name: "Vitamin C", percentage: 34 },
        { name: "Iron", percentage: 8 },
        { name: "Magnesium", percentage: 10 },
      ]
    }
  },
  {
    id: "p10",
    name: "Sweet Guava",
    description: "Fresh guavas from local farms in Bangladesh. Known for their sweet taste and high vitamin C content.",
    price: 150,
    images: [
      "https://images.pexels.com/photos/5945755/pexels-photo-5945755.jpeg",
      "https://images.pexels.com/photos/5945800/pexels-photo-5945800.jpeg",
    ],
    category: "Year-round Fruits",
    unit: "kg",
    stock: 40,
    featured: false,
    rating: 4.3,
    reviews: 31,
    nutritionFacts: {
      calories: 68,
      protein: 2.6,
      carbs: 14,
      fiber: 5.4,
      sugar: 8.9,
      fat: 0.9,
      vitamins: [
        { name: "Vitamin C", percentage: 228 },
        { name: "Folate", percentage: 12 },
        { name: "Potassium", percentage: 7 },
      ]
    }
  },
  {
    id: "p11",
    name: "Fresh Papaya",
    description: "Ripe and sweet papayas from Rangpur region. Excellent source of vitamins and digestive enzymes.",
    price: 140,
    images: [
      "https://images.pexels.com/photos/5945632/pexels-photo-5945632.jpeg",
      "https://images.pexels.com/photos/914455/pexels-photo-914455.jpeg",
    ],
    category: "Year-round Fruits",
    unit: "piece",
    stock: 30,
    featured: false,
    rating: 4.2,
    reviews: 27,
    nutritionFacts: {
      calories: 43,
      protein: 0.5,
      carbs: 11,
      fiber: 1.7,
      sugar: 7.8,
      fat: 0.3,
      vitamins: [
        { name: "Vitamin C", percentage: 75 },
        { name: "Vitamin A", percentage: 22 },
        { name: "Folate", percentage: 10 },
      ]
    }
  },
  {
    id: "p12",
    name: "Seasonal Jackfruit",
    description: "The national fruit of Bangladesh! Sweet, aromatic jackfruit from the best farms. Each piece is carefully selected for ripeness.",
    price: 400,
    images: [
      "https://images.pexels.com/photos/5945865/pexels-photo-5945865.jpeg",
      "https://images.pexels.com/photos/13115150/pexels-photo-13115150.jpeg",
    ],
    category: "Summer Fruits",
    unit: "piece",
    stock: 15,
    featured: true,
    rating: 4.8,
    reviews: 52,
    nutritionFacts: {
      calories: 95,
      protein: 1.7,
      carbs: 23.2,
      fiber: 1.5,
      sugar: 19.1,
      fat: 0.6,
      vitamins: [
        { name: "Vitamin C", percentage: 13 },
        { name: "Potassium", percentage: 10 },
        { name: "Vitamin B6", percentage: 7 },
      ]
    }
  }
];