import React from "react";
import { MOVIE_DETAIL_URL } from "../../constants";
import Image from "next/image";

const MovieDetail = ({ movieData, movieCredits } :any) => {
    // const id = movieId;
    // console.log(movieData)
    // console.log(movieCredits)
    const BASE_URL = "https://image.tmdb.org/t/p/original/"
    const { title, vote_average, runtime, release_date, production_countries, overview, backdrop_path } = movieData;
    const { cast }  = movieCredits;
    return (
        <section>
            <h2>{title}</h2>
            <p>Rate: {vote_average}/10</p>
            <p>Runtime: {runtime} min</p>
            <p>Release Date: {release_date}</p>
            <p>production countries: {production_countries.length > 1 ? production_countries.map((country:any)=> `${country["name"]} ` ) : production_countries[0]["name"]}</p>
            <p>{overview}</p>
            <Image src={`${BASE_URL}${backdrop_path}`} width={1920} height={1060}/>
            <p>{cast.map((person) => person.name)}</p>
        </section>
    )
}


export const getServerSideProps = async ({ params }: any) => {
    const movieId = params.id;
    const res = await fetch(`${MOVIE_DETAIL_URL}/${movieId}?${process.env.NEXT_PUBLIC_API_KEY as string}`);
    const credit = await fetch(`${MOVIE_DETAIL_URL}/${movieId}/credits?${process.env.NEXT_PUBLIC_API_KEY as string}`);
    const movieData = await res.json();
    const movieCredits = await credit.json();
    // console.log(movieData)

    return {
        props: { 
            movieData,
            movieCredits
        }
    }
}


export default MovieDetail;






