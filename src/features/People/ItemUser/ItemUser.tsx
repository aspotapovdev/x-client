import { User } from '@/types';
import { Avatar } from '@components/Avatar';
import { FC } from 'react';

interface ItemUserProps {
  user: User;
}

export const ItemUser: FC<ItemUserProps> = ({ user }) => {
  const { avatar, name, age } = user;

  return (
    <div className="flex gap-2 w-full rounded-lg bg-white max-w-md h-full drop-shadow-lg py-6 px-4 mt-6">
      <Avatar preview={avatar} />
      <div className="flex flex-col">
        <h2 className="text-2xl font-semibold">{name}</h2>
        <p className="mt-2 text-gray-500">
          <span className="font-semibold">Возраст: </span>
          {age} лет
        </p>
      </div>
    </div>
  );
};
