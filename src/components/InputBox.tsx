/** @jsxRuntime classic */
/** @jsx jsx */
import React, { useState } from "react";
import { jsx, css } from '@emotion/react';
import { Common } from "../styles/common";
import { QuoteList } from "./QuoteList";
import { ReviewList } from "./ReviewList";
import { useRouter } from 'next/router'


export const InputBox = ({ movieId, title, menu, currentUser, token }:any) => {
    const inputMenu = menu;
    const [initialValue, setInitialValue] = useState("");
    const [ addedNewQuote, setAddedNewQuote ] = useState(false);
    const [ userNotSignedIn, setUserNotSignedIn ] =useState(false);
    const [ inputEmptyMessage, setInputEmptyMessage ] = useState(false);
    const router = useRouter()


    // this creates a new quote or review
    const handleSubmit =  async (event:any) => {
        event.preventDefault();
        if(!initialValue) {
            // if input is empty, display a message     
            if(!token) {
                // if user hasn't signed in, display message that user have to sign in first
                setUserNotSignedIn(true);
            } else if(token) {
                // if user has signed in, display message that user have to write something
                setInputEmptyMessage(true);
            }
        } else if(initialValue) {
            if(inputMenu === "quote") {
                // if user selected quote, add quote
                const response = await fetch("/api/quote", {
                    method: "POST",
                    headers : {
                        "Content-type": "application/json",
                    },
                    body: JSON.stringify({
                        movieId: movieId,
                        quote: initialValue,
                        status: "create",
                    })
                })
                .then((response) => {
                    response.json();
                    if(response.status === 403) {
                        // no token
                        setUserNotSignedIn(true);
                    };
                })
                .then((result) => {
                    console.log("success", result);
                    setInitialValue("");
                    setAddedNewQuote(true);
                })
                .catch((error) => {
                    console.log("fail", error);
                })
            } else if(inputMenu === "review") {
                console.log("review", initialValue);
            }
        }
        setAddedNewQuote(false);
    }


    const handleOkayBtn = (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault();
        setUserNotSignedIn(false);
        setInputEmptyMessage(false);
    }

    const handleSignIn = (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault();
        setUserNotSignedIn(false);
        router.push("/login");
    }



    return (  
        <article css={InputBoxContainer}>
            <h3 className="text-hide">Write Quotes here</h3>
            { menu === "quote" ? 
            <QuoteList movieId={movieId} title={title} currentUser={currentUser} addedNewQuote={addedNewQuote}/>
            : <ReviewList movieId={movieId} />
            }
            <form css={TextForm}>
                <label css={InputLabel} htmlFor="textArea"></label>
                <textarea 
                    css={QuoteTextArea}
                    name="textArea"
                    id="textArea"
                    cols={30}
                    rows={2}
                    placeholder={inputMenu === "quote" ? "Share your favourite quote from the movie!" : "Share your thoughts about the movie!"}
                    onChange={(event) => setInitialValue(event.target.value)}
                    value={initialValue}
                    >{initialValue}</textarea>
                <input css={SubmitBtn} type="submit" value={`${inputMenu === "quote" ? "Add Quote" : "Add Review"}`} onClick={handleSubmit}/>
            </form>

            { userNotSignedIn &&
                <>
                    <div css={Modal}>
                        <p css={MessageOnModal}>Please sign in if you would like to write something!</p>
                        <div css={Buttons}>                 
                            <input css={Button} type="button" value="Okay" onClick={handleOkayBtn}/>
                            <input css={Button} type="button" value="Sign In" onClick={handleSignIn}/>
                        </div>
                    </div>
                    <div css={ModalLayer}></div>
                </>
            }
            { inputEmptyMessage &&
                <>
                    <div css={Modal}>
                        <p css={MessageOnModal}>Please write something!</p>
                        <div css={Buttons}>
                            <input css={Button} type="button" value="Okay" onClick={handleOkayBtn}/>
                        </div>
                    </div>
                    <div css={ModalLayer}></div>
                </>
            }
        </article>

    )
}


const InputBoxContainer = css`
    position: relative;
    width: 100%;
    color: ${Common.colors.text};
`

const TextForm = css`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

const InputLabel = css`
    width: 100%;
`

const QuoteTextArea = css`
    width: 100%;
    padding: 1rem;
    margin-bottom: 1rem;
    font-family: ${Common.fonts.basic};
    font-size: ${Common.fontSize.basic};
`

const SubmitBtn = css`
    width: 100%;
    padding: 1rem;
    border: none;
    cursor: pointer;
    font-family: ${Common.fonts.point};
    font-weight: ${Common.fontWeight.medium};
    color: ${Common.colors.text};
    background-color: ${Common.colors.pointDark};
    font-size: ${Common.fontSize.medium};
    &:hover {
        background-color: ${Common.colors.point};
    }
`

const Modal = css`
    position: absolute;
    bottom: 100px;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 70%;
    padding: 1.8rem;
    z-index: 40;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    font-weight: ${Common.fontWeight.medium};
    color: ${Common.colors.backgroundBlack};
    background-color: ${Common.colors.text};

    @media (max-width: 640px) {
        width: 80%;
    }
    @media (max-width: 490px) {
        width: 90%;
    }
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

const MessageOnModal = css`
    margin: 0.5rem 0;
    text-align: center;
`

const Buttons = css`
    margin: 0 auto;
    margin-top: 1.4rem;
`

const Button = css`
    width: 6rem;
    margin: 0.25rem;
    padding: 0.6rem 0.4rem;
    border: none;
    cursor: pointer;
    color: ${Common.colors.text};
    font-weight: ${Common.fontWeight.bold};
    font-size: ${Common.fontSize.basic};
    background-color: ${Common.colors.backgroundBlack};
    &:hover {
        background-color: ${Common.colors.point};
    }
`