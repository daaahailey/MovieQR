/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import { Common } from "../../styles/common";
import Link
 from 'next/link';
export const Footer = () => {

    return (
        <footer css={StyledFooter}>
            <ul>
                <li css={FooterList}>
                    <p css={BuiltByText}>Built and designed by</p>
                    <Link href="https://github.com/daaahailey">
                        <a target="_blank">@daaahailey</a>
                    </Link>
                </li>
            </ul>
            <ul css={FooterUl}>
                <li css={FooterList}>About Movie QR</li> 
                <li css={FooterList}>
                    <a href="mailto:daaahailey@gmail.com">Contact Us</a>
                </li>
            </ul>
        </footer>
    )
};


const StyledFooter = css`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 2rem;
    background-color: ${Common.colors.backgroundGray};
    color: ${Common.colors.text}; 
    font-family: ${Common.fonts.point};
`

const BuiltByText = css`
    display: inline-block;
    margin-right: 0.2rem;
`

const FooterUl = css`
    display: flex;
`

const FooterList = css`
    padding: 1rem;
`