import React from 'react';
import StarIcon from '@/components/icons/StarIcon';
import Image from 'next/image'; // Import next/image

interface TestimonialCardProps {
  quote: string;
  author: string;
  role: string;
  rating: number;
  avatar?: string; 
  className?: string;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ quote, author, role, rating, avatar, className = "" }) => (
  <div className={`bg-gray-800 p-6 rounded-lg shadow-lg ${className}`}>
    {avatar && (
      <div className="flex justify-center mb-4">
        <Image 
            src={avatar} 
            alt={`${author}'s avatar`} 
            width={64} // Provide explicit width (64px for w-16)
            height={64} // Provide explicit height (64px for h-16)
            className="rounded-full object-cover" 
        />
      </div>
    )}
    <div className="flex mb-4 justify-center">
      {[...Array(5)].map((_, i) => (
        <StarIcon key={i} className={`h-5 w-5 ${i < rating ? 'text-yellow-400' : 'text-gray-600'}`} />
      ))}
    </div>
    <p className="text-gray-300 italic mb-4 text-center">&ldquo;{quote}&rdquo;</p>
    <div className="text-center">
      <p className="text-white font-semibold">{author}</p>
      <p className="text-gray-500 text-sm">{role}</p>
    </div>
  </div>
);

export default TestimonialCard;
