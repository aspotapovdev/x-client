import { Layout } from '@components/Layout/Layout.tsx';
import { AccountData } from '@features/AccountData';
import { EditAccount } from '@features/EditAccount';
import { useMeQuery } from '@services/UserService.ts';
import { FC, useState } from 'react';

interface AccountPageProps {}

export const AccountPage: FC<AccountPageProps> = () => {
  const { data: user } = useMeQuery();
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = () => {
    setIsEditing(!isEditing);
  };

  return (
    <Layout>
      <div className="flex flex-col items-center w-full">
        <h1 className="font-bold text-3xl">Аккаунт</h1>
        <div className="w-full rounded-lg bg-white max-w-md h-full drop-shadow-lg py-6 px-4 mt-6">
          {user && (
            <>
              {isEditing ? (
                <EditAccount user={user} onEdit={handleEdit} />
              ) : (
                <AccountData user={user} onEdit={handleEdit} />
              )}
            </>
          )}
        </div>
      </div>
    </Layout>
  );
};
