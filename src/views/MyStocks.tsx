import { Grid } from "@mui/material";
import ListPanel from '@components/ListPanel';
import { render } from "@testing-library/react";
import { getData } from "@utils/data";

const MyStocks = (props:{}) => {
    return (
        <Grid container spacing={2}>
            <Grid item sm={0} md={3}>
                <ListPanel></ListPanel>
            </Grid>
            <Grid item sm={12} md={9}>
            </Grid>
        </Grid>
    )
}

export default MyStocks;