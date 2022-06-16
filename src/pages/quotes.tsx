/** @jsxRuntime classic */
/** @jsx jsx */
import React from "react";
import type { NextPage } from "next";
import { fetcher } from "../utils/fetcher";
import useSWR from "swr";
import { jsx, css } from '@emotion/react';
import { Common } from "../styles/common";
import { useEffect, useState } from "react";
import { QuoteItemCard } from "../components/QuoteItemCard";
import { useAuth } from "../../context/AuthContext";
import jwt from "jsonwebtoken";


const Quotes: NextPage = () => {
    const { data, error } = useSWR(`/api/quote?all=true`, fetcher);
    const { cookie } = useAuth();
    const [ currentUser, setCurrentUser ] = useState("");
    const [ initialValue, setInitialValue ] = useState("");
    const [ searchValue, setSearchValue ] = useState("");
    const [ searchResult, setSearchResult ] = useState<any>({});

    
    interface JwtPayload {
        issuer: string;
        email: string;
    }

    useEffect(() => {
        if(cookie) {
            const decodedToken = jwt.verify(cookie, process.env.NEXT_PUBLIC_JWT_SECRET as string) as JwtPayload;   
            setCurrentUser(decodedToken.issuer);
        }
    }, []);


    const handleSearchQuote = () => {
        const hasWord = (str:any, word:any) => {
            const sentence = str.toLowerCase().replace(/[^\w\s]/gi, "");
            const isIncluded = sentence.includes(word);
            return isIncluded;
            
        }

        if(data) {
            if(initialValue) {
                setSearchValue(initialValue);
                let find = data.filter((item:any) => {
                    const string = item.quote;
                    let result = hasWord(string, initialValue);
                    if(result === true) {
                        return string;                        
                    }
                })
                if(find.length > 0) {
                    setSearchResult(find);
                } else {
                    setSearchResult({});
                }
            } else if(initialValue === "") {
                setSearchResult(data); // if user doesn't type anything but click search, reset the result
                setSearchValue("");
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
                
                {/* <div>
                    sort by - newest / oldest 
                </div> */}
            </section>
            <section css={QuotesContainer}>
                <h2 className="text-hide">Quotes posted on MovieQR</h2>
                {searchValue && <p>Search result of {searchValue}</p>}
                {
                    searchValue ?
                        searchResult.length > 0 ?
                        searchResult.map((item:any) => 
                        <QuoteItemCard key={item.id} quote={item.quote} userId={item.userId} movieId={item.movieId} email={item.userEmail} currentUser={currentUser}/> )
                        : ""
                    : data ? data.map((item:any) => 
                        <QuoteItemCard key={item.id} quote={item.quote} userId={item.userId} movieId={item.movieId} email={item.userEmail} currentUser={currentUser}/> )                  
                        : ""    
                }
            </section>
        </main>
    )
}



export default Quotes;

const MainArea = css`
    min-height: 100vh;
    // background-color: ${Common.colors.backgroundGray};
    height: 100%;
    padding: 3rem;
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
`

const QuotesContainer = css`
    width: 100%;
`