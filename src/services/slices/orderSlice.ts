import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import {
  orderBurgerApi,
  getOrderByNumberApi,
  getOrdersApi
} from '../../utils/burger-api';
import { RootState } from '../store';

interface OrderState {
  currentOrder: TOrder | null;
  userOrders: TOrder[];
  isLoading: boolean;
  error: string | null;
}

const initialState: OrderState = {
  currentOrder: null,
  userOrders: [],
  isLoading: false,
  error: null
};

export const fetchUserOrders = createAsyncThunk(
  'order/fetchUserOrders',
  async () => {
    const orders = await getOrdersApi();
    return orders;
  }
);

export const fetchOrderByNumber = createAsyncThunk(
  'order/fetchOrderByNumber',
  async (orderNumber: number) => {
    const data = await getOrderByNumberApi(orderNumber);
    return data.orders[0];
  }
);

export const createOrder = createAsyncThunk(
  'order/createOrder',
  async (ingredientsIds: string[]) => {
    const data = await orderBurgerApi(ingredientsIds);
    return data.order;
  }
);

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    clearOrder(state) {
      state.currentOrder = null;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserOrders.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        fetchUserOrders.fulfilled,
        (state, action: PayloadAction<TOrder[]>) => {
          state.isLoading = false;
          state.userOrders = action.payload;
        }
      )
      .addCase(fetchUserOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          action.error.message || 'Не удалось получить заказы пользователя';
      })
      .addCase(fetchOrderByNumber.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        fetchOrderByNumber.fulfilled,
        (state, action: PayloadAction<TOrder>) => {
          state.isLoading = false;
          state.currentOrder = action.payload;
        }
      )
      .addCase(fetchOrderByNumber.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          action.error.message || 'Не удалось получить информацию о заказе';
      })
      .addCase(createOrder.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        createOrder.fulfilled,
        (state, action: PayloadAction<TOrder>) => {
          state.isLoading = false;
          state.currentOrder = action.payload;
        }
      )
      .addCase(createOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Не удалось оформить заказ';
      });
  }
});

export const { clearOrder } = orderSlice.actions;

export default orderSlice.reducer;
