/** @jsxRuntime classic */
/** @jsx jsx */
import React, { useState } from "react";
import { jsx, css } from '@emotion/react';
import { Common } from "../styles/common";



export const InputBox = ({ menu, movieId }:any) => {
    const inputMenu = menu;
    const [initialValue, setInitialValue] = useState("");
    // console.log(inputMenu);
    console.log(movieId);
    console.log(initialValue);

    const handleSubmit = (event:any) => {
        event.preventDefault();

    }


    return ( 
        <section css={InputBoxContainer}>
            <section css={DisplayItems}>
                display quotes or reviews here
            </section>
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
                    ></textarea>
                <input css={SubmitBtn} type="submit" value={`${inputMenu === "quote" ? "Add Quote" : "Add Review"}`} onClick={handleSubmit}/>
            </form>
        </section>
    )
}


const InputBoxContainer = css`
    width: 100%;
    color: ${Common.colors.text};
`

const DisplayItems = css`
    height: 14rem;
    text-align: left;
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
    font-size: ${Common.fontSize.basic};
    padding: 1rem;
    margin-bottom: 1rem;
`

const SubmitBtn = css`
    width: 100%;
    font-weight: ${Common.fontWeight.medium};
    color: ${Common.colors.text};
    background-color: ${Common.colors.point};
    font-size: ${Common.fontSize.medium};
    border: none;
    box-sizing: border-box;
    padding: 1rem;

`