function stockHelper(){  
    console.log('nope, nothing interesting here')
}

stockHelper.processDataForHighChart = (rawData) => {
    if (!rawData.chart ||
        !rawData.chart.result[0] ||
        !rawData.chart.result[0].meta)
        {
            return null; //reject corrupted/empty data set 
        }

    if ( rawData.chart.result[0].timestamp.length !== rawData.chart.result[0].indicators.quote[0].open.length||
        rawData.chart.result[0].timestamp.length !== rawData.chart.result[0].indicators.quote[0].close.length ||
        rawData.chart.result[0].timestamp.length !== rawData.chart.result[0].indicators.quote[0].low.length ||
        rawData.chart.result[0].timestamp.length !== rawData.chart.result[0].indicators.quote[0].high.length)
        {
            return null; //reject corrupted/empty data set 
        }

    // NO IDEA WHEN WILL YAHOO CHANGE THEIR APIS.. BUT AS OF 15.08.2022, THIS WORKS
    
    const timestamps = rawData.chart.result[0].timestamp;
    const opens = rawData.chart.result[0].indicators.quote[0].open;
    const highs = rawData.chart.result[0].indicators.quote[0].high;
    const lows = rawData.chart.result[0].indicators.quote[0].low;
    const closes = rawData.chart.result[0].indicators.quote[0].close;

    let priceData= [];
    timestamps.forEach((timestamp,i) => {
        priceData.push([timestamp,opens[i],highs[i],lows[i],closes[i]]);
    })
    let data = 
    { 
        symbol: rawData.chart.result[0].meta.symbol,
        currency: rawData.chart.result[0].meta.currency,
        granularity: rawData.chart.result[0].meta.dataGranularity, //1h,1d,1d,1w etc.
        range: rawData.chart.result[0].meta.range,
        validRanges: rawData.chart.result[0].meta.validRanges,
        period1: rawData.chart.result[0].timestamp[0], //timestamp start
        period2: rawData.chart.result[0].timestamp[rawData.chart.result[0].timestamp.length-1], //timestamp end
        priceData: priceData
    }
    console.log(rawData.chart.result[0].timestamp.length );
    return JSON.stringify(data);
}

module.exports = stockHelper;