import reducer, { fetchIngredients } from './ingredientsSlice';
import { TIngredient } from '@utils-types';

describe('ingredientsSlice', () => {
  const initialState = {
    items: [],
    currentIngredient: null,
    isLoading: false,
    hasError: false
  };

  it('должен изменять isLoading на true при выполнении fetchIngredients.pending', () => {
    const action = { type: fetchIngredients.pending.type };
    const state = reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      isLoading: true,
      hasError: false
    });
  });

  it('должен сохранять данные в items и изменять isLoading на false при выполнении fetchIngredients.fulfilled', () => {
    const mockIngredients: TIngredient[] = [
      {
        _id: '1',
        name: 'Ingredient 1',
        type: 'main',
        proteins: 10,
        fat: 20,
        carbohydrates: 30,
        calories: 40,
        price: 50,
        image: 'url',
        image_large: 'url',
        image_mobile: 'url'
      }
    ];
    const action = {
      type: fetchIngredients.fulfilled.type,
      payload: mockIngredients
    };
    const state = reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      items: mockIngredients,
      isLoading: false
    });
  });

  it('должен изменять hasError на true и isLoading на false при выполнении fetchIngredients.rejected', () => {
    const action = { type: fetchIngredients.rejected.type };
    const state = reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      isLoading: false,
      hasError: true
    });
  });
});
