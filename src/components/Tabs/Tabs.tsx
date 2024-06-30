import React, { FC, useState } from 'react';

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

  const handleTabClick = (id) => () => {
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
              className={`w-full py-4 text-lg font-semibold text-center
                ${activeTab === tab.id ? 'border-b-4 border-cornflower-600 text-cornflower-600' : 'text-gray-500 hover:text-gray-700'}`}>
              {tab.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
