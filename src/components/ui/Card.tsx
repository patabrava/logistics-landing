/**
 * Card Component
 * Generic card wrapper with various styles and layouts
 */

'use client';

import React, { forwardRef, HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';
import Image from 'next/image';

// Card variant styles
const cardVariants = {
  variant: {
    default: 'bg-white shadow-sm',
    elevated: 'bg-white shadow-md',
    outlined: 'bg-white border-2 border-ink-200 shadow-none',
    filled: 'bg-ink-50 shadow-none',
    brand: 'bg-brand-50 shadow-sm',
    gradient: 'bg-gradient-to-br from-brand-50 to-navy-50 shadow-sm',
    glass: 'bg-white/80 backdrop-blur-sm border border-white/20 shadow-lg',
    navy: 'bg-navy-900 text-white shadow-sm',
  },
  padding: {
    none: 'p-0',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
    xl: 'p-10',
  },
  rounded: {
    none: 'rounded-none',
    sm: 'rounded-sm',
    md: 'rounded-lg',
    lg: 'rounded-xl',
    xl: 'rounded-2xl',
    full: 'rounded-full',
  },
} as const;

// Base card styles
const baseStyles = [
  'relative',
  'transition-all duration-300 ease-out',
].join(' ');

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: keyof typeof cardVariants.variant;
  padding?: keyof typeof cardVariants.padding;
  rounded?: keyof typeof cardVariants.rounded;
  hoverable?: boolean;
  clickable?: boolean;
  children: React.ReactNode;
}

/**
 * Main Card component
 */
export const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      variant = 'default',
      padding = 'md',
      rounded = 'md',
      hoverable = false,
      clickable = false,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const hoverStyles = hoverable || clickable ? 'hover:shadow-lg hover:-translate-y-1' : '';
    const clickableStyles = clickable ? 'cursor-pointer focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2' : '';

    return (
      <div
        ref={ref}
        className={cn(
          baseStyles,
          cardVariants.variant[variant],
          cardVariants.padding[padding],
          cardVariants.rounded[rounded],
          hoverStyles,
          clickableStyles,
          className
        )}
        tabIndex={clickable ? 0 : undefined}
        role={clickable ? 'button' : undefined}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';

/**
 * Card Header - For card titles and actions
 */
export interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {
  title?: string;
  subtitle?: string;
  action?: React.ReactNode;
  children?: React.ReactNode;
}

export const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ title, subtitle, action, children, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('flex items-start justify-between mb-4', className)}
        {...props}
      >
        <div className="flex-1">
          {title && (
            <h3 className="text-lg font-semibold text-ink-900 mb-1">
              {title}
            </h3>
          )}
          {subtitle && (
            <p className="text-sm text-ink-600">
              {subtitle}
            </p>
          )}
          {children}
        </div>
        {action && (
          <div className="ml-4 flex-shrink-0">
            {action}
          </div>
        )}
      </div>
    );
  }
);

CardHeader.displayName = 'CardHeader';

/**
 * Card Content - Main content area
 */
export interface CardContentProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const CardContent = forwardRef<HTMLDivElement, CardContentProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('text-ink-700', className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

CardContent.displayName = 'CardContent';

/**
 * Card Footer - For actions and additional info
 */
export interface CardFooterProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  divider?: boolean;
}

export const CardFooter = forwardRef<HTMLDivElement, CardFooterProps>(
  ({ children, divider = true, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'mt-4',
          divider && 'pt-4 border-t border-ink-200',
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

CardFooter.displayName = 'CardFooter';

/**
 * Card Image - Optimized image container
 */
export interface CardImageProps extends HTMLAttributes<HTMLDivElement> {
  src: string;
  alt: string;
  aspectRatio?: 'square' | 'video' | 'photo' | 'wide';
  objectFit?: 'cover' | 'contain' | 'fill';
}

export const CardImage = forwardRef<HTMLDivElement, CardImageProps>(
  ({ src, alt, aspectRatio = 'photo', objectFit = 'cover', className, ...props }, ref) => {
    const aspectRatioStyles = {
      square: 'aspect-square',
      video: 'aspect-video',
      photo: 'aspect-[4/3]',
      wide: 'aspect-[16/9]',
    };

    const objectFitStyles = {
      cover: 'object-cover',
      contain: 'object-contain',
      fill: 'object-fill',
    };

    return (
      <div
        ref={ref}
        className={cn(
          'relative overflow-hidden bg-ink-100',
          aspectRatioStyles[aspectRatio],
          className
        )}
        {...props}
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className={cn(
            'h-full w-full',
            objectFitStyles[objectFit]
          )}
          priority={false}
        />
      </div>
    );
  }
);

CardImage.displayName = 'CardImage';

/**
 * Service Card - Specialized card for services
 */
export interface ServiceCardProps extends Omit<CardProps, 'children'> {
  icon: React.ReactNode;
  title: string;
  description: string;
  features?: string[];
  cta?: {
    text: string;
    onClick: () => void;
  };
}

export const ServiceCard = forwardRef<HTMLDivElement, ServiceCardProps>(
  ({ icon, title, description, features, cta, ...cardProps }, ref) => {
    return (
      <Card
        ref={ref}
        hoverable
        clickable={!!cta?.onClick}
        onClick={cta?.onClick}
        {...cardProps}
      >
        <CardHeader>
          <div className="flex items-center space-x-3">
            <div className="flex-shrink-0 p-2 bg-brand-100 rounded-lg text-brand-600">
              {icon}
            </div>
            <div>
              <h3 className="text-lg font-semibold text-ink-900">{title}</h3>
            </div>
          </div>
        </CardHeader>
        
        <CardContent>
          <p className="text-ink-600 mb-4">{description}</p>
          
          {features && features.length > 0 && (
            <ul className="space-y-2">
              {features.map((feature, index) => (
                <li key={index} className="flex items-center text-sm text-ink-600">
                  <svg
                    className="mr-2 h-4 w-4 text-green-500 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {feature}
                </li>
              ))}
            </ul>
          )}
        </CardContent>
        
        {cta && (
          <CardFooter>
            <button className="text-brand-600 hover:text-brand-700 font-medium text-sm transition-colors">
              {cta.text} →
            </button>
          </CardFooter>
        )}
      </Card>
    );
  }
);

ServiceCard.displayName = 'ServiceCard';

/**
 * Testimonial Card - Specialized card for testimonials
 */
export interface TestimonialCardProps extends Omit<CardProps, 'children'> {
  quote: string;
  author: {
    name: string;
    title: string;
    company: string;
    avatar?: string;
  };
  rating?: number;
}

export const TestimonialCard = forwardRef<HTMLDivElement, TestimonialCardProps>(
  ({ quote, author, rating, ...cardProps }, ref) => {
    return (
      <Card ref={ref} variant="elevated" {...cardProps}>
        <CardContent>
          {rating && (
            <div className="flex items-center mb-4">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={cn(
                    'h-5 w-5',
                    i < rating ? 'text-yellow-400' : 'text-ink-300'
                  )}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
          )}
          
          <blockquote className="text-ink-700 mb-4 italic">
            &ldquo;{quote}&rdquo;
          </blockquote>
          
          <div className="flex items-center">
            {author.avatar && (
              <Image
                src={author.avatar}
                alt={author.name}
                width={40}
                height={40}
                className="h-10 w-10 rounded-full mr-3 object-cover"
                priority={false}
              />
            )}
            <div>
              <div className="font-medium text-ink-900">{author.name}</div>
              <div className="text-sm text-ink-600">
                {author.title} at {author.company}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }
);

TestimonialCard.displayName = 'TestimonialCard';

export default Card;
