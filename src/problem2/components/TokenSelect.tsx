import { useState, useEffect } from "react";
import type { ReactNode } from "react";
import type { TokenPrice } from "../types/token.type";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  size?: "sm" | "md" | "lg" | "xl" | "full";
  showCloseButton?: boolean;
  closeOnOverlayClick?: boolean;
  closeOnEscape?: boolean;
  className?: string;
}

function Modal({
  isOpen,
  onClose,
  title,
  children,
  showCloseButton = true,
  closeOnOverlayClick = true,
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
        <div className='flex items-center justify-between p-4 border-b border-gray-700 sticky top-0 left-0 right-0 z-10 bg-gray-800'>
          {title && (
            <h2 className='text-xl font-semibold text-white'>{title}</h2>
          )}
          <button
            onClick={onClose}
            className='text-white hover:text-gray-300 transition-colors cursor-pointer'
          >
            <i className='fas fa-times'></i>
          </button>
        </div>

        {/* Content */}
        <div className='p-6'>{children}</div>
      </div>
    </div>
  );
}

interface TokenSelectModalProps {
  tokens: TokenPrice[];
  selectedToken: string;
  onTokenSelect: (token: string) => void;
  buttonText?: string;
}

export function TokenSelectModal({
  tokens,
  selectedToken,
  onTokenSelect,
  buttonText = "Select Token",
}: TokenSelectModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleTokenSelect = (tokenSymbol: string) => {
    onTokenSelect(tokenSymbol);
    setIsOpen(false);
  };

  const selectedTokenData = tokens.find(
    (token) => token.currency === selectedToken
  );

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className='flex items-center gap-2 bg-gray-700 hover:bg-gray-600 rounded-lg px-3 py-2 transition-colors text-white'
      >
        {selectedTokenData ? (
          <>
            {selectedTokenData.icon || (
              <div className='w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-xs'>
                {selectedTokenData.currency.charAt(0)}
              </div>
            )}
            <span className='font-semibold'>{selectedTokenData.currency}</span>
          </>
        ) : (
          <span className='text-gray-400'>{buttonText}</span>
        )}
      </button>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title='Select Token'
        size='md'
      >
        <div className='space-y-2'>
          {tokens.map((token) => (
            <button
              key={token.currency}
              onClick={() => handleTokenSelect(token.currency)}
              className={`
                w-full flex items-center gap-3 p-3 rounded-lg transition-colors text-left
                hover:bg-gray-700
                ${
                  token.currency === selectedToken
                    ? "bg-gray-700 ring-2 ring-blue-500"
                    : ""
                }
              `}
            >
              {token.icon || (
                <div className='w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm'>
                  {token.currency.charAt(0)}
                </div>
              )}
              <div className='flex-1'>
                <div className='text-white font-medium'>{token.currency}</div>
              </div>
            </button>
          ))}
        </div>
      </Modal>
    </>
  );
}

export default Modal;
