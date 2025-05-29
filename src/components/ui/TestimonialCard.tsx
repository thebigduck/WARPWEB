import React from 'react';
import { StarIcon } from '../icons';

interface TestimonialCardProps {
  name: string;
  role: string;
  stars: number;
  text: string;
  avatar?: string;
  theme?: 'light' | 'dark';
}

export const TestimonialCard: React.FC<TestimonialCardProps> = ({ 
  name, 
  role, 
  stars, 
  text, 
  avatar, 
  theme = 'dark' 
}) => {
  const isLightTheme = theme === 'light';

  const cardClasses = isLightTheme 
    ? "bg-white p-6 rounded-lg shadow-xl border border-gray-200/80 h-full flex flex-col"
    : "bg-comet-grey p-6 rounded-lg shadow-xl backdrop-blur-sm border border-shadow-slate/50 h-full flex flex-col";
  
  const nameClasses = isLightTheme
    ? "font-medium text-gray-900"
    : "font-medium text-starlight-blue";

  const roleClasses = isLightTheme
    ? "text-xs text-sky-600" // Using a blueish accent for role in light theme
    : "text-xs text-cyber-teal";

  const textClasses = isLightTheme
    ? "text-gray-700 leading-relaxed italic text-sm flex-grow"
    : "text-starlight-blue/90 leading-relaxed italic text-sm flex-grow";

  const avatarPlaceholderBg = isLightTheme ? 'E0E7FF' : '0A192F'; // Light blueish for light, dark for dark
  const avatarPlaceholderText = isLightTheme ? '374151' : 'A8B2D1'; // Dark gray for light, light blue for dark

  return (
    <div className={cardClasses}>
      <div className="flex items-center mb-4">
        <img 
          src={avatar || `https://placehold.co/60x60/${avatarPlaceholderBg}/${avatarPlaceholderText}?text=${name.charAt(0)}`}
          alt={name} 
          className={`w-14 h-14 rounded-full mr-4 border-2 ${isLightTheme ? 'border-sky-500' : 'border-cyber-teal'}`} 
          onError={(e) => (e.target as HTMLImageElement).src = `https://placehold.co/60x60/${avatarPlaceholderBg}/${avatarPlaceholderText}?text=${name.charAt(0)}`}
        />
        <div>
          <h4 className={nameClasses}>{name}</h4>
          <p className={roleClasses}>{role}</p>
        </div>
      </div>
      <div className="flex mb-3">
        {[...Array(5)].map((_, i) => <StarIcon key={i} filled={i < stars} />) // StarIcon itself should be theme-agnostic or adapt
        }
      </div>
      <p className={textClasses}>{`"${text}"`}</p>
    </div>
  );
};