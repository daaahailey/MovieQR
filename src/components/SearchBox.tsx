/** @jsxRuntime classic */
/** @jsx jsx */
import { useState } from "react";
import Link from "next/link";
import { jsx, css } from '@emotion/react';
import { Common } from "../styles/common";

export const SearchBox = () => {
    const [initialValue, setInitialValue] = useState("");

    return (
        <div css={SearchInputContainer}>
            <label htmlFor="search" className="text-hide">Search Movies</label>
            <input css={MovieSearchInput} type="search" id="search" value={initialValue} placeholder="Search Movies"
                onChange={(event) => setInitialValue(event.target.value)} />
            <Link href={{
                pathname: '/movie',
                query: { title: initialValue },
            }} passHref>
                <a css={SearchBtn}>Search</a>
            </Link>
        </div>
    )
}

const SearchInputContainer = css`
    width:100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
`

const MovieSearchInput = css`
    width: 60%;
    height: 3rem;
    padding: 0.75rem;
    z-index: 10;
    border-radius: 0.5rem;
    border: none;
    font-size: ${Common.fontSize.basic};
`

const SearchBtn = css`
    padding: 0.85rem 2rem;
    height: 3rem;
    background-color: ${Common.colors.point};
    margin-left: 0.5rem;
    color: ${Common.colors.text};
    font-weight: ${Common.fontWeight.bold};
    cursor: pointer;
    border-radius: 0.5rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
`