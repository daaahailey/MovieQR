/** @jsxRuntime classic */
/** @jsx jsx */
import React, { useEffect, useState } from "react";
import type { NextPage } from "next";
import { fetcher } from "../utils/fetcher";
import useSWR from "swr";
import { jsx, css } from '@emotion/react';
import { Common } from "../styles/common";
// import { QuoteItemCard } from "../components/QuoteItemCard";
import { useAuth } from "../../context/AuthContext";
import jwt from "jsonwebtoken";
import { Loading } from "../components/Loading";
import { SearchedQuote } from "../components/SearchedQuote";
import { LoadQuote } from "../components/LoadQuote";


const Quotes: NextPage = () => {
    const { data, error } = useSWR(`/api/quote?all=true`, fetcher);
    const { cookie } = useAuth();
    const [currentUser, setCurrentUser] = useState("");
    const [initialValue, setInitialValue] = useState("");
    const [searchValue, setSearchValue] = useState("");
    const [searchResult, setSearchResult] = useState<any>({});

    interface JwtPayload {
        issuer: string;
        email: string;
    }
    // to get current user issuer - to handle edit/delete post
    useEffect(() => {
        if(cookie) {
            const decodedToken = jwt.verify(cookie, process.env.NEXT_PUBLIC_JWT_SECRET as string) as JwtPayload;   
            setCurrentUser(decodedToken.issuer);
        }
    }, []);


    const hasWord = (str:any, word:any) => {
        const sentence = str.toLowerCase().replace(/[^\w\s]/gi, "");
        const isIncluded = sentence.includes(word);
        return isIncluded;   
    }

    const handleSearchQuote = () => {
        if(data) { // whole quote data
            if(initialValue) {  // search initial
                const searchedWord = initialValue.toLowerCase();
                setSearchValue(searchedWord); // save it as searchValue using setSearchValue usesState
                let find = data.filter((item:any) => {
                    const string = item.quote;
                    let result = hasWord(string, searchedWord);
                    if(result === true) {
                        return string;                        
                    }
                }) 
                if(find.length > 0) { // if there's search result and it's more than one,
                    setSearchResult(find);  // save it as searchResult
                } else {
                    setSearchResult({}); // no search result, then save empty result to searchResult ( searchResult = {})
                }
            } else if(initialValue === "") {
                setSearchValue(initialValue);
                setSearchResult(data); // reset result if there isn't search value
            }
        }
        setInitialValue("");
    }

    const handleEnterClick = (e:any) => {
        e.preventDefault();
        if(e.key === "Enter" || e.keyCode === 13) {
            handleSearchQuote();
        }
    }



    return (
        <main css={MainArea}>
            <h1 className="text-hide">Quotes page</h1>
            <section css={FilterBy}>
                <h2 className="text-hide">Search or filter quote</h2>
                <div css={Search}>
                    <input type="search" placeholder="Search quote" css={SearchInput} value={initialValue} onChange={(e) => setInitialValue(e.target.value)} onKeyUp={handleEnterClick} />
                    <input type="button" value="Search" css={SearchButton} onClick={handleSearchQuote} />
                </div>
            </section>           
            <section css={QuotesContainer}>
                <h2 className="text-hide">Quotes posted on MovieQR</h2>
                {searchValue && <p>Search result of {searchValue}</p>}
                { data ? 
                    searchValue ?
                    <SearchedQuote currentUser={currentUser} searchResult={searchResult} searchValue={searchValue} /> 
                    : <LoadQuote currentUser={currentUser} data={data} />
                : <Loading />
                }
            </section>
        </main>
    )
}

const MainArea = css`
    min-height: 100vh;
    height: 100%;
    padding: 3rem;
    @media(max-width: 490px) {
        padding: 1rem;
    }
`

const FilterBy = css`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 2rem 0;
`

const Search = css`
    width: 100%;
    display: grid;
    grid-template-columns: auto 120px;
    gap: 0.5rem;
`

const SearchInput = css`
    border: 1px solid black;
    padding: 1rem;
    font-size: ${Common.fontSize.basic};
`

const SearchButton = css`
    border: none;
    padding: 1rem;
    border-radius: 5rem;
    cursor: pointer;
    background-color: ${Common.colors.point};
    color: ${Common.colors.text};
    font-weight: ${Common.fontWeight.medium};
    letter-spacing: 1px;
    &:hover {
        background-color: ${Common.colors.backgroundBlack};
    }
    &:active {
        transform: scale(0.98);
    }
`

const QuotesContainer = css`
    width: 100%;
    margin-bottom: 1rem;
`

export default Quotes;