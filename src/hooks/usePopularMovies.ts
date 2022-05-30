import useSWR from "swr";
import { fetcher } from "../utils/fetcher";
import { POPULAR_MOVIES_URL } from "../constants";

export const usePopularMovies = () => {
    const API_KEY = process.env.NEXT_PUBLIC_API_KEY as string;
    return useSWR(`${POPULAR_MOVIES_URL}?${API_KEY}`, fetcher);
}
