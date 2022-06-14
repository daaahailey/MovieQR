/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from "@emotion/react";
import { Common } from "../styles/common";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import jwt from "jsonwebtoken";
import { useRouter } from "next/router";

export const SignInOut = ({setIsOn, isMobile}:any) => {

    const [loggedIn, setLoggedIn] = useState(false);
    const [userDidToken, setUserDidToken] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const { didToken, cookie, saveCookie, saveDidToken } = useAuth(); // to display user email faster when user sign in
    const router = useRouter();

    interface JwtPayload {
        issuer: string;
        email: string;
    }

    useEffect(() => {
        if(cookie) {
            const decodedToken = jwt.verify(cookie, process.env.NEXT_PUBLIC_JWT_SECRET as string) as JwtPayload; 
            const email = decodedToken.email;
            setUserDidToken(didToken);
            setUserEmail(email) 
            setLoggedIn(true);
        }
    }, [cookie, didToken])


    const handleSignOut = async(e:any) => {
        e.preventDefault();

        try {
            const response = await fetch("/api/logout", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${userDidToken}`,
                    "Content-Type": "application/json",
                },
            });
            const res = await response.text();
            console.log("sign out!")
            setUserEmail("");
            setUserDidToken("");
            setLoggedIn(false);
            saveCookie("");
            saveDidToken("");
        } catch(error) {
            console.error("Error signing out", error);
            router.push("/login");
        }
        router.push("/login");
        if(isMobile) {
            setIsOn(false);
        }
    }

    const handleSignIn = (e:any) => {
        e.preventDefault();
        router.push("/login")
        if(isMobile) {
            setIsOn(false);
        }
    }



    return (
        <>
            { loggedIn ? <li css={[List, UserEmail]}>{userEmail}</li> : null }
            <li css={List}>
                {
                    loggedIn ? 
                    <Link href="/login">
                        <a css={isMobile ? AMenuMobile : AMenu} onClick={handleSignOut}>Sign Out</a>
                    </Link> : 
                    <Link href="/login">
                        <a css={isMobile ? AMenuMobile : AMenu} onClick={handleSignIn}>Sign In</a>
                    </Link>
                }
            </li>
        </>
    )
}


const List = css`
    padding: 1rem;
    cursor: pointer;
    font-family: ${Common.fonts.point};
`

const UserEmail = css`
    padding-top: 1.4rem;
`

const AMenu = css`
    cursor: pointer;
    &:hover {
        color: ${Common.colors.point};
    }
`

const AMenuMobile = css`
    cursor: pointer;
    color: ${Common.colors.text};
    font-size: ${Common.fontSize.large};
    font-weight: ${Common.fontWeight.extraBold};
    line-height: 3rem;
    &:hover {
        color: ${Common.colors.point};
    }
`