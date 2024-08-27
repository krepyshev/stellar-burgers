import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { fetchUserOrders } from '../../services/slices/orderSlice';
import { RootState, useDispatch, useSelector } from '../../services/store';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUserOrders());
  }, [dispatch]);

  const orders = useSelector((state: RootState) => state.order.userOrders);

  return <ProfileOrdersUI orders={orders} />;
};
