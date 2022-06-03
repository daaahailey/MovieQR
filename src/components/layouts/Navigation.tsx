/** @jsxRuntime classic */
/** @jsx jsx */
import { useState, useEffect } from "react";
import { jsx, css } from '@emotion/react';
import { Common } from "../../styles/common";
import Link from "next/link";
import Image from 'next/image'
import { useRouter } from 'next/router';
import { magic } from "../../../lib/magic-client";
import { useAuth } from "../../../context/AuthContext";

export const Navigation = () => {
    const [signedUser, setSignedUser] = useState(""); // get user email
    const [ didToken, setDidToken] = useState("");
    const router = useRouter();
    const { user, isLoggedIn, login, logout } = useAuth(); // to display user email faster when user sign in

    useEffect( () => {
        // Assumes a user is already logged in
        const fetchData = async () => {
            try {
                const { email } = await magic.user.getMetadata();
                const userDidToken = await magic.user.getIdToken();    
                if(email) {
                    login(email);
                    setSignedUser(email);
                    setDidToken(userDidToken);
                }
            } catch(error) {
                // Handle errors if required!
                console.log(error);
            }
        }
        fetchData();
    }, [router, login]);


    const handleSignOut = async(e:any) => {
        e.preventDefault();

        try {
            const response = await fetch("/api/logout", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${didToken}`,
                    "Content-Type": "application/json",
                },
            });
            const res = await response.json();
        } catch(error) {
            console.error("Error signing out", error);
            router.push("/login");
        }
        logout();
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

            {/* area where there's sign in or sign out button  */}
            <ul css={MenuSection}>
                {/* display email address of signed user (if user has signed in) */}
                { isLoggedIn ?
                    <li css={List}>{user}</li> 
                    : null
                }
                <li css={List}>
                {
                    isLoggedIn ? 
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
