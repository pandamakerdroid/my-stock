const express = require('express');
const router = express.Router()
const https = require('https');

const stockHelper = require('../helpers/stock')

const url = require('url');

const apiEndpoints = {
    host:'https://query2.finance.yahoo.com',
    chart:'/v8/finance/chart/',
    basicInfo: '/v7/finance/quote?symbols=',
    assetProfile: '/v11/finance/quoteSummary/#SYMBOL#?modules=assetProfile'
}

const getCompanyBasicInfo = (req,res) => {
    // LET ME ASSUME (FOR THE TIME BEING) THAT YOU ARE ALL GOOD GUYS THAT WONT SEND NONSENSE TO THE BACKEND LOL!!
    console.log(apiEndpoints.host + apiEndpoints.basicInfo+req.params.symbol)
    https.get(apiEndpoints.host + apiEndpoints.basicInfo+req.params.symbol, (resp) => {
    let data = '';
    // A chunk of data has been received.
    resp.on('data', (chunk) => {
    data += chunk;
    });

    // The whole response has been received. Print out the result.
    resp.on('end', () => {
    res.send(stockHelper.processCompanyInfo(JSON.parse(data)));
    });

    }).on("error", (err) => {
    console.log("Error: " + err.message);
    });
}

const getQuote = (req,res) =>{
    // LET ME ASSUME (FOR THE TIME BEING) THAT YOU ARE ALL GOOD GUYS THAT WONT SEND NONSENSE TO THE BACKEND LOL!!
    console.log(apiEndpoints.host + apiEndpoints.chart +
        req.params.symbol +
        (url.parse(req.url,true).search?url.parse(req.url,true).search:''));
    https.get(apiEndpoints.host + apiEndpoints.chart +
               req.params.symbol +
               (url.parse(req.url,true).search?url.parse(req.url,true).search:''), (resp) => {
    let data = '';
    // A chunk of data has been received.
    resp.on('data', (chunk) => {
        data += chunk;
    });

    // The whole response has been received. Print out the result.
    resp.on('end', () => {
        res.send(stockHelper.processDataForHighChart(JSON.parse(data)));
    });

    }).on("error", (err) => {
    console.log("Error: " + err.message);
    });
}

router.get('/quote/:symbol', getQuote)
router.get('/company-info/:symbol', getCompanyBasicInfo)

module.exports = router
