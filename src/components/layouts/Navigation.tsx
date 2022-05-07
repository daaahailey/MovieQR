import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import Link from "next/link";
import Image from 'next/image'
import { useRouter } from 'next/router';
import { magic } from "../../../lib/magic-client";


export const Navigation = () => {
    const [userName, setUserName] = useState("");
    const router = useRouter();

    useEffect(() => {
        // Assumes a user is already logged in
        async function fetchData() {
            try {
                const { email } = await magic.user.getMetadata();
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
        <StyledNav>
            <MenuSection>
                <List>
                    <Link href="/">
                        <a>
                            <Image src="/images/logo.png" width={160} height={44} alt="app-logo"/>
                        </a>
                    </Link>
                </List>
                <List>Movies</List>
                <List>Quotes</List>
                <List>Suggestions</List>
                <List>Reviews</List>
            </MenuSection>
            <MenuSection>
                <List>
                    <Link href="/login">
                        <a>{userName}</a>
                    </Link>
                </List>
                <List>
                {
                    userName? 
                    <Link href="/login">
                        <a onClick={handleSignOut}>Sign Out</a>
                    </Link> : 
                    <Link href="/login">
                        <a>Sign In</a>
                    </Link>
                }
                </List>
            </MenuSection>
        </StyledNav>
    )
};

const StyledNav = styled.nav`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;    
    color: white;
    z-index: 10;
    background-color: #000000;
`

const  MenuSection = styled.ul`
    display: flex;
    flex-direction: row;
    align-items: center;

`

const List = styled.li`
    list-style: none;
    padding: 1rem;
    font-size: 1.25rem;
    font-weight: 500;
    cursor: pointer;
`
