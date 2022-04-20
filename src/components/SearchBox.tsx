import React from "react";
import { useState } from "react";
import { Movies } from "./Movies";
import { SearchResult } from "./SearchResult";
import Link from "next/link";
import styled from "@emotion/styled";

export const SearchBox = () => {
    const [initialValue, setInitialValue] = useState("");

    return (
        <SearchInputContainer>
            <label htmlFor="search" className="text-hide">Search Movies</label>
            <MovieSearchInput type="search" id="search" value={initialValue} placeholder="Search Movies"
                onChange={(event) => setInitialValue(event.target.value)} />
            <Link href={{
                pathname: '/movie',
                query: { title: initialValue },
            }} passHref>
                <SearchBtn>Search</SearchBtn>
            </Link>
        </SearchInputContainer>
    )
}

const SearchInputContainer = styled.div`
    width:100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
`

const MovieSearchInput = styled.input`
    width: 60%;
    height: 3rem;
    padding: 0.75rem;
    z-index: 10;
    border-radius: 0.5rem;
    border: none;
    font-size: 1rem;
`

const SearchBtn = styled.a`
    padding: 0.85rem 2rem;
    height: 3rem;
    background-color: #f70776;
    margin-left: 0.5rem;
    color: #ffffff;
    font-weight: 600;
    cursor: pointer;
    border-radius: 0.5rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
`