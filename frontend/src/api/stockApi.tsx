import { 
	//write operations
	setSymbol,
	setName,
	setCurrency,
	setInterval,
	setRange,
	setValidRanges,
	setPeriod1,
	setPeriod2,
	setQuote,
	setVolume,
	setBrowseHistory,
	setSearchHistory,
	setAsk,
	setBid,
	setEpsForward,
	setEpsCurrentYear,
	setFiftyTwoWeekLow,
	setFiftyTwoWeekHigh,
	setIpoExpectedDate,
	setAverageAnalystRating,
} from '@store/slices/stockDataSlice';

const apiRoutes = {
	companyInfo: '/api/v1/stock/company-info/',
	quote: '/api/v1/stock/quote/'
}

export const fetchCompanyInfo = (props:any) => {
	// if the input symbol does not resemble as the subset of any searched history, clear the set
	if(props.searchHistory.filter((history:any)=>history.symbol.contains(props.symbol))===0)
	{props.dispatch(setSearchHistory([]))}

	fetch(process.env.REACT_APP_HOST + apiRoutes.companyInfo + props.symbol)
	.then(response => response.json())
	.then(data => {
		console.log(data);
		if(!data.name || !data.ask || !data.bid){return;} //filter out 404 and seaweeds

      //  add payload to the search history
		props.dispatch(setSearchHistory(data))
		props.dispatch(setName(data.name));
		props.dispatch(setAsk(data.ask));
		props.dispatch(setBid(data.bid));
		props.dispatch(setEpsForward(data.epsForward));
		props.dispatch(setEpsCurrentYear(data.epsCurrentYear));
		props.dispatch(setFiftyTwoWeekLow(data.fiftyTwoWeekLow));
		props.dispatch(setFiftyTwoWeekHigh(data.fiftyTwoWeekHigh));
		props.dispatch(setIpoExpectedDate(data.ipoExpectedData));
		props.dispatch(setAverageAnalystRating(data.averageAnalystRating));
	})
}

export const fetchQuote = (props:any) => {
//	${(props.period1> 0 && props.period2> 0)?('&period1='+props.period1+'&period2='+props.period2):''}

	fetch(process.env.REACT_APP_HOST+apiRoutes.quote + props.symbol+'?events=div%7Csplit'+
	'&interval='+props.interval+
	'&range='+props.range)
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
			props.dispatch(setBrowseHistory(data.symbol))
		}
		catch (e){
			console.log("Oje, something is doesnt look good :)")
		}
	})
} 
