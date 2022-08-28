import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { selectPeriod1,
         selectPeriod2,
         setPeriod1,
         setPeriod2,
        } from "@store/slices/stockDataSlice";
import { useAppSelector } from "@store/hooks";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { useTranslation} from 'react-i18next';
import moment, {Moment} from 'moment/moment.js'
import { useAppDispatch } from "@store/hooks";
import { TextField } from '@mui/material';        
const DateSelector = (props:any) => {
    const dispatch = useAppDispatch();
    const {t} = useTranslation('translation');
    const period1 = useAppSelector(selectPeriod1);
    const period2 = useAppSelector(selectPeriod2);
    const handleChange = (newValue: Moment | null) => {
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
    };
    let value = props.id==="p1"?moment.unix(period1).format("MM/DD/YYYY"):moment.unix(period2).format("MM/DD/YYYY")
    let label = props.id==="p1"?t('overview.selectors.period1'):t('overview.selectors.period2')
    return(
        <LocalizationProvider dateAdapter={AdapterMoment}>
            <MobileDatePicker
                label={label}
                inputFormat="MM/DD/YYYY"
                value={value}
                onChange={handleChange}
                renderInput={(params) => <TextField {...params} />}
            />
        </LocalizationProvider>
)
}
export default DateSelector;