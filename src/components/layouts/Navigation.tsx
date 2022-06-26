/** @jsxRuntime classic */
/** @jsx jsx */
import React, { useState, useEffect } from "react";
import { jsx, css } from "@emotion/react";
import { Common } from "../../styles/common";
import Link from "next/link";
import Image from "next/image"
import { SignInOut } from "../SignInOut";
import { HamburgerMenu } from "../HamburgerMenu";


export const Navigation = () => {

    const [isMobile, setIsMobile] = useState(false);
    const [screenSize, setScreenSize] = useState(0);


    useEffect(() => {
        if(typeof window !== "undefined") {
            const setDefaultSize = function() {
                setScreenSize(window.innerWidth);
                if(screenSize < 790) {
                    setIsMobile(true);
                } else {
                    setIsMobile(false);
                }
            }
            setDefaultSize();
            window.addEventListener("resize", setDefaultSize);
            return () => window.removeEventListener("resize", setDefaultSize)
        }  
    })


    return (
        <nav css={StyledNav}>
            <ul css={MenuSection}>
                <li css={List}>
                    <Link href="/">
                        <a>
                            <Image src="/images/logo.png" width={160} height={44} alt="app-logo" objectFit="contain"/>
                        </a>
                    </Link>
                </li>
                { !isMobile &&
                <>
                    <li css={List}>
                        <Link href="/quotes">
                            <a css={AMenu}>Quotes</a>
                        </Link>
                    </li>
                    {/* <li css={List}>
                        <Link href="/reviews">
                            <a css={AMenu}>Reviews</a>
                        </Link>
                    </li> */}
                </> 
                }
            </ul>
            <ul css={MenuSection}>
            { isMobile ?  <HamburgerMenu isMobile={isMobile} /> : <SignInOut />}
            </ul>
        </nav>
    )
};

const StyledNav = css`
    width: 100%;
    display: flex;
    justify-content: space-between;   
    color: ${Common.colors.text}; 
    font-family: ${Common.fonts.point};
    font-size: ${Common.fontSize.basicStrong};
    background-color: ${Common.colors.backgroundBlack};
`

const MenuSection = css`
    display: flex;
    align-items: center;
`

const List = css`
    padding: 1rem;
    cursor: pointer;
`

const AMenu = css`
    cursor: pointer;
    &:hover {
        color: ${Common.colors.point};
    }
`