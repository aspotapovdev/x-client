import { Layout } from '@components/Layout/Layout.tsx';
import { People } from '@features/People';
import { useGetAllUsersQuery } from '@services/UserService.ts';
import { FC } from 'react';
import { PulseLoader } from 'react-spinners';

interface PeoplePageProps {}

export const PeoplePage: FC<PeoplePageProps> = () => {
  const { data: users, isLoading } = useGetAllUsersQuery();

  return (
    <Layout>
      <div className="flex flex-col items-center w-full">
        <h1 className="font-bold text-3xl">Пользователи</h1>
        {isLoading && <PulseLoader color="#1d6187" size={20} />}
        {users && <People users={users} />}
        {!users && !isLoading && <p>Пользователи не найдены</p>}
      </div>
    </Layout>
  );
};
