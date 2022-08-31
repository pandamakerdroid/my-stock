import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { selectPeriod1,
         selectPeriod2,
         selectInterval,
         selectSymbol,
         setPeriod1,
         setPeriod2
        } from "@store/slices/stockDataSlice";
import { useAppSelector } from "@store/hooks";
import { fetchQuote } from "@api/stockApi";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useTranslation} from 'react-i18next';
import { useAppDispatch } from "@store/hooks";
import { TextField } from '@mui/material';     
import dayjs, { Dayjs } from 'dayjs';

const DateSelector = (props:any) => {
    const {t} = useTranslation('translation');

    const dispatch = useAppDispatch();
    const symbol = useAppSelector(selectSymbol);
    const interval = useAppSelector(selectInterval);
    const period1 = useAppSelector(selectPeriod1);
    const period2 = useAppSelector(selectPeriod2);
    const handleChange = (newValue: Dayjs | null) => {
        console.log(newValue)
        switch (props.id){
            case 'p1':
                dispatch(setPeriod1(newValue?.unix()))
                break;
            case 'p2':
                dispatch(setPeriod2(newValue?.unix()))
                break;
            default:
                break;
        }
        if(!symbol || symbol.length<2){
            return;  // if symbol is invalid, does not get quotes
        }
        fetchQuote({symbol:symbol,
            interval:interval,
            period1:props.id==='p1'?newValue?.unix():period1,
            period2:props.id==='p2'?newValue?.unix():period2,
            dispatch:dispatch})
    };
    let value = props.id==="p1"?
        dayjs.unix(period1).format('MM-DD-YYYY'):
        dayjs.unix(period2).format('MM-DD-YYYY');
    let label = props.id==="p1"?t('overview.selectors.period1'):t('overview.selectors.period2');
    return(
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <MobileDatePicker
                label={label}
                inputFormat="MM-DD-YYYY"
                value={value}
                onChange={handleChange}
                renderInput={(params) => <TextField {...params} />}
            />
        </LocalizationProvider>
)
}
export default DateSelector;