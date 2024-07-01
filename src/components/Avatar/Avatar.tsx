import { FC } from 'react';

interface AvatarProps {
  preview: string;
}

export const Avatar: FC<AvatarProps> = ({ preview }) => {
  return (
    <img
      src={preview}
      alt="Предварительный просмотр"
      className="mt-4 w-32 h-32 rounded-full object-cover"
    />
  );
};
