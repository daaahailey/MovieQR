import React from "react";
import { MOVIE_DETAIL_URL } from "../../constants";

const MovieDetail = ({ movieData } :any) => {
    // const id = movieId;
    console.log(movieData) 
    return (
        <div>
            Detail page
        </div>
    )
}


export const getServerSideProps = async ({ params }: any) => {
    const movieId = params.id;
    const res = await fetch(`${MOVIE_DETAIL_URL}/${movieId}?${process.env.NEXT_PUBLIC_API_KEY as string}`);
    const movieData = await res.json();
    // console.log(movieData)

    return {
        props: { movieData }
    }
}


export default MovieDetail;






