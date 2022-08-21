import {
    TextField,
    InputAdornment,
   } from "@mui/material";
import { fetchCompanyInfo, fetchQuote } from "@api/stockApi";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { useAppSelector, useAppDispatch } from '@store/hooks';
import { 
//read operations
selectSymbol,
selectInterval,
selectRange,
selectPeriod1,
selectPeriod2,
selectSearchHistory,
setSearchHistory,
setSymbol,
} from '@store/slices/stockDataSlice';
import { selectSearchText, setSearchText } from "../../store/slices/uiSlice";
import {} from '@partials/TickerAutoComplete';
import SearchIcon from '@mui/icons-material/Search';


const TickerAutoComplete = (props :any) => {
    const dispatch = useAppDispatch();

    const searchText = useAppSelector(selectSearchText);
    const symbol= useAppSelector(selectSymbol);
    const interval = useAppSelector(selectInterval);
    const range = useAppSelector(selectRange);
    const period1 = useAppSelector(selectPeriod1);
    const period2 = useAppSelector(selectPeriod2);
    const searchHistory = useAppSelector(selectSearchHistory);
    const {t} = useTranslation('translation');

    const handleOnKeyUp = (e: any) => {
        if(e.target.value.length>=2){
          fetchCompanyInfo({symbol:e.target.value, dispatch:dispatch})
          if(e.key === 'Enter' && e.target.value && e.target.value!=='') { 
            dispatch(setSearchText(e.target.value));
            fetchQuote({symbol:e.target.value,
                               interval:interval,
                               period1:period1,
                               period2:period2,
                               range:range,
                               dispatch:dispatch})
           }
        }
       
      }
      
      const handleChange = (e:any) => {
        dispatch(setSearchText(e.target.value));
      }

    return (
        <TextField
        id="filled-search"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        type="search"
        variant="filled"
        sx={{mt:3}}
        onChange={handleChange}
        onKeyUp={handleOnKeyUp}
        />
    )
}
export default TickerAutoComplete;