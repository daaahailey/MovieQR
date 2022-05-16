/** @jsxRuntime classic */
/** @jsx jsx */
import Image from "next/image";
import { jsx, css } from '@emotion/react';
import { Common } from "../styles/common";

export const Cast = ({ castAll } : any) => {

    const BASE_URL = "https://image.tmdb.org/t/p/original/"
    // console.log(castAll, "cast All");
    const { name, character,  profile_path} = castAll;

    return (
            <li css={CastCard}>
                <div css={CastInfo}>
                    <p css={CastName}>{name}</p>
                    <p css={Character}>{character}</p>
                </div>
                <div css={CastImgContainer}>
                    {profile_path ?  
                        <Image src={`${BASE_URL}${profile_path}`}  alt="cast" width={160} height={240} /> :
                        <Image src="/images/fallback_profile.png"  alt="cast" width={160} height={240} /> 
                    }
                </div>
            </li>
    )
}


const CastCard = css`
    position: relative;
    width: 10rem;
    border-radius: 10px;
    overflow: hidden;
    display: flex;
    flex-direction: reverse-column;
`

const CastInfo = css`
    position: absolute;
    width: 100%;
    min-height: calc(100% - 12rem);
    display :flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    z-index: 10;
    color: #000;
    bottom: 0;
    line-height: 1rem;
    background-color: #fff;
    padding: 4px;
`

const CastImgContainer = css`
    position: relative;
    top: -16px;
`

const CastName = css`
    font-size: ${Common.fontSize.small};
    font-weight: ${Common.fontWeight.medium};
`

const Character = css`
    font-size: ${Common.fontSize.extraSmall};
    font-weight: ${Common.fontWeight.medium};
`