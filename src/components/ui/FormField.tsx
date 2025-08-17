/**
 * FormField Component
 * Form input wrapper with labels, validation, and error states
 */

'use client';

import React, { forwardRef, InputHTMLAttributes, TextareaHTMLAttributes, SelectHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

// Field variant styles
const fieldVariants = {
  size: {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-3 py-2 text-sm',
    lg: 'px-4 py-3 text-base',
  },
  state: {
    default: 'border-ink-300 focus:border-brand-500 focus:ring-brand-500',
    error: 'border-red-500 focus:border-red-500 focus:ring-red-500 bg-red-50',
    success: 'border-green-500 focus:border-green-500 focus:ring-green-500 bg-green-50',
    disabled: 'border-ink-200 bg-ink-50 text-ink-400 cursor-not-allowed',
  },
} as const;

// Base field styles
const baseFieldStyles = [
  'block w-full rounded-lg border',
  'transition-colors duration-200',
  'focus:outline-none focus:ring-2 focus:ring-offset-2',
  'placeholder:text-ink-400',
].join(' ');

// Base FormField wrapper
export interface FormFieldProps {
  label?: string;
  description?: string;
  error?: string;
  success?: string;
  required?: boolean;
  className?: string;
  children: React.ReactNode;
}

export const FormField = forwardRef<HTMLDivElement, FormFieldProps>(
  ({ label, description, error, success, required, className, children }, ref) => {
    const fieldId = React.useId();

    return (
      <div ref={ref} className={cn('space-y-1', className)}>
        {label && (
          <label
            htmlFor={fieldId}
            className="block text-sm font-medium text-ink-700"
          >
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}
        
        {description && (
          <p className="text-xs text-ink-500">{description}</p>
        )}
        
        <div className="relative">
          {React.cloneElement(children as React.ReactElement, { id: fieldId } as Record<string, unknown>)}
        </div>
        
        {error && (
          <p className="flex items-center text-xs text-red-600">
            <svg
              className="mr-1 h-3 w-3 flex-shrink-0"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            {error}
          </p>
        )}
        
        {success && !error && (
          <p className="flex items-center text-xs text-green-600">
            <svg
              className="mr-1 h-3 w-3 flex-shrink-0"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            {success}
          </p>
        )}
      </div>
    );
  }
);

FormField.displayName = 'FormField';

// Input Field
export interface InputFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  size?: keyof typeof fieldVariants.size;
  error?: boolean;
  success?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  (
    {
      size = 'md',
      error = false,
      success = false,
      leftIcon,
      rightIcon,
      disabled,
      className,
      ...props
    },
    ref
  ) => {
    const state = disabled ? 'disabled' : error ? 'error' : success ? 'success' : 'default';
    const hasLeftIcon = !!leftIcon;
    const hasRightIcon = !!rightIcon;

    return (
      <div className="relative">
        {leftIcon && (
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-ink-400">
            {leftIcon}
          </div>
        )}
        
        <input
          ref={ref}
          className={cn(
            baseFieldStyles,
            fieldVariants.size[size],
            fieldVariants.state[state],
            hasLeftIcon && 'pl-10',
            hasRightIcon && 'pr-10',
            className
          )}
          disabled={disabled}
          {...props}
        />
        
        {rightIcon && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-ink-400">
            {rightIcon}
          </div>
        )}
      </div>
    );
  }
);

InputField.displayName = 'InputField';

// Textarea Field
export interface TextareaFieldProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  size?: keyof typeof fieldVariants.size;
  error?: boolean;
  success?: boolean;
  resize?: 'none' | 'vertical' | 'horizontal' | 'both';
}

export const TextareaField = forwardRef<HTMLTextAreaElement, TextareaFieldProps>(
  (
    {
      size = 'md',
      error = false,
      success = false,
      resize = 'vertical',
      disabled,
      className,
      rows = 4,
      ...props
    },
    ref
  ) => {
    const state = disabled ? 'disabled' : error ? 'error' : success ? 'success' : 'default';
    
    const resizeStyles = {
      none: 'resize-none',
      vertical: 'resize-y',
      horizontal: 'resize-x',
      both: 'resize',
    };

    return (
      <textarea
        ref={ref}
        rows={rows}
        className={cn(
          baseFieldStyles,
          fieldVariants.size[size],
          fieldVariants.state[state],
          resizeStyles[resize],
          className
        )}
        disabled={disabled}
        {...props}
      />
    );
  }
);

TextareaField.displayName = 'TextareaField';

// Select Field
export interface SelectFieldProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  size?: keyof typeof fieldVariants.size;
  error?: boolean;
  success?: boolean;
  placeholder?: string;
  options: Array<{
    value: string | number;
    label: string;
    disabled?: boolean;
  }>;
}

export const SelectField = forwardRef<HTMLSelectElement, SelectFieldProps>(
  (
    {
      size = 'md',
      error = false,
      success = false,
      placeholder,
      options,
      disabled,
      className,
      ...props
    },
    ref
  ) => {
    const state = disabled ? 'disabled' : error ? 'error' : success ? 'success' : 'default';

    return (
      <div className="relative">
        <select
          ref={ref}
          className={cn(
            baseFieldStyles,
            fieldVariants.size[size],
            fieldVariants.state[state],
            'pr-10 appearance-none bg-white',
            className
          )}
          disabled={disabled}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option
              key={option.value}
              value={option.value}
              disabled={option.disabled}
            >
              {option.label}
            </option>
          ))}
        </select>
        
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          <svg
            className="h-4 w-4 text-ink-400"
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
        </div>
      </div>
    );
  }
);

