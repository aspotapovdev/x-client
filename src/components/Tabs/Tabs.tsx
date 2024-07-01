import { FC, useState } from 'react';

export interface Tab {
  id: string;
  label: string;
}

interface TabsProps {
  tabs: Tab[];
  onTabSelect: (id: string) => void;
}

export const Tabs: FC<TabsProps> = ({ tabs, onTabSelect }) => {
  const [activeTab, setActiveTab] = useState(tabs[0].id);

  const handleTabClick = (id: string) => () => {
    setActiveTab(id);
    onTabSelect(id);
  };

  return (
    <div className="w-full">
      <div className="border-b border-gray-200">
        <div className="-mb-px flex">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={handleTabClick(tab.id)}
              className={`relative w-full py-4 text-lg font-semibold text-center
                ${activeTab === tab.id ? 'ext-cornflower-600' : 'text-gray-500 hover:text-gray-700'}`}>
              {tab.label}
              <span
                className={`${activeTab === tab.id ? 'block' : 'hidden'} absolute bottom-0 left-0 w-full h-1 bg-cornflower-600`}
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
