import { AuthService } from '@/services/AuthService';
import { Button } from '@components/Button';
import { FC } from 'react';

interface LogoutProps {}

export const Logout: FC<LogoutProps> = () => {
  const handleClick = () => {
    const token = AuthService.getToken();
    if (token) {
      AuthService.logout();
    }
  };

  return (
    <Button size="md" variant="secondary" onClick={handleClick}>
      Выйти
    </Button>
  );
};
