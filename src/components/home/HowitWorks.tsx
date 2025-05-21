"use client";
import { motion } from "framer-motion";

const HowItWorks = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-4">How It Works</h2>
        <p className="text-center text-gray-600 mb-12">
          Get fresh fruits delivered in 4 simple steps
        </p>

        {/* Visual Process Flow - Grid Version */}
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: "🔍",
                title: "Browse",
                desc: "Select fresh fruits",
              },
              {
                icon: "🛒",
                title: "Add to Cart",
                desc: "Choose quantities",
              },
              {
                icon: "💳",
                title: "Pay Securely",
                desc: "Safe checkout",
              },
              {
                icon: "🚚",
                title: "Fast Delivery",
                desc: "Fresh to your door",
              },
            ].map((step, index) => (
              <motion.div
                key={index}
                className="relative flex flex-col items-center text-center bg-white rounded-lg shadow-lg p-6 h-full"
                whileHover={{ y: -10 }}
                transition={{ duration: 0.3 }}
              >
                {/* Step Indicator (for mobile) */}
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm sm:hidden">
                  {index + 1}
                </div>

                {/* Emoji Icon */}
                <div className="text-4xl mb-4">{step.icon}</div>

                {/* Title */}
                <h3 className="font-bold text-xl mb-2">{step.title}</h3>

                {/* Description */}
                <p className="text-gray-600">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
