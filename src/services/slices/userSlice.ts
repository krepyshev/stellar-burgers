import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { TUser } from '../../utils/types';
import {
  TRegisterData,
  TLoginData,
  updateUserApi
} from '../../utils/burger-api';
import {
  loginUserApi,
  registerUserApi,
  getUserApi,
  logoutApi
} from '../../utils/burger-api';
import { setCookie, deleteCookie, getCookie } from '../../utils/cookie';

interface UserState {
  isAuthenticated: boolean;
  isAuthChecked: boolean;
  user: TUser | null;
  accessToken: string | null;
  loginUserRequest: boolean;
  loginUserError: string | null;
}

export const initialState: UserState = {
  isAuthenticated: false,
  isAuthChecked: false,
  user: null,
  accessToken: null,
  loginUserRequest: false,
  loginUserError: null
};

export const loginUser = createAsyncThunk(
  'user/loginUser',
  async (data: TLoginData, { rejectWithValue }) => {
    try {
      const response = await loginUserApi(data);
      setCookie('accessToken', response.accessToken);
      localStorage.setItem('refreshToken', response.refreshToken);
      return response;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const registerUser = createAsyncThunk(
  'user/registerUser',
  async (data: TRegisterData, { rejectWithValue }) => {
    try {
      const response = await registerUserApi(data);
      setCookie('accessToken', response.accessToken);
      localStorage.setItem('refreshToken', response.refreshToken);
      return response;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const updateUser = createAsyncThunk(
  'user/updateUser',
  async (userData: Partial<TRegisterData>, { rejectWithValue }) => {
    try {
      const response = await updateUserApi(userData);
      return response.user;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const checkAuth = createAsyncThunk(
  'user/checkAuth',
  async (_, { rejectWithValue }) => {
    const accessToken = getCookie('accessToken');
    if (accessToken) {
      try {
        const response = await getUserApi();
        return response.user;
      } catch (error) {
        deleteCookie('accessToken');
        localStorage.removeItem('refreshToken');
        return rejectWithValue('Session expired');
      }
    }
    return rejectWithValue('No access token');
  }
);

export const logoutUser = createAsyncThunk(
  'user/logoutUser',
  async (_, { rejectWithValue }) => {
    try {
      await logoutApi();
      deleteCookie('accessToken');
      localStorage.removeItem('refreshToken');
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    resetLoginError(state) {
      state.loginUserError = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loginUserRequest = true;
        state.loginUserError = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
        state.loginUserRequest = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loginUserRequest = false;
        state.loginUserError = action.payload as string;
      })
      .addCase(registerUser.pending, (state) => {
        state.loginUserRequest = true;
        state.loginUserError = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
        state.loginUserRequest = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loginUserRequest = false;
        state.loginUserError = action.payload as string;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.user = action.payload;
        state.isAuthChecked = true;
      })
      .addCase(checkAuth.rejected, (state) => {
        state.isAuthenticated = false;
        state.isAuthChecked = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isAuthenticated = false;
        state.user = null;
        state.accessToken = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loginUserError = action.payload as string;
      });
  }
});

export const { resetLoginError } = userSlice.actions;
export default userSlice.reducer;
