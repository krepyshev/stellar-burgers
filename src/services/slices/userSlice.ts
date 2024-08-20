import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TUser } from '../../utils/types';

interface UserState {
  isAuthenticated: boolean;
  user: TUser | null;
  accessToken: string | null;
}

const initialState: UserState = {
  isAuthenticated: false,
  user: null,
  accessToken: null
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login(state, action: PayloadAction<{ user: TUser; accessToken: string }>) {
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
    },
    logout(state) {
      state.isAuthenticated = false;
      state.user = null;
      state.accessToken = null;
    },
    updateUser(state, action: PayloadAction<Partial<TUser>>) {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
      }
    }
  }
});

export const { login, logout, updateUser } = userSlice.actions;
export default userSlice.reducer;
