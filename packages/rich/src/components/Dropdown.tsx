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
}

export function Dropdown({ 
  trigger, 
  items, 
  align = 'right', 
  className
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
      default: 'text-secondary-foreground hover:bg-accent hover:text-white',
      primary: 'text-primary hover:bg-accent/10 dark:hover:bg-accent',
      success: 'text-primary hover:bg-accent/10 dark:hover:bg-accent',
      warning: 'text-secondary-foreground hover:bg-secondary',
      danger: 'text-destructive hover:bg-destructive/10'
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
          'bg-popover',
          'border border-border',
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