import { Grid } from "@mui/material"
import IntervalSelector from "@utils/charts/IntervalSelector";
import DateSelector from "@utils/charts/DateSelector";
import RangeSelector from "@utils/charts/RangeSelector";
const PeriodSelectors = () => {

    return (
        <Grid>
            <IntervalSelector />
            <RangeSelector />
            <DateSelector id="p2"/>
        </Grid>
    )
}

export default PeriodSelectors