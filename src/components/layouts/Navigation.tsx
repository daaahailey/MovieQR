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
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    background-color: #272643;
    color: #ffffff;
`

const  MenuSection = styled.ul`
    display: flex;
    flex-direction: row;
`

const List = styled.li`
    list-style: none;
    padding: 1rem;
    font-size: 1.15rem;
    font-weight: 500;
    cursor: pointer;
`
