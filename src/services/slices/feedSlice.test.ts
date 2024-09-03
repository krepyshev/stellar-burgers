import reducer, { fetchFeeds } from './feedSlice';
import { TOrder } from '@utils-types';

describe('feedSlice', () => {
  const initialState = {
    orders: [],
    total: 0,
    totalToday: 0,
    isLoading: false,
    error: null
  };

  it('должен изменять isLoading на true при выполнении fetchFeeds.pending', () => {
    const action = { type: fetchFeeds.pending.type };
    const state = reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      isLoading: true,
      error: null
    });
  });

  it('должен сохранять данные в orders и изменять isLoading на false при выполнении fetchFeeds.fulfilled', () => {
    const mockOrders: TOrder[] = [
      {
        _id: '1',
        name: 'Order 1',
        ingredients: ['ingredient1', 'ingredient2'],
        status: 'done',
        number: 123,
        createdAt: '2023-09-01T00:00:00.000Z',
        updatedAt: '2023-09-01T00:00:00.000Z'
      }
    ];

    const action = {
      type: fetchFeeds.fulfilled.type,
      payload: { orders: mockOrders, total: 100, totalToday: 10 }
    };

    const state = reducer(initialState, action);

    expect(state).toEqual({
      ...initialState,
      orders: mockOrders,
      total: 100,
      totalToday: 10,
      isLoading: false
    });
  });

  it('должен изменять error на сообщение об ошибке и isLoading на false при выполнении fetchFeeds.rejected', () => {
    const action = {
      type: fetchFeeds.rejected.type,
      error: { message: 'Ошибка' }
    };
    const state = reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      isLoading: false,
      error: 'Ошибка'
    });
  });
});
