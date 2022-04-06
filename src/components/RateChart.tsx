import React from "react";

export const RateChart = ({rate}:any) => {
    // console.log(rate)

    return (
        <div> 
            <div> 
                <p>Rate</p>
                <p>{rate}</p>
            </div>
        </div>
    )
}