import useSWR from "swr";
import { fetcher } from "../utils/fetcher";
// import { MOVIE_SEARCH_URL } from "../constants";

export const useRandomMovie = (baseURL : string) => {
    return useSWR(`${baseURL}?${process.env.NEXT_PUBLIC_API_KEY as string}&language=en-US&page=1`, fetcher);
}
