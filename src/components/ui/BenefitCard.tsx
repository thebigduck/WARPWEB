import React from 'react';
// Assuming CheckCircleIcon etc. are imported or available
import { CheckCircleIcon, BookOpenIcon } from '@/components/icons'; // Example

interface BenefitCardProps {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}
export const BenefitCard: React.FC<BenefitCardProps> = ({ icon, title, children }) => (
    <div className="bg-comet-grey p-6 rounded-lg shadow-xl hover:shadow-cyber-teal/20 transition-all duration-300 transform hover:-translate-y-1 border border-shadow-slate/50 flex flex-col items-center text-center h-full">
      {icon}
      <h3 className="text-xl font-medium text-starlight-blue mb-2 mt-1 font-['Chypre',_Inter,_sans-serif]">{title}</h3>
      <p className="text-starlight-blue/80 leading-relaxed text-sm flex-grow">{children}</p>
    </div>
);