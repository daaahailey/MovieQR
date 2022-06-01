import useSWR from "swr";
import { fetcher } from "../utils/fetcher";

export const useData = (url: string, searchQuery: string) => {
    return useSWR(searchQuery !== "" ? `${url}${searchQuery}` : null, fetcher);
}
