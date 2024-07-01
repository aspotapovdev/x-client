import { User } from '@/types';
import { Avatar } from '@components/Avatar';
import { GENDER_MAP } from '@constants/common.ts';
import { FC } from 'react';

interface AccountDataProps {
  user: User;
}

export const AccountData: FC<AccountDataProps> = ({ user }) => {
  const {
    avatar,
    email,
    name,
    dateOfBirth: dateOfBirthRaw,
    gender,
    age,
  } = user;
  const formattedDateOfBirth = new Date(dateOfBirthRaw);
  const dateOfBirth = formattedDateOfBirth.toLocaleDateString();

  return (
    <>
      <Avatar preview={avatar} />
      <div className="mt-6">
        <h2 className="text-2xl font-semibold">{name}</h2>
        <p className="mt-2 text-gray-500">
          <span className="font-semibold">Email: </span>
          {email}
        </p>
        <p className="mt-2 text-gray-500">
          <span className="font-semibold">Дата рождения: </span>
          {dateOfBirth}
        </p>
        <p className="mt-2 text-gray-500">
          <span className="font-semibold">Пол: </span>
          {GENDER_MAP[gender]}
        </p>
        <p className="mt-2 text-gray-500">
          <span className="font-semibold">Возраст: </span>
          {age}
        </p>
      </div>
    </>
  );
};
