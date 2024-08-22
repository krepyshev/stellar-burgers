import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TOrder } from '../../utils/types';

interface OrderState {
  order: TOrder | null;
  orderRequest: boolean;
  orderError: string | null;
}

const initialState: OrderState = {
  order: null,
  orderRequest: false,
  orderError: null
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    orderRequest(state) {
      state.orderRequest = true;
      state.orderError = null;
    },
    orderSuccess(state, action: PayloadAction<TOrder>) {
      state.orderRequest = false;
      state.order = action.payload;
    },
    orderFailure(state, action: PayloadAction<string>) {
      state.orderRequest = false;
      state.orderError = action.payload;
    },
    clearOrder(state) {
      state.order = null;
      state.orderRequest = false;
      state.orderError = null;
    }
  }
});

export const { orderRequest, orderSuccess, orderFailure, clearOrder } =
  orderSlice.actions;
export default orderSlice.reducer;
