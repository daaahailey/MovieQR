/** @jsxRuntime classic */
/** @jsx jsx */
import React, { useState } from "react";
import { jsx, css, keyframes } from "@emotion/react";
import { Common } from "../styles/common";
import { IoMdClose} from "react-icons/io";
import { IoMdMenu } from "react-icons/io";
import Link from "next/link";
import { SignInOut } from "./SignInOut";
import { useRouter } from "next/router";


export const HamburgerMenu = ({isMobile}:any) => {


    const [ isOn, setIsOn ] = useState(false);
    const router = useRouter();

    const handleHamburgerMenuClick = (e:any) => {
        e.preventDefault();
        setIsOn(true);
        
    }

    const handleClose = (e:any) => {
        e.preventDefault();
        setIsOn(false);

    }

    const handlePageMenuClick = (e:any) => {
        e.preventDefault();
        const page = e.target.value;

        if(page === "quotes") {
            router.push("/quotes");
        } else if(page === "reviews") {
            router.push("/reviews");
        }
        setIsOn(false);
    }

    return (
        <>
            <ul>
                <li css={List}>
                    <button css={HamburgerButton} onClick={handleHamburgerMenuClick} value="hamburger">
                        <IoMdMenu />
                    </button>
                </li>
                
            </ul>
            { isOn && 
                <ul css={Modal}> 
                    <li css={CloseButtonContainer}>
                        <button css={CloseButton} onClick={handleClose}>
                            <IoMdClose />
                        </button>
                    </li>
                    <div css={MenusContainer}>
                        <SignInOut setIsOn={setIsOn} isMobile={isMobile}/>
                        <li css={List}>
                            <button css={AMenu} onClick={handlePageMenuClick} value="reviews">Reviews</button>
                        </li>
                        <li css={List}>
                            <button css={AMenu} onClick={handlePageMenuClick} value="quotes">Quotes</button>
                        </li> 
                    </div>
                    
                </ul>
            }    
        </>
    )
}


const slide = keyframes`
    0% {
        top: -5%;
        background-color: ${Common.colors.backgroundGray};
    }
    20% {
        background-color: ${Common.colors.backgroundGray};
    }
    100% {
        top: 0%;
        background-color: ${Common.colors.backgroundBlack};
    }
`

const modalLine = keyframes`
    0% {
        right: 100%;
        background: transparent;
        background: ${Common.colors.point};
    }
    100% {
        right: 0;
        background: ${Common.colors.point};
    }
`

const HamburgerButton = css`
    display: flex;
    background-color: transparent;
    border: none;
    color: ${Common.colors.text};
    font-size: 3rem;
    cursor: pointer;
    padding: 0;
    &:hover {
        color: ${Common.colors.point};
    }
`

const CloseButtonContainer = css`
    display:flex;
    justify-content: flex-end;
`

const CloseButton = css`
    cursor: pointer;
    background-color: transparent;
    border: none;
    color: ${Common.colors.text};
    font-size: ${Common.fontSize.extraLarge};
    padding: 1rem;
    &:hover {
        color: ${Common.colors.point};
    }
`

const Modal = css`
    position: fixed;
    right: 0;
    width: 100%;
    z-index: 30;
    padding-bottom: 0.4rem;
    animation: ${slide} 1s ease forwards; 
    &::before {
        content: "";
        position: absolute;
        bottom: -2px;
        width: 100%;
        height: 2px;
        animation: ${modalLine} 1.4s ease forwards; 
        animation-delay: 0.2s;
    }
`

const List = css`
    padding: 1rem;
    font-weight: ${Common.fontWeight.medium}
    width: 100%;
`

const MenusContainer = css`
    display: flex;
    flex-direction: column-reverse;
    text-align: center;
    margin-bottom: 2rem;
`

const AMenu = css`
    cursor: pointer;
    background-color: transparent;
    border: none;
    padding: 0;
    color: ${Common.colors.text};
    font-size: ${Common.fontSize.large};
    font-weight: ${Common.fontWeight.extraBold};
    line-height: 3rem;
    &:hover {
        color: ${Common.colors.point};
    }
`