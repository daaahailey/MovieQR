/** @jsxRuntime classic */
/** @jsx jsx */
import { useState, useEffect } from "react";
import { jsx, css } from '@emotion/react';
import { Common } from "../../styles/common";
import Link from "next/link";
import Image from 'next/image'
import { useRouter } from 'next/router';
import { magic } from "../../../lib/magic-client";

export const Navigation = () => {
    const [userName, setUserName] = useState("");
    const router = useRouter();

    useEffect( () => {
        // Assumes a user is already logged in
        const fetchData = async () => {
            try {
                const { email, issuer } = await magic.user.getMetadata();
                const didToken = await magic.user.getIdToken();
                console.log({ didToken });

                if(email) {
                    setUserName(email)
                }
            } catch(error) {
            // Handle errors if required!
                console.log(error);
            }
        }
        fetchData();
    }, [router]);

    const handleSignOut = async(e:any) => {
        e.preventDefault();
        try {  
            await magic.user.logout();
            console.log(await magic.user.isLoggedIn()); // console.log "false" when it log out
            setUserName("");
            router.push("/");
            } catch(error) {
            // Handle errors if required!
            console.log(error);
            router.push("/");
            }
    }

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
            <ul css={MenuSection}>
                <li css={List}>
                    <Link href="/login">
                        <a>{userName}</a>
                    </Link>
                </li>
                <li css={List}>
                {
                    userName? 
                    <Link href="/login">
                        <a onClick={handleSignOut}>Sign Out</a>
                    </Link> : 
                    <Link href="/login">
                        <a>Sign In</a>
                    </Link>
                }
                </li>
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
