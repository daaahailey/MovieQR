import React from "react";
import "chart.js/auto";
import { Doughnut } from "react-chartjs-2";
import styled from "@emotion/styled";


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
        <OuterContainer> 
            <RateContainer> 
                <RateText>{rate}</RateText>
                <Doughnut
                    data={data}
                    options={options}
                />
                <Score>Rate</Score>
            </RateContainer>
        </OuterContainer>
    )
}


const OuterContainer = styled.div`
    display: flex;
    width: 66px;
    height: 66px;
    background-color: #172644;
    border-radius: 50%;
`

const RateContainer = styled.div`
    position: relative;
    display: flex;
    width: 56px;
    justify-content: center;
    align-items: center;
    text-align: center;
    margin: 0 auto;
    
`

const Score = styled.span`
    position: absolute;

    left: 4.5rem; 
    text-align: center;
    font-size: 1.25rem;
    font-weight: 700;
    top: 50%;
    transform: translateY(-50%);
`

const RateText = styled.p`
    position: absolute;
    width: 56px;
    height: 56px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.1rem;
    font-weight: 700;
`
