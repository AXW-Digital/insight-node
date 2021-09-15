import React from 'react';
import Chart from 'react-apexcharts';

export default class HomeLeaderChart extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            series: [{data: this.props.data, name: 'Pisteet'}],
            options: {
                chart: {
                    type: 'bar',
                    height: '100%',
                    stacked: false,
                    offsetX: 10
                },
                plotOptions: {
                    bar: {
                        horizontal: true,
                        borderRadius: 4,
                    },
                },

                title: {
                    text: 'Aktiivisimmat vaikuttajat',
                    offsetX: 20,
                    style: {
                        fontSize: '18px',
                        fontFamily: 'TT Norms',
                        color: '#3F3C56'
                    }
                },
                colors: ['#3F3C56', '#FFCF00'],
                xaxis: {
                    type: 'category',
                    labels: {
                        show: true
                    },
                    axisTicks: {
                        show: true,
                    },
                    axisBorder: {
                        show: true
                    }
                },
                yaxis: {
                    labels: {
                        show: true
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
                }
            },


        };
    }


    

    render() {      
 
        
        

        return (
            <div id="chart">
                <Chart options={this.state.options} series={this.state.series} type="bar" height={500} width={'110%'} />
            </div>
        )
    }
}
