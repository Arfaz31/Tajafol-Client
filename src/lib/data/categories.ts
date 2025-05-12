export interface Category {
  id: string
  name: string
  description: string
  image: string
  slug: string
  itemCount: number
}

export const categories: Category[] = [
  {
    id: "c1",
    name: "Mangoes",
    description: "Premium quality mangoes from different regions of Bangladesh",
    image: "https://images.pexels.com/photos/3659124/pexels-photo-3659124.jpeg",
    slug: "mangoes",
    itemCount: 5
  },
  {
    id: "c2",
    name: "Summer Fruits",
    description: "Refreshing summer fruits to beat the heat",
    image: "https://images.pexels.com/photos/5945717/pexels-photo-5945717.jpeg",
    slug: "summer-fruits",
    itemCount: 8
  },
  {
    id: "c3",
    name: "Tropical Fruits",
    description: "Exotic tropical fruits from Bangladesh and beyond",
    image: "https://images.pexels.com/photos/1132558/pexels-photo-1132558.jpeg",
    slug: "tropical-fruits",
    itemCount: 6
  },
  {
    id: "c4",
    name: "Citrus Fruits",
    description: "Vitamin-rich citrus fruits for immunity and health",
    image: "https://images.pexels.com/photos/207085/pexels-photo-207085.jpeg",
    slug: "citrus-fruits",
    itemCount: 4
  },
  {
    id: "c5",
    name: "Year-round Fruits",
    description: "Fruits available throughout the year",
    image: "https://images.pexels.com/photos/1093038/pexels-photo-1093038.jpeg",
    slug: "year-round-fruits",
    itemCount: 7
  },
  {
    id: "c6",
    name: "Imported Fruits",
    description: "Quality imported fruits from around the world",
    image: "https://images.pexels.com/photos/46174/strawberries-berries-fruit-freshness-46174.jpeg",
    slug: "imported-fruits",
    itemCount: 9
  },
  {
    id: "c7",
    name: "Exotic Fruits",
    description: "Rare and exotic fruits for the adventurous palate",
    image: "https://images.pexels.com/photos/2907428/pexels-photo-2907428.jpeg",
    slug: "exotic-fruits",
    itemCount: 3
  }
];