import { useState } from 'react';
import Highcharts from 'highcharts/highstock';

function CandleStickChart() {


  fetch('https://demo-live-data.highcharts.com/aapl-ohlc.json')
  .then((response) => response.json())
  .then((responseJson) => {
    (Highcharts as any).stockChart('container', {
        rangeSelector: {
            selected: 2
        },
        yAxis: [{
            height: '75%',
            resize: {
                enabled: true
            },
            labels: {
                align: 'right',
                x: -3
            },
            title: {
                text: 'AAPL'
            }
        }, {
            top: '75%',
            height: '25%',
            labels: {
                align: 'right',
                x: -3
            },
            offset: 0,
            title: {
                text: 'MACD'
            }
        }],

        title: {
            text: 'AAPL Stock Price'
        },

        subtitle: {
            text: 'With MACD and Pivot Points technical indicators'
        },

        series: [{
            type: 'ohlc',
            id: 'aapl',
            name: 'AAPL Stock Price',
            data: responseJson,
            zIndex: 1
        }]
    });
  })
  .catch((error) => {
    console.error(error);
  });

  
    return <>
      <div style={{height:"100%", width:"100%"}} id='container'></div>
    </>
  }

  export default CandleStickChart;