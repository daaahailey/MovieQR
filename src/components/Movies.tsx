import React from "react";
import MovieCard from "./MovieCard";

export const Movies = ({data}:any) => {   
    return (
    <>
        { data &&
            data.map((item:any) => <MovieCard key={`movie-data${item.id}`} movieData={item} />) 
        }
    </>
    )
}