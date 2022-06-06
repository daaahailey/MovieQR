/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from "@emotion/react";
import { Common } from "../styles/common";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { magic } from "../../lib/magic-client";
import { useAuth } from "../../context/AuthContext";
import jwt from "jsonwebtoken";
import { useRouter } from "next/router";

export const SignInOut = () => {

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
        <>  {/* display email address of signed user (if user has signed in) */}
            { loggedIn ? <li css={List}>{userEmail}</li> : null }
            <li css={List}>
                {
                    loggedIn ? 
                    <Link href="/login">
                        <a css={AMenu} onClick={handleSignOut}>Sign Out</a>
                    </Link> : 
                    <Link href="/login">
                        <a>Sign In</a>
                    </Link>
                }
            </li>
        </>
    )
}


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