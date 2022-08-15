import { useState } from 'react';
import Highcharts from 'highcharts/highstock';

function CandleStickChart(props:any) {

    setTimeout(() =>{
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
                    text: props.symbol?props.symbol:''
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
                text: `${props.symbol?props.symbol:''} Stock Price`
            },

            subtitle: {
                text: 'With MACD and Pivot Points technical indicators'
            },

            series: [{
                type: 'candlestick',
                id: props.symbol?props.symbol:'',
                name: `${props.symbol?props.symbol:''} Stock Price`,
                data: props.quote?props.quote:[],
                zIndex: 1,
            }]
        })
    },(props.quote.length===0?500:0))

  
    return <>
      <div style={{height:"100%", width:"100%"}} id='container'></div>
    </>
  }

  export default CandleStickChart;