import React from 'react';
var ChartistGraph = require('react-chartist')

export const BarChart = React.createClass ({

    render() {
        var simpleLineChartData = {
            labels: ['A', 'T', 'C', 'G'],
            series: [
                [5, 4, 3, 7],
                [3, 2, 9, 5],
                [31, 32, 79, 45]
            ]
        }
        var options = {
            seriesBarDistance: 20,
            width: 500,
            height: 200
        }
        return (
            <div>
                <ChartistGraph data={simpleLineChartData} options={options} type='Bar'/>
            </div>
        )
    }
})