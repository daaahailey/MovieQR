/** @jsxRuntime classic */
/** @jsx jsx */
import React, { useEffect, useState } from "react";
import { jsx, css } from '@emotion/react';
import { Common } from "../styles/common";
import { Loading } from "./Loading";
import useSWR, { useSWRConfig } from "swr";
import { fetcher } from "../utils/fetcher";
import { EditDeleteModal } from "./EditDeleteModal";


export const QuoteList = ({ movieId, title, currentUser, addedNewQuote }:any) => {

    const [ quoteData, setQuoteData ] = useState([]);
    const [ editClicked, setEditClicked ] = useState(false);
    const [ deleteClicked, setDeleteClicked ] = useState(false);
    const [ status, setStatus ] = useState("");
    const [ postId, setPostId ] = useState("");
    // this renders all quotes
    const { data, error } = useSWR(`/api/quote?movieId=${movieId}`, fetcher);
    const { mutate } = useSWRConfig();
    
    useEffect(() => {
        if(data) {
            setQuoteData(data);
        } else if(!data) {
            setQuoteData([]);
        }
    }, [data, setQuoteData, mutate])


    if(addedNewQuote === true) {
        console.log(addedNewQuote)
        // if new quote gets added, fetch data again
        mutate(`/api/quote?movieId=${movieId}`);
    }


    const handleEdit = (event:React.MouseEvent<HTMLElement>) => {
        event.preventDefault();
        const postId = (event.target as HTMLInputElement).value;
        setEditClicked(true);
        setPostId(postId);
        setStatus("edit");
    }

    const handleDelete = async (event:React.MouseEvent<HTMLElement>) => {
        event.preventDefault();
        const postId = (event.target as HTMLInputElement).value;
        setDeleteClicked(true);
        setPostId(postId);
        setStatus("delete");
    }

    return (
        <div>
            <ul css={QuotesItemsContainer}>
            { !data ? <Loading /> :
                    quoteData.length > 0 ? quoteData.map((item:any) => {
                    const email = item.userEmail.split("@");
                    const userNickname = email[0];
                    if(currentUser && item.userId === currentUser) {
                        //if it's written by current user singed in, add edit & delete button       
                        return (    
                            <li key={item.id} css={QuoteItem}>
                                <div css={AuthorHandler}>
                                    <p css={UserName}>@{userNickname}</p>
                                    <div css={SmallButtons}>
                                        <button css={SmallBtn} type="button" onClick={handleEdit} value={item.id}>Edit</button>
                                        <button css={SmallBtn} type="button" onClick={handleDelete} value={item.id}>Delete</button>
                                    </div>
                                </div>
                                <p css={QuoteText}>{item.quote}</p> 
                            </li>
                        )
                    } else if(item.userId !== currentUser || !currentUser) {
                        return (
                            <li key={item.id} css={QuoteItemOther}>
                                    <p css={UserName}>@{userNickname}</p>
                                    <p>{item.quote}</p> 
                            </li> 
                        )
                    } 
                }) : 
                <li css={DefaultMessage}>
                    <p>There isn&apos;t any quote added yet.</p>
                    <p>Be the first one to leave a quote from <strong css={StrongText}>{title}</strong>.</p>
                </li>
            }
                <EditDeleteModal 
                    movieId={movieId}
                    editClicked={editClicked}
                    setEditClicked={setEditClicked} 
                    deleteClicked={deleteClicked}
                    setDeleteClicked={setDeleteClicked}
                    status={status}
                    setStatus={setStatus}
                    postId={postId}
                    /> 
            </ul>
        </div>
    )
}


const QuotesItemsContainer = css`
    margin-bottom: 2rem;
`

const QuoteItem = css`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    line-height: 1.5rem;
    margin: 1rem 0;
`
const AuthorHandler = css`
    width: 100%;
    display: flex;
    justify-content: space-between;
`

const QuoteItemOther = css`
    width: 100%;
    display: flex;
    flex-direction: column;
    line-height: 1.5rem;
    margin: 1rem 0;
`

const QuoteText = css`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
`

const UserName = css`
    font-weight: ${Common.fontWeight.medium};
`

const SmallButtons = css`
    display: flex;
    min-width: 8rem;
    justify-content: flex-end;
`

const SmallBtn = css`
    border: none;
    padding: 0.3rem 0.5rem;
    margin-left: 0.4rem;
    border-radius: 6px;
    color: white;
    background-color: transparent;
    cursor: pointer;
    &: hover {
        background-color: ${Common.colors.pointDark};
    }
`

const DefaultMessage = css`
    p {
        line-height: 1.4rem;
    }
`
const StrongText = css`
    font-weight: ${Common.fontWeight.bold};
`