import { SelectOption } from '@/types';
import cn from 'classnames';
import { FC, memo } from 'react';

interface SelectItemProps {
  item: SelectOption;
  onClick: (item: string) => void;
  isActive: boolean;
  className?: string;
}

export const SelectItem: FC<SelectItemProps> = memo(
  ({ item, onClick, className, isActive }) => {
    const handleClick = () => {
      onClick(item.value);
    };

    return (
      <li
        onClick={handleClick}
        className={cn(
          'py-2 px-4 text-gray-400 font-bold cursor-pointer',
          {
            ['text-slate-600']: isActive,
          },
          className
        )}>
        {item.label}
      </li>
    );
  }
);
