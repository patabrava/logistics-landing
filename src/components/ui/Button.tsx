/**
 * Button Component
 * Reusable button component with multiple variants and sizes
 */

'use client';

import React, { forwardRef, ButtonHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

// Button variant styles
const buttonVariants = {
  variant: {
    primary: 'bg-brand-600 text-white hover:bg-brand-700 focus:ring-brand-500',
    secondary: 'bg-white text-brand-600 border border-brand-600 hover:bg-brand-50 focus:ring-brand-500',
    tertiary: 'bg-transparent text-brand-600 hover:bg-brand-50 focus:ring-brand-500',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
    success: 'bg-green-600 text-white hover:bg-green-700 focus:ring-green-500',
    warning: 'bg-yellow-500 text-white hover:bg-yellow-600 focus:ring-yellow-400',
    ghost: 'bg-transparent text-ink-600 hover:bg-ink-100 focus:ring-ink-500',
    link: 'bg-transparent text-brand-600 hover:text-brand-700 underline-offset-4 hover:underline focus:ring-0',
  },
  size: {
    xs: 'px-2 py-1 text-xs',
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base',
    xl: 'px-8 py-4 text-lg',
  },
  width: {
    auto: 'w-auto',
    full: 'w-full',
    fit: 'w-fit',
  },
} as const;

// Base button styles
const baseStyles = [
  'inline-flex items-center justify-center',
  'font-medium rounded-lg',
  'transition-all duration-200 ease-in-out',
  'focus:outline-none focus:ring-2 focus:ring-offset-2',
  'disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none',
  'active:scale-95',
].join(' ');

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof buttonVariants.variant;
  size?: keyof typeof buttonVariants.size;
  width?: keyof typeof buttonVariants.width;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  children: React.ReactNode;
}

/**
 * Button component with various styles and states
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      width = 'auto',
      isLoading = false,
      leftIcon,
      rightIcon,
      children,
      className,
      disabled,
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || isLoading;

    return (
      <button
        ref={ref}
        className={cn(
          baseStyles,
          buttonVariants.variant[variant],
          buttonVariants.size[size],
          buttonVariants.width[width],
          className
        )}
        disabled={isDisabled}
        {...props}
      >
        {isLoading && (
          <svg
            className="mr-2 h-4 w-4 animate-spin"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        
        {!isLoading && leftIcon && (
          <span className="mr-2 flex-shrink-0">{leftIcon}</span>
        )}
        
        <span className={cn(isLoading && 'opacity-70')}>{children}</span>
        
        {!isLoading && rightIcon && (
          <span className="ml-2 flex-shrink-0">{rightIcon}</span>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';

/**
 * Icon Button - Special variant for icon-only buttons
 */
export interface IconButtonProps extends Omit<ButtonProps, 'children' | 'leftIcon' | 'rightIcon'> {
  icon: React.ReactNode;
  'aria-label': string;
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ icon, size = 'md', variant = 'ghost', className, ...props }, ref) => {
    const iconSizes = {
      xs: 'h-3 w-3',
      sm: 'h-4 w-4',
      md: 'h-5 w-5',
      lg: 'h-6 w-6',
      xl: 'h-8 w-8',
    };

    return (
      <Button
        ref={ref}
        variant={variant}
        size={size}
        className={cn('p-2', className)}
        {...props}
      >
        <span className={iconSizes[size]}>{icon}</span>
      </Button>
    );
  }
);

IconButton.displayName = 'IconButton';

/**
 * Button Group - For grouping multiple buttons
 */
export interface ButtonGroupProps {
  children: React.ReactNode;
  className?: string;
  orientation?: 'horizontal' | 'vertical';
  size?: keyof typeof buttonVariants.size;
  variant?: keyof typeof buttonVariants.variant;
}

export const ButtonGroup: React.FC<ButtonGroupProps> = ({
  children,
  className,
  orientation = 'horizontal',
  size,
  variant,
}) => {
  const groupStyles = orientation === 'horizontal' 
    ? 'flex flex-row' 
    : 'flex flex-col';

  // Clone children to pass down size and variant if specified
  const clonedChildren = React.Children.map(children, (child, index) => {
    if (React.isValidElement<ButtonProps>(child) && child.type === Button) {
      const isFirst = index === 0;
      const isLast = index === React.Children.count(children) - 1;
      
      let groupClassName = '';
      if (orientation === 'horizontal') {
        groupClassName = cn(
          'rounded-none',
          isFirst && 'rounded-l-lg',
          isLast && 'rounded-r-lg',
          !isLast && 'border-r-0'
        );
      } else {
        groupClassName = cn(
          'rounded-none',
          isFirst && 'rounded-t-lg',
          isLast && 'rounded-b-lg',
          !isLast && 'border-b-0'
        );
      }

      return React.cloneElement(child, {
        size: size || child.props.size,
        variant: variant || child.props.variant,
        className: cn(child.props.className, groupClassName),
      } as Partial<ButtonProps>);
    }
    return child;
  });

  return (
    <div className={cn(groupStyles, className)}>
      {clonedChildren}
    </div>
  );
};

ButtonGroup.displayName = 'ButtonGroup';

export default Button;
