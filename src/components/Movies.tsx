import React from "react";
import { useData } from "../hooks/useData";
import { Error } from "./Error";
import { Loading } from "./Loading";
import MovieCard from "./MovieCard";


export const Movies = ({title}: any) => {
    let searchQuery;
    title === "" ? searchQuery = "" : searchQuery = `&query=${title}`;

    const { data, error }: any = useData("/api/search-movies", searchQuery);
    let receivedData;
    
    if (error) return <Error/>
    if(data) {
        receivedData = data.results;
        return receivedData.map((item:any) => <MovieCard key={`movie-data${item.id}`} movieData={item}  />)
    } else if(!data) {
        if(title !== "") {
            return <Loading />
        }
        return <div>default display</div>
    }
}