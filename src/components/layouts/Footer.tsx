/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import { Common } from "../../styles/common";

export const Footer = () => {

    return (
        <footer css={StyledFooter}>
            <strong css={StrongText}>Built and designed by @daaahailey</strong>
            <ul css={FooterUl}>
                <li css={FooterList}>About Movie QR</li> 
                <li css={FooterList}>Contact Us</li>
            </ul>
        </footer>
    )
};


const StyledFooter = css`
    z-index: 40;
    width: 100%;
    position: static;
    display: flex;
    flex-direction: column;
    text-align: center;
    padding: 2rem;
    background-color: ${Common.colors.backgroundGray};
    color: ${Common.colors.text}; 
    font-weight: ${Common.fontWeight.medium}
`

const StrongText = css`
    padding: 1.5rem;
`

const FooterUl = css`
    display: flex;
    flex-direction: row;
    justify-content: center;
`

const FooterList = css`
    padding: 1rem;
`