"use client";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const HowItWorks = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-4">
          How It Works
        </h2>
        <p className="text-center text-gray-600 mb-12">
          Get fresh fruits delivered in 4 simple steps
        </p>
        
        {/* Visual Process Flow */}
        <div className="flex flex-col md:flex-row justify-between items-center max-w-5xl mx-auto">
          {[
            {
              icon: "🔍",
              title: "Browse",
              desc: "Select fresh fruits"
            },
            {
              icon: "🛒",
              title: "Add to Cart",
              desc: "Choose quantities"
            },
            {
              icon: "💳",
              title: "Pay Securely",
              desc: "Safe checkout"
            },
            {
              icon: "🚚",
              title: "Fast Delivery",
              desc: "Fresh to your door"
            }
          ].map((step, index) => (
            <div key={index} className="flex flex-col md:flex-row items-center mb-8 md:mb-0">
              {/* Step Card */}
              <motion.div 
                className="flex flex-col items-center text-center bg-white rounded-lg shadow-lg p-6 w-60 py-8"
                whileHover={{ y: -10 }}
                transition={{ duration: 0.3 }}
              >
                {/* Step Number */}
                
                
                {/* Emoji Icon */}
                <div className="text-4xl mb-4">
                  {step.icon}
                </div>
                
                {/* Title */}
                <h3 className="font-bold text-xl mb-2">
                  {step.title}
                </h3>
                
                {/* Description */}
                <p className="text-gray-600">
                  {step.desc}
                </p>
              </motion.div>

              {/* Arrow - Only show between steps, not after the last step */}
              {index < 3 && (
                <div className="hidden md:block mx-4">
                  <ArrowRight size={32} className="text-black/50 " />
                </div>
              )}
              
              {/* Mobile Arrow - Shown only on mobile */}
              {index < 3 && (
                <div className="block md:hidden my-4">
                  <ArrowRight size={24} className="text-white transform rotate-90" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;