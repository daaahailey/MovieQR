/** @jsxRuntime classic */
/** @jsx jsx */
import "chart.js/auto";
import { Doughnut } from "react-chartjs-2";
import { jsx, css } from '@emotion/react';
import { Common } from "../styles/common";


export const RateChart = ({rate}:any) => {
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
        <div css={OuterContainer}> 
            <div css={RateContainer}> 
                <p css={RateText}>{rate}</p>
                <Doughnut
                    data={data}
                    options={options}
                />
                <p css={Rate}>Rate</p>
            </div>
        </div>
    )
}


const OuterContainer = css`
    display: flex;
    width: 66px;
    height: 66px;
    background-color: #172644;
    border-radius: 50%;
    font-weight: ${Common.fontWeight.bold};
`

const RateContainer = css`
    position: relative;
    display: flex;
    width: 56px;
    justify-content: center;
    align-items: center;
    text-align: center;
    margin: 0 auto;
`

const Rate = css`
    position: absolute;
    left: 4.5rem; 
    text-align: center;
    font-size: ${Common.fontSize.basic}; 
    top: 50%;
    transform: translateY(-50%);
`

const RateText = css`
    position: absolute;
    width: 56px;
    height: 56px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: ${Common.fontSize.basic};
`
