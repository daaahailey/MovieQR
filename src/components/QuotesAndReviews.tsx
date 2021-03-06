/** @jsxRuntime classic */
/** @jsx jsx */
import { useState } from "react";
import { jsx, css } from '@emotion/react';
import { Common } from "../styles/common";
import { InputBox } from "./InputBox";


export const QuotesAndReviews = ({ movieId, title, currentUser, token }:any) => {
    const [menu, setMenu] = useState("quote");

    const handleMenuSelect = (event:any) => {
        event.preventDefault();
        const clickedMenu = event.target.value;
        setMenu(clickedMenu);
    }

    return(
        <section css={QuotesReviewSection}>
            <h2 className="text-hide">Quote and Review area</h2>
            <div css={Menu}>
                <label css={MenuItem} htmlFor="quote" className={`${menu === "quote" ? "boxOn" : ""}`}>Quote</label>
                <input type="radio" id="quote" name="menu" className="hidden" onChange={handleMenuSelect} value="quote" />
                <label css={MenuItem} htmlFor="review" className={`${menu === "review" ? "boxOn" : ""}`}>Review</label>
                <input type="radio" id="review" name="menu" className="hidden" onChange={handleMenuSelect} value="review" />
            </div> 
            <InputBox movieId={movieId} menu={`${menu === "quote" ? "quote" : "review"}`} title={title} currentUser={currentUser} token={token}/>
        </section>
    )
}


const QuotesReviewSection = css`
    padding: 2rem;
    background-color: ${Common.colors.backgroundBlack};
    color: ${Common.colors.text};
`

const Menu = css`
    display: flex;
    border-bottom: 1px solid #ffffff;
    padding-bottom: 0.75rem;
    margin-bottom: 1.8rem;
`

const MenuItem = css`
    padding: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: ${Common.fonts.point};
    font-size: ${Common.fontSize.medium};
    font-weight: ${Common.fontWeight.medium};
    cursor: pointer;
    &:nth-of-type(2) {
        margin-left: 0.5rem;
    }
`
