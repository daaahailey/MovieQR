import useSWR from "swr";
import { fetcher } from "../utils/fetcher";
// import { MOVIE_SEARCH_URL } from "../constants";

const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
// console.log(API_KEY);

export const useRandomMovie = (baseURL : string) => {
    return useSWR(`${baseURL}?${API_KEY as string}`, fetcher);
}
