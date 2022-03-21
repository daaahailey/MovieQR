import React from "react";
import styled from "@emotion/styled";

export const Footer = () => {

    return (
        <StyledFooter>
            <FooterStrong>Built and designed by @daaahailey</FooterStrong>
            <FooterUl>
                <FooterList>About Movie QR</FooterList>
                <FooterList>Contact Us</FooterList>
            </FooterUl>
        </StyledFooter>
    )
};


const StyledFooter = styled.footer`
    display: flex;
    flex-direction: column;
    text-align: center;
    padding: 2rem;
    background-color: #272643;
    color: #ffffff;
`

const FooterStrong = styled.strong`
    font-weight: 700;
    padding: 1.5rem;
`

const FooterUl = styled.ul`
    display: flex;
    flex-direction: row;
    justify-content: center;
`

const FooterList = styled.li`
    padding: 1rem;
`