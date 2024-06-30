import { useClickOutside } from '@/utils';
import cn from 'classnames';
import React, { MutableRefObject, useRef, useState } from 'react';
import { ChevronDownIcon } from '@radix-ui/react-icons';
import { useController } from 'react-hook-form';

export const Select = ({ name, control, options, placeholder, classnames }) => {
  const {
    field: { onChange, value },
    fieldState: { error },
  } = useController({
    name,
    control,
  });

  const selectRef = useRef() as MutableRefObject<HTMLDivElement>;

  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (option) => {
    onChange(option.value);
    setIsOpen(false);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  useClickOutside(selectRef, handleClose);

  return (
    <div className={cn(`relative h-full w-full ${classnames}`)} ref={selectRef}>
      <button
        type="button"
        className={`flex justify-between items-center appearance-none w-full bg-white rounded-lg min-h-10 px-3 py-2 border border-gray-300 outline-cornflower-600`}
        onClick={() => setIsOpen(!isOpen)}>
        {options.find((option) => option.value === value)?.label || placeholder}
        <ChevronDownIcon
          className={cn('transition-transform duration-300', {
            'rotate-180': isOpen,
          })}
        />
      </button>
      {isOpen && (
        <ul className="absolute z-10 mt-2 bg-white border rounded-lg shadow-lg w-full overflow-hidden">
          {options.map((option) => (
            <li
              key={option.value}
              className="px-3 py-2 hover:bg-gray-200 cursor-pointer"
              onClick={() => handleSelect(option)}>
              {option.label}
            </li>
          ))}
        </ul>
      )}
      <span className="absolute text-xs text-red-500 -bottom-5">
        {error?.message}
      </span>
    </div>
  );
};
