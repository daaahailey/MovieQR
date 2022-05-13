/** @jsxRuntime classic */
/** @jsx jsx */
import { useState } from "react";
import { InputBox } from "./InputBox";
import { jsx, css } from '@emotion/react';
import { Common } from "../styles/common";


export const QuotesAndReviews = () => {
    const [menu, setMenu] = useState("quote");

    const handleMenuSelect = (event:any) => {
        // console.log(event.target.value);
        event.preventDefault();
        const clickedMenu = event.target.value;
        setMenu(clickedMenu);
    }

    return(
        <section css={QuotesReviewSection}>
            <div css={Menu}>
                <label css={MenuItem} htmlFor="quote" name="menu" className={`${menu === "quote" ? "boxOn" : ""}`}>Quote</label>
                <input type="radio" id="quote" name="menu" className="hidden" onChange={handleMenuSelect} value="quote" />
                <label css={MenuItem} htmlFor="review" name="menu" className={`${menu === "review" ? "boxOn" : ""}`}>Review</label>
                <input type="radio" id="review" name="menu" className="hidden" onChange={handleMenuSelect} value="review" />
            </div>
            <InputBox menu={menu}/>
        </section>
    )
}


const QuotesReviewSection = css`
    padding: 2rem;
    background-color: ${Common.colors.backgroundBlack}
`

const Menu = css`
    display: flex;
    color: ${Common.colors.text}
    border-bottom: 1px solid #ffffff;
    padding-bottom: 0.5rem;
    margin-bottom: 1.8rem;
`

const MenuItem = css`
    padding: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: ${Common.fontSize.medium};
    font-weight: ${Common.fontWeight.medium};
    cursor: pointer;
    &:nth-child(3) {
        margin-left: 0.5rem;
    }
`
