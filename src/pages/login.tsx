/** @jsxRuntime classic */
/** @jsx jsx */
import Head from 'next/head';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { jsx, css } from '@emotion/react';
import { Common } from "../styles/common";
import { magic } from '../../lib/magic-client';

const Login = () => {
    const [userMessage, setUserMessage] = useState("");
    const [email, setEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleEmailInput = (event:any) => {
        event.preventDefault();
        const email = event.target.value;
        setEmail(email);
    }

    const handleLogin = async (event:any) => {
        event.preventDefault();
        const emailRegex = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;
        const isValid = emailRegex.test(email);

        if(email) {
            // route to dashboard
            if(isValid) {
                console.log("route to dashboard");
                setUserMessage("");
                setIsLoading(true);
                // log in a user by their email
                try {
                    const didToken = await magic.auth.loginWithMagicLink({ email, });
                    console.log({ didToken });
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
                            console.log({loggedInResponse});
                            router.push("/");
                            setIsLoading(false);
                        } else {
                            setIsLoading(false);
                            setUserMessage("Something went wrong logging in")
                        }
                    }
                } catch(error) {
                    // Handle errors if required!
                    console.log("Something went wrong", error);
                    setEmail("");
                    setIsLoading(false);
                }    
            } else {
                setUserMessage("Enter a valid email address")
                setEmail("");
            }
        } else {
            setUserMessage("Enter a valid email address")
            setEmail("");
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
                        <p>{userMessage}</p>
                        <button css={SignInButton} onClick={(handleLogin)}>
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
    height: 100%;
    min-height: 50vh;
`

const SignInContainer = css`
    display: flex;
    flex-direction: column;
    width: 24rem;
    height: 100%;
    text-align: center;
    margin: 0 auto;
` 

const SignInText = css`
    font-size: ${Common.fontSize.large};
    font-weight: ${Common.fontWeight.bold};
    margin-bottom: 1.5rem;
`

const EmailInput = css`
    height: 2.75rem;
    padding: 1rem;
    margin-bottom: 0.5rem;
    border: 1px solid black;
    border-radius: 0.5rem;
    font-size: ${Common.fontSize.basic};
`

const SignInButton = css`
    height: 2.8rem;
    font-size: ${Common.fontSize.basic};
    font-weight: ${Common.fontWeight.medium};
    margin-top: 0.8rem;
    background-color: ${Common.colors.point};
    color: ${Common.colors.text};
    border: none;
    border-radius: 0.5rem;
    cursor: pointer;
    &:hover {
        background-color: ${Common.colors.backgroundBlack};
    }
    &:active {
        transform: scale(0.98);
    }
`
