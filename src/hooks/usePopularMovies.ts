import useSWR from "swr";
import { fetcher } from "../utils/fetcher";

export const usePopularMovies = (url:string) => {
    return useSWR(url, fetcher);
}
