/**
 * LoadingSpinner Component
 * Loading indicators for async actions with various styles and sizes
 */

'use client';

import React, { forwardRef, HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

// Spinner variant styles
const spinnerVariants = {
  size: {
    xs: 'h-3 w-3',
    sm: 'h-4 w-4',
    md: 'h-6 w-6',
    lg: 'h-8 w-8',
    xl: 'h-12 w-12',
    '2xl': 'h-16 w-16',
  },
  variant: {
    spinner: '', // Default circular spinner
    dots: '', // Three dots animation
    pulse: '', // Pulsing animation
    bars: '', // Bars animation
    circle: '', // Circle with progress
  },
  color: {
    primary: 'text-brand-600',
    secondary: 'text-ink-600',
    success: 'text-green-600',
    warning: 'text-yellow-500',
    danger: 'text-red-600',
    white: 'text-white',
  },
} as const;

export interface LoadingSpinnerProps extends HTMLAttributes<HTMLDivElement> {
  size?: keyof typeof spinnerVariants.size;
  variant?: keyof typeof spinnerVariants.variant;
  color?: keyof typeof spinnerVariants.color;
  text?: string;
  center?: boolean;
}

/**
 * Main LoadingSpinner component
 */
export const LoadingSpinner = forwardRef<HTMLDivElement, LoadingSpinnerProps>(
  (
    {
      size = 'md',
      variant = 'spinner',
      color = 'primary',
      text,
      center = false,
      className,
      ...props
    },
    ref
  ) => {
    const containerClass = center ? 'flex items-center justify-center' : 'inline-flex items-center';

    const renderSpinner = () => {
      switch (variant) {
        case 'spinner':
          return (
            <svg
              className={cn(
                'animate-spin',
                spinnerVariants.size[size],
                spinnerVariants.color[color]
              )}
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
          );

        case 'dots':
          return (
            <div className="flex space-x-1">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className={cn(
                    'rounded-full animate-pulse',
                    size === 'xs' && 'h-1 w-1',
                    size === 'sm' && 'h-1.5 w-1.5',
                    size === 'md' && 'h-2 w-2',
                    size === 'lg' && 'h-3 w-3',
                    size === 'xl' && 'h-4 w-4',
                    size === '2xl' && 'h-6 w-6',
                    color === 'primary' && 'bg-brand-600',
                    color === 'secondary' && 'bg-ink-600',
                    color === 'success' && 'bg-green-600',
                    color === 'warning' && 'bg-yellow-500',
                    color === 'danger' && 'bg-red-600',
                    color === 'white' && 'bg-white'
                  )}
                  style={{
                    animationDelay: `${i * 0.2}s`,
                    animationDuration: '1.4s',
                  }}
                />
              ))}
            </div>
          );

        case 'pulse':
          return (
            <div
              className={cn(
                'rounded-full animate-pulse',
                spinnerVariants.size[size],
                color === 'primary' && 'bg-brand-600',
                color === 'secondary' && 'bg-ink-600',
                color === 'success' && 'bg-green-600',
                color === 'warning' && 'bg-yellow-500',
                color === 'danger' && 'bg-red-600',
                color === 'white' && 'bg-white'
              )}
            />
          );

        case 'bars':
          return (
            <div className="flex space-x-1">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className={cn(
                    'animate-bounce rounded-sm',
                    size === 'xs' && 'h-3 w-0.5',
                    size === 'sm' && 'h-4 w-1',
                    size === 'md' && 'h-6 w-1',
                    size === 'lg' && 'h-8 w-1.5',
                    size === 'xl' && 'h-12 w-2',
                    size === '2xl' && 'h-16 w-3',
                    color === 'primary' && 'bg-brand-600',
                    color === 'secondary' && 'bg-ink-600',
                    color === 'success' && 'bg-green-600',
                    color === 'warning' && 'bg-yellow-500',
                    color === 'danger' && 'bg-red-600',
                    color === 'white' && 'bg-white'
                  )}
                  style={{
                    animationDelay: `${i * 0.1}s`,
                    animationDuration: '0.8s',
                  }}
                />
              ))}
            </div>
          );

        case 'circle':
          return (
            <div className="relative">
              <svg
                className={cn(
                  'animate-spin',
                  spinnerVariants.size[size]
                )}
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
                <circle
                  className={cn(spinnerVariants.color[color])}
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                  strokeDasharray="60"
                  strokeDashoffset="20"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          );

        default:
          return null;
      }
    };

    return (
      <div
        ref={ref}
        className={cn(containerClass, className)}
        role="status"
        aria-label={text || 'Loading'}
        {...props}
      >
        {renderSpinner()}
        {text && (
          <span
            className={cn(
              'ml-2 text-sm font-medium',
              spinnerVariants.color[color]
            )}
          >
            {text}
          </span>
        )}
        <span className="sr-only">{text || 'Loading...'}</span>
      </div>
    );
  }
);

