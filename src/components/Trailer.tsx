/** @jsxRuntime classic */
/** @jsx jsx */
import React from "react";
import { useMovieTrailer } from "../hooks/useMovieTrailer";
import YouTube, { YouTubeProps } from "react-youtube";
import { MdOutlineClose } from "react-icons/md";
import { jsx, css, keyframes } from '@emotion/react';
import { Common } from "../styles/common";
import { Loading } from "./Loading";


export const Trailer = (props:any) => {

    const { data, error } = useMovieTrailer("/api/trailer", props.movieId);
    let movieKey;

    if(data) {
        movieKey = data.results[0].key;
    }
    if(error) {
        console.log(error);
    }

    const onPlayerReady: YouTubeProps['onReady'] = (event) => {
        // access to player in all event handlers via event.target
        event.target.playVideo();
    }
  
    return (
        <>
            <div css={TrailerContainer}>
                <div css={TrailerContent}>
                    <button css={CloseBtn} onClick={() => props.handleTrailer(false)}>Close<MdOutlineClose style={{paddingLeft: "4px"}} /></button>
                    { data ?
                        movieKey ?
                        <div css={VideoContainer}>
                            <YouTube videoId={`${movieKey}`}  onReady={onPlayerReady} />
                        </div> : <Loading />
                        : <p>There is not available trailer video</p>
                    }   
                </div>
            </div>
            <div css={TrailerLayer }onClick={() => props.handleTrailer(false)}>
            </div>
        </>
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

const VideoContainer = css`
    position: relative;
    overflow: hidden;
    width: 100%;
    padding-top: 56.25%; // 16:9 Aspect Ratio (divide 9 by 16 = 0.5625)
    iframe {
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        width: 100%;
        height: 100%;
    }
`

const TrailerLayer = css`
    position: fixed;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: ${Common.colors.backgroundBlack};
    z-index: 10;
    opacity: 0.7;
`

const TrailerContainer = css`
    position: absolute;
    left: 50%;
    top: 15%;
    width: 100%;
    transform: translate(-50%,0);
    z-index: 20;
    padding: 2rem;

    @media (max-width: 490px) {
        padding: 1rem;
    }
`

const TrailerContent = css`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    animation: ${move} 0.2s ease-in;
`

const CloseBtn = css`
    background: transparent;
    color: ${Common.colors.text};
    display: flex;
    font-size: ${Common.fontSize.basicStrong};
    border: none;
    text-align: left;
    justify-content: center;
    align-items: center;
    position: relative;
    z-index: 20;
    margin-bottom: 0.8rem;
    cursor: pointer;
    & > * {
        font-size: 1.8em;
    }
    &:after {
        content: "";
        background-color: ${Common.colors.backgroundBlack};
        width: 100%;
        height: 100%;
        position: absolute;
        align-items: center;
        opacity: 0.7;
        padding: 2px 10px;
        border-radius: 10px;
        z-index: -10;
    }
`