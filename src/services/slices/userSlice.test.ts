import reducer, { loginUser } from './userSlice';

describe('userSlice', () => {
  const initialState = {
    isAuthenticated: false,
    isAuthChecked: false,
    user: null,
    accessToken: null,
    loginUserRequest: false,
    loginUserError: null
  };

  it('должен изменять loginUserRequest на true при выполнении loginUser.pending', () => {
    const action = { type: loginUser.pending.type };
    const state = reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      loginUserRequest: true,
      loginUserError: null
    });
  });

  it('должен сохранять данные пользователя и изменять loginUserRequest на false при выполнении loginUser.fulfilled', () => {
    const mockUser = { email: 'test@test.ru', name: 'Test Testovich' };
    const action = {
      type: loginUser.fulfilled.type,
      payload: { user: mockUser, accessToken: 'token' }
    };
    const state = reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      isAuthenticated: true,
      user: mockUser,
      accessToken: 'token',
      loginUserRequest: false
    });
  });

  it('должен изменять loginUserError на сообщение об ошибке и loginUserRequest на false при выполнении loginUser.rejected', () => {
    const action = { type: loginUser.rejected.type, payload: 'Ошибка' };
    const state = reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      loginUserRequest: false,
      loginUserError: 'Ошибка'
    });
  });
});
