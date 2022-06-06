/** @jsxRuntime classic */
/** @jsx jsx */
import { useState, useEffect } from "react";
import { jsx, css } from "@emotion/react";
import { Common } from "../../styles/common";
import Link from "next/link";
import Image from "next/image"
import { useRouter } from "next/router";
import { magic } from "../../../lib/magic-client";
import { useAuth } from "../../../context/AuthContext";
import jwt from "jsonwebtoken";
// import login from "../../pages/api/login";

export const Navigation = () => {

    const [loggedIn, setLoggedIn] = useState(false);
    const [didToken, setDidToken] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const { cookie, logout } = useAuth();  // to display user email faster when user sign in
    const router = useRouter();

    interface JwtPayload {
        issuer: string;
        email: string;
    }

    useEffect(() => {
        if(cookie) {
            const decodedToken = jwt.verify(cookie, process.env.NEXT_PUBLIC_JWT_SECRET as string) as JwtPayload;  
            const email = decodedToken.email;
            setUserEmail(email);
            setLoggedIn(true)
        }
    },[cookie])


    useEffect(() => {
        const fetchData = async () => {
            const isLoggedIn = await magic.user.isLoggedIn();
            if(isLoggedIn) {
                try {
                    // Assumes a user is already logged in
                    const { email } = await magic.user.getMetadata();
                    const userDidToken = await magic.user.getIdToken();    
                    if(email) {
                        setUserEmail(email);
                        setDidToken(userDidToken);
                        setLoggedIn(true);
                    }
                } catch(error) {
                    console.log(error)
                }
            } 
            else if(!isLoggedIn) {
                setLoggedIn(false);
                setUserEmail("");
            }
        }
        fetchData();
    },[])


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
            const res = await response.text();

        } catch(error) {
            console.error("Error signing out", error);
            router.push("/login");
        }
        logout();
        router.push("/login");
        setUserEmail("");
        setLoggedIn(false);
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
                { loggedIn ?
                    <li css={List}>{userEmail}</li> 
                    : ""
                }
                <li css={List}>
                {
                    loggedIn ? 
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
