/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from '@emotion/react';

import React, { useEffect, useState } from "react";
import { InputBox } from "./InputBox";

// interface Props {
//     name: string;
//     quoteData: quoteDataData[];
// }

export const QuoteInput = ({movieId, currentUser }:any) => {
    const [ quoteData, setQuoteData ] = useState([]); 
    const [ editClicked, setEditClicked ] = useState(false);
    const [ updatedQuote, setUpdatedQuote ] = useState(""); 
    const [ postId, setPostId ] = useState("");


    // this renders all quotes
    useEffect(() => {
        async function fetchData() { 
            const response = await fetch(`/api/quote?movieId=${movieId}`, {
                method: "GET",
            })
            .then((response) => response.json())
            .then((result) => {
                if(result.length > 0) {
                    console.log(result);
                    setQuoteData(result);
                } else if(result.length === 0) {
                    console.log("there isn't any quote added yet");
                }
            })
        }
        fetchData();
        
    }, []);


    const handleEdit = (event:React.MouseEvent<HTMLElement>) => {
        event.preventDefault();
        const postId = (event.target as HTMLInputElement).value;
        setEditClicked(true);
        setPostId(postId);
    }

    const handleDelete = (event:React.MouseEvent<HTMLElement>) => {
        event.preventDefault();
    }

    const handleEditQuote = async (event:React.MouseEvent<HTMLElement>) => {
        event.preventDefault();
        // edit quote - works but after edited, 
        // it should refresh and render edited data so the edited quote displays on the screen
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
        })
        .catch((error) => {
            console.log("fail", error);
        })
    }

    const handleCancelEdit = (event:React.MouseEvent<HTMLElement>) => {
        event.preventDefault();
        setEditClicked(false);
    }


    return (
        <div>
            <ul>
                { quoteData && quoteData.map((item:any) => {
                    const email = item.userEmail.split("@");
                    const userNickname = email[0];

                    if(item.userId === currentUser) {
                        //if it's written by current user, add edit & delete button       
                        return (
            
                            <li key={item.id}>
                                <span>{userNickname}</span>
                                {item.quote}
                                <button type="button" onClick={handleEdit} value={item.id}>Edit</button>
                                <button type="button" onClick={handleDelete} value={item.id}>Delete</button>
                            </li>
                        )

                    } else if(item.userId !== currentUser) {
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
                        <div css={EditModal}>
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
                                    <input css={Button} type="submit" value="Cancel" onClick={handleCancelEdit}/>
                                </div>
                            </form>
                        </div>
                        <div css={ModalLayer}></div>
                    </>
                }
            </ul>
 
            <InputBox movieId={movieId} menu="quote" />
        </div>
    )
}



const EditModal = css`
    position: absolute;
    bottom: 5%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 70%;
    height: 10%;
    z-index: 50;
    background-color: white;

    display: flex;
    justify-content: center;
    align-items: center;

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