import { Pencil1Icon } from '@radix-ui/react-icons';
import { FC } from 'react';

interface AvatarProps {
  preview: string;
  isEditable?: boolean;
}

export const Avatar: FC<AvatarProps> = ({ preview, isEditable }) => {
  return (
    <div className="relative w-32 min-w-32 h-32 rounded-full">
      <img
        src={preview}
        alt="Предварительный просмотр"
        className="object-cover rounded-full w-full h-full"
      />
      {isEditable && (
        <span className="flex items-center justify-center w-6 h-6 absolute right-0 top-4 bg-cornflower-100 rounded-full">
          <Pencil1Icon className="w-4 h-4" />
        </span>
      )}
    </div>
  );
};
