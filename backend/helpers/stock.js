function stockHelper() {
    console.log('nope, nothing interesting here')
}

stockHelper.processDataForHighChart = (rawData) => {
    if (!rawData.chart ||
        !rawData.chart.result ||
        !rawData.chart.result[0].meta) {
        return null; //reject corrupted/empty data set 
    }
    rawData = rawData.chart.result[0];
    if (!rawData.timestamp ||
        !rawData.indicators.quote[0].open ||
        !rawData.indicators.quote[0].close ||
        !rawData.indicators.quote[0].low ||
        !rawData.indicators.quote[0].high
    ) { return null; }
    if (rawData.timestamp.length !== rawData.indicators.quote[0].open.length ||
        rawData.timestamp.length !== rawData.indicators.quote[0].close.length ||
        rawData.timestamp.length !== rawData.indicators.quote[0].low.length ||
        rawData.timestamp.length !== rawData.indicators.quote[0].high.length) {
        return null; //reject corrupted/empty data set 
    }

    // NO IDEA WHEN WILL YAHOO CHANGE THEIR APIS.. BUT AS OF 15.08.2022, THIS WORKS

    const timestamps = rawData.timestamp;
    const opens = rawData.indicators.quote[0].open;
    const highs = rawData.indicators.quote[0].high;
    const lows = rawData.indicators.quote[0].low;
    const closes = rawData.indicators.quote[0].close;
    const volume = rawData.indicators.quote[0].volume;
    let priceData = [];
    let volumeData = [];
    try {
        timestamps.forEach((timestamp, i) => {
            priceData.push([timestamp * 1000,
                parseFloat(opens[i].toFixed(2)),
                parseFloat(highs[i].toFixed(2)),
                parseFloat(lows[i].toFixed(2)),
                parseFloat(closes[i].toFixed(2))
            ]);
            volumeData.push([timestamp * 1000, volume[i]]);
        })
    }
    catch (e){
        console.log(e.message);
        return null;
    }
    let data = {
        symbol: rawData.meta.symbol,
        currency: rawData.meta.currency,
        granularity: rawData.meta.dataGranularity, //1h,1d,1d,1w etc.
        range: rawData.meta.range,
        validRanges: rawData.meta.validRanges,
        period1: rawData.timestamp[0], //timestamp start
        period2: rawData.timestamp[rawData.timestamp.length - 1], //timestamp end
        quote: priceData,
        volume: volumeData
    }
    console.log(rawData.timestamp.length + " entries");
    return JSON.stringify(data);
}

stockHelper.processCompanyInfo = (rawData) => {
    if (!rawData.quoteResponse ||
        rawData.quoteResponse.result===[] ||
        !rawData.quoteResponse.result[0]) {
        return JSON.stringify({ message: "no matching company found with input ticker" });
    }

    rawData = rawData.quoteResponse.result[0];

    if (!rawData.hasOwnProperty('shortName') ||
        !rawData.hasOwnProperty('bid') ||
        !rawData.hasOwnProperty('ask')) {
        return JSON.stringify({ message: "We found some seaweed captain!" });
    }
    let data = {
        name: rawData.shortName,
        symbol: rawData.symbol,
        bid: rawData.bid,
        ask: rawData.ask,
        epsForward: rawData.epsForward,
        epsCurrentYear: rawData.epsCurrentYear,
        fiftyTwoWeekLow: rawData.fiftyTwoWeekLow,
        fiftyTwoWeekHigh: rawData.fiftyTwoWeekHigh,
        ipoExpectedDate: rawData.ipoExpectedDate,
        averageAnalystRating: rawData.averageAnalystRating,

    }
    return JSON.stringify(data);
}
module.exports = stockHelper;