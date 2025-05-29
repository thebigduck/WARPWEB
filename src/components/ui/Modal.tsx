import React from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  message: string;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, message }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-[100] p-4">
      <div className="bg-comet-grey p-6 sm:p-8 rounded-lg shadow-2xl max-w-md w-full border border-shadow-slate text-starlight-blue">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-cyber-teal">{title || "Notification"}</h3>
          <button onClick={onClose} className="text-starlight-blue hover:text-nebula-aqua transition-colors">
            {/* Close Icon SVG */}
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>
        <p className="text-starlight-blue/90 leading-relaxed mb-6">{message}</p>
        <button
          onClick={onClose}
          className="w-full bg-cyber-teal hover:bg-nebula-aqua text-deep-space-blue font-bold py-2.5 px-4 rounded-md shadow-md hover:shadow-cyber-teal/40 transition-all duration-300"
        >
          Close
        </button>
      </div>
    </div>
  );
};