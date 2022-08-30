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
	setSearchHistory,
} from '@store/slices/stockDataSlice';

const apiRoutes = {
	companyInfo: '/api/v1/stock/company-info/',
	quote: '/api/v1/stock/quote/'
}

export const fetchCompanyInfo = (props:any) => {
	//api call should be just dumb and fetching data without other logics
	fetch(process.env.REACT_APP_HOST + apiRoutes.companyInfo + props.symbol)
	.then(response => response.json())
	.then(data => {
		console.log(data);
		if(!data.name || !data.hasOwnProperty('ask') || !data.hasOwnProperty('bid')){return;} //filter out 404 and seaweeds

      //  add payload to the search history
		props.dispatch(setSearchHistory(data))
	})
}

export const fetchQuote = (props:any) => {
//	${(props.period1> 0 && props.period2> 0)?('&period1='+props.period1+'&period2='+props.period2):''}

	fetch(process.env.REACT_APP_HOST+apiRoutes.quote + props.symbol+'?events=div%7Csplit'+
	'&interval='+props.interval+
	(props.range && props.range !==''?'&range='+props.range:'')+
	'&period1='+props.period1+
	'&period2='+props.period2)
	.then(response => response.json())
	.then(data => {
		try {
			props.dispatch(setSymbol(data.symbol))
			props.dispatch(setCurrency(data.currency))
			props.dispatch(setInterval(data.granularity))
			props.dispatch(setRange(data.range))
			props.dispatch(setValidRanges(data.validaRanges))
			props.dispatch(setPeriod1(data.period1))
			props.dispatch(setPeriod2(data.period2))
			props.dispatch(setQuote(data.quote))
			props.dispatch(setVolume(data.volume))
		}
		catch (e){
			console.log("Oje, something is doesnt look good :)")
		}
	})
} 
