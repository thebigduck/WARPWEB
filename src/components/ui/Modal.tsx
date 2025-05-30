import React from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  message: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, message }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-[100] p-4">
      <div className="bg-[#2D6A4F] p-6 sm:p-8 rounded-lg shadow-2xl max-w-md w-full border border-[#1B4332] text-[#D8F3DC]"> {/* comet-grey, shadow-slate, starlight-blue */}
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-[#74C69D]">{title || "Notification"}</h3> {/* cyber-teal */}
          <button onClick={onClose} className="text-[#D8F3DC] hover:text-[#95D5B2] transition-colors"> {/* starlight-blue, nebula-aqua */}
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>
        <p className="text-[#D8F3DC]/90 leading-relaxed mb-6">{message}</p> {/* starlight-blue */}
        <button
          onClick={onClose}
          className="w-full bg-[#74C69D] hover:bg-[#95D5B2] text-[#081C15] font-bold py-2.5 px-4 rounded-md shadow-md hover:shadow-[#74C69D]/40 transition-all duration-300" /* cyber-teal, nebula-aqua, deep-space-blue */
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;
