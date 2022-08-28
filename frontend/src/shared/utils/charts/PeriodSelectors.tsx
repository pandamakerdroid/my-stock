import { FormControl, InputLabel, Select, MenuItem, Grid } from "@mui/material"

const PeriodSelectors = () => {

    const handleChange = (event: any) => {
        //setAge(event.target.value as string);
      };

    return (
        <Grid >
            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
            <InputLabel id="label-interval">Interval</InputLabel>
            <Select
                labelId="label-interval"
                id="demo-select-small"
                value={0}
                label="Interval"
                onChange={handleChange}
            >
                <MenuItem value="">
                <em>None</em>
                </MenuItem>
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
            </Select>
            </FormControl>
            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
            <InputLabel id="demo-select-small">Interval</InputLabel>
            <Select
                labelId="demo-select-small"
                id="demo-select-small"
                value={0}
                label="Age"
                onChange={handleChange}
            >
                <MenuItem value="">
                <em>None</em>
                </MenuItem>
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
            </Select>
            </FormControl>
        </Grid>
    )
}

export default PeriodSelectors