/** @jsxRuntime classic */
/** @jsx jsx */
import React, { useState, useEffect } from "react";
import { QuoteItemCard } from "./QuoteItemCard"
import { jsx, css } from '@emotion/react';
import { Common } from "../styles/common";


export const LoadQuote = ({currentUser, data}:any) => {
    const [postToDisplay, setPostToDisplay] = useState([]);
    const [next, setNext] = useState(5);
    const postPerPage = 5;
    let arr:any = []

    const loopWithSlice = (start:any, end:any) => {
        if(data) {
            const slicedPosts = data.slice(start, end);        
            if(postToDisplay) {
                arr = [...postToDisplay,...slicedPosts];
                setPostToDisplay(arr);
            }
        }
    };

    // initial + when data gets changed 
    useEffect(() => {
        if(data) {
            setPostToDisplay(data.slice(0, postPerPage)) 
            loopWithSlice(0, postPerPage); 
        }
    }, [data]);


    const handleLoadMore = (e:any) => {
        e.preventDefault();
        loopWithSlice(next, next + postPerPage);
        setNext(next+postPerPage)
    };



    return (
        <div>
            { data ?
                postToDisplay.map((item:any) => 
                <QuoteItemCard key={item.id} quote={item.quote} userId={item.userId} movieId={item.movieId} id={item.id} email={item.userEmail} currentUser={currentUser}/> )
                : ""
            }
            { data.length === postToDisplay.length? "" : <button type="button" css={LoadMoreButton} onClick={handleLoadMore} value="quoteMore">Load More</button>
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
`