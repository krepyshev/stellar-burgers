import { FC, useEffect, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { RootState, useDispatch, useSelector } from '../../services/store';

export const BurgerConstructor: FC = () => {
  console.log('Burger constructor mounted:');
  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */

  // Получаем данные из стора
  const bun = useSelector((state: RootState) => state.constructor.bun);
  const ingredients = useSelector(
    (state: RootState) => state.constructor.ingredients
  );

  console.log(bun);
  console.log(ingredients);

  const constructorState = useSelector((state: RootState) => state.constructor);

  // Логирование состояния
  console.log('Constructor State:', constructorState);

  const constructorItems = {
    bun: constructorState.bun || { price: 0, name: '', image: '' },
    ingredients: constructorState.ingredients || []
  };

  // Проверка данных конструкторских элементов
  console.log('Constructor Items:', constructorItems);

  const orderRequest = false;

  const orderModalData = null;

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;
  };
  const closeOrderModal = () => {};

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  // return null;

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
