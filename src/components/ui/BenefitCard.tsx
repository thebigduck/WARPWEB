import React from 'react';

interface BenefitCardProps {
  title: string;
  description: string;
  IconComponent: React.ElementType;
  className?: string;
}

const BenefitCard: React.FC<BenefitCardProps> = ({ title, description, IconComponent, className = "" }) => (
  <div className={`bg-gray-800 p-6 rounded-lg shadow-lg text-center ${className}`}>
    <div className="flex justify-center items-center mb-4">
      <IconComponent className="h-12 w-12 text-purple-400" />
    </div>
    <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
    <p className="text-gray-400">{description}</p>
  </div>
);

export default BenefitCard;
