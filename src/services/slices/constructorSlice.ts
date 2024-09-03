import {
  createSlice,
  PayloadAction,
  nanoid,
  createAsyncThunk
} from '@reduxjs/toolkit';
import { TIngredient, TConstructorIngredient } from '@utils-types';
import { getIngredientsApi } from '@api';

interface ConstructorState {
  bun: TConstructorIngredient | null;
  ingredients: TConstructorIngredient[];
  isLoading: boolean;
  hasError: string | null;
}

export const initialState: ConstructorState = {
  bun: null,
  ingredients: [],
  isLoading: false,
  hasError: null
};

export const fetchIngredients = createAsyncThunk(
  'constructor/fetchIngredients',
  async () => {
    const data = await getIngredientsApi();
    return data;
  }
);

const constructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    addIngredient: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        if (action.payload.type === 'bun') {
          state.bun = action.payload;
        } else {
          state.ingredients.push(action.payload);
        }
      },
      prepare: (ingredient: TIngredient) => ({
        payload: {
          ...ingredient,
          id: nanoid()
        }
      })
    },
    removeIngredient: (state, action: PayloadAction<string>) => {
      state.ingredients = state.ingredients.filter(
        (ingredient) => ingredient.id !== action.payload
      );
    },
    moveIngredient: (
      state,
      action: PayloadAction<{ fromIndex: number; toIndex: number }>
    ) => {
      const { fromIndex, toIndex } = action.payload;
      const ingredients = [...state.ingredients];
      const [movedIngredient] = ingredients.splice(fromIndex, 1);
      ingredients.splice(toIndex, 0, movedIngredient);
      state.ingredients = ingredients;
    },
    clearConstructor: (state) => {
      state.bun = null;
      state.ingredients = [];
      state.hasError = null;
    },
    loadSavedConstructor: (state, action: PayloadAction<ConstructorState>) => {
      state.bun = action.payload.bun;
      state.ingredients = action.payload.ingredients;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        state.isLoading = true;
        state.hasError = null;
      })
      .addCase(
        fetchIngredients.fulfilled,
        (state, action: PayloadAction<TIngredient[]>) => {
          state.isLoading = false;
          state.ingredients = action.payload.map((ingredient) => ({
            ...ingredient,
            id: ingredient._id
          }));
        }
      )
      .addCase(fetchIngredients.rejected, (state, action) => {
        state.isLoading = false;
        state.hasError =
          action.error.message || 'Не удалось загрузить ингредиенты';
      });
  }
});

export const {
  addIngredient,
  removeIngredient,
  moveIngredient,
  clearConstructor,
  loadSavedConstructor
} = constructorSlice.actions;

export default constructorSlice.reducer;
