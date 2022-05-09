import styled from "@emotion/styled";
import { css, keyframes } from "@emotion/react";
import { useState } from "react";

export const Trailer = (props:any) => {
  
    return (
        <TrailerContainer>
            <TrailerContent>
                <button onClick={ () => props.handleTrailer(false) }>Close</button>
                pop up modal for trailer
            </TrailerContent>
        </TrailerContainer>
    )
}

const move = keyframes`
    0% {
    transform: scale(0, 0);
    }
    100% {
    transform: scale(1, 1);
    }
`

const TrailerContainer = styled.div`
    position: absolute;
    left: 50%;
    top: 15%;
    width: 80vh;
    height: 50vh;
    transform: translate(-50%,0);
`

const TrailerContent = styled.div`
    width: 100%;
    height: 100%; 
    background-color: #ffffff;

    animation: ${move} 0.3s ease-in
`