/** @jsxRuntime classic */
/** @jsx jsx */
import React from "react";
import Image from 'next/image'
import { movieDataType } from "../types/MovieDataType";
import { jsx, css } from '@emotion/react';
import { Common } from "../styles/common";
import { useRouter } from "next/router";

interface MovieType {
    movieData: movieDataType;
}

const MovieCard = (movieData: MovieType) => {
    const BASE_URL = "https://image.tmdb.org/t/p/original"
    const item = movieData.movieData;
    const movieId = item.id;
    const title = item.title;
    const router = useRouter();

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        router.push(`/movie/${title}/${movieId}`); 
    }

    const overviewEllipsis = () => {
        const overview = item.overview;
        if(overview.length > 260) {
            return `${overview.substring(0,260)}...`;
        } else {
            return overview;
        }
    }

    return (
    <article css={MovieCardArticle} key={`movie-data-${item.id}`} onClick={handleClick}>     
        { item["poster_path"] === null ? <Image src="/images/movie_fallback.png" alt={`${item.title}`} layout="fill" objectFit="cover"/>
        : <Image src={`${BASE_URL}${item["poster_path"]}`} alt={`${item.title}`} layout="fill" objectFit="cover" />
        }                         
        <section css={MovieSummary}>
            <h2 css={MovieTitle}>{item.title}</h2>
            <p>
                {overviewEllipsis()}
            </p>
            <button css={MoreAboutTheMovie}>More</button>
        </section>
     </article>
    )
}

export default MovieCard;

const MovieCardArticle = css`
    position: relative;
    box-sizing: border-box;
    min-width: 240px;

    max-width: 320px;
    max-height: 480px;
    border-radius: 0.8rem;
    box-shadow: rgb(38, 57, 77) 0px 20px 30px -10px;
    color: ${Common.colors.text};
    overflow: hidden;
    cursor: pointer;
    & > span:first-of-type {
        min-width: 100%;
        min-height: 100%;
    }
    &:after {
        content: "";
        position: absolute;
        top: 0;
        right: 0;
        width: 100%;
        height: 100%;
        overflow: hidden;
        background-repeat: no-repeat;
        background-color: ${Common.colors.backgroundGray};
        opacity: 0;
        border-radius: 0.8rem;
        transition: opacity .5s ease;
    }
    &:hover:after {
        opacity: 0.96;
    }
    & > section:last-child {
        opacity: 0;
    }
    &:hover > section:last-child {
        transition: opacity 1.6s ease;
        opacity: 1;
    }    
`

const MovieSummary = css`
    position :absolute;
    width: 80%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: ${Common.fontSize.small};
    line-height: 1.5rem;
    text-align: center;
    z-index: 20;
`

const MovieTitle = css`
    margin-bottom: 0.5rem;
    font-size: ${Common.fontSize.medium};
    font-weight: ${Common.fontWeight.extraBold};
    line-height: 2rem;
    z-index: 1;
`

const MoreAboutTheMovie = css`
    margin-top: 1rem;
    padding: 0.45rem 1rem;
    background-color: #ffffff;
    cursor: pointer;
    border: none;
    border-radius: 0.25rem;
    font-size: ${Common.fontSize.small};
    font-weight: ${Common.fontWeight.extraBold};
`