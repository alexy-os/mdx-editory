import React, { useState, useRef, useEffect } from 'react';
import { cn } from '../utils';

interface DropdownItem {
  id: string;
  label: string;
  onClick: () => void;
  icon?: React.ReactNode;
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'danger';
  disabled?: boolean;
  title?: string;
}

interface DropdownProps {
  trigger: React.ReactNode;
  items: DropdownItem[];
  align?: 'left' | 'right';
  className?: string;
  isDarkMode?: boolean;
}

export function Dropdown({ 
  trigger, 
  items, 
  align = 'right', 
  className,
  isDarkMode = false 
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const getVariantStyles = (variant: DropdownItem['variant'] = 'default') => {
    const variants = {
      default: 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700',
      primary: 'text-blue-700 dark:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/20',
      success: 'text-green-700 dark:text-green-300 hover:bg-green-50 dark:hover:bg-green-900/20',
      warning: 'text-orange-700 dark:text-orange-300 hover:bg-orange-50 dark:hover:bg-orange-900/20',
      danger: 'text-red-700 dark:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/20'
    };
    return variants[variant];
  };

  const handleItemClick = (item: DropdownItem) => {
    if (!item.disabled) {
      item.onClick();
      setIsOpen(false);
    }
  };

  return (
    <div className={cn('relative', className)} ref={dropdownRef}>
      <div onClick={() => setIsOpen(!isOpen)} className="cursor-pointer">
        {trigger}
      </div>

      {isOpen && (
        <div className={cn(
          'absolute top-full mt-2 z-50',
          'min-w-48 py-2 rounded-lg shadow-lg',
          'bg-white dark:bg-gray-800',
          'border border-gray-200 dark:border-gray-700',
          align === 'right' ? 'right-0' : 'left-0'
        )}>
          {items.map((item) => (
            <button
              key={item.id}
              onClick={() => handleItemClick(item)}
              disabled={item.disabled}
              title={item.title}
              className={cn(
                'w-full px-4 py-2 text-sm text-left',
                'flex items-center gap-3',
                'transition-colors duration-150',
                item.disabled 
                  ? 'opacity-50 cursor-not-allowed'
                  : getVariantStyles(item.variant)
              )}
            >
              {item.icon && (
                <span className="flex-shrink-0">
                  {item.icon}
                </span>
              )}
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
} 