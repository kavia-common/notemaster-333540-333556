import React from 'react';
import { twMerge } from 'tailwind-merge';

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export function Input({ className, ...props }: InputProps) {
  return (
    <input
      className={twMerge(
        'w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm placeholder:text-gray-400 focus:border-[#3b82f6] focus:outline-none focus:ring-1 focus:ring-[#3b82f6]',
        className
      )}
      {...props}
    />
  );
}
