/** @jsxRuntime classic */
/** @jsx jsx */
import React, { useState, useEffect } from "react";
import { jsx, css } from "@emotion/react";
import { Common } from "../../styles/common";
import Link from "next/link";
import Image from "next/image"
import { SignInOut } from "../SignInOut";


export const Navigation = () => {

    return (
        <nav css={StyledNav}>
            <ul css={MenuSection}>
                <li css={List}>
                    <Link href="/">
                        <a>
                            <Image src="/images/logo.png" width={160} height={44} alt="app-logo"/>
                        </a>
                    </Link>
                </li>
                <li css={List}>Movies</li>
                <li css={List}>Quotes</li>
                <li css={List}>Suggestions</li>
                <li css={List}>Reviews</li>
            </ul>

            {/* area where there's sign in or sign out button  */}
            <ul css={MenuSection}>
                <SignInOut /> 
            </ul>
        </nav>
    )
};

const StyledNav = css`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;    
    font-size: ${Common.fontSize.basic};
    color: ${Common.colors.text};
    z-index: 10;
    background-color: ${Common.colors.backgroundBlack};
`

const  MenuSection = css`
    display: flex;
    flex-direction: row;
    align-items: center;
`

const List = css`
    padding: 1rem;
    font-size: 1.25rem;
    font-weight: ${Common.fontWeight.medium}
    cursor: pointer;
`