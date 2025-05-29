import React, { useState } from 'react';
import { ChevronDownIcon, ChevronUpIcon } from '@/components/icons'; // Example

interface FAQItemProps {
  question: string;
  answer: string;
}
export const FAQItem: React.FC<FAQItemProps> = ({ question, answer }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <div className="border-b border-comet-grey/50 py-5">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex justify-between items-center w-full text-left"
        >
          <h3 className="text-lg font-medium text-starlight-blue font-['Chypre',_Inter,_sans-serif]">{question}</h3>
          {isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
        </button>
        {isOpen && <p className="mt-3 text-starlight-blue/80 leading-relaxed pr-6">{answer}</p>}
      </div>
    );
};