import { TConstructorIngredient } from '@utils-types';
import { initialState } from './constructorSlice';

const mockBun: TConstructorIngredient = {
  _id: 'bun1',
  id: 'unique-bun1-id',
  name: 'Bun Name',
  type: 'bun',
  proteins: 10,
  fat: 5,
  carbohydrates: 20,
  calories: 200,
  price: 50,
  image: 'image-url',
  image_large: 'image-large-url',
  image_mobile: 'image-mobile-url'
};

const mockIngredient: TConstructorIngredient = {
  _id: 'ingredient1',
  id: 'unique-ingredient1-id',
  name: 'Ingredient Name',
  type: 'main',
  proteins: 20,
  fat: 10,
  carbohydrates: 30,
  calories: 300,
  price: 100,
  image: 'image-url',
  image_large: 'image-large-url',
  image_mobile: 'image-mobile-url'
};

import reducer, {
  addIngredient,
  removeIngredient,
  moveIngredient,
  clearConstructor
} from './constructorSlice';

describe('constructorSlice', () => {
  it('должен корректно обрабатывать добавление ингредиента', () => {
    const previousState = { ...initialState };
    const expectedState = {
      ...previousState,
      bun: {
        ...mockBun,
        id: expect.any(String)
      }
    };

    const action = addIngredient(mockBun);
    expect(reducer(previousState, action)).toMatchObject(expectedState);
  });

  it('должен корректно обрабатывать удаление ингредиента', () => {
    const previousState = {
      ...initialState,
      ingredients: [mockIngredient]
    };
    const expectedState = {
      ...previousState,
      ingredients: []
    };

    const action = removeIngredient(mockIngredient.id);
    expect(reducer(previousState, action)).toEqual(expectedState);
  });

  it('должен корректно обрабатывать перемещение ингредиента', () => {
    const anotherMockIngredient: TConstructorIngredient = {
      ...mockIngredient,
      id: 'unique-ingredient2-id',
      name: 'Another Ingredient'
    };

    const previousState = {
      ...initialState,
      ingredients: [mockIngredient, anotherMockIngredient]
    };

    const expectedState = {
      ...previousState,
      ingredients: [anotherMockIngredient, mockIngredient]
    };

    const action = moveIngredient({ fromIndex: 0, toIndex: 1 });
    expect(reducer(previousState, action)).toEqual(expectedState);
  });

  it('должен корректно обрабатывать очистку конструктора', () => {
    const previousState = {
      bun: mockBun,
      ingredients: [mockIngredient],
      isLoading: false,
      hasError: null
    };

    const expectedState = {
      bun: null,
      ingredients: [],
      isLoading: false,
      hasError: null
    };

    const action = clearConstructor();
    expect(reducer(previousState, action)).toEqual(expectedState);
  });
});
