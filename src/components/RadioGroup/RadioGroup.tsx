import { SignUpFormValues } from '@/types';
import React from 'react';
import { Controller, Control } from 'react-hook-form';

interface Option {
  value: string;
  label: string;
}

interface RadioGroupProps {
  options: Option[];
  control: Control<SignUpFormValues>;
  errorMessage?: string;
}

export const RadioGroup: React.FC<RadioGroupProps> = ({
  options,
  control,
  name,
  errorMessage,
}) => {
  return (
    <Controller
      render={({ field }) => (
        <div className="flex w-full bg-gray-300 p-1 rounded-lg relative">
          {options.map((option, index) => (
            <label key={option.value} className="flex w-full text-center">
              <input
                type="radio"
                {...field}
                value={option.value}
                checked={field.value === option.value}
                className="hidden"
              />
              <span
                className={`w-full h-10 px-3 py-2 cursor-pointer ${
                  field.value === option.value
                    ? 'bg-cornflower-600 text-white'
                    : 'bg-white text-black'
                } ${index === 0 ? 'rounded-l-lg' : ''} ${
                  index === options.length - 1 ? 'rounded-r-lg' : ''
                }`}>
                {option.label}
              </span>
            </label>
          ))}
          <span className="absolute text-xs text-red-500 -bottom-5">
            {errorMessage}
          </span>
        </div>
      )}
      name={name}
      control={control}
    />
  );
};
