import React from "react";
import Image from 'next/image'
import { movieDataType } from "../types/MovieDataType";

interface MovieType {
    movieData: movieDataType;
}

const MovieCard = (movieData: MovieType) => {
    const BASE_URL = "https://image.tmdb.org/t/p/original"
    const item = movieData.movieData;

    return (
    <article key={`movie-data-${item.id}`} >
        <p>{item.title}</p>
        <p>Rating: {item.vote_average}</p>                       
        {/* give default img if it doesn't have poster picture */}        
        { item["poster_path"] === null ? <Image src="/images/movie_fallback.png" alt={`${item.title}`} width={360} height={540} />
        : <Image src={`${BASE_URL}${item["poster_path"]}`} alt={`${item.title}`} width={360} height={540}/> }                         
        <p>{item.overview}</p>
     </article>
    )
}

export default MovieCard;