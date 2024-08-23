import { FC, useEffect } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { RootState, useSelector } from '../../services/store';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { setCurrentIngredient } from '../../services/slices/ingredientsSlice';

export const IngredientDetails: FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();
  const ingredients = useSelector(
    (state: RootState) => state.ingredients.items
  );
  const ingredientData = useSelector(
    (state: RootState) => state.ingredients.currentIngredient
  );

  useEffect(() => {
    if (id) {
      const ingredient = ingredients.find((item) => item._id === id);
      if (ingredient) {
        dispatch(setCurrentIngredient(ingredient));
      } else {
        dispatch(setCurrentIngredient(null));
      }
    }
  }, [id, ingredients, dispatch]);

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
