import React from "react";
import { useData } from "../../hooks/useData";
import { Error } from "./Error";
import { Loading } from "./Loading";

interface MovieType {
    "genre_ids": [number],
    id: number,
    "original_language": string,
    "original_title": string,
    overview: string,
    popularity: number,
    "poster_path": string,
    "release_date": string,
    title: string,
    "vote_average": number,
    "vote_count": number,
}

export const Movies = ({ input }: any) => {
    const searchQuery = `&query=${input}`;
    if (input === "") {
        // if there isn't search input
        return (
            <div>
                default display
            </div>
        )
    } else {
        const { data, error } = useData(process.env.NEXT_PUBLIC_API_KEY as string, searchQuery);
        if (error) return <Error/>
        if (!data) return <Loading />
        const receivedData = data.results;
        console.log("data:",receivedData);
        // when there isn't search result
        if (receivedData.length === 0) {
          return (
            <div>Nothing Found</div>
          )
        }
          
        return (
            <div>
                {
                    receivedData.map((item: MovieType) => {
                      // console.log(`${ item["poster_path"]}`);
                        return (
                            <div key={`movie-data-${item.id}`}>
                                <p>{item.title}</p>
                                <p>{item.overview}</p>                            
                                {/* give default img if it doesn't have poster picture */}
                                {item["poster_path"] === null ? <img src="../images/movie_fallback.png" alt={`${item.title}`} />
                              : <img src={`https://image.tmdb.org/t/p/original${item["poster_path"]}`}
                                alt={`${item.title}`}
                              />}                   
                                <p>Rating: {item.vote_average}</p>
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}