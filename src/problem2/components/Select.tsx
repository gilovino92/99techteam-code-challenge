import { useState, useEffect, useRef } from "react";
import type { ReactNode } from "react";

interface SelectOption {
  value: string;
  label: string;
  icon?: ReactNode;
  description?: string;
  disabled?: boolean;
}

interface SelectProps {
  options: SelectOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  dropdownClassName?: string;
  optionClassName?: string;
  renderOption?: (option: SelectOption) => ReactNode;
  renderSelected?: (option: SelectOption) => ReactNode;
}

export default function Select({
  options,
  value,
  onChange,
  placeholder = "Select an option",
  disabled = false,
  className = "",
  dropdownClassName = "",
  optionClassName = "",
  renderOption,
  renderSelected
}: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find(option => option.value === value);

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // Handle escape key to close dropdown
  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscapeKey);
    }

    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [isOpen]);

  const handleToggle = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
    }
  };

  const handleOptionClick = (optionValue: string) => {
    const option = options.find(opt => opt.value === optionValue);
    if (option && !option.disabled) {
      onChange(optionValue);
      setIsOpen(false);
    }
  };

  const defaultRenderSelected = (option: SelectOption) => (
    <div className="flex items-center gap-2">
      {option.icon && <span>{option.icon}</span>}
      <span className="font-semibold">{option.label}</span>
    </div>
  );

  const defaultRenderOption = (option: SelectOption) => (
    <div className="flex items-center gap-3 w-full">
      {option.icon && (
        <div className="flex-shrink-0">
          {option.icon}
        </div>
      )}
      <div className="flex-1">
        <div className="text-white font-medium">{option.label}</div>
        {option.description && (
          <div className="text-gray-400 text-sm">{option.description}</div>
        )}
      </div>
    </div>
  );

  return (
    <div className={`relative ${className}`} ref={selectRef}>
      {/* Select Trigger */}
      <button
        type="button"
        onClick={handleToggle}
        disabled={disabled}
        className={`
          flex items-center justify-between w-full px-3 py-2 
          bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors
          text-white border border-gray-600
          ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
          ${isOpen ? 'ring-2 ring-blue-500' : ''}
        `}
      >
        <div className="flex items-center gap-2 flex-1">
          {selectedOption ? (
            renderSelected ? renderSelected(selectedOption) : defaultRenderSelected(selectedOption)
          ) : (
            <span className="text-gray-400">{placeholder}</span>
          )}
        </div>
        
        {/* Dropdown Arrow */}
        <svg
          className={`w-4 h-4 text-gray-400 transition-transform ${
            isOpen ? 'transform rotate-180' : ''
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {/* Dropdown Options */}
      {isOpen && (
        <div
          className={`
            absolute top-full left-0 mt-1 w-full
            bg-gray-800 border border-gray-600 rounded-lg shadow-lg
            z-20 max-h-60 overflow-y-auto
            ${dropdownClassName}
          `}
        >
          {options.map((option, index) => (
            <button
              key={option.value}
              type="button"
              onClick={() => handleOptionClick(option.value)}
              disabled={option.disabled}
              className={`
                w-full px-4 py-3 text-left hover:bg-gray-700 transition-colors
                ${index === 0 ? 'rounded-t-lg' : ''}
                ${index === options.length - 1 ? 'rounded-b-lg' : ''}
                ${option.disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                ${option.value === value ? 'bg-gray-700' : ''}
                ${optionClassName}
              `}
            >
              {renderOption ? renderOption(option) : defaultRenderOption(option)}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// Token-specific Select component
interface TokenSelectProps {
  tokens: Array<{
    symbol: string;
    name: string;
    balance?: string;
    icon?: ReactNode;
  }>;
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export function TokenSelect({ tokens, value, onChange, className }: TokenSelectProps) {
  const options: SelectOption[] = tokens.map(token => ({
    value: token.symbol,
    label: token.symbol,
    description: token.name,
    icon: token.icon || (
      <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-xs">
        {token.symbol.charAt(0)}
      </div>
    )
  }));

  const renderSelected = (option: SelectOption) => (
    <div className="flex items-center gap-2">
      {option.icon}
      <span className="font-semibold">{option.label}</span>
    </div>
  );

  return (
    <Select
      options={options}
      value={value}
      onChange={onChange}
      className={className}
      renderSelected={renderSelected}
    />
  );
}