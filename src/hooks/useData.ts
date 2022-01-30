import useSWR from "swr";
import { fetcher } from "../utils/fetcher";
import { MOVIE_SEARCH_URL } from "../constants";


export const useData = (searchQuery: string) => {
    return useSWR(searchQuery !== "" ? `${MOVIE_SEARCH_URL}${process.env.NEXT_PUBLIC_API_KEY as string}${searchQuery}`: null, fetcher);
}
