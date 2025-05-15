import { useState } from "react";
import Image from "next/image";

interface ProductGalleryProps {
  images: string[];
  productName: string;
  discountPrice?: number;
  price: number;
}

export default function ProductGallery({
  images,
  productName,
}: ProductGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0);

  return (
    <div className="">
      {/* Main Product Image */}
      <div className="relative mb-16   overflow-hidden  flex justify-center">
        {images && images.length > 0 ? (
          <Image
            src={images[selectedImage]}
            alt={productName}
            width={500}
            height={500}
            className="object-contain rounded-lg"
            priority
          />
        ) : (
          <div className="flex items-center justify-center h-full bg-muted">
            <span className="text-muted-foreground">No image available</span>
          </div>
        )}
      </div>

      {/* Thumbnail Gallery - Horizontal Scrollable */}
      {images && images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-2 items-center justify-center">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(index)}
              className={`relative h-20 w-20 flex-shrink-0 overflow-hidden border-2 transition-all ${
                selectedImage === index
                  ? "border-orange-500"
                  : "border-gray-200 hover:border-orange-300"
              }`}
              aria-label={`View image ${index + 1}`}
            >
              <Image
                src={image}
                alt={`${productName} - view ${index + 1}`}
                fill
                sizes="80px"
                className="object-contain"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
