import { SignInForm } from '@features/Auth/SignInForm';
import { SignUpForm } from '@features/Auth/SignUpForm';
import { FC, useState } from 'react';
import { Tabs } from '@components/Tabs';

const tabsData = [
  { id: '0', label: 'Регистрация' },
  { id: '1', label: 'Вход' },
];

interface AuthProps {}

export const Auth: FC<AuthProps> = () => {
  const [selectedTab, setSelectedTab] = useState(tabsData[0].id);

  const handleTabSelect = (id: string) => {
    setSelectedTab(id);
  };

  return (
    <div className="w-full rounded-lg bg-white max-w-md h-full drop-shadow-lg">
      <Tabs tabs={tabsData} onTabSelect={handleTabSelect} />
      <div className="py-6 px-4">
        {selectedTab === '0' ? <SignUpForm /> : <SignInForm />}
      </div>
    </div>
  );
};
