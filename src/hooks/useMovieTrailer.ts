// https://api.themoviedb.org/3/movie/{movie_id}/videos?api_key=<<api_key>>&language=en-US

import useSWR from "swr";
import { fetcher } from "../utils/fetcher";
import { MOVIE_DETAIL_URL } from "../constants";

const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

export const useMovieTrailer = (movieId:number) => {
    return useSWR(`${MOVIE_DETAIL_URL}/${movieId}/videos?${API_KEY as string}`, fetcher);
}
