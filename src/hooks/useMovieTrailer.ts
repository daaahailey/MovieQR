import useSWR from "swr";
import { fetcher } from "../utils/fetcher";

export const useMovieTrailer = (url:string, movieId:number) => {
    return useSWR(`${url}/${movieId}/videos`, fetcher);
}
