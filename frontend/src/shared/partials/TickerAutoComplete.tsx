import {
    Autocomplete,
    TextField,
   } from "@mui/material";
import { fetchCompanyInfo, fetchQuote } from "@api/stockApi";
import { useTranslation } from "react-i18next";
import { useAppSelector, useAppDispatch } from '@store/hooks';
import { 
//read operations
selectInterval,
selectRange,
selectPeriod1,
selectPeriod2,
selectSearchHistory,
setSearchHistory,
} from '@store/slices/stockDataSlice';
import { setSearchText } from "@store/slices/uiSlice";
import { Box } from '@mui/system';
import styles from './TickerAutoComplete.module.scss';
import { setBrowseHistory } from "@store/slices/stockDataSlice";

const TickerAutoComplete = (props :any) => {
    const dispatch = useAppDispatch();
    const interval = useAppSelector(selectInterval);
    const range = useAppSelector(selectRange);
    const period1 = useAppSelector(selectPeriod1);
    const period2 = useAppSelector(selectPeriod2);
    const searchHistory = useAppSelector(selectSearchHistory);
    const {t} = useTranslation('translation');
      
    const handleChange = (e: any, newValue: any) => {
        if(newValue && newValue.symbol.length>1){
            dispatch(setBrowseHistory(newValue));
            fetchQuote({symbol:newValue.symbol,
                interval:interval,
                period1:period1,
                period2:period2,
                range:range,
                dispatch:dispatch})
        }

    }

    return (
        <>
            <Autocomplete
            id="ticker-search"
            sx={{margin:2}}
            options={searchHistory}
            filterOptions={(x) => x}
            getOptionLabel={(option) => (option && option.symbol) ? option.symbol:''}
            onChange={handleChange}
            onInputChange={(event: object, value: string, reason: string) => {
                if (reason === 'input'){
                    value=value.toUpperCase();
                    if(value.length===0){
                        dispatch(setSearchText(value));
                        dispatch(setSearchHistory([]));
                    }
                    else if(value.length>=2){
                        dispatch(setSearchText(value));
                        if(searchHistory.length===0){
                            console.log("search history is empty, add");
                            fetchCompanyInfo({symbol:value, dispatch:dispatch});
                            return;
                        }
                        if(searchHistory.filter((history:any)=>value.includes(history.symbol)).length>0 &&
                            searchHistory.filter((history:any)=>value===history.symbol).length===0){
                            console.log("if search history element does not have same ticker and subset ticker exists, add");
                            fetchCompanyInfo({symbol:value, dispatch:dispatch});
                        }
                        else if(searchHistory.filter((history:any)=>value.includes(history.symbol)).length===0){
                            console.log("input a ticker that has no overlap with any existing ones, reset current history and create new one");
                            dispatch(setSearchHistory([]));
                            fetchCompanyInfo({symbol:value, dispatch:dispatch});
                        }
                    }
                }

            }}
            renderOption={(props, option) => (         
                <Box {...props} component="li" className={styles['ticker-auto-complete-opl']}>
                    <span className={styles.name}>{option.name}</span>
                    <span className={styles.ticker}> {option.symbol}</span>
                </Box>
            )}
            renderInput={(params) => (
                <TextField
                    {...params}
                    variant="standard"
                    label="Search"
                    placeholder="by ticker"
                />
            )}
            />
        </>

    )
}
export default TickerAutoComplete;