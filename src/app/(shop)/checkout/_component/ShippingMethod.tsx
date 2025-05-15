import React from "react";

interface ShippingMethodProps {
  onSelectMethod: (cost: number) => void;
  onBack: () => void;
}

const ShippingMethod: React.FC<ShippingMethodProps> = ({
  onSelectMethod,
  onBack,
}) => {
  const shippingOptions = [
    {
      id: "inside-dhaka",
      name: "Inside Dhaka",
      cost: 60,
      description: "Delivery within 1-2 business days",
    },
    {
      id: "outside-dhaka",
      name: "Outside Dhaka",
      cost: 120,
      description: "Delivery within 3-5 business days",
    },
  ];

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
              onChange={() => onSelectMethod(option.cost)}
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
          className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-md"
          onClick={() => onSelectMethod(0)}
        >
          Continue to Payment
        </button>
      </div>
    </div>
  );
};

export default ShippingMethod;
