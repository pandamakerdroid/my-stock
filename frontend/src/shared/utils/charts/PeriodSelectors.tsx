import { Grid } from "@mui/material"
import IntervalSelector from "@utils/charts/IntervalSelector";
import DateSelector from "@utils/charts/DateSelector";
const PeriodSelectors = () => {

    return (
        <Grid>
            <IntervalSelector />
            <DateSelector id="p1"/>
            <DateSelector id="p2"/>

        </Grid>
    )
}

export default PeriodSelectors