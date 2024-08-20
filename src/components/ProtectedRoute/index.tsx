import React from 'react';
import { useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom';
import { RootState } from '../../services/store';

type ProtectedRouteProps = {
  children: JSX.Element;
};

const ProtectedRoute: React.FC<ProtectedRouteProps> = () => {
  const { isAuthenticated } = useSelector((store: RootState) => store.user);

  if (!isAuthenticated) {
    return <Navigate to='/login' />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
