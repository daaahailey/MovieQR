import React, { useState } from "react";
import Image from 'next/image'
import { movieDataType } from "../types/MovieDataType";
import Movie from "../pages/movie";
import styled from "@emotion/styled";

interface MovieType {
    movieData: movieDataType;
}

const MovieCard = (movieData: MovieType) => {
    const BASE_URL = "https://image.tmdb.org/t/p/original"
    const item = movieData.movieData;
    const movieId = item.id;

    const [click, setClick]: any = useState(false);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        setClick(true);
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
    <MovieCardArticle key={`movie-data-${item.id}`} onClick={handleClick}>
        {/* <p>Rating: {item.vote_average}</p>                        */}
        {/* give default img if it doesn't have poster picture */}        
        { item["poster_path"] === null ? <Image src="/images/movie_fallback.png" alt={`${item.title}`} width={360} height={540} />
        : <Image src={`${BASE_URL}${item["poster_path"]}`} alt={`${item.title}`} width={360} height={540}/> }                         
        <MovieSummary>
            <MovieTitle>{item.title}</MovieTitle>
            <p>
                {overviewEllipsis()}
            </p>
            <MoreAboutTheMovie>More</MoreAboutTheMovie>
        </MovieSummary>
        {click && <Movie movieId={movieId} clicked={click} />}
     </MovieCardArticle>
    )
}

export default MovieCard;


const MovieCardArticle = styled.article`
    position: relative;
    border-radius: 0.8rem;
    box-shadow: rgb(38, 57, 77) 0px 20px 30px -10px;
    color: #ffffff;
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
        background-color: #141010;
        opacity:0;
        transition:opacity .5s ease;
    }
    &:hover:after {
        opacity: 0.96;
    }
    & > section:last-child {
        opacity: 0;
    }
    &:hover > section:last-child {
        transition: opacity 1.6s ease;
        color: #ffffff;
        opacity: 1;
    }    
`

const MovieSummary = styled.section`
    position :absolute;
    width: 80%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 0.94rem;
    line-height: 1.5rem;
    text-align: center;
    z-index: 20;
`

const MovieTitle = styled.h2`
    margin-bottom: 0.5rem;
    font-size: 1.5rem;
    font-weight: 900;
    line-height: 2rem;
    z-index: 1;
`

const MoreAboutTheMovie = styled.button`
    margin-top: 1rem;
    padding: 0.45rem 1rem;
    background-color: #ffffff;
    cursor: pointer;
    border: none;
    border-radius: 0.25rem;
    font-size: 1rem;
    font-weight: 900;
`