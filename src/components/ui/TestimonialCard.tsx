import React from 'react';
import Image from 'next/image';
import { StarIcon } from '../icons';

interface TestimonialCardProps {
  name: string;
  role: string;
  stars: number;
  text: string;
  avatar?: string;
  // theme prop can be re-added later if needed based on styling pass
}

export const TestimonialCard: React.FC<TestimonialCardProps> = ({ name, role, stars, text, avatar }) => {
  const placeholderAvatar = `https://placehold.co/60x60/0A192F/A8B2D1?text=${name.charAt(0)}`;
  const [avatarSrc, setAvatarSrc] = React.useState(avatar || placeholderAvatar);

  return (
    <div className="bg-comet-grey p-6 rounded-lg shadow-xl backdrop-blur-sm border border-shadow-slate/50 h-full flex flex-col">
      <div className="flex items-center mb-4">
        <div className="relative w-14 h-14 rounded-full mr-4 border-2 border-cyber-teal overflow-hidden">
          <Image 
            src={avatarSrc}
            alt={name} 
            width={56}
            height={56}
            className="object-cover" 
            onError={() => setAvatarSrc(placeholderAvatar)}
          />
        </div>
        <div>
          <h4 className="font-medium text-starlight-blue">{name}</h4>
          <p className="text-xs text-cyber-teal">{role}</p>
        </div>
      </div>
      <div className="flex mb-3">
        {[...Array(5)].map((_, i) => <StarIcon key={i} filled={i < stars} />)}
      </div>
      <p className="text-starlight-blue/90 leading-relaxed italic text-sm flex-grow">{`"${text}"`}</p>
    </div>
  );
};