import {useEffect} from 'react';
import './CandleStickChart.css'

function CandleStickChart(props:any) {
  let stockChart = (Highcharts as any);

  function addPopupEvents(chart) {
      var closePopupButtons = document.getElementsByClassName('highcharts-close-popup');
      // Close popup button:
      Highcharts.addEvent(
          closePopupButtons[0],
          'click',
          function () {
              this.parentNode.style.display = 'none';
          }
      );

      Highcharts.addEvent(
          closePopupButtons[1],
          'click',
          function () {
              this.parentNode.style.display = 'none';
          }
      );

      // Add an indicator from popup
      Highcharts.addEvent(
          document.querySelectorAll('.highcharts-popup-indicators button')[0],
          'click',
          function () {
              var typeSelect = document.querySelectorAll(
                      '.highcharts-popup-indicators select'
                  )[0],
                  type = typeSelect.options[typeSelect.selectedIndex].value,
                  period = document.querySelectorAll(
                      '.highcharts-popup-indicators input'
                  )[0].value || 14;

              chart.addSeries({
                  linkedTo: 'aapl-ohlc',
                  type: type,
                  params: {
                      period: parseInt(period, 10)
                  }
              });

              chart.stockToolbar.indicatorsPopupContainer.style.display = 'none';
          }
      );

      // Update an annotaiton from popup
      Highcharts.addEvent(
          document.querySelectorAll('.highcharts-popup-annotations button')[0],
          'click',
          function () {
              var strokeWidth = parseInt(
                      document.querySelectorAll(
                          '.highcharts-popup-annotations input[name="stroke-width"]'
                      )[0].value,
                      10
                  ),
                  strokeColor = document.querySelectorAll(
                      '.highcharts-popup-annotations input[name="stroke"]'
                  )[0].value;

              // Stock/advanced annotations have common options under typeOptions
              if (chart.currentAnnotation.options.typeOptions) {
                  chart.currentAnnotation.update({
                      typeOptions: {
                          lineColor: strokeColor,
                          lineWidth: strokeWidth,
                          line: {
                              strokeWidth: strokeWidth,
                              stroke: strokeColor
                          },
                          background: {
                              strokeWidth: strokeWidth,
                              stroke: strokeColor
                          },
                          innerBackground: {
                              strokeWidth: strokeWidth,
                              stroke: strokeColor
                          },
                          outerBackground: {
                              strokeWidth: strokeWidth,
                              stroke: strokeColor
                          },
                          connector: {
                              strokeWidth: strokeWidth,
                              stroke: strokeColor
                          }
                      }
                  });
              } else {
                  // Basic annotations:
                  chart.currentAnnotation.update({
                      shapes: [{
                          'stroke-width': strokeWidth,
                          stroke: strokeColor
                      }],
                      labels: [{
                          borderWidth: strokeWidth,
                          borderColor: strokeColor
                      }]
                  });
              }
              chart.stockToolbar.annotationsPopupContainer.style.display = 'none';
          }
      );
  }

    useEffect(() => {

        (Highcharts as any).stockChart('container', {
            chart: {
              events: {
                load: function () {
                    addPopupEvents(this);
                }
              }
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
              },
            },
            navigationBindings: {
              events: {
                  selectButton: function (event) {
                      var newClassName = event.button.className + ' highcharts-active',
                          topButton = event.button.parentNode.parentNode;
  
                      if (topButton.classList.contains('right')) {
                          newClassName += ' right';
                      }
  
                      // If this is a button with sub buttons,
                      // change main icon to the current one:
                      if (!topButton.classList.contains('highcharts-menu-wrapper')) {
                          topButton.className = newClassName;
                      }
  
                      // Store info about active button:
                      stockChart.activeButton = event.button;
                  },
                  deselectButton: function (event) {
                      event.button.parentNode.parentNode.classList.remove('highcharts-active');
  
                      // Remove info about active button:
                      stockChart.activeButton = null;
                  },
                  showPopup: function (event) {
  
                      if (!this.indicatorsPopupContainer) {
                          this.indicatorsPopupContainer = document
                              .getElementsByClassName('highcharts-popup-indicators')[0];
                      }
  
                      if (!this.annotationsPopupContainer) {
                          this.annotationsPopupContainer = document
                              .getElementsByClassName('highcharts-popup-annotations')[0];
                      }
  
                      if (event.formType === 'indicators') {
                          this.indicatorsPopupContainer.style.display = 'block';
                      } else if (event.formType === 'annotation-toolbar') {
                          // If user is still adding an annotation, don't show popup:
                          if (!stockChart.activeButton) {
                            stockChart.currentAnnotation = event.annotation;
                              this.annotationsPopupContainer.style.display = 'block';
                          }
                      }
  
                  },
                  closePopup: function () {
                      this.indicatorsPopupContainer.style.display = 'none';
                      this.annotationsPopupContainer.style.display = 'none';
                  }
              }
            },
            stockTools: {
              gui: {
                  enabled: false
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
                type: 'macd',
                id: 'oscillator',
                linkedTo: 'chart',
                yAxis: 2
            }]
        })
    }, [props.quote, props.symbol, props.volume])

  
    return (<>
    <div className="chart-wrapper">
      <div className="highcharts-popup highcharts-popup-indicators">
        <span className="highcharts-close-popup">&times;</span>
        <div className="highcharts-popup-wrapper">
          <label htmlFor="indicator-list">Indicator</label>
          <select name="indicator-list">
            <option value="sma">SMA</option>
            <option value="ema">EMA</option>
            <option value="bb">Bollinger bands</option>
          </select>
          <label htmlFor="stroke">Period</label>
          <input type="text" name="period" defaultValue={14}/>
        </div>
        <button>Add</button>
      </div>
      <div className="highcharts-popup highcharts-popup-annotations">
        <span className="highcharts-close-popup">&times;</span>
        <div className="highcharts-popup-wrapper">
          <label htmlFor="stroke">Color</label>
          <input type="text" name="stroke" />
          <label htmlFor="stroke-width">Width</label>
          <input type="text" name="stroke-width" />
        </div>
        <button>Save</button>
      </div>
      <div className="highcharts-stocktools-wrapper highcharts-bindings-container highcharts-bindings-wrapper">
        <div className="highcharts-menu-wrapper">
          <ul className="highcharts-stocktools-toolbar stocktools-toolbar">
            <li className="highcharts-indicators" title="Indicators">
              <span className="highcharts-menu-item-btn"></span>
              <span className="highcharts-menu-item-title">Indicators</span>
            </li>
            <li className="highcharts-label-annotation" title="Simple shapes">
              <span className="highcharts-menu-item-btn"></span>
              <span className="highcharts-menu-item-title">Shapes</span>
              <span className="highcharts-submenu-item-arrow highcharts-arrow-right"></span>
              <ul className="highcharts-submenu-wrapper">
                <li className="highcharts-label-annotation" title="Label">
                  <span className="highcharts-menu-item-btn"></span>
                  <span className="highcharts-menu-item-title">Label</span>
                </li>
                <li className="highcharts-circle-annotation" title="Circle">
                  <span className="highcharts-menu-item-btn"></span>
                  <span className="highcharts-menu-item-title">Circle</span>
                </li>
                <li className="highcharts-rectangle-annotation " title="Rectangle">
                  <span className="highcharts-menu-item-btn"></span>
                  <span className="highcharts-menu-item-title">Rectangle</span>
                </li>
                <li className="highcharts-ellipse-annotation" title="Ellipse">
                  <span className="highcharts-menu-item-btn"></span>
                  <span className="highcharts-menu-item-title">Ellipse</span>
                </li>
              </ul>
            </li>
            <li className="highcharts-segment" title="Lines">
              <span className="highcharts-menu-item-btn"></span>
              <span className="highcharts-menu-item-title">Lines</span>
              <span className="highcharts-submenu-item-arrow highcharts-arrow-right"></span>
              <ul className="highcharts-submenu-wrapper">
                <li className="highcharts-segment" title="Segment">
                  <span className="highcharts-menu-item-btn"></span>
                  <span className="highcharts-menu-item-title">Segment</span>
                </li>
                <li className="highcharts-arrow-segment" title="Arrow segment">
                  <span className="highcharts-menu-item-btn"></span>
                  <span className="highcharts-menu-item-title">Arrow segment</span>
                </li>
                <li className="highcharts-ray" title="Ray">
                  <span className="highcharts-menu-item-btn"></span>
                  <span className="highcharts-menu-item-title">Ray</span>
                </li>
                <li className="highcharts-arrow-ray" title="Arrow ray">
                  <span className="highcharts-menu-item-btn"></span>
                  <span className="highcharts-menu-item-title">Arrow ray</span>
                </li>
                <li className="highcharts-infinity-line" title="Line">
                  <span className="highcharts-menu-item-btn" ></span>
                  <span className="highcharts-menu-item-title">Line</span>
                </li>
                <li className="highcharts-arrow-infinity-line" title="Arrow line">
                  <span className="highcharts-menu-item-btn"></span>
                  <span className="highcharts-menu-item-title">Arrow</span>
                </li>
                <li className="highcharts-horizontal-line" title="Horizontal line">
                  <span className="highcharts-menu-item-btn"></span>
                  <span className="highcharts-menu-item-title">Horizontal</span>
                </li>
                <li className="highcharts-vertical-line" title="Vertical line">
                  <span className="highcharts-menu-item-btn"></span>
                  <span className="highcharts-menu-item-title">Vertical</span>
                </li>
              </ul>
            </li>
            <li className="highcharts-elliott3" title="Crooked lines">
              <span className="highcharts-menu-item-btn"></span>
              <span className="highcharts-menu-item-title">Crooked lines</span>
              <span className="highcharts-submenu-item-arrow highcharts-arrow-right"></span>
              <ul className="highcharts-submenu-wrapper">
                <li className="highcharts-elliott3" title="Elliott 3 line">
                  <span className="highcharts-menu-item-btn"></span>
                  <span className="highcharts-menu-item-title">Elliot 3</span>
                </li>
                <li className="highcharts-elliott5" title="Elliott 5 line">
                  <span className="highcharts-menu-item-btn"></span>
                  <span className="highcharts-menu-item-title">Elliot 5</span>
                </li>
                <li className="highcharts-crooked3" title="Crooked 3 line">
                  <span className="highcharts-menu-item-btn"></span>
                  <span className="highcharts-menu-item-title">Crooked 3</span>
                </li>
                <li className="highcharts-crooked5" title="Crooked 5 line">
                  <span className="highcharts-menu-item-btn" ></span>
                  <span className="highcharts-menu-item-title">Crooked 5</span>
                </li>
              </ul>
            </li>
            <li className="highcharts-measure-xy" title="Measure">
              <span className="highcharts-menu-item-btn"></span>
              <span className="highcharts-menu-item-title">Measure</span>
              <span className="highcharts-submenu-item-arrow highcharts-arrow-right"></span>
              <ul className="highcharts-submenu-wrapper">
                <li className="highcharts-measure-xy" title="Measure XY">
                  <span className="highcharts-menu-item-btn"></span>
                  <span className="highcharts-menu-item-title">Measure XY</span>
                </li>
                <li className="highcharts-measure-x" title="Measure X">
                  <span className="highcharts-menu-item-btn"></span>
                  <span className="highcharts-menu-item-title">Measure X</span>
                </li>
                <li className="highcharts-measure-y" title="Measure Y">
                  <span className="highcharts-menu-item-btn"></span>
                  <span className="highcharts-menu-item-title">Measure Y</span>
                </li>
              </ul>
            </li>
            <li className="highcharts-fibonacci" title="Advanced">
              <span className="highcharts-menu-item-btn"></span>
              <span className="highcharts-menu-item-title">Advanced</span>
              <span className="highcharts-submenu-item-arrow highcharts-arrow-right"></span>
              <ul className="highcharts-submenu-wrapper">
                <li className="highcharts-fibonacci" title="Fibonacci">
                  <span className="highcharts-menu-item-btn"></span>
                  <span className="highcharts-menu-item-title">Fibonacci</span>
                </li>
                <li className="highcharts-pitchfork" title="Pitchfork">
                  <span className="highcharts-menu-item-btn"></span>
                  <span className="highcharts-menu-item-title">Pitchfork</span>
                </li>
                <li className="highcharts-parallel-channel" title="Parallel channel">
                  <span className="highcharts-menu-item-btn"></span>
                  <span className="highcharts-menu-item-title">Parallel channel</span>
                </li>
              </ul>
            </li>
            <li className="highcharts-vertical-counter" title="Vertical labels">
              <span className="highcharts-menu-item-btn"></span>
              <span className="highcharts-menu-item-title">Counters</span>
              <span className="highcharts-submenu-item-arrow highcharts-arrow-right"></span>
              <ul className="highcharts-submenu-wrapper">
                <li className="highcharts-vertical-counter" title="Vertical counter">
                  <span className="highcharts-menu-item-btn"></span>
                  <span className="highcharts-menu-item-title">Counter</span>
                </li>
                <li className="highcharts-vertical-label" title="Vertical label">
                  <span className="highcharts-menu-item-btn"></span>
                  <span className="highcharts-menu-item-title">Label</span>
                </li>
                <li className="highcharts-vertical-arrow" title="Vertical arrow">
                  <span className="highcharts-menu-item-btn"></span>
                  <span className="highcharts-menu-item-title">Arrow</span>
                </li>
              </ul>
            </li>
            <li className="highcharts-flag-circlepin" title="Flags">
              <span className="highcharts-menu-item-btn"></span>
              <span className="highcharts-menu-item-title">Flags</span>
              <span className="highcharts-submenu-item-arrow highcharts-arrow-right"></span>
              <ul className="highcharts-submenu-wrapper">
                <li className="highcharts-flag-circlepin" title="Flag circle">
                  <span className="highcharts-menu-item-btn"></span>
                  <span className="highcharts-menu-item-title">Circle</span>
                </li>
                <li className="highcharts-flag-diamondpin" title="Flag diamond">
                  <span className="highcharts-menu-item-btn"></span>
                  <span className="highcharts-menu-item-title">Diamond</span>
                </li>
                <li className="highcharts-flag-squarepin" title="Flag square">
                  <span className="highcharts-menu-item-btn"></span>
                  <span className="highcharts-menu-item-title">Square</span>
                </li>
                <li className="highcharts-flag-simplepin" title="Flag simple">
                  <span className="highcharts-menu-item-btn"></span>
                  <span className="highcharts-menu-item-title">Simple</span>
                </li>
              </ul>
            </li>
            <li className="highcharts-series-type-ohlc" title="Type change">
              <span className="highcharts-menu-item-btn"></span>
              <span className="highcharts-menu-item-title">Series type</span>
              <span className="highcharts-submenu-item-arrow highcharts-arrow-right"></span>
              <ul className="highcharts-submenu-wrapper">
                <li className="highcharts-series-type-ohlc" title="OHLC">
                  <span className="highcharts-menu-item-btn"></span>
                  <span className="highcharts-menu-item-title">OHLC</span>
                </li>
                <li className="highcharts-series-type-line" title="Line">
                  <span className="highcharts-menu-item-btn"></span>
                  <span className="highcharts-menu-item-title">Line</span>
                </li>
                <li className="highcharts-series-type-candlestick" title="candlestick">
                  <span className="highcharts-menu-item-btn"></span>
                  <span className="highcharts-menu-item-title">Candlestick</span>
                </li>
              </ul>
            </li>
            <li className="highcharts-save-chart right" title="Save chart">
              <span className="highcharts-menu-item-btn"></span>
            </li>
            <li className="highcharts-full-screen right" title="Fullscreen">
              <span className="highcharts-menu-item-btn"></span>
            </li>
            <li className="highcharts-zoom-x right" title="Zoom change">
              <span className="highcharts-menu-item-btn"></span>
              <span className="highcharts-submenu-item-arrow highcharts-arrow-right"></span>
              <ul className="highcharts-submenu-wrapper">
                <li className="highcharts-zoom-x" title="Zoom X">
                  <span className="highcharts-menu-item-btn"></span>
                  <span className="highcharts-menu-item-title">Zoom X</span>
                </li>
                <li className="highcharts-zoom-y" title="Zoom Y">
                  <span className="highcharts-menu-item-btn"></span>
                  <span className="highcharts-menu-item-title">Zoom Y</span>
                </li>
                <li className="highcharts-zoom-xy" title="Zooom XY">
                  <span className="highcharts-menu-item-btn"></span>
                  <span className="highcharts-menu-item-title">Zoom XY</span>
                </li>
              </ul>
            </li>
            <li className="highcharts-current-price-indicator right" title="Current Price Indicators">
              <span className="highcharts-menu-item-btn"></span>
            </li>
            <li className="highcharts-toggle-annotations right" title="Toggle annotations">
              <span className="highcharts-menu-item-btn"></span>
            </li>
          </ul>
        </div>
      </div>
      <div id="container" className="chart"></div>
    </div>

    </>)
  }

  export default CandleStickChart;