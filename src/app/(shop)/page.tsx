/* eslint-disable react/no-unescaped-entities */
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import HeroBanner from "@/components/home/HeroBanner"
import CategorySection from "@/components/home/CategorySection"
import FeaturedProducts from "@/components/home/FeaturedProducts"
import PopularProducts from "@/components/home/PopularProducts"
import NutritionCharts from "@/components/home/NutritionCharts"

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Banner */}
      <HeroBanner />
      
      {/* Categories Section */}
      <CategorySection />
      
      {/* Featured Products */}
      <FeaturedProducts />
      
      {/* Popular Products */}
      <PopularProducts />
      
      {/* Nutrition Charts */}
      <NutritionCharts />
      
      {/* CTA Section */}
      <section className="py-20 bg-primary/10">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Taste the Freshness?</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Order today and experience the delicious taste of Bangladesh's finest seasonal fruits delivered right to your doorstep.
          </p>
          <Link href="/shop">
            <Button size="lg" className="bg-primary hover:bg-primary-hover text-white">
              Shop Now
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}