/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import React, { useEffect, useState } from "react";

export const QuoteList = ({ movieId, currentUser, addedNewQuote }:any) => {

    const [ quoteData, setQuoteData ] = useState([]); 
    const [ editClicked, setEditClicked ] = useState(false);
    const [ updatedQuote, setUpdatedQuote ] = useState(""); 
    const [ deleteClicked, setDeleteClicked ] = useState(false);
    const [ status, setStatus ] = useState("");
    const [ isQuoteEmpty, setIsQuoteEmpty ] = useState(false);
    const [ postId, setPostId ] = useState("");


    // this renders all quotes
    async function fetchData() { 
        const response = await fetch(`/api/quote?movieId=${movieId}`, {
            method: "GET",
        })
        .then((response) => response.json())
        .then((result) => {
            if(result.length > 0) {
                // console.log(result);
                setQuoteData(result);
            } else if(result.length === 0) {
                console.log("there isn't any quote added yet");
            }
        })
    }

    
    useEffect(() => { 
        fetchData();
    }, []);


    if(addedNewQuote === true) {
        // if new quote gets added, fetch data again
        fetchData();
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
            fetchData(); 
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
                fetchData();
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
            <ul>
                { quoteData && quoteData.map((item:any) => {
                    const email = item.userEmail.split("@");
                    const userNickname = email[0];

                    if(currentUser && item.userId === currentUser) {
                        //if it's written by current user, add edit & delete button       
                        return (    
                            <li key={item.id}>
                                <span>{userNickname}</span>
                                {item.quote}
                                <button type="button" onClick={handleEdit} value={item.id}>Edit</button>
                                <button type="button" onClick={handleDelete} value={item.id}>Delete</button>
                            </li>
                        )

                    } else if(item.userId !== currentUser || !currentUser) {
                        return (
                            <li key={item.id}>
                                    <span>{userNickname}</span>
                                    {item.quote}
                            </li> 
                        )
                    }
                })}
                {editClicked && 
                    <>
                        <div css={Modal}>
                            { isQuoteEmpty ? 
                                !updatedQuote ? 
                                    <p css={[MessageOnEditModal, MessageRed ]}>Please write quote to update.</p>
                                    : <p css={MessageOnEditModal}>Edit my quote</p>
                                : <p css={MessageOnEditModal}>Edit my quote</p>
                            }
                            <form css={EditForm}>
                                <label htmlFor="textArea"></label>
                                <textarea 
                                    name="textArea"
                                    id="textArea"
                                    cols={30}
                                    rows={3}
                                    placeholder=""
                                    onChange={(event) => setUpdatedQuote(event.target.value)}
                                    value={updatedQuote}
                                    ></textarea>    
                                <div css={Buttons}>
                                    <input css={Button} type="submit" value="Edit Quote" onClick={handleEditQuote}/>
                                    <input css={Button} type="submit" value="Cancel" onClick={handleCancel}/>
                                </div>
                            </form>
                        </div>
                        <div css={ModalLayer}></div>
                    </>
                }
                { deleteClicked &&
                    <>
                        <div css={Modal}>
                            <p>Are you sure you want to delete this quote?</p>
                            <div css={Buttons}>
                                <input css={Button} type="submit" value="Delete Quote" onClick={handleDeleteQuote}/>
                                <input css={Button} type="submit" value="Cancel" onClick={handleCancel}/>
                            </div>
                        </div>
                        <div css={ModalLayer}></div>
                    </>

                }
            </ul>
        </div>
    )
}



const Modal = css`
    position: absolute;
    bottom: 5%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 70%;
    height: 10%;
    z-index: 50;
    background-color: white;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: black;
`
const MessageOnEditModal = css`
    margin-bottom: 1.2rem;
`
const MessageRed = css`
    color: red;
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
`

const Buttons = css`
    margin: 0 auto;
    margin-top: 1.4rem;
`

const Button = css`
width: 6rem;
margin: 0.25rem;
padding: 0.25rem;
`