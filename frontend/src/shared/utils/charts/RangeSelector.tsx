import { selectInterval,
         selectRange,
         selectValidRanges,
         setInterval,
         selectSymbol,
         selectPeriod1,
         selectPeriod2
        } from "@store/slices/stockDataSlice";
import { useAppSelector } from "@store/hooks";
import { useTranslation} from 'react-i18next';
import { FormControl, MenuItem,FormHelperText } from "@mui/material";
import { useAppDispatch } from "@store/hooks";
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { fetchQuote } from "@api/stockApi";

const RangeSelector = () => {
    const {t} = useTranslation('translation');

    const dispatch = useAppDispatch();
    const interval = useAppSelector(selectInterval);
    const period1 = useAppSelector(selectPeriod1);
    const period2 = useAppSelector(selectPeriod2);
    const symbol= useAppSelector(selectSymbol)
    const range = useAppSelector(selectRange);
    const validRanges = useAppSelector(selectValidRanges)
    const handleChange = (event: SelectChangeEvent) => {
        dispatch(setInterval(event.target.value));
        fetchQuote({symbol:symbol,
            range:event.target.value,
            interval:interval,
            period1:period1,
            period2:period2,
            dispatch:dispatch})
      };

    return (
        <FormControl sx={{ m: 1, minWidth: 120 }}>
        <Select
          value={range}
          onChange={handleChange}
          displayEmpty
          inputProps={{ 'aria-label': 'Without label' }}
        >
            {
                validRanges.map((range:string,i:number)=>
                <MenuItem key={range} value={range}>{range}</MenuItem>)
            }
        </Select>
        <FormHelperText>Range</FormHelperText>
      </FormControl>
    )
}
export default RangeSelector