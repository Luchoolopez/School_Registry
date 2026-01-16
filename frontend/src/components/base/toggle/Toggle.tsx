import React from 'react';

type Size = 'sm' | 'md' | 'lg';

interface ToggleProps {
  checked?: boolean;
  onChange?: (next: boolean) => void;
  label?: string;
  size?: Size;
  className?: string;
  isThemeToggle?: boolean;
}

const sizeMap: Record<Size, { track: string; knob: string; translate: string }> = {
  sm: { track: 'w-10 h-6', knob: 'w-4 h-4', translate: 'translate-x-4' },
  md: { track: 'w-14 h-8', knob: 'w-6 h-6', translate: 'translate-x-6' },
  lg: { track: 'w-16 h-9', knob: 'w-7 h-7', translate: 'translate-x-7' },
};

export const Toggle: React.FC<ToggleProps> = ({ 
  checked = false, 
  onChange, 
  label, 
  size = 'md', 
  className,
  isThemeToggle = false
}) => {
  const sizes = sizeMap[size];

  const handleClick = () => {
    if (onChange) onChange(!checked);
  };

  const renderIcon = () => {
    if (!isThemeToggle) return null;

    return (
      <span className={`material-symbols-outlined select-none text-[16px] leading-none transition-all duration-300 ${
        checked ? 'text-indigo-500 scale-100' : 'text-amber-500 scale-100'
      }`}>
        {checked ? 'dark_mode' : 'light_mode'}
      </span>
    );
  };

  return (
    <div className={`flex items-center gap-3 ${className || ''}`}>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={handleClick}
        className={`
          relative inline-flex items-center rounded-full transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary
          ${sizes.track}
          ${checked 
            ? 'bg-slate-700 border-2 border-slate-600' 
            : 'bg-indigo-100 border-2 border-indigo-200'
          }
        `}
      >
        <span className="sr-only">{label || 'Toggle theme'}</span>
        
        <span
          className={`
            absolute left-0.5 top-0.5 bottom-0.5 flex items-center justify-center bg-white rounded-full shadow-sm transform transition-transform duration-300 ease-in-out
            ${sizes.knob}
            ${checked ? sizes.translate : 'translate-x-0'}
          `}
        >
          {renderIcon()}
        </span>
      </button>

      {label && (
        <span className="font-medium text-slate-700 dark:text-slate-200 text-sm cursor-pointer" onClick={handleClick}>
          {label}
        </span>
      )}
    </div>
  );
};

export default Toggle;