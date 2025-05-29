import React from 'react';
import { StarIcon } from '@/components/icons'; // Example

interface TestimonialCardProps {
  name: string;
  role: string;
  stars: number;
  text: string;
  avatar?: string;
}
export const TestimonialCard: React.FC<TestimonialCardProps> = ({ name, role, stars, text, avatar }) => (
    <div className="bg-comet-grey p-6 rounded-lg shadow-xl backdrop-blur-sm border border-shadow-slate/50 h-full flex flex-col">
      <div className="flex items-center mb-4">
        <img src={avatar || `https://placehold.co/60x60/0A192F/A8B2D1?text=${name.charAt(0)}`} alt={name} className="w-14 h-14 rounded-full mr-4 border-2 border-cyber-teal" onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => { const target = e.target as HTMLImageElement; target.src = `https://placehold.co/60x60/0A192F/A8B2D1?text=${name.charAt(0)}`;}} />
        <div>
          <h4 className="font-medium text-starlight-blue font-['Chypre',_Inter,_sans-serif]">{name}</h4>
          <p className="text-xs text-cyber-teal">{role}</p>
        </div>
      </div>
      <div className="flex mb-3">
        {[...Array(5)].map((_, i) => <StarIcon key={i} filled={i < stars} />)}
      </div>
      <p className="text-starlight-blue/90 leading-relaxed italic text-sm flex-grow">{text}</p>
    </div>
);