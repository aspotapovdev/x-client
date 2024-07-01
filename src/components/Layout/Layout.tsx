import { Logout } from '@components/Logout';
import { PATHNAMES } from '@constants/pathnames.ts';
import { FC, ReactNode } from 'react';
import { Link } from 'react-router-dom';

interface LayoutProps {
  children: ReactNode | ReactNode[];
}

export const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col">
      <header className="flex justify-center w-full p-6 bg-white drop-shadow-lg">
        <div className="w-full flex justify-between items-center max-w-2xl">
          <h1 className="text-2xl font-semibold">App</h1>
          <nav>
            <ul className="flex items-center space-x-4">
              <li>
                <Link to={PATHNAMES.account}>Account</Link>
              </li>
              <li>
                <Logout />
              </li>
            </ul>
          </nav>
        </div>
      </header>
      <main className="flex flex-1 justify-center items-center pt-8">
        {children}
      </main>
    </div>
  );
};
