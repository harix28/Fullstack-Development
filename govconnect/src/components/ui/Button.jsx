import React from 'react';
import { cn } from '../../utils/cn';

const variants = {
  primary: 'bg-brand-navy text-white hover:bg-brand-navy/90',
  secondary: 'bg-brand-teal text-white hover:bg-brand-teal/90',
  outline: 'border border-brand-navy text-brand-navy hover:bg-brand-light',
  ghost: 'text-brand-navy hover:bg-brand-light',
};

const sizes = {
  sm: 'h-8 px-3 text-sm',
  md: 'h-10 px-4 py-2',
  lg: 'h-12 px-6 text-lg',
};

export const Button = React.forwardRef(
  ({ className, variant = 'primary', size = 'md', children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal disabled:pointer-events-none disabled:opacity-50',
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
