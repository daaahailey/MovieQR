import React from "react";
import "chart.js/auto";
import { Doughnut } from "react-chartjs-2";


export const RateChart = ({rate}:any) => {
    // console.log(rate)
    const movieRatePercentage = rate * 10;
    const remainPercentage = 100 - movieRatePercentage;

    const data = {
        labels: [
            'Rate',
            'Remain',
        ],
        datasets: [{
            data: [movieRatePercentage, remainPercentage],
            backgroundColor: [
            '#82FFF2',
            '#32405D',
            ],
            cutout: "80%", 
        }],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                enabled: false
           },
        },
        elements: {
            arc: {
                borderWidth: 0
            }
        },
    };

    return (
        <div> 
            <div> 
                <p>Rate</p>
                <p>{rate}</p>
                <Doughnut
                    data={data}
                    options={options}
                />
            </div>
        </div>
    )
}