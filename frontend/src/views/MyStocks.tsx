import { Grid } from "@mui/material";
import ListPanel from '@components/ListPanel';
import Charts from "@utils/charts";
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
    selectSearchHistory,
} from '@store/slices/stockDataSlice';
import { Overview } from "../shared/partials/Overview";

const MyStocks = (props:{}) => {
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
    const searchHistory = useAppSelector(selectSearchHistory);

    /*const chartRef = useRef(null);
    const updateChart = () => {
      chartRef.current.chart.series[1].update({
        name: input
      });
    };*/

    return (

        <Grid container spacing={2}>
            <Grid item xs={1} sm={1} md={0}>
                <ListPanel></ListPanel>
            </Grid>
            <Grid item xs={11} sm={11} md={12}
                    sx={{marginLeft:{md:30}, width:'75%'}}>
                <Overview stock={
                    browseHistory.filter((stock:any)=>stock.symbol===symbol)[0] &&
                    browseHistory.filter((stock:any)=>stock.symbol===symbol)[0]?
                    browseHistory.filter((stock:any)=>stock.symbol===symbol)[0]:
                    searchHistory.filter((stock:any)=>stock.symbol===symbol)[0]
                }/>
                <Charts.PeriodSelectors/>
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