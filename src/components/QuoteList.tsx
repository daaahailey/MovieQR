/** @jsxRuntime classic */
/** @jsx jsx */
import React, { useEffect, useState } from "react";
import { jsx, css } from '@emotion/react';
import { Common } from "../styles/common";
import { Loading } from "./Loading";
import useSWR, { useSWRConfig } from "swr";
import { fetcher } from "../utils/fetcher";


export const QuoteList = ({ movieId, title, currentUser, addedNewQuote }:any) => {

    const [ quoteData, setQuoteData ] = useState([]);
    const [ editClicked, setEditClicked ] = useState(false);
    const [ updatedQuote, setUpdatedQuote ] = useState(""); 
    const [ deleteClicked, setDeleteClicked ] = useState(false);
    const [ status, setStatus ] = useState("");
    const [ isQuoteEmpty, setIsQuoteEmpty ] = useState(false);
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

    const handleDeleteQuote = async (event:React.MouseEvent<HTMLElement>) => {
        event.preventDefault();
        console.log("delete final btn clicked")

        const response = await fetch("/api/quote", {
            method: "POST",
            headers : {
                "Content-type": "application/json",
            },
            body: JSON.stringify({
                movieId: movieId,
                quote: updatedQuote,
                status: "delete",
                postId,
            })
        })
        .then((response) => response.json())
        .then((result) => {
            console.log("success", result);
            setUpdatedQuote("");
            setDeleteClicked(false);
            mutate(`/api/quote?movieId=${movieId}`);
        })
        .catch((error) => {
            console.log("fail", error);
        })

    }


    const handleEditQuote = async (event:React.MouseEvent<HTMLElement>) => {
        event.preventDefault();
        if(!updatedQuote) {
            // if quote to update is empty, display a message saying user needs to write something
            setIsQuoteEmpty(true);
        } else {
            const response = await fetch("/api/quote", {
                method: "POST",
                headers : {
                    "Content-type": "application/json",
                },
                body: JSON.stringify({
                    movieId: movieId,
                    quote: updatedQuote,
                    status: "edit",
                    postId,
                })
            })
            .then((response) => response.json())
            .then((result) => {
                console.log("success", result);
                setUpdatedQuote("");
                setEditClicked(false);
                setIsQuoteEmpty(false);
                mutate(`/api/quote?movieId=${movieId}`);
            })
            .catch((error) => {
                console.log("fail", error);
            })
        }
    }



    const handleCancel = (event:React.MouseEvent<HTMLElement>) => {
        event.preventDefault();
        const clickedBtn = status;

        if(clickedBtn === "edit") {
            setEditClicked(false);
            setIsQuoteEmpty(false);
        } else if(clickedBtn === "delete") {
            setDeleteClicked(false);
            
        }
        setStatus("");
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
                {editClicked && 
                    <>
                        <div css={Modal}>
                            { isQuoteEmpty ? 
                                !updatedQuote ? 
                                    <p css={[MessageOnModal, MessageRed ]}>Please write quote to update.</p>
                                    : <p css={MessageOnModal}>Edit my quote</p>
                                : <p css={MessageOnModal}>Edit my quote</p>
                            }
                            <form css={EditForm}>
                                <label htmlFor="textArea"></label>
                                <textarea 
                                    css={EditFormTextArea}
                                    name="textArea"
                                    id="textArea"
                                    cols={30}
                                    rows={3}
                                    placeholder=""
                                    onChange={(event) => setUpdatedQuote(event.target.value)}
                                    value={updatedQuote}
                                    ></textarea>    
                                <div css={Buttons}>
                                    <input css={Button} type="submit" className="editCancel" value="Edit Quote" onClick={handleEditQuote}/>
                                    <input css={Button} type="submit" className="editCancel" value="Cancel" onClick={handleCancel}/>
                                </div>
                            </form>
                        </div>
                        <div css={ModalLayer}></div>
                    </>
                }
                { deleteClicked &&
                    <>
                        <div css={Modal}>
                            <p css={MessageOnModal}>Are you sure you want to delete this quote?</p>
                            <div css={Buttons}>
                                <input css={Button} type="submit" className="editCancel" value="Delete Quote" onClick={handleDeleteQuote}/>
                                <input css={Button} type="submit" className="editCancel" value="Cancel" onClick={handleCancel}/>
                            </div>
                        </div>
                        <div css={ModalLayer}></div>
                    </>

                }
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
    // margin-right: 1rem;
    // width: 8rem;
    // min-width: 8rem;
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

const Modal = css`
    position: absolute;
    bottom: 100px;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 70%;
    padding: 1.8rem;
    z-index: 40;
    background-color: white;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: black;
    border-radius: 10px;

    @media (max-width: 640px) {
        width: 80%;
    }
    @media (max-width: 490px) {
        width: 90%;
    }
`

const MessageOnModal = css`
    margin: 0.5rem 0;
    text-align: center;
    font-size: ${Common.fontSize.basic};
    font-weight: ${Common.fontWeight.medium};

`
const MessageRed = css`
    color: ${Common.colors.point};
`

const ModalLayer = css`
    position: fixed;
    background-color: black;
    top: 0;
    right: 0;
    width: 100%;
    height: 100%;
    z-index: 10;
    opacity: 0.7;
`

const EditForm = css`
    display: flex;
    flex-direction: column;
    width: 80%;
    @media (max-width: 490px) {
        width: 100%;
    }
`
const EditFormTextArea = css`
    padding: 1rem;
    font-family: ${Common.fonts.basic};
    font-size: ${Common.fontSize.basic};
`

const Buttons = css`
    margin: 0 auto;
    margin-top: 1.4rem;

    @media (max-width: 640px) {
        width: 100%;
        display: flex;
        flex-direction: column;
        box
    }
`

const Button = css`
    width: 8rem;
    margin: 0.25rem;
    padding: 0.25rem;
    color: ${Common.colors.text};
    background-color: ${Common.colors.backgroundBlack};
    padding: 0.6rem 0.4rem;
    border: none;
    border-radius: 0.5rem;
    font-weight: ${Common.fontWeight.bold};
    font-size: ${Common.fontSize.basic};
    cursor: pointer;
    &:hover {
        background-color: ${Common.colors.point};
    }

    @media (max-width: 640px) {
        width: 100%;
        margin: 0.25rem 0;
    }
`