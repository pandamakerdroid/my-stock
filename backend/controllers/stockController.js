const express = require('express');
const router = express.Router()
const https = require('https');

const stockHelper = require('../helpers/stock')

const url = require('url');

const getStock = (req,res) =>{
    // LET ME ASSUME (FOR THE TIME BEING) THAT YOU ARE ALL GOOD GUYS THAT WONT SEND NONSENSE TO THE BACKEND LOL!!
    https.get(`https://query2.finance.yahoo.com/v8/finance/chart/${req.params.symbol}
                ${url.parse(req.url,true).search?url.parse(req.url,true).search:''}`, (resp) => {
    let data = '';
    // A chunk of data has been received.
    resp.on('data', (chunk) => {
        data += chunk;
    });

    // The whole response has been received. Print out the result.
    resp.on('end', () => {
        data = stockHelper.processDataForHighChart(data);
        res.send(JSON.parse(data))
    });

    }).on("error", (err) => {
    console.log("Error: " + err.message);
    });
}

router.get('/:symbol', getStock)

module.exports = router
