/** @jsxRuntime classic */
/** @jsx jsx */
import React,{ useState, useEffect } from "react";
import { QuoteItemCard } from "./QuoteItemCard";
import { jsx, css } from '@emotion/react';
import { Common } from "../styles/common";


export const SearchedQuote = ({currentUser, searchResult, searchValue}:any) => {

    const [quoteResult, setQuoteResult] = useState([]);
    const [postToDisplay, setPostToDisplay] = useState([]);
    const [next, setNext] = useState(5);
    const postPerPage = 5;
    let arr:any = []

    const loopWithSlice = (start:any, end:any) => {
        arr = [];
        if(quoteResult.length > postPerPage) {
            const slicedPosts = quoteResult.slice(start, end);     
            if(postToDisplay) {
                arr = [...postToDisplay, ...slicedPosts];
                setPostToDisplay(arr);
            }
        }
    };

    // initial + when searchResult gets changed
    useEffect(() => { 
        if(quoteResult.length > postPerPage) {
            setPostToDisplay(quoteResult.slice(0, postPerPage))
            loopWithSlice(0, postPerPage);
        } else if(quoteResult.length <= postPerPage) {
            setPostToDisplay(quoteResult);
        }  else if(quoteResult.length === undefined) {
            setPostToDisplay([]); 
        }
        
    }, [quoteResult]) 


    // when search value gets changed, reset postToDisplay, and next value (if not, it adds up repeated data)
    useEffect(() => {
        setPostToDisplay([]);
        setNext(5);
        setQuoteResult(searchResult);
    }, [searchValue])


    const handleLoadMore = (e:any) => {
        e.preventDefault();
        loopWithSlice(next, next + postPerPage);
        setNext(next+postPerPage);
    };



    return (
        <div>
            { quoteResult ?
                postToDisplay.map((item:any) => 
                <QuoteItemCard key={item.id} quote={item.quote} userId={item.userId} movieId={item.movieId} id={item.id} email={item.userEmail} currentUser={currentUser}/> )
                : ""
            }
            { quoteResult.length === undefined || quoteResult.length === postToDisplay.length ? "" : <button type="button" css={LoadMoreButton} onClick={handleLoadMore} value="quoteMore">Load More</button>
            }
        </div>
    )
} 

const LoadMoreButton = css`
    display: flex;
    margin: 0 auto;
    padding: 0.8rem 1rem;
    border: none;
    border-radius: 8px;
    background-color: ${Common.colors.point};
    color: ${Common.colors.text};
    font-weight: ${Common.fontWeight.medium};
    cursor: pointer;
    &:hover {
        background-color: ${Common.colors.backgroundBlack};
    }
    &:active {
        transform: scale(0.98);
    }
`