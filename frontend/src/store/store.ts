import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import languageReducer from './slices/languageSlice';
import stockDataReducer from './slices/stockDataSlice';

export const store = configureStore({
  reducer: {
    language: languageReducer,
    stockData: stockDataReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
