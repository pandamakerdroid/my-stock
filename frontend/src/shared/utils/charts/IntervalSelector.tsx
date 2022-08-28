import { selectInterval,
         selectIntervalList,
         setInterval,
        } from "@store/slices/stockDataSlice";
import { useAppSelector } from "@store/hooks";
import { useTranslation} from 'react-i18next';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { useAppDispatch } from "@store/hooks";
import {MouseEvent} from 'react';

const IntervalSelector = () => {

    const dispatch = useAppDispatch();
    const {t} = useTranslation('translation');
    const interval = useAppSelector(selectInterval);
    const intervalList = useAppSelector(selectIntervalList)
    const handleChange = (newValue: MouseEvent<HTMLElement> | null) => {
        dispatch(setInterval(newValue.target.value))
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