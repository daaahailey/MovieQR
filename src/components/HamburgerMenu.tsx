/** @jsxRuntime classic */
/** @jsx jsx */
import React, { useState } from "react";
import { jsx, css } from "@emotion/react";
import { Common } from "../styles/common";
import { BiMenuAltRight } from "react-icons/bi";
import Link from "next/link";
import { SignInOut } from "./SignInOut";

export const HamburgerMenu = ({isMobile}:any) => {
    const [ isOn, setIsOn ] = useState(false);

    const handleMenuClick = (e:any) => {
        e.preventDefault();
        setIsOn(true);
    }

    const handleClose = (e:any) => {
        e.preventDefault();
        setIsOn(false);
    }

    return (
        <>
            <ul css={MenuSection}>
                <li>
                    <button css={HamburgerButton} onClick={handleMenuClick}>
                        <BiMenuAltRight />
                    </button>
                </li>
                
            </ul>
            { isOn && 
                <ul css={Modal}>
                    <li>
                        <button onClick={handleClose}>close</button>
                    </li>
                    <SignInOut setIsOn={setIsOn} isMobile={isMobile}/>
                    <li css={List}>Movies</li>
                    <li css={List}>Quotes</li>
                    <li css={List}>Suggestions</li>
                    <li css={List}>Reviews</li>
                </ul>
            }    
        </>
    )
}

const MenuSection = css`
    display: flex;
    flex-direction: row;
    align-items: center;
`

const HamburgerButton = css`
    background-color: transparent;
    border: none;
    color: white;
    font-size: 2rem;
    padding: 1rem;
    cursor: pointer;
`
const Modal = css`
    position: fixed;
    top: 0;
    right: 0;
    width: 100%;
    height: 40%;
    background: black;
    z-index: 20;
`

const List = css`
    padding: 1rem;
    font-size: 1.25rem;
    font-weight: ${Common.fontWeight.medium}
    cursor: pointer;
`

const AMenu = css`
    cursor: pointer;
    &:hover, &:active {
        color: ${Common.colors.point};
    }
`