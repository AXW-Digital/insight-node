import React from 'react';
import Chart from 'react-apexcharts'

export default class LandingBarChart extends React.Component {
    constructor(props) {
        super(props);

        this.state = {

            series: [{
                name: 'Maito',
                data: [32, 0, 0]
            }, {
                name: 'Tee',
                data: [68, 0, 0]
            }, {
                name: 'Leikkele',
                data: [0, 46, 0]
            }, {
                name: 'Juusto',
                data: [0, 54, 0]
            }, {
                name: 'Irtsarit',
                data: [0, 0, 12]
            }, {
                name: 'Irttarit',
                data: [0, 0, 88]
            }],
            options: {
                chart: {
                    type: 'bar',
                    height: '70%',
                    stacked: true,
                    stackType: '100%',
                    offsetX: -25
                },
                plotOptions: {
                    bar: {
                        horizontal: true,
                        barHeight: '50%',
                        columnWidth: '50%',
                        distributed: false,
                    },
                },
                stroke: {
                    width: 1,
                    colors: ['#fff']
                },
                title: {
                    text: 'Muiden vaikuttajien vastauksia',
                    offsetX: 20,
                    style: {
                        fontSize: '18px',
                        fontFamily: 'TT Norms'
                    }
                },
                colors: ['#3F3C56', '#FFCF00'],
                xaxis: {
                    type: 'category',
                    categories: ['Kumpi ensin?', 'Kumpi päälle?', 'Oikea nimi'],
                    labels:{
                        show:false
                    },
                    axisTicks: {
                        show: false,
                    },
                    axisBorder: {
                        show: false
                    }
                },                
                yaxis: {
                    labels:{
                        show:false
                    },
                    axisBorder: {
                        show: false
                    }
                },
                grid: {
                    show: false
                },
                tooltip: {
                    followCursor: true,
                    y: {
                        formatter: function (val) {
                            return val + "%"
                        }
                    }
                },
                fill: {
                    opacity: 1

                },
                legend: {
                    show: false,
                    position: 'top',
                    horizontalAlign: 'left',
                    offsetX: 40
                },
                dataLabels: {
                    enabled: true,
                    textAnchor: 'middle',
                    formatter: function (val, opt) {
                        console.log(opt)
                        var label                        
                        if (val !== 0) {
                            label = opt.w.globals.seriesNames[opt.seriesIndex]
                        } else {
                            label = ''
                        }
                        return label
                        
                    },
                }
            },


        };
    }



    render() {
        return (

            <div id="chart">
                <Chart options={this.state.options} series={this.state.series} type="bar" height={200} width={'110%'} />
            </div>
        )
    }
}
