"use client";

import { motion } from "framer-motion";

const HowItWorks = () => {
  return (
    <div className="mt-6  border-t border-green-200/30">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="text-center"
      >
        <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3">
          How It <span className="text-green-600">Works</span>
        </h3>
        <p className="text-gray-600 mb-12 max-w-2xl mx-auto">
          Get fresh fruits delivered in 4 simple steps
        </p>

        {/* Visual Process Flow */}
        <div className="relative max-w-5xl mx-auto">
          {/* Connecting Line */}
          <div className="hidden md:block absolute top-8 left-0 right-0 h-0.5 bg-gradient-to-r from-green-200 via-blue-200 via-orange-200 to-green-200 mx-12 opacity-50"></div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-4">
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
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.5, 
                  delay: 1 + index * 0.1,
                  ease: "easeOut"
                }}
                whileHover={{ 
                  y: -5,
                  transition: { duration: 0.2 }
                }}
                className="group cursor-pointer"
              >
                <div className="relative p-6 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg hover:border-green-200 transition-all duration-300">
                  {/* Step Number */}
                  <div className="absolute -top-3 -right-3 w-7 h-7 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold shadow-lg">
                    {index + 1}
                  </div>
                  
                  {/* Emoji Icon */}
                  <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">
                    {step.icon}
                  </div>
                  
                  {/* Title */}
                  <h4 className="font-semibold text-gray-800 mb-2 group-hover:text-green-600 transition-colors duration-300">
                    {step.title}
                  </h4>
                  
                  {/* Description */}
                  <p className="text-sm text-gray-500 leading-relaxed">
                    {step.desc}
                  </p>
                </div>

                {/* Mobile Arrow */}
                {index < 3 && (
                  <div className="md:hidden flex justify-center mt-4">
                    
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        
      </motion.div>
    </div>
  );
};

export default HowItWorks;