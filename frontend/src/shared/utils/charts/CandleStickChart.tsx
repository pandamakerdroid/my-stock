import {useEffect} from 'react';

function CandleStickChart(props:any) {

    useEffect(() => {

        (Highcharts as any).stockChart('container', {
            chart: {
                height: 600,
            },
            rangeSelector: {
                selected: 2
            },
            legend: {
                enabled: true
            },
            accessibility: {
                series: {
                    descriptionFormat: '{seriesDescription}.'
                },
                description: 'Use the dropdown menus above to display different indicator series on the chart.',
                screenReaderSection: {
                    beforeChartFormat: '<{headingTagName}>{chartTitle}</{headingTagName}><div>{typeDescription}</div><div>{chartSubtitle}</div><div>{chartLongdesc}</div>'
                }
            },
            yAxis: [
                {
                    height: '60%',
                    resize: {
                        enabled: true,
                    },
                    labels: {
                        align: 'right',
                        x: -3
                    },
                    title: {
                        text: 'Stock'
                    }
                },
                {
                    top: '60%',
                    height: '20%',
                    labels: {
                        align: 'right',
                        x: -3
                    },
                    title: {
                        text: props.symbol?props.symbol:''
                    }
                },
                {
                    top: '80%',
                    height: '20%',
                    labels: {
                        align: 'right',
                        x: -3
                    },
                    offset: 0,
                    title: {
                        text: 'MACD'
                    }
                }
            ],
            plotOptions: {
                series: {
                    showInLegend: true,
                    accessibility: {
                        exposeAsGroupOnly: true
                    }
                }
            },
            series: [{
                type: 'candlestick',
                id: 'chart',
                name: `${props.symbol?props.symbol:''} Stock Price`,
                data: props.quote?props.quote:[],
                //zIndex: 1,
            },
            {
                type: 'column',
                id: 'volume',
                name: 'Volume',
                data: props.volume?props.volume:[],
                yAxis: 1
            },
            {
                type: 'pc',
                id: 'overlay',
                linkedTo: 'chart',
                yAxis: 0
            },
            {
                type: 'macd',
                id: 'oscillator',
                linkedTo: 'chart',
                yAxis: 2
            }]
        })
    }, [props.quote, props.symbol, props.volume])

  
    return <>
      <div style={{height:"100%", width:"100%"}} id='container'></div>
    </>
  }

  export default CandleStickChart;