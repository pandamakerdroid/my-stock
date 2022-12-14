import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@store';

export interface stockDataState {
  symbol: string,
  name: string,
  currency: string,
  interval: string, //1h,1d,1d,1w etc.
  intervalList:Array<string>,
  range: string,
  validRanges: Array<string>,
  period1: number, //timestamp start
  period2: number, //timestamp end
  quote: [],
  volume: [],
  browseHistory: [],
  searchHistory: []
}

export const initialState: stockDataState = {
  symbol: '',
  name: '',
  currency: 'USD',
  interval: '1h', //1h,1d,1d,1w etc.
  intervalList:['5m','15m','1h','4h','1d','1w','1mo'],
  range: '6mo',
  validRanges: ['1d', '5d', '1mo', '3mo', '6mo', '1y', '2y', '5y', '10y', 'ytd', 'max'],
  period1: Math.round(new Date().setDate(new Date().getDate() - 30)/1000), //timestamp start
  period2: Math.round(Date.now()/1000), //timestamp end
  quote: [],
  volume: [],
  browseHistory: [],
  searchHistory: []
};


//ASYNC, WORRY ABOUT IT LATER
// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.
/*export const fetchDataAsync = createAsyncThunk(
  'stockData/fetchQuote',
  async (amount: number) => {
    const response = await fetchQuote(amount);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);*/

export const stockDataSlice = createSlice({
  name: 'stockData',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    setSymbol: (state, action: PayloadAction<string>) => {
      state.symbol = action.payload;
    },
    setName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    setCurrency: (state, action: PayloadAction<string>) => {
      state.currency = action.payload;
    },
    setInterval: (state, action: PayloadAction<string>) => {
      state.interval = action.payload;
    },
    setRange: (state, action: PayloadAction<string>) => {
      state.range = action.payload;
    },
    setValidRanges: (state, action: PayloadAction<[]>) => {
      state.validRanges = action.payload;
    },
    setPeriod1: (state, action: PayloadAction<number>) => {
      state.period1 = action.payload;
    },
    setPeriod2: (state, action: PayloadAction<number>) => {
      state.period2 = action.payload;
    },
    setQuote: (state,action: PayloadAction<[]>) => {
      state.quote = action.payload;
    },
    setVolume: (state,action: PayloadAction<[]>) => {
      state.volume = action.payload;
    },
    setBrowseHistory: (state,action: PayloadAction<string>) => {
      if(state.browseHistory.filter(history=>history.symbol.includes(action.payload.symbol)).length===0)
        {
          state.browseHistory.push(action.payload);
        }
    },
    setSearchHistory: (state,action: PayloadAction<{}>) => {
      // if symbol is cleared, clear searchHistory
      if(Object.keys(action.payload).length === 0 ){
        console.log('lets clear searchHistory')
        state.searchHistory=[];
        return;
      }
      // if the input symbol does not resemble as the subset of any searched history, clear the set
      ///if(state.searchHistory.filter(history=>history.symbol.contains(state.symbol))===0)
      ///  {state.searchHistory = []}
      //  add payload to the search history
      state.searchHistory.push(action.payload);
    }
  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  /*extraReducers: (builder) => {
    builder
      .addCase(incrementAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(incrementAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.value += action.payload;
      })
      .addCase(incrementAsync.rejected, (state) => {
        state.status = 'failed';
      });
  },*/
});

export const {
  setSymbol,
  setName,
  setCurrency,
  setInterval,
  setRange,
  setValidRanges,
  setPeriod1,
  setPeriod2,
  setQuote,
  setVolume,
  setBrowseHistory,
  setSearchHistory
} = stockDataSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`


export const selectSymbol = (state: RootState) => state.stockData.symbol;
export const selectName = (state: RootState) => state.stockData.name;
export const selectCurrency = (state:RootState)=>state.stockData.currency;
export const selectInterval = (state:RootState)=>state.stockData.interval;
export const selectIntervalList = (state:RootState)=>state.stockData.intervalList;
export const selectRange = (state:RootState)=>state.stockData.range;
export const selectValidRanges = (state:RootState)=>state.stockData.validRanges;
export const selectPeriod1 = (state:RootState)=>state.stockData.period1;
export const selectPeriod2 = (state:RootState)=>state.stockData.period2;
export const selectQuote = (state:RootState)=>state.stockData.quote;
export const selectVolume = (state:RootState)=>state.stockData.volume;
export const selectBrowseHistory = (state:RootState)=>state.stockData.browseHistory;
export const selectSearchHistory = (state:RootState)=>state.stockData.searchHistory;

export default stockDataSlice.reducer;