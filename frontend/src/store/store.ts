import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import languageReducer from './slices/languageSlice';
import stockDataReducer from './slices/stockDataSlice';
import uiReducer from './slices/uiSlice';

export const store = configureStore({
  reducer: {
    language: languageReducer,
    stockData: stockDataReducer,
    ui: uiReducer,
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
