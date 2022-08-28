import { selectInterval,
         selectIntervalList,
         setInterval,
         selectSymbol,
         selectPeriod1,
         selectPeriod2
        } from "@store/slices/stockDataSlice";
import { useAppSelector } from "@store/hooks";
import { useTranslation} from 'react-i18next';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { useAppDispatch } from "@store/hooks";
import {MouseEvent} from 'react';
import { fetchQuote } from "@api/stockApi";

const IntervalSelector = () => {
    const {t} = useTranslation('translation');

    const dispatch = useAppDispatch();
    const period1 = useAppSelector(selectPeriod1);
    const period2 = useAppSelector(selectPeriod2);
    const symbol= useAppSelector(selectSymbol)
    const interval = useAppSelector(selectInterval);
    const intervalList = useAppSelector(selectIntervalList)
    const handleChange = (newValue: MouseEvent<HTMLElement> | null) => {
        dispatch(setInterval(newValue.target.value));
        fetchQuote({symbol:symbol,
            interval:newValue.target.value,
            period1:period1,
            period2:period2,
            dispatch:dispatch})
      };

    const control = {
        value: interval,
        onChange: handleChange,
        exclusive: true,
    };
    return (
        <ToggleButtonGroup size="small" {...control} aria-label="Small sizes">
            {intervalList.map((interval:string, index:number) =>
                <ToggleButton id={`interval-selector-${interval}`} value={interval} key={interval}>
                    {t(`overview.selectors.intervals.${index}.${interval}`)}
                </ToggleButton> )}
        </ToggleButtonGroup>
    )
}
export default IntervalSelector