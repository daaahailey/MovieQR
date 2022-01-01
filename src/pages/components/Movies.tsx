import React from "react"
import axios from "axios";
import useSWR from "swr";

const MOVIE_SEARCH_URL = "https://api.themoviedb.org/3/search/movie?";

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

const fetcher = (url: string) => axios.get(url).then(res => res.data);
const useData = (apiKey: string, path: string) => {
    return useSWR(`${MOVIE_SEARCH_URL}${apiKey}${path}`, fetcher)
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
        if (error) return <div>Error</div>
        if (!data) return <div>Loading</div>
        const receivedData = data.results;
        console.log(receivedData);

        return (
            <div>
                {
                    receivedData.map((item: MovieType) => {
                        return (

                            <div key={`movie-data-${item.id}`}>
                                <p>{item.title}</p>
                                <p>{item.overview}</p>
                                <img src={`https://image.tmdb.org/t/p/w500/${item["poster_path"]}`} alt="item.title" />
                                <p>Rating: {item.vote_average}</p>
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}