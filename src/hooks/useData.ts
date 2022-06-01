import useSWR from "swr";
import { fetcher } from "../utils/fetcher";

export const useData = (searchQuery: string) => {
    return useSWR(searchQuery !== "" ? `/api/search/${searchQuery}`: null, fetcher);
}
