import useSWR from "swr";
import { fetcher } from "../utils/fetcher";
import { MOVIE_SEARCH_URL } from "../constants";

export const useData = (apiKey: string, path: string) => {
    return useSWR(`${MOVIE_SEARCH_URL}${apiKey}${path}`, fetcher)
}