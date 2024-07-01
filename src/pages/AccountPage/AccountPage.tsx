import { Layout } from '@components/Layout/Layout.tsx';
import { AccountData } from '@features/AccountData';
import { useMeQuery } from '@services/UserService.ts';
import { FC } from 'react';

interface AccountPageProps {}

export const AccountPage: FC<AccountPageProps> = () => {
  const { data: user } = useMeQuery();

  return (
    <Layout>
      <div className="w-full rounded-lg bg-white max-w-md h-full drop-shadow-lg py-6 px-4">
        {user && <AccountData user={user} />}
      </div>
    </Layout>
  );
};
