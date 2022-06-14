/** @jsxRuntime classic */
/** @jsx jsx */
import Head from 'next/head';
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { jsx, css } from '@emotion/react';
import { Common } from "../styles/common";
import { magic } from '../../lib/magic-client';

const Login = () => {
    const [userMessage, setUserMessage] = useState("");
    const [email, setEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const emailRegex = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;

    const handleEmailInput = (event:any) => {
        event.preventDefault();
        const email = event.target.value;
        setEmail(email);
        const isValid = emailRegex.test(email);
        if(isValid) {
            setUserMessage("");
        } 
    }

    const handleLogin = async (event:any) => {
        event.preventDefault();
        const isValid = emailRegex.test(email);
        if(email) {
            // route to dashboard
            if(isValid) {
                console.log("route to dashboard");
                setUserMessage("");
                setIsLoading(true);
                // log in a user by their email
                try {
                    if(magic) {
                        const didToken = await magic.auth.loginWithMagicLink({ email, });
                        // console.log({ didToken });
                        if(didToken) {
                            const response = await fetch("/api/login", {
                                method: "POST",
                                headers : {
                                    Authorization: `Bearer ${didToken}`,
                                    "Content-type": "application/json",
                                }
                            })
                            
                            const loggedInResponse = await response.json();
                            if(loggedInResponse.done) {
                                // console.log({loggedInResponse});
                                router.push("/");
                                setIsLoading(false);
                            } else {
                                setIsLoading(false);
                                setUserMessage("Something went wrong logging in")
                            }
                        }
                    }
                    console.log("login done") 
                } catch(error) {
                    // Handle errors if required!
                    console.log("Something went wrong", error);
                    setEmail("");
                    setIsLoading(false);
                }   
                
            } else {
                setUserMessage("Enter a valid email address")
                setEmail("");
                setIsLoading(false);
            }
        } else {
            setUserMessage("Enter a valid email address")
            setEmail("");
            setIsLoading(false);
        }
    }


    return <>
                <Head>
                    <title>Movie QR Sign In</title>
                </Head>
                <main css={StyledMain}>
                    <section css={SignInContainer}>
                        <h1 css={SignInText}>Sign In</h1>
                        <input css={EmailInput} type="text" placeholder="Email Address" value={email} onChange={handleEmailInput}/>
                        <p css={LoginErrorMessage}>{userMessage}</p>
                        <button css={SignInButton} onClick={handleLogin}>
                            {isLoading? "Loading..." : "Sign In"}
                        </button>
                    </section>
                </main>
            </>
}

export default Login;

const StyledMain = css`
    display: flex;
    align-items: center;
    min-height: 80vh;
`

const SignInContainer = css`
    display: flex;
    flex-direction: column;
    width: 24rem;
    text-align: center;
    margin: 0 auto;

    @media (max-width: 490px) {
        width: 80%;
    }
` 

const SignInText = css`
    margin-bottom: 1.5rem;
    font-family: ${Common.fonts.point};
    font-size: ${Common.fontSize.large};
    font-weight: ${Common.fontWeight.bold}; 
`

const EmailInput = css`
    height: 2.75rem;
    padding: 1rem;
    margin-bottom: 0.5rem;
    border: 1px solid black;
    border-radius: 0.5rem;
    font-size: ${Common.fontSize.basic};
`

const LoginErrorMessage = css`
    color: ${Common.colors.point};
    font-weight: ${Common.fontWeight.medium};
`

const SignInButton = css`
    height: 2.8rem;
    margin-top: 0.8rem;
    border: none;
    border-radius: 0.5rem;
    cursor: pointer;
    background-color: ${Common.colors.point};
    color: ${Common.colors.text};
    font-size: ${Common.fontSize.basic};
    font-weight: ${Common.fontWeight.medium};
    &:hover {
        background-color: ${Common.colors.backgroundBlack};
    }
    &:active {
        transform: scale(0.98);
    }
`