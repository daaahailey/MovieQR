import React from "react";
import styled from "@emotion/styled";

export const Navigation = () => {
    
    return (
        <StyledNav>
            <MenuSection>
                <List>Movies</List>
                <List>Quotes</List>
                <List>Suggestions</List>
                <List>Reviews</List>
            </MenuSection>
            <MenuSection>
                <List>Login</List>
                <List>Join</List>
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
`

const List = styled.li`
    list-style: none;
    padding: 1rem;
    font-size: 1.25rem;
    font-weight: 500;
    cursor: pointer;
`
