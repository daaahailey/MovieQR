/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import { Common } from "../styles/common";
import React, { useState } from "react";
import { useSWRConfig } from "swr";

export const EditDeleteModal = ({ movieId, editClicked, setEditClicked, deleteClicked, setDeleteClicked, status, setStatus, postId } :any)  => {

    const [ isQuoteEmpty, setIsQuoteEmpty ] = useState(false);
    const [ updatedQuote, setUpdatedQuote ] = useState(""); 
    const { mutate } = useSWRConfig();

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
        setUpdatedQuote("");
    }

    // edit quote
    const handleEditQuote = async (event:React.MouseEvent<HTMLElement>) => {
        event.preventDefault();
        if(!updatedQuote) {
            // if quote to update is empty, display a message saying user needs to write something
            setIsQuoteEmpty(true);
        } else if(postId) {
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
                mutate(`/api/quote?all=true`);
            })
            .catch((error) => {
                console.log("fail", error);
            })
        }
    }

    // delete quote
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
            mutate(`/api/quote?all=true`);
        })
        .catch((error) => {
            console.log("fail", error);
        })

    }

    return (
        <>
        { editClicked && 
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
        </>
    )
}

const Modal = css`
    position: fixed;
    top: 50%;
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
    font-size: ${Common.fontSize.basic};
    font-weight: ${Common.fontWeight.medium};
`

const MessageRed = css`
    color: ${Common.colors.point};
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