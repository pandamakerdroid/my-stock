export function fetchPriceHistory(symbol:string, interval:string, period1:number, period2:number) {
	const priceHistory = fetch(`https://query1.finance.yahoo.com/v8/finance/chart/${symbol}
                              ${interval?'?interval='+interval:''}
                              ${(period1> 0 && period2> 0)?'?period1='+period1+'?period2='+period2:''}`)
		.then(response => {
			return response.text()})
		.then(data => data)
	return priceHistory;
}


//AIzaSyAYif51Wu_p2IX0YIexh6HoTmtGpT_mbxA