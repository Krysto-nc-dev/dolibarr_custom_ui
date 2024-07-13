import React from 'react';
import { X } from 'lucide-react';

const Modal = ({ closeModal, children }) => {
  const handleModalClick = (e) => {
    e.stopPropagation(); // Prevent click event from propagating to parent div
  };

  return (
    <div onClick={closeModal} className="fixed z-50 top-0 left-0 w-full h-full bg-gray-800/95 flex justify-center items-center">
      <div className="min-h-[500px] min-w-[500px] relative bg-gray-500" onClick={handleModalClick}>
        <button onClick={closeModal} className='absolute top-2 right-1 w-8 h-8 flex items-center justify-center text-sm text-red-600 hover:text-red-800'>
          <X />
        </button>
        <div>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
