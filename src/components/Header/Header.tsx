import { Logout } from '@components/Logout';
import { PATHNAMES } from '@constants/pathnames.ts';
import { FC } from 'react';
import { Link } from 'react-router-dom';

interface HeaderProps {}

export const Header: FC<HeaderProps> = () => {
  return (
    <header className="flex justify-center w-full p-6 bg-white drop-shadow-lg">
      <div className="w-full flex justify-between items-center max-w-2xl">
        <h1 className="text-2xl font-semibold">App</h1>
        <nav>
          <ul className="flex items-center space-x-4">
            <li>
              <Link to={PATHNAMES.account}>Аккаунт</Link>
            </li>
            <li>
              <Link to={PATHNAMES.people}>Пользователи</Link>
            </li>
            <li>
              <Logout />
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};
