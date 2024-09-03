import { rootReducer } from './store';
import constructorReducer from './slices/constructorSlice';
import ingredientsReducer from './slices/ingredientsSlice';
import userReducer from './slices/userSlice';
import orderReducer from './slices/orderSlice';
import feedReducer from './slices/feedSlice';

describe('rootReducer', () => {
  it('должен правильно инициализировать rootReducer', () => {
    const state = rootReducer(undefined, { type: '@@INIT' });
    expect(state).toEqual({
      ingredients: ingredientsReducer(undefined, { type: '@@INIT' }),
      burgerConstructor: constructorReducer(undefined, { type: '@@INIT' }),
      user: userReducer(undefined, { type: '@@INIT' }),
      order: orderReducer(undefined, { type: '@@INIT' }),
      feed: feedReducer(undefined, { type: '@@INIT' })
    });
  });
});