LoadingSpinner.displayName = 'LoadingSpinner';

/**
 * Page Loading Spinner - Full page overlay
 */
export interface PageLoadingProps {
  text?: string;
  backdrop?: boolean;
}

export const PageLoading: React.FC<PageLoadingProps> = ({
  text = 'Loading...',
  backdrop = true,
}) => {
  return (
    <div
      className={cn(
        'fixed inset-0 z-50 flex items-center justify-center',
        backdrop && 'bg-white/80 backdrop-blur-sm'
      )}
    >
      <div className="text-center">
        <LoadingSpinner size="xl" variant="spinner" color="primary" />
        <p className="mt-4 text-lg font-medium text-ink-700">{text}</p>
      </div>
    </div>
  );
};

PageLoading.displayName = 'PageLoading';

/**
 * Button Loading Spinner - For use inside buttons
 */
export interface ButtonLoadingProps {
  size?: 'sm' | 'md';
  color?: 'white' | 'primary';
}

export const ButtonLoading: React.FC<ButtonLoadingProps> = ({
  size = 'sm',
  color = 'white',
}) => {
  return (
    <LoadingSpinner
      size={size}
      variant="spinner"
      color={color}
      className="mr-2"
    />
  );
};

ButtonLoading.displayName = 'ButtonLoading';

/**
 * Content Loading Skeleton - For content placeholders
 */
export interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  lines?: number;
  avatar?: boolean;
  className?: string;
}

export const Skeleton = forwardRef<HTMLDivElement, SkeletonProps>(
  ({ lines = 3, avatar = false, className, ...props }, ref) => {
    return (
      <div ref={ref} className={cn('animate-pulse', className)} {...props}>
        {avatar && (
          <div className="flex items-center space-x-4 mb-4">
            <div className="rounded-full bg-ink-200 h-10 w-10" />
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-ink-200 rounded w-3/4" />
              <div className="h-3 bg-ink-200 rounded w-1/2" />
            </div>
          </div>
        )}
        
        <div className="space-y-3">
          {Array.from({ length: lines }, (_, i) => (
            <div
              key={i}
              className={cn(
                'h-4 bg-ink-200 rounded',
                i === lines - 1 ? 'w-2/3' : 'w-full'
              )}
            />
          ))}
        </div>
      </div>
    );
  }
);

Skeleton.displayName = 'Skeleton';

/**
 * Card Loading Skeleton - For card placeholders
 */
export const CardSkeleton: React.FC = () => {
  return (
    <div className="border border-ink-200 rounded-lg p-6 animate-pulse">
      <div className="flex items-center space-x-4 mb-4">
        <div className="rounded-lg bg-ink-200 h-12 w-12" />
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-ink-200 rounded w-3/4" />
          <div className="h-3 bg-ink-200 rounded w-1/2" />
        </div>
      </div>
      
      <div className="space-y-3">
        <div className="h-4 bg-ink-200 rounded" />
        <div className="h-4 bg-ink-200 rounded" />
        <div className="h-4 bg-ink-200 rounded w-2/3" />
      </div>
      
      <div className="mt-6">
        <div className="h-8 bg-ink-200 rounded w-24" />
      </div>
    </div>
  );
};

CardSkeleton.displayName = 'CardSkeleton';

/**
 * Loading States Hook - For managing loading states
 */
export const useLoadingState = (initialState = false) => {
  const [isLoading, setIsLoading] = React.useState(initialState);

  const startLoading = () => setIsLoading(true);
  const stopLoading = () => setIsLoading(false);
  const toggleLoading = () => setIsLoading(prev => !prev);

  return {
    isLoading,
    startLoading,
    stopLoading,
    toggleLoading,
  };
};

/**
 * Async Loading Wrapper - Wraps async operations with loading states
 */
export interface AsyncWrapperProps {
  children: React.ReactNode;
  isLoading: boolean;
  fallback?: React.ReactNode;
  error?: string | null;
  errorFallback?: React.ReactNode;
}

export const AsyncWrapper: React.FC<AsyncWrapperProps> = ({
  children,
  isLoading,
  fallback,
  error,
  errorFallback,
}) => {
  if (error) {
    if (errorFallback) {
      return <>{errorFallback}</>;
    }
    
    return (
      <div className="text-center py-8">
        <div className="text-red-600 mb-2">
          <svg className="mx-auto h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z"
            />
          </svg>
        </div>
        <p className="text-ink-600">{error}</p>
      </div>
    );
  }

  if (isLoading) {
    return fallback ? (
      <>{fallback}</>
    ) : (
      <div className="flex justify-center py-8">
        <LoadingSpinner size="lg" text="Loading..." />
      </div>
    );
  }

  return <>{children}</>;
};

AsyncWrapper.displayName = 'AsyncWrapper';

export default LoadingSpinner;
