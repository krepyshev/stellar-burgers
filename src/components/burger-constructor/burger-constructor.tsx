import { FC, useEffect, useMemo, useState } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { RootState, useDispatch, useSelector } from '../../services/store';
import { clearOrder, createOrder } from '../../services/slices/orderSlice';
import {
  clearConstructor,
  loadSavedConstructor
} from '../../services/slices/constructorSlice';
import { useNavigate } from 'react-router-dom';

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const savedConstructor = localStorage.getItem('savedConstructor');
    if (savedConstructor) {
      const parsedConstructor = JSON.parse(savedConstructor);
      dispatch(loadSavedConstructor(parsedConstructor));
      localStorage.removeItem('savedConstructor');
    }
  }, [dispatch]);

  const navigate = useNavigate();

  const isAuthChecked = useSelector((state) => state.user.isAuthChecked);

  const constructorItems = useSelector(
    (state: RootState) => state.burgerConstructor
  );

  const order = useSelector((state: RootState) => state.order);
  const orderRequest = order.isLoading;
  const orderModalData = order.currentOrder;

  const [isModalOpen, setIsModalOpen] = useState(false);

  const onOrderClick = () => {
    if (!isAuthChecked) {
      localStorage.setItem(
        'savedConstructor',
        JSON.stringify(constructorItems)
      );
      navigate('/login');
      return;
    }
    if (!constructorItems.bun || orderRequest) return;
    const ingredientIds = [
      constructorItems.bun._id,
      ...constructorItems.ingredients.map((ingredient) => ingredient._id),
      constructorItems.bun._id
    ];

    dispatch(createOrder(ingredientIds));
    setIsModalOpen(true);
  };

  const closeOrderModal = () => {
    dispatch(clearOrder());
    dispatch(clearConstructor());
    setIsModalOpen(false);
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