SelectField.displayName = 'SelectField';

// Checkbox Field
export interface CheckboxFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  description?: string;
  error?: boolean;
}

export const CheckboxField = forwardRef<HTMLInputElement, CheckboxFieldProps>(
  ({ label, description, error = false, disabled, className, ...props }, ref) => {
    const fieldId = React.useId();
    
    return (
      <div className="flex items-start">
        <div className="flex items-center h-5">
          <input
            ref={ref}
            id={fieldId}
            type="checkbox"
            className={cn(
              'h-4 w-4 rounded border-ink-300',
              'text-brand-600 focus:ring-brand-500 focus:ring-offset-2',
              error && 'border-red-500 focus:ring-red-500',
              disabled && 'cursor-not-allowed opacity-50',
              className
            )}
            disabled={disabled}
            {...props}
          />
        </div>
        
        {(label || description) && (
          <div className="ml-3 text-sm">
            {label && (
              <label
                htmlFor={fieldId}
                className={cn(
                  'font-medium',
                  error ? 'text-red-700' : 'text-ink-700',
                  disabled && 'cursor-not-allowed opacity-50'
                )}
              >
                {label}
              </label>
            )}
            {description && (
              <p className={cn(
                'text-ink-500',
                disabled && 'opacity-50'
              )}>
                {description}
              </p>
            )}
          </div>
        )}
      </div>
    );
  }
);

CheckboxField.displayName = 'CheckboxField';

// Radio Field
export interface RadioFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  description?: string;
  error?: boolean;
}

export const RadioField = forwardRef<HTMLInputElement, RadioFieldProps>(
  ({ label, description, error = false, disabled, className, ...props }, ref) => {
    const fieldId = React.useId();
    
    return (
      <div className="flex items-start">
        <div className="flex items-center h-5">
          <input
            ref={ref}
            id={fieldId}
            type="radio"
            className={cn(
              'h-4 w-4 border-ink-300',
              'text-brand-600 focus:ring-brand-500 focus:ring-offset-2',
              error && 'border-red-500 focus:ring-red-500',
              disabled && 'cursor-not-allowed opacity-50',
              className
            )}
            disabled={disabled}
            {...props}
          />
        </div>
        
        {(label || description) && (
          <div className="ml-3 text-sm">
            {label && (
              <label
                htmlFor={fieldId}
                className={cn(
                  'font-medium',
                  error ? 'text-red-700' : 'text-ink-700',
                  disabled && 'cursor-not-allowed opacity-50'
                )}
              >
                {label}
              </label>
            )}
            {description && (
              <p className={cn(
                'text-ink-500',
                disabled && 'opacity-50'
              )}>
                {description}
              </p>
            )}
          </div>
        )}
      </div>
    );
  }
);

RadioField.displayName = 'RadioField';

// File Field
export interface FileFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  dragAndDrop?: boolean;
  acceptedFileTypes?: string;
  maxFileSize?: string;
}

export const FileField = forwardRef<HTMLInputElement, FileFieldProps>(
  (
    {
      dragAndDrop = false,
      acceptedFileTypes,
      maxFileSize,
      disabled,
      className,
      ...props
    },
    ref
  ) => {
    const [isDragOver, setIsDragOver] = React.useState(false);
    const inputRef = React.useRef<HTMLInputElement>(null);

    const handleDragOver = (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragOver(true);
    };

    const handleDragLeave = (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragOver(false);
    };

    const handleDrop = (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragOver(false);
      // Handle file drop logic here
    };

    const handleClick = () => {
      if (typeof ref === 'object' && ref?.current) {
        ref.current.click();
      } else if (inputRef.current) {
        inputRef.current.click();
      }
    };

    if (dragAndDrop) {
      return (
        <div
          className={cn(
            'border-2 border-dashed rounded-lg p-6 text-center transition-colors',
            isDragOver ? 'border-brand-500 bg-brand-50' : 'border-ink-300',
            disabled && 'opacity-50 cursor-not-allowed',
            className
          )}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <input
            ref={ref || inputRef}
            type="file"
            className="hidden"
            disabled={disabled}
            {...props}
          />
          
          <svg
            className="mx-auto h-12 w-12 text-ink-400 mb-4"
            stroke="currentColor"
            fill="none"
            viewBox="0 0 48 48"
          >
            <path
              d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          
          <p className="text-sm text-ink-600">
            Drop files here or{' '}
            <button
              type="button"
              className="text-brand-600 hover:text-brand-700 font-medium"
              onClick={handleClick}
            >
              choose files
            </button>
          </p>
          
          {(acceptedFileTypes || maxFileSize) && (
            <p className="text-xs text-ink-500 mt-2">
              {acceptedFileTypes && `Accepted: ${acceptedFileTypes}`}
              {acceptedFileTypes && maxFileSize && ' • '}
              {maxFileSize && `Max size: ${maxFileSize}`}
            </p>
          )}
        </div>
      );
    }

    return (
      <input
        ref={ref}
        type="file"
        className={cn(
          'block w-full text-sm text-ink-500',
          'file:mr-4 file:py-2 file:px-4',
          'file:rounded-lg file:border-0',
          'file:text-sm file:font-medium',
          'file:bg-brand-50 file:text-brand-700',
          'hover:file:bg-brand-100',
          'focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2',
          disabled && 'cursor-not-allowed opacity-50',
          className
        )}
        disabled={disabled}
        {...props}
      />
    );
  }
);

FileField.displayName = 'FileField';

export default FormField;
