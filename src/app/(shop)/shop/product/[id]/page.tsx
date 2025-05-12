"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ChevronRight,
  Minus,
  Plus,
  ShoppingCart,
  Star,
  Truck,
  RefreshCw,
  Shield,
  Leaf,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { products } from "@/lib/data/products";
import { useDispatch } from "react-redux";
import { addToCart } from "@/redux/slices/cartSlice";
import { notFound } from "next/navigation";

export default function ProductDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const dispatch = useDispatch();
  const product = products.find((p) => p.id === params.id);

  // If product not found, return 404
  if (!product) {
    notFound();
  }

  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  // Get related products from same category
  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        id: product.id,
        name: product.name,
        price: product.discountedPrice || product.price,
        image: product.images[0],
        quantity,
        unit: product.unit,
      })
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container-custom py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center text-sm mb-8">
          <Link
            href="/"
            className="text-muted-foreground hover:text-foreground"
          >
            Home
          </Link>
          <ChevronRight className="h-4 w-4 mx-2 text-muted-foreground" />
          <Link
            href="/shop"
            className="text-muted-foreground hover:text-foreground"
          >
            Shop
          </Link>
          <ChevronRight className="h-4 w-4 mx-2 text-muted-foreground" />
          <Link
            href={`/shop/${product.category.toLowerCase().replace(" ", "-")}`}
            className="text-muted-foreground hover:text-foreground"
          >
            {product.category}
          </Link>
          <ChevronRight className="h-4 w-4 mx-2 text-muted-foreground" />
          <span className="text-foreground font-medium truncate">
            {product.name}
          </span>
        </nav>

        {/* Product Details */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
            {/* Product Images */}
            <div className="space-y-4">
              <div className="relative aspect-square rounded-lg overflow-hidden">
                <Image
                  src={product.images[selectedImage]}
                  alt={product.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />

                {product.discountedPrice && (
                  <Badge className="absolute top-4 left-4 bg-accent text-white">
                    {Math.round(
                      (1 - product.discountedPrice / product.price) * 100
                    )}
                    % OFF
                  </Badge>
                )}
              </div>

              <div className="flex gap-2 overflow-x-auto pb-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`relative h-20 w-20 rounded-md overflow-hidden border-2 transition-all ${
                      selectedImage === index
                        ? "border-primary"
                        : "border-transparent hover:border-primary/50"
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`${product.name} - view ${index + 1}`}
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Badge
                    variant="secondary"
                    className="bg-secondary/10 text-secondary"
                  >
                    {product.category}
                  </Badge>
                  {product.stock > 0 ? (
                    <Badge
                      variant="secondary"
                      className="bg-primary/10 text-primary"
                    >
                      In Stock
                    </Badge>
                  ) : (
                    <Badge
                      variant="secondary"
                      className="bg-accent/10 text-accent"
                    >
                      Out of Stock
                    </Badge>
                  )}
                </div>

                <h1 className="text-2xl md:text-3xl font-bold mb-2">
                  {product.name}
                </h1>

                <div className="flex items-center gap-2 mb-4">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < Math.floor(product.rating)
                            ? "fill-primary text-primary"
                            : i < product.rating
                            ? "fill-primary/50 text-primary/50"
                            : "fill-muted text-muted"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {product.rating} ({product.reviews} reviews)
                  </span>
                </div>

                <div className="mb-6">
                  {product.discountedPrice ? (
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-bold text-primary">
                        ৳{product.discountedPrice}
                      </span>
                      <span className="text-lg text-muted-foreground line-through">
                        ৳{product.price}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        per {product.unit}
                      </span>
                    </div>
                  ) : (
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-bold">
                        ৳{product.price}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        per {product.unit}
                      </span>
                    </div>
                  )}
                </div>

                <p className="text-muted-foreground mb-6">
                  {product.description}
                </p>
              </div>

              <Separator />

              {/* Quantity Selector */}
              <div>
                <span className="text-sm font-medium block mb-2">Quantity</span>
                <div className="flex items-center gap-3">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-10 text-center">{quantity}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() =>
                      setQuantity(Math.min(product.stock, quantity + 1))
                    }
                    disabled={quantity >= product.stock}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                  <span className="text-sm text-muted-foreground ml-2">
                    {product.stock} {product.unit}s available
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  size="lg"
                  onClick={handleAddToCart}
                  className="bg-primary hover:bg-primary-hover text-white flex-1"
                  disabled={product.stock <= 0}
                >
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  Add to Cart
                </Button>
                <Link href="/cart" className="flex-1">
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full border-primary text-primary hover:bg-primary hover:text-white"
                  >
                    Buy Now
                  </Button>
                </Link>
              </div>

              {/* Benefits */}
              <div className="grid grid-cols-2 gap-3 pt-3">
                <div className="flex gap-2 items-center">
                  <Truck className="h-5 w-5 text-secondary" />
                  <span className="text-sm">Fast Delivery</span>
                </div>
                <div className="flex gap-2 items-center">
                  <RefreshCw className="h-5 w-5 text-secondary" />
                  <span className="text-sm">Easy Returns</span>
                </div>
                <div className="flex gap-2 items-center">
                  <Shield className="h-5 w-5 text-secondary" />
                  <span className="text-sm">Quality Guarantee</span>
                </div>
                <div className="flex gap-2 items-center">
                  <Leaf className="h-5 w-5 text-secondary" />
                  <span className="text-sm">Premium Quality</span>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs Section */}
          <Tabs defaultValue="description" className="w-full p-6 border-t">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="nutrition">Nutrition Facts</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>
            <TabsContent value="description" className="pt-6">
              <div className="prose max-w-none">
                <h3 className="text-xl font-semibold mb-4">Product Details</h3>
                <p>{product.description}</p>

                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-background rounded-lg p-5">
                    <h4 className="font-semibold mb-3">Product Features</h4>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <span className="h-5 w-5 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs mt-0.5">
                          ✓
                        </span>
                        <span>Premium quality fruit from the best farms</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="h-5 w-5 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs mt-0.5">
                          ✓
                        </span>
                        <span>Hand-picked at the peak of ripeness</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="h-5 w-5 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs mt-0.5">
                          ✓
                        </span>
                        <span>No artificial ripening agents used</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="h-5 w-5 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs mt-0.5">
                          ✓
                        </span>
                        <span>Direct from farm to your doorstep</span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-background rounded-lg p-5">
                    <h4 className="font-semibold mb-3">Storage Tips</h4>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <span className="h-5 w-5 rounded-full bg-secondary/20 text-secondary flex items-center justify-center text-xs mt-0.5">
                          ⚑
                        </span>
                        <span>
                          Store in a cool, dry place at room temperature
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="h-5 w-5 rounded-full bg-secondary/20 text-secondary flex items-center justify-center text-xs mt-0.5">
                          ⚑
                        </span>
                        <span>Refrigerate once ripe to extend freshness</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="h-5 w-5 rounded-full bg-secondary/20 text-secondary flex items-center justify-center text-xs mt-0.5">
                          ⚑
                        </span>
                        <span>Keep away from direct sunlight</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="h-5 w-5 rounded-full bg-secondary/20 text-secondary flex items-center justify-center text-xs mt-0.5">
                          ⚑
                        </span>
                        <span>Consume within 3-5 days for best taste</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="nutrition" className="pt-6">
              {product.nutritionFacts ? (
                <div>
                  <h3 className="text-xl font-semibold mb-4">
                    Nutrition Information
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    Nutritional value per 100g serving
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-background rounded-lg p-6">
                      <h4 className="font-medium mb-4">Macronutrients</h4>
                      <div className="space-y-3">
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Calories</span>
                            <span className="font-medium">
                              {product.nutritionFacts.calories} kcal
                            </span>
                          </div>
                          <div className="h-2 bg-primary/20 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-primary rounded-full"
                              style={{
                                width: `${Math.min(
                                  100,
                                  (product.nutritionFacts.calories / 800) * 100
                                )}%`,
                              }}
                            />
                          </div>
                        </div>

                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Carbohydrates</span>
                            <span className="font-medium">
                              {product.nutritionFacts.carbs}g
                            </span>
                          </div>
                          <div className="h-2 bg-primary/20 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-primary rounded-full"
                              style={{
                                width: `${Math.min(
                                  100,
                                  (product.nutritionFacts.carbs / 30) * 100
                                )}%`,
                              }}
                            />
                          </div>
                        </div>

                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Protein</span>
                            <span className="font-medium">
                              {product.nutritionFacts.protein}g
                            </span>
                          </div>
                          <div className="h-2 bg-secondary/20 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-secondary rounded-full"
                              style={{
                                width: `${Math.min(
                                  100,
                                  (product.nutritionFacts.protein / 5) * 100
                                )}%`,
                              }}
                            />
                          </div>
                        </div>

                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Fat</span>
                            <span className="font-medium">
                              {product.nutritionFacts.fat}g
                            </span>
                          </div>
                          <div className="h-2 bg-accent/20 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-accent rounded-full"
                              style={{
                                width: `${Math.min(
                                  100,
                                  (product.nutritionFacts.fat / 3) * 100
                                )}%`,
                              }}
                            />
                          </div>
                        </div>

                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Fiber</span>
                            <span className="font-medium">
                              {product.nutritionFacts.fiber}g
                            </span>
                          </div>
                          <div className="h-2 bg-secondary/20 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-secondary rounded-full"
                              style={{
                                width: `${Math.min(
                                  100,
                                  (product.nutritionFacts.fiber / 5) * 100
                                )}%`,
                              }}
                            />
                          </div>
                        </div>

                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Sugar</span>
                            <span className="font-medium">
                              {product.nutritionFacts.sugar}g
                            </span>
                          </div>
                          <div className="h-2 bg-accent/20 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-accent rounded-full"
                              style={{
                                width: `${Math.min(
                                  100,
                                  (product.nutritionFacts.sugar / 20) * 100
                                )}%`,
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-background rounded-lg p-6">
                      <h4 className="font-medium mb-4">Vitamins & Minerals</h4>
                      <div className="space-y-4">
                        {product.nutritionFacts.vitamins.map(
                          (vitamin, index) => (
                            <div key={index}>
                              <div className="flex justify-between text-sm mb-1">
                                <span>{vitamin.name}</span>
                                <span className="font-medium">
                                  {vitamin.percentage}% DV
                                </span>
                              </div>
                              <div className="h-2 bg-primary/20 rounded-full overflow-hidden">
                                <div
                                  className="h-full bg-primary rounded-full"
                                  style={{
                                    width: `${Math.min(
                                      100,
                                      vitamin.percentage
                                    )}%`,
                                  }}
                                />
                              </div>
                            </div>
                          )
                        )}
                      </div>

                      <div className="mt-6 pt-4 border-t border-border">
                        <h4 className="font-medium mb-3">Health Benefits</h4>
                        <ul className="space-y-2">
                          <li className="flex items-start gap-2">
                            <Leaf className="h-4 w-4 text-secondary mt-0.5" />
                            <span className="text-sm">
                              Rich in essential vitamins and minerals
                            </span>
                          </li>
                          <li className="flex items-start gap-2">
                            <Leaf className="h-4 w-4 text-secondary mt-0.5" />
                            <span className="text-sm">
                              Contains natural antioxidants
                            </span>
                          </li>
                          <li className="flex items-start gap-2">
                            <Leaf className="h-4 w-4 text-secondary mt-0.5" />
                            <span className="text-sm">
                              Supports immune system function
                            </span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-10">
                  <p className="text-muted-foreground">
                    Nutrition information for this product is currently being
                    updated.
                  </p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="reviews" className="pt-6">
              <div className="flex flex-col md:flex-row gap-8">
                <div className="md:w-1/3 bg-background p-6 rounded-lg">
                  <div className="text-center mb-6">
                    <h3 className="text-3xl font-bold mb-1">
                      {product.rating}/5
                    </h3>
                    <div className="flex justify-center mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-5 w-5 ${
                            i < Math.floor(product.rating)
                              ? "fill-primary text-primary"
                              : i < product.rating
                              ? "fill-primary/50 text-primary/50"
                              : "fill-muted text-muted"
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Based on {product.reviews} reviews
                    </p>
                  </div>

                  <div className="space-y-2">
                    {[5, 4, 3, 2, 1].map((rating) => {
                      // Mock data for review distribution
                      const percentage =
                        rating === 5
                          ? 60
                          : rating === 4
                          ? 25
                          : rating === 3
                          ? 10
                          : rating === 2
                          ? 3
                          : 2;
                      return (
                        <div key={rating} className="flex items-center gap-2">
                          <div className="flex items-center">
                            <span className="text-sm">{rating}</span>
                            <Star className="h-3 w-3 ml-1 fill-primary text-primary" />
                          </div>
                          <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                            <div
                              className="h-full bg-primary rounded-full"
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                          <span className="text-xs text-muted-foreground">
                            {percentage}%
                          </span>
                        </div>
                      );
                    })}
                  </div>

                  <Button className="w-full mt-6">Write a Review</Button>
                </div>

                <div className="md:w-2/3">
                  <h3 className="text-xl font-semibold mb-4">
                    Customer Reviews
                  </h3>

                  {/* Mock reviews */}
                  <div className="space-y-6">
                    {[
                      {
                        name: "Rahimunnesa K.",
                        rating: 5,
                        date: "March 25, 2025",
                        comment:
                          "These mangoes are incredibly sweet and juicy. The quality is consistent every time I order. Highly recommended!",
                        helpful: 12,
                      },
                      {
                        name: "Fazlur R.",
                        rating: 4,
                        date: "March 22, 2025",
                        comment:
                          "Great quality fruit, arrived fresh and well-packaged. Only reason for 4 stars is that one of them was slightly bruised, but overall very good.",
                        helpful: 7,
                      },
                      {
                        name: "Moushumi A.",
                        rating: 5,
                        date: "March 18, 2025",
                        comment:
                          "Absolutely love these fruits! The taste is so much better than what I find in local markets. Will definitely order again.",
                        helpful: 9,
                      },
                    ].map((review, index) => (
                      <div key={index} className="border-b border-border pb-6">
                        <div className="flex justify-between mb-2">
                          <h4 className="font-medium">{review.name}</h4>
                          <span className="text-sm text-muted-foreground">
                            {review.date}
                          </span>
                        </div>

                        <div className="flex mb-3">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < review.rating
                                  ? "fill-primary text-primary"
                                  : "fill-muted text-muted"
                              }`}
                            />
                          ))}
                        </div>

                        <p className="text-muted-foreground mb-3">
                          {review.comment}
                        </p>

                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="sm" className="text-xs">
                            Helpful ({review.helpful})
                          </Button>
                          <Button variant="ghost" size="sm" className="text-xs">
                            Report
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <Button variant="outline" className="mt-6">
                    See More Reviews
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="mt-12">
            <h2 className="text-2xl font-bold mb-6">Related Products</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {relatedProducts.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="product-card group"
                >
                  <div className="relative h-56 overflow-hidden">
                    <Link href={`/shop/product/${item.id}`}>
                      <Image
                        src={item.images[0]}
                        alt={item.name}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </Link>

                    {item.discountedPrice && (
                      <Badge className="absolute top-3 left-3 bg-accent text-white">
                        {Math.round(
                          (1 - item.discountedPrice / item.price) * 100
                        )}
                        % OFF
                      </Badge>
                    )}
                  </div>

                  <div className="p-4">
                    <Link
                      href={`/shop/product/${item.id}`}
                      className="hover:text-primary"
                    >
                      <h3 className="font-medium text-lg line-clamp-1">
                        {item.name}
                      </h3>
                    </Link>

                    <div className="flex items-center gap-1 text-muted-foreground text-sm my-1">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-3 w-3 ${
                              i < Math.floor(item.rating)
                                ? "fill-primary text-primary"
                                : "fill-muted text-muted"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-xs ml-1">({item.reviews})</span>
                    </div>

                    <div className="flex items-center gap-2">
                      {item.discountedPrice ? (
                        <>
                          <span className="font-semibold">
                            ৳{item.discountedPrice}
                          </span>
                          <span className="text-sm text-muted-foreground line-through">
                            ৳{item.price}
                          </span>
                        </>
                      ) : (
                        <span className="font-semibold">৳{item.price}</span>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
