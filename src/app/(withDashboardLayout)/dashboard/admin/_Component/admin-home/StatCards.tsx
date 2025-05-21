// src/components/Dashboard/StatCards.tsx
import React, { ReactNode } from "react";

interface StatCardProps {
  title?: string;
  stats: Array<{
    label: string;
    value: string | number;
    icon: ReactNode;
    color: string;
    bgColor: string;
  }>;
}

const StatCards: React.FC<StatCardProps> = ({ title, stats }) => {
  return (
    <div className="space-y-4">
      {title && (
        <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {stats.map((card, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            style={{ borderTopColor: card.color, borderTopWidth: '4px' }}
          >
            <div className="p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">
                    {card.label}
                  </p>
                  <p className="text-2xl sm:text-3xl font-bold text-gray-900">
                    {card.value}
                  </p>
                </div>
                <div 
                  className="rounded-full p-3 shadow-lg"
                  style={{ backgroundColor: card.color }}
                >
                  {card.icon}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatCards;