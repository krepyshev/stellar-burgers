import reducer, { fetchUserOrders, initialState } from './orderSlice';
import { TOrder } from '@utils-types';

describe('orderSlice', () => {
  it('должен изменять isLoading на true при выполнении fetchUserOrders.pending', () => {
    const action = { type: fetchUserOrders.pending.type };
    const state = reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      isLoading: true,
      error: null
    });
  });

  it('должен сохранять заказы пользователя и изменять isLoading на false при выполнении fetchUserOrders.fulfilled', () => {
    const mockOrders: TOrder[] = [
      {
        _id: '1',
        status: 'completed',
        name: 'Order 1',
        createdAt: '2024-09-01T12:00:00Z',
        updatedAt: '2024-09-02T12:00:00Z',
        number: 101,
        ingredients: ['ingredient1', 'ingredient2']
      }
    ];
    const action = {
      type: fetchUserOrders.fulfilled.type,
      payload: mockOrders
    };
    const state = reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      userOrders: mockOrders,
      isLoading: false
    });
  });

  it('должен изменять error на сообщение об ошибке и isLoading на false при выполнении fetchUserOrders.rejected', () => {
    const action = {
      type: fetchUserOrders.rejected.type,
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
