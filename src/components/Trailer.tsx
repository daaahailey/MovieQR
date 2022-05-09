import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";
import { useMovieTrailer } from "../hooks/useMovieTrailer";
import YouTube, { YouTubeProps } from "react-youtube";
import { MdOutlineClose } from "react-icons/md";


export const Trailer = (props:any) => {
    const { data, error } = useMovieTrailer(props.movieId);
    let movieKey;

    if(data) {
        movieKey = data.results[0].key;
    }
    if(error) {
        console.log(error);
    }

    const onPlayerReady: YouTubeProps['onReady'] = (event) => {
        // access to player in all event handlers via event.target
        event.target.pauseVideo();
    }
    
    const opts: YouTubeProps['opts'] = {
    height: '500',
    width: '900',
    position: "absolute",
    top: 0,
    left: 0,
    playerVars: {
        // https://developers.google.com/youtube/player_parameters
        autoplay: 1,
        origin: window.location.href,
    },
    };

  
    return (
        <>
            <TrailerContainer>
                <TrailerContent>
                    <CloseBtn onClick={() => props.handleTrailer(false)}>Close<MdOutlineClose style={{paddingLeft: "10px"}} /></CloseBtn>
                    {movieKey ? <YouTube videoId={`${movieKey}`} opts={opts} onReady={onPlayerReady} /> : <p>There isn't available video</p>}   
                </TrailerContent>
            </TrailerContainer>
            <TrailerLayer onClick={() => props.handleTrailer(false)}>
            </TrailerLayer>
        </>
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
    width: 100%;
    transform: translate(-50%,0);
    z-index: 20;
`

const TrailerContent = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    // padding-bottom: 56.25%;
    // padding-top: 25;
    height: 0
    animation: ${move} 0.2s ease-in;
`

const CloseBtn = styled.button`
    background: transparent;
    color: white;
    display: flex;
    font-size: 1.3rem;
    border: none;
    justify-content: center;
    align-items: center;
    position: relative;
    z-index: 20;
    margin-bottom: 0.8rem;
    & > * {
        font-size: 1.8em;
    }
    &:after {
        content: "";
        background-color: black;
        width: 100%;
        height: 100%;
        position: absolute;
        align-items: center;
        background: black;
        opacity: 0.7;
        padding: 2px 10px;
        border-radius: 10px;
        z-index: -10;
    }
`