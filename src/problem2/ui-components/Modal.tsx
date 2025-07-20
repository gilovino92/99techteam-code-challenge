import type { ReactNode } from "react";
import { useEffect } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  showCloseButton?: boolean;
  closeOnEscape?: boolean;
}

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  showCloseButton = true,
  closeOnEscape = true,
}: ModalProps) {
  // Handle escape key to close modal
  useEffect(() => {
    if (isOpen) {
      // Prevent body scroll when modal is open
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen, closeOnEscape, onClose]);

  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 z-50 overflow-y-auto flex items-center justify-center'>
      {/* Overlay */}
      <div className='fixed inset-0 bg-black/70 transition-opacity' />

      {/* Modal Container */}
      <div className='max-h-[500px] overflow-y-auto bg-gray-800 rounded-2xl shadow-xl z-2 relative w-full max-w-lg overflow-x-hidden'>
        {/* Header */}
       { (title || showCloseButton) && <div className='flex items-center justify-between p-4 border-b border-gray-700 sticky top-0 left-0 right-0 z-10 bg-gray-800'>
          {title && (
            <h2 className='text-xl font-semibold text-white'>{title}</h2>
          )}
          {
            showCloseButton && (
              <button
                onClick={onClose}
                className='text-white hover:text-gray-300 transition-colors cursor-pointer'
              >
                <i className='fas fa-times'></i>
              </button>
            )
          }
        </div>}

        {/* Content */}
        <div className='p-6'>{children}</div>
      </div>
    </div>
  );
}

