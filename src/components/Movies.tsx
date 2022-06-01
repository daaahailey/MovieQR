import React from "react";
import { useData } from "../hooks/useData";
import { Error } from "./Error";
import { Loading } from "./Loading";
import MovieCard from "./MovieCard";


export const Movies = ({title}: any) => {
    // console.log(title)
    let searchQuery;
    title === "" ? searchQuery = "" : searchQuery = title;
    const { data, error }: any = useData(searchQuery);
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