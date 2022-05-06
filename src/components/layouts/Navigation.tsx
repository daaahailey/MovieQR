import React from "react";
import styled from "@emotion/styled";
import Link from "next/link";
import Image from 'next/image'

export const Navigation = () => {
    
    return (
        <StyledNav>
            <MenuSection>
                <List>
                    <Link href="/">
                        <a>
                            <Image src="/images/logo.png" width={160} height={44} />
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
                        <a>Sign In</a>
                    </Link>
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
