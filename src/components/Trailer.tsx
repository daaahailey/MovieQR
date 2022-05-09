import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";
import { useMovieTrailer } from "../hooks/useMovieTrailer";


export const Trailer = (props:any) => {
    // console.log(props);
    const { data, error } = useMovieTrailer(props.movieId);

    let trailerData;
    if(data) {
        trailerData = data.results[0];
        console.log(trailerData)
    }
  
    return (
        <TrailerLayer>
            <TrailerContainer>
                <TrailerContent>
                    <button onClick={ () => props.handleTrailer(false) }>Close</button>
                    pop up modal for trailer
        
                </TrailerContent>
            </TrailerContainer>
        </TrailerLayer>
    )
}

const TrailerLayer = styled.div`
    position: fixed;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: #000000;
    z-index: 10;
    opacity: 0.7;
`

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