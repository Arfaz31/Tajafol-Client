import { setShippingCost } from "@/redux/slices/cartSlice";
import React from "react";
import { useDispatch } from "react-redux";

interface ShippingMethodProps {
  onSelectMethod: (cost: number) => void;
  onBack: () => void;
  onPlaceOrder: () => void;
  isLoading: boolean;
}

const ShippingMethod: React.FC<ShippingMethodProps> = ({
  onSelectMethod,
  onBack,
  onPlaceOrder,
  isLoading,
}) => {
  const dispatch = useDispatch();

  const shippingOptions = [
    {
      id: "inside-rajshahi",
      name: "Inside Rajshahi",
      cost: 60,
      description: "Delivery within 1-2 business days",
    },
    {
      id: "outside-rajshahi",
      name: "Outside Rajshahi",
      cost: 120,
      description: "Delivery within 3-5 business days",
    },
  ];

  const handleSelectMethod = (cost: number) => {
    dispatch(setShippingCost(cost));
    onSelectMethod(cost);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">
        Choose Shipping Method
      </h2>

      <div className="space-y-4">
        {shippingOptions.map((option) => (
          <div key={option.id} className="flex items-start">
            <input
              id={option.id}
              name="shipping-method"
              type="radio"
              className="mt-1 h-4 w-4 text-green-600 border-gray-300 focus:ring-green-500"
              onChange={() => handleSelectMethod(option.cost)}
            />
            <label htmlFor={option.id} className="ml-3 block">
              <span className="block text-sm font-medium text-gray-700">
                {option.name}
              </span>
              <span className="block text-sm text-gray-500">
                {option.description}
              </span>
              <span className="block text-sm font-medium text-green-600">
                ৳{option.cost}
              </span>
            </label>
          </div>
        ))}
      </div>

      <div className="flex justify-between pt-6">
        <button
          type="button"
          onClick={onBack}
          className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Back
        </button>
        <button
          type="button"
          onClick={onPlaceOrder}
          disabled={isLoading}
          className={`px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-md ${
            isLoading ? "opacity-70 cursor-not-allowed" : ""
          }`}
        >
          {isLoading ? "Processing..." : "Place Order"}
        </button>
      </div>
    </div>
  );
};

export default ShippingMethod;
