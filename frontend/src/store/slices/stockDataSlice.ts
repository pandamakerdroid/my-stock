import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '@store';

export interface stockDataState {
  symbol: string,
  name: string,
  currency: string,
  interval: string, //1h,1d,1d,1w etc.
  range: string,
  validRanges: {},
  period1: number, //timestamp start
  period2: number, //timestamp end
  quote: [],
  volume: [],
  browseHistory: [],
  searchHistory: [],
  ask: number,
  bid: number,
  epsForward: number,
  epsCurrentYear: number,
  fiftyTwoWeekLow: number,
  fiftyTwoWeekHigh: number,
  ipoExpectedDate: string,
  averageAnalystRating: string
}

export const initialState: stockDataState = {
  symbol: '',
  name: '',
  currency: 'USD',
  interval: '1d', //1h,1d,1d,1w etc.
  range: 'max',
  validRanges: [],
  period1: new Date().setDate(new Date().getDate() - 30), //timestamp start
  period2: Date.now(), //timestamp end
  quote: [],
  volume: [],
  browseHistory: [],
  searchHistory: [],
  ask: 0,
  bid: 0,
  epsForward: 0,
  epsCurrentYear: 0,
  fiftyTwoWeekLow: 0,
  fiftyTwoWeekHigh: 0,
  ipoExpectedDate: '',
  averageAnalystRating: ''
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
      state.browseHistory.includes(action.payload)?
        state.browseHistory=state.browseHistory:
        state.browseHistory.push(action.payload);
    },
    setSearchHistory: (state,action: PayloadAction<[]>) => {
      // if symbol is cleared, clear searchHistory
      /*if(state.symbol === ''){
        state.searchHistory = [];
        return;
      }*/
      // if the input symbol does not resemble as the subset of any searched history, clear the set
      ///if(state.searchHistory.filter(history=>history.symbol.contains(state.symbol))===0)
      ///  {state.searchHistory = []}
      //  add payload to the search history
      (state.searchHistory.filter(history=>history.symbol===state.symbol)===0)?
      state.searchHistory=state.searchHistory:
      state.searchHistory.push(action.payload);
    },
    setAsk: (state, action: PayloadAction<number>) => {
      state.ask = action.payload;
    },
    setBid: (state, action: PayloadAction<number>) => {
      state.bid = action.payload;
    },
    setEpsForward: (state, action: PayloadAction<number>) => {
      state.epsForward = action.payload;
    },
    setEpsCurrentYear: (state, action: PayloadAction<number>) => {
      state.epsCurrentYear = action.payload;
    },
    setFiftyTwoWeekLow: (state, action: PayloadAction<number>) => {
      state.fiftyTwoWeekLow = action.payload;
    },
    setFiftyTwoWeekHigh: (state, action: PayloadAction<number>) => {
      state.fiftyTwoWeekHigh = action.payload;
    },
    setIpoExpectedDate: (state, action: PayloadAction<string>) => {
      state.ipoExpectedDate = action.payload;
    },
    setAverageAnalystRating: (state, action: PayloadAction<string>) => {
      state.averageAnalystRating = action.payload;
    },
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
  setSearchHistory,
  setAsk,
  setBid,
  setEpsForward,
  setEpsCurrentYear,
  setFiftyTwoWeekLow,
  setFiftyTwoWeekHigh,
  setIpoExpectedDate,
  setAverageAnalystRating,
} = stockDataSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`


export const selectSymbol = (state: RootState) => state.stockData.symbol;
export const selectName = (state: RootState) => state.stockData.name;
export const selectCurrency = (state:RootState)=>state.stockData.currency;
export const selectInterval = (state:RootState)=>state.stockData.interval;
export const selectRange = (state:RootState)=>state.stockData.range;
export const selectValidRanges = (state:RootState)=>state.stockData.validRanges;
export const selectPeriod1 = (state:RootState)=>state.stockData.period1;
export const selectPeriod2 = (state:RootState)=>state.stockData.period2;
export const selectQuote = (state:RootState)=>state.stockData.quote;
export const selectVolume = (state:RootState)=>state.stockData.volume;
export const selectBrowseHistory = (state:RootState)=>state.stockData.browseHistory;
export const selectSearchHistory = (state:RootState)=>state.stockData.searchHistory;
export const selectAsk = (state:RootState)=>state.stockData.ask;
export const selectBid = (state:RootState)=>state.stockData.bid;
export const selectEpsForward = (state:RootState)=>state.stockData.epsForward;
export const selectEpsCurrentYear = (state:RootState)=>state.stockData.epsCurrentYear;
export const selectFiftyTwoWeekLow = (state:RootState)=>state.stockData.fiftyTwoWeekLow;
export const selectFiftyTwoWeekHigh = (state:RootState)=>state.stockData.fiftyTwoWeekHigh;
export const selectIpoExpectedDate = (state:RootState)=>state.stockData.ipoExpectedDate;
export const selectAverageAnalystRating = (state:RootState)=>state.stockData.averageAnalystRating;

export default stockDataSlice.reducer;