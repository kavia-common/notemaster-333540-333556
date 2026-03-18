import React from 'react';
import { twMerge } from 'tailwind-merge';

type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export function Textarea({ className, ...props }: TextareaProps) {
  return (
    <textarea
      className={twMerge(
        'w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm placeholder:text-gray-400 focus:border-[#3b82f6] focus:outline-none focus:ring-1 focus:ring-[#3b82f6]',
        className
      )}
      {...props}
    />
  );
}
