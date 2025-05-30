import React, { useState } from 'react';
import ChevronUpIcon from '@/components/icons/ChevronUpIcon';
import ChevronDownIcon from '@/components/icons/ChevronDownIcon';

interface FAQItemProps {
  question: string;
  answer: string;
  className?: string;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer, className = "" }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`border-b border-gray-700 py-4 ${className}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full text-left text-white hover:text-purple-300 focus:outline-none"
      >
        <h3 className="text-lg font-medium">{question}</h3>
        {isOpen ? <ChevronUpIcon className="h-6 w-6" /> : <ChevronDownIcon className="h-6 w-6" />}
      </button>
      {isOpen && (
        <div className="mt-4 text-gray-400">
          <p>{answer}</p>
        </div>
      )}
    </div>
  );
};

export default FAQItem;
