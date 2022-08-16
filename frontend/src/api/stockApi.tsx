import { 
	//write operations
	setSymbol,
	setCurrency,
	setInterval,
	setRange,
	setValidRanges,
	setPeriod1,
	setPeriod2,
	setQuote,
	setVolume,
	setBrowseHistory
} from '../store/slices/stockDataSlice';

const apiRoutes = {
	'stockPrice': '/api/v1/stock'
}


export const FetchPriceHistory = (props:any) => {
//	${(props.period1> 0 && props.period2> 0)?('&period1='+props.period1+'&period2='+props.period2):''}
	console.log(process.env.REACT_APP_HOST+apiRoutes.stockPrice+'/'+props.symbol+'?events=div%7Csplit'+
	'&interval='+props.interval+
	'&range='+props.range)
	
	fetch(process.env.REACT_APP_HOST+apiRoutes.stockPrice+'/'+props.symbol+'?events=div%7Csplit'+
	'&interval='+props.interval+
	'&range='+props.range)
	.then(response => response.text())
	.then(data => {
		try {
			data = JSON.parse(data)
			props.dispatch(setSymbol(data.symbol))
			props.dispatch(setCurrency(data.currency))
			props.dispatch(setInterval(data.granularity))
			props.dispatch(setRange(data.range))
			props.dispatch(setValidRanges(data.validaRanges))
			props.dispatch(setPeriod1(data.period1))
			props.dispatch(setPeriod2(data.period2))
			props.dispatch(setQuote(data.quote))
			props.dispatch(setVolume(data.volume))
			props.dispatch(setBrowseHistory(data.symbol))
		}
		catch (e){
			console.log("Oje, something is doesnt look good :)")
		}
	})
} 
