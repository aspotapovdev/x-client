import { FC, useEffect, ReactNode } from 'react';
import { PATHNAMES } from '@/constants/pathnames';
import { AuthService } from '@services/AuthService';
import { useMeQuery } from '@services/UserService';
import { Navigate, useLocation } from 'react-router';

interface ProtectedRouteProps {
  children: ReactNode;
}

export const ProtectedRoute: FC<ProtectedRouteProps> = ({ children }) => {
  const { data: user, isError, isLoading, refetch } = useMeQuery();
  const location = useLocation();
  const token = AuthService.getToken();

  useEffect(() => {
    if (token) {
      refetch();
    }
  }, [token, refetch]);

  if (isLoading || (token && !user)) {
    return <div>Loading...</div>;
  }

  if ((!token && !user) || isError) {
    return <Navigate to={PATHNAMES.root} state={{ from: location }} replace />;
  }

  return <>{children}</>;
};
