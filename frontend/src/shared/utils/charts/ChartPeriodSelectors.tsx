import { FormControl, InputLabel, Select, MenuItem } from "@mui/material"
import 

const ChartPeriodSelectors = () => {

    const handleChange = (event: SelectChangeEvent) => {
        setAge(event.target.value as string);
      };

    return (
        <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Age</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={age}
                label="Age"
                onChange={handleChange}
            >
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
            </Select>
        </FormControl>
    )
}

export default ChartPeriodSelectors