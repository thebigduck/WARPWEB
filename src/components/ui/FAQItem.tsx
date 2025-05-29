import React, { useState } from 'react';
import { ChevronUpIcon, ChevronDownIcon } from '../icons';

interface FAQItemProps {
  question: string;
  answer: React.ReactNode; // Can be string or JSX for rich text answers
}

export const FAQItem: React.FC<FAQItemProps> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-comet-grey/50 py-5">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex justify-between items-center w-full text-left"
      >
        <h3 className="text-lg font-medium text-starlight-blue">{question}</h3>
        {isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
      </button>
      {isOpen && <div className="mt-3 text-starlight-blue/80 leading-relaxed pr-6">{answer}</div>}
    </div>
  );
};