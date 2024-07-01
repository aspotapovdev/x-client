import { User } from '@/types';
import { ItemUser } from '@features/People/ItemUser/ItemUser.tsx';
import { FC } from 'react';

interface PeopleProps {
  users: User[];
}

export const People: FC<PeopleProps> = ({ users }) => {
  return (
    <div>
      {users.map((user) => (
        <ItemUser key={user.id} user={user} />
      ))}
    </div>
  );
};
