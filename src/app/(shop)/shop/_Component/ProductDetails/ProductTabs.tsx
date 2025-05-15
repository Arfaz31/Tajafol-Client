import { useState } from "react";
import { Separator } from "@/components/ui/separator";

interface ProductTabsProps {
  product: {
    broaddescription?: string;
    unit?: string;
  };
}

export default function ProductTabs({ product }: ProductTabsProps) {
  const [activeTab, setActiveTab] = useState("description");

  return (
    <div className="w-full mt-8 ">
      {/* Tab Navigation */}
      <div className="flex border-b">
        <button
          onClick={() => setActiveTab("description")}
          className={`py-3 md:px-6 px-2 font-medium text-sm md:text-base text-gray-700 ${
            activeTab === "description"
              ? "border-b-2 border-gray-800"
              : "hover:bg-gray-50"
          }`}
        >
          Description
        </button>
        <button
          onClick={() => setActiveTab("additional")}
          className={`py-3 md:px-6 px-2 text-sm md:text-base font-medium text-gray-700 ${
            activeTab === "additional"
              ? "border-b-2 border-gray-800"
              : "hover:bg-gray-50"
          }`}
        >
          Additional information
        </button>
        <button
          onClick={() => setActiveTab("reviews")}
          className={`py-3 md:px-6 px-2 font-medium text-sm md:text-base text-gray-700 ${
            activeTab === "reviews"
              ? "border-b-2 border-gray-800"
              : "hover:bg-gray-50"
          }`}
        >
          Reviews (0)
        </button>
      </div>

      {/* Tab Content */}
      <div className="py-6 px-5">
        {/* Description Tab Content */}
        {activeTab === "description" && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Description</h2>
            <div />
            {product.broaddescription}

            {/* {product.features && product.features.length > 0 && (
              <div className="mt-6">
                <h3 className="text-xl font-bold mb-4">
                  আম্রপালি আমের বৈশিষ্ট্য
                </h3>
                <ul className="list-disc pl-5 space-y-2">
                  {product.features.map((feature, index) => (
                    <li key={index} className="text-gray-700">
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            )} */}
          </div>
        )}

        {/* Additional Information Tab Content */}
        {activeTab === "additional" && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Additional information</h2>
            <div className="border-t border-b py-4">
              <div className="flex py-3">
                <div className="w-1/4 font-semibold text-lg">package</div>
                <div className="w-3/4 font-semibold">
                  {product.unit || "N/A"} KG
                </div>
              </div>
              <Separator />
            </div>
          </div>
        )}

        {/* Reviews Tab Content */}
        {activeTab === "reviews" && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Reviews</h2>
            <p className="text-gray-500">There are no reviews yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}
