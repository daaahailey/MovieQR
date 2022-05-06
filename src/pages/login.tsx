import Head from 'next/head';
import styled from "@emotion/styled";
import { useState } from 'react';
import { useRouter } from 'next/router';
import { magic } from '../../lib/magic-client';

const Login = () => {
    const [userMessage, setUserMessage] = useState("");
    const [email, setEmail] = useState("");
    const router = useRouter();

    const handleEmailInput = (event:any) => {
        // event.preventDefault();
        const email = event.target.value;
        // setValue("Email Address");
        setEmail(email);
    }

    const handleLogin = async (event:any) => {
        event.preventDefault();
        console.log("login button clicked")

        const emailRegex = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;
        const isValid = emailRegex.test(email);

        if(email) {
            // route to dashboard
            if(isValid) {
                console.log("route to dashboard");
                setUserMessage("");
                // console.log(magic);

                // log in a user by their email
                try {
                    const didToken = await magic.auth.loginWithMagicLink({ email, });
                    console.log({ didToken });
                    if(didToken) {
                        router.push("/");
                    }
                } catch(error) {
                    // Handle errors if required!
                    console.log("something went wrong", error);
                    setEmail("");
                }
                
            } else {
                setUserMessage("Enter a valid email address")
                setEmail("");
            }
        } else {
            // show a message
            setUserMessage("Enter a valid email address")
            setEmail("");
        }
    }


    return <>
                <Head>
                <title>Movie QR Sign In</title>
                </Head>
                <StyledMain>
                    <SignInContainer >
                        <SignInText>Sign In</SignInText>
                        <EmailInput type="text" placeholder="Email Address" value={email} onChange={handleEmailInput}/>
                        <p>{userMessage}</p>
                        <SignInButton onClick={(handleLogin)}>Sign In</SignInButton>
                    </SignInContainer>
                </StyledMain>
            </>
}

export default Login;

const StyledMain = styled.main`
    display: flex;
    align-items: center;
    height: 100%;
    min-height: 50vh;
`

const SignInContainer = styled.section`
    display: flex;
    flex-direction: column;
    width: 24rem;
    height: 100%;
    text-align: center;
    margin: 0 auto;
` 

const SignInText = styled.h1`
    font-size: 2rem;
    font-weight: 700;
    margin-bottom: 1.5rem;
`

const EmailInput = styled.input`
    height: 2.75rem;
    padding: 1rem;
    margin-bottom: 0.5rem;
    border: 1px solid black;
    border-radius: 0.5rem;
    font-size: 1rem;
`

const SignInButton = styled.button`
    height: 2.8rem;
    font-size: 1rem;
    font-weight: 600;
    margin-top: 0.8rem;
    background-color: #f70776;
    color: #ffffff;
    border: none;
    border-radius: 0.5rem;
    cursor: pointer;
    &:hover {
        background-color: #141010;
    }
    &:active {
        transform: scale(0.98);
    }
`
