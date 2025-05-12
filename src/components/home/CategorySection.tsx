"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { ChevronRight } from "lucide-react"
import { categories } from "@/lib/data/categories"

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
}

const CategorySection = () => {
  return (
    <section className="py-16 bg-background">
      <div className="container-custom">
        <div className="text-center mb-12">
          <motion.h2 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="section-title"
          >
            Shop by Category
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-muted-foreground max-w-2xl mx-auto"
          >
            Explore our wide variety of seasonal and imported fruits categorized for your convenience
          </motion.p>
        </div>

        <motion.div 
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
        >
          {categories.map((category) => (
            <motion.div key={category.id} variants={item}>
              <Link href={`/shop/${category.slug}`}>
                <div className="group relative rounded-lg overflow-hidden shadow-md bg-white transition-all hover:shadow-lg">
                  <div className="h-44 relative">
                    <Image
                      src={category.image}
                      alt={category.name}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                   
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  </div>
                  
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                    <h3 className="text-lg font-semibold mb-1">{category.name}</h3>
                    <div className="flex justify-between items-center">
                      <span className="text-sm opacity-90">{category.itemCount} items</span>
                      <span className="bg-white/20 rounded-full p-1 transition-transform duration-300 group-hover:translate-x-1">
                        <ChevronRight className="h-4 w-4" />
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default CategorySection