import { Grid } from "@mui/material";
import ListPanel from '@components/ListPanel';
import { render } from "@testing-library/react";
import Charts from "@utils/charts";
import React, { useState, useRef } from "react";
import { useEffect } from "react";

const MyStocks = (props:{}) => {
    const [input, setInput] = useState("");
    const [chartInfo, setChartInfo] = useState(null);

    const chartRef = useRef(null);
    const updateChart = () => {
      chartRef.current.chart.series[1].update({
        name: input
      });
    };

    return (
        <Grid container spacing={2}>
            <Grid item sm={0} md={3}>
                <ListPanel></ListPanel>
            </Grid>
            <Grid item sm={12} md={9}>
                <Charts.CandleStickChart />
            </Grid>
        </Grid>
    )
}

export default MyStocks;