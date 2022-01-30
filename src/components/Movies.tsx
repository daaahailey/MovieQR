import React from "react";
import { useData } from "../hooks/useData";
import { Error } from "./Error";
import { Loading } from "./Loading";
import MovieCard from "./MovieCard";


export const Movies = ({ input }: any) => {
    let searchQuery;
    input === "" ? searchQuery = "" : searchQuery = `&query=${input}`;
    const { data, error }: any = useData(searchQuery);
    let receivedData;
    if (error) return <Error/>
    if(data) {
        receivedData = data.results;
        return receivedData.map((item:any) => <MovieCard key={`movie-data${item.id}`} movieData={item}  />)
    } else if(!data) {
        if(input !== "") {
            return <Loading />
        }
        return <div>default display</div>
    }
}