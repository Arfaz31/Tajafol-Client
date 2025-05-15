/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { useGetAllCategoriesQuery } from "@/redux/api/categoryApi";
import Container from "../Shared/Container";
import { useRouter } from "next/navigation";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

// Skeleton component
const CategorySkeleton = () => (
  <div className="group relative rounded-lg overflow-hidden shadow-md bg-gray-100">
    <div className="h-44 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-gray-300/60 to-transparent" />
      <div className="absolute inset-0 animate-pulse bg-gray-200" />
    </div>
    <div className="absolute bottom-0 left-0 right-0 p-4">
      <div className="flex justify-between items-center">
        <div className="h-6 w-3/4 bg-gray-200 rounded animate-pulse mb-1"></div>
        <div className="bg-gray-200/20 rounded-full p-1">
          <div className="h-4 w-4 bg-gray-200 rounded-full animate-pulse"></div>
        </div>
      </div>
    </div>
  </div>
);

const CategorySection = () => {
  const router = useRouter();
  const { data: categoriesData, isLoading } = useGetAllCategoriesQuery({
    limit: 100,
  });
  const categories = categoriesData?.data?.result || [];

  // Function to handle category click and navigate with query parameter
  const handleCategoryClick = (categoryId: string) => {
    router.push(`/shop?category=${categoryId}`);
  };

  return (
    <Container className="py-16 lg:px-5 px-0 bg-background">
      <div>
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
            Explore our wide variety of seasonal and imported fruits categorized
            for your convenience
          </motion.p>
        </div>

        {isLoading ? (
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
          >
            {[...Array(8)].map((_, index) => (
              <motion.div key={`skeleton-${index}`} variants={item}>
                <CategorySkeleton />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
          >
            {categories.map((category: any) => (
              <motion.div key={category._id} variants={item}>
                <div
                  onClick={() => handleCategoryClick(category._id)}
                  className="group relative rounded-lg overflow-hidden shadow-md bg-white transition-all hover:shadow-lg cursor-pointer"
                >
                  <div className="h-44 relative">
                    <Image
                      src={category.image}
                      alt={category.categoryName}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-semibold mb-1">
                        {category.categoryName}
                      </h3>
                      <span className="bg-white/40 rounded-full p-1 transition-transform duration-300 group-hover:translate-x-1">
                        <ChevronRight className="h-4 w-4" />
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </Container>
  );
};

export default CategorySection;
