import { Header } from '@components/Header';
import { FC, ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode | ReactNode[];
}

export const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col">
      <Header />
      <main className="flex flex-1 justify-center items-center pt-8">
        {children}
      </main>
    </div>
  );
};
