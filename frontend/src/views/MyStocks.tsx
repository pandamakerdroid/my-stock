import { Grid } from "@mui/material";
import ListPanel from '@components/ListPanel';
import Charts from "@utils/charts";
import { useState, useRef } from "react";
import { useAppSelector } from '@store/hooks';
import { 
	//read operations
	selectSymbol,
	selectCurrency,
	selectInterval,
	selectRange,
	selectValidRanges,
	selectPeriod1,
	selectPeriod2,
	selectQuote,
    selectVolume,
    selectBrowseHistory,
} from '@store/slices/stockDataSlice';

const MyStocks = (props:{}) => {
    const [input, setInput] = useState("");
    const symbol = useAppSelector(selectSymbol);
    const currency = useAppSelector(selectCurrency);
    const interval = useAppSelector(selectInterval);
    const range = useAppSelector(selectRange);
    const validRanges = useAppSelector(selectValidRanges);
    const period1 = useAppSelector(selectPeriod1);
    const period2 = useAppSelector(selectPeriod2);
    const quote = useAppSelector(selectQuote);
    const volume = useAppSelector(selectVolume);
    const browseHistory = useAppSelector(selectBrowseHistory);

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
                <Charts.CandleStickChart
                    symbol={symbol}
                    currency = {currency}
                    interval = {interval}
                    range = {range}
                    validRanges = {validRanges}
                    period1 = {period1}
                    period2 = {period2}
                    quote = {quote}
                    volume = {volume}/>
            </Grid>
        </Grid>
    )
}

export default MyStocks;