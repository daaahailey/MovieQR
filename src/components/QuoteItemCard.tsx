/** @jsxRuntime classic */
/** @jsx jsx */
import React, { useState, useEffect } from "react";
import { MOVIE_DETAIL_URL } from "../constants";
import Image from "next/image";
import { jsx, css } from '@emotion/react';
import { Common } from "../styles/common";
import Link from "next/link";

export const QuoteItemCard = ({ quote, userId, movieId, email, currentUser }:any) => {
    const userEmail = email.split("@");
    const userNickname = userEmail[0];
    const [ movieInfo, setMovieInfo ] = useState({});
    console.log({
        currentUser, userId
    })


    const {title, poster_path }:any = movieInfo;

    const BASE_URL = "https://image.tmdb.org/t/p/original"

    useEffect(() => {
        const getMovieInfo = async() => {
            const res = await fetch(`${MOVIE_DETAIL_URL}/${movieId}?${process.env.NEXT_PUBLIC_API_KEY as string}`);
            const data = await res.json();
            // console.log(data)
            setMovieInfo(data)
        }

        getMovieInfo();
    }, [movieId])

    console.log(movieInfo)


    return (
        <article css={QuoteItem}>
            <ul css={MoviePoster}>
            { poster_path === null ? <Image src="/images/movie_fallback.png" alt={title} layout="fill" objectFit="cover"/>
        : <Image src={`${BASE_URL}${poster_path}`} alt={title} layout="fill" objectFit="cover" />
        }  
            </ul>
            <ul css={Content}>
                <li css={MovieList}>
                    <p css={MovieTitle}>{title}</p>
                    <div css={FindAboutButton}>
                        <Link href={`/movie/${title}/${movieId}`}>
                            <a>About Movie</a>
                        </Link>
                    </div>
                </li>
                <li css={TextContent}>
                    <p>{quote}</p>
                    
                    
                    <div css={Buttons}>
                        <p>Posted by {userNickname}</p>
                        { currentUser === userId ?
                            <div>
                                <button type="submit" css={Button}>Edit</button>
                                <button type="submit" css={Button}>Delete</button>
                            </div>: "" }
                    </div> 
                   
                </li>
            </ul>
        </article>
    )
}

const QuoteItem = css`
    position: relative;
    width: 90%;
        display: flex;
        justify-content: space-between;
    // align-items: center;
    // background-color: pink;
    margin: 2rem auto;
    border-radius: 10px;
    padding: 10px;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;
`

const MoviePoster = css`
    position: relative;
    box-sizing: border-box;
    min-height: 160px;
    min-width: 100px;
    border-radius: 5px;
    overflow: hidden;
    // max-width: 200px;
    // max-height: 300px;
    m
    
`

const Content = css`
    width: 100%;
    padding-left: 1rem;
    display: flex;
    flex-direction: column;
`

const MovieList = css`
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.5rem;

`
const MovieTitle = css`
    font-family: ${Common.fonts.point};
    font-size: ${Common.fontSize.basicStrong};
    font-weight: ${Common.fontWeight.medium};
`

const TextContent = css `
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}
`



const FindAboutButton = css`
    position: relative;
    width: fit-content;
    height: 18px;
    padding: 0 4px 0 2px;
    line-height: 18px;
    margin-left: 20px;
    font-size: ${Common.fontSize.extraSmall};
    background-color: ${Common.colors.backgroundBlack}; 
    color: ${Common.colors.text};
    &:hover {
        background-color: ${Common.colors.point};
        &:after {
            background-color: ${Common.colors.point};
        }
    }
    &:after {
        content: "";
        position: absolute;
        top: 2.8px;
        left: -6.4px;
        width: 12.4px;
        height: 12.4px;
        background-color: black;
        transform: rotate(225deg);
        z-index: -20;
    }
`


const Buttons = css`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    p {
        font-size: ${Common.fontSize.extraSmall};
    }
`

const Button = css`
    background-color: transparent;
    border: none;
    cursor: pointer;
    font-size: ${Common.fontSize.basic};
    // font-weight: ${Common.fontWeight.medium};
    font-family: ${Common.fonts.point};
    &:hover {
        color: white;
        background-color: black;
        border-radius: 4px;
    }
`