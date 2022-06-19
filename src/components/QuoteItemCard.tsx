/** @jsxRuntime classic */
/** @jsx jsx */
import React, { useState, useEffect, useRef } from "react";
import { MOVIE_DETAIL_URL } from "../constants";
import Image from "next/image";
import { jsx, css } from '@emotion/react';
import { Common } from "../styles/common";
import Link from "next/link";
import { EditDeleteModal } from "./EditDeleteModal";


export const QuoteItemCard = ({ quote, userId, movieId, id, email, currentUser }:any) => {
    const userEmail = email.split("@");
    const userNickname = userEmail[0];
    const [movieInfo, setMovieInfo] = useState({});
    const {title, poster_path, backdrop_path }:any = movieInfo;
    const [overflowActive, setOverflowActive] = useState<boolean>(false);
    const overflowingText = useRef<HTMLParagraphElement|null>(null);
    const BASE_URL = "https://image.tmdb.org/t/p/original"
    const [ editClicked, setEditClicked ] = useState(false);
    const [ deleteClicked, setDeleteClicked ] = useState(false);
    const [ status, setStatus ] = useState("");
    const [ postId, setPostId ] = useState("");

    useEffect(() => {
        const getMovieInfo = async() => {
            const res = await fetch(`${MOVIE_DETAIL_URL}/${movieId}?${process.env.NEXT_PUBLIC_API_KEY as string}`);
            const data = await res.json();
            // console.log(data)
            setMovieInfo(data)
        }

        getMovieInfo();
    }, [movieId])
    // console.log(movieInfo)


    const handleEdit = (event:React.MouseEvent<HTMLElement>) => {
        event.preventDefault();
        const postId = (event.target as HTMLInputElement).value;
        setEditClicked(true);
        setPostId(postId);
        setStatus("edit");
    }

    const handleDelete = async (event:React.MouseEvent<HTMLElement>) => {
        event.preventDefault();
        const postId = (event.target as HTMLInputElement).value;
        setDeleteClicked(true);
        setPostId(postId);
        setStatus("delete");
    }


    const checkOverflow = (textContainer: HTMLParagraphElement|null):boolean => {
        if(textContainer)
            return (
                // offsetHeight -  the height of element (that you can see)
                // scrollHeight - the height of whole content (including area that you cannot see in your eye)
                textContainer.offsetHeight < textContainer.scrollHeight || 
                textContainer.offsetWidth < textContainer.scrollWidth
                // so it returns true if there is overflowed content
                );
            return false; 
    }

    const detectOverflow = () => {
        if(checkOverflow(overflowingText.current)) {
            setOverflowActive(true);
            return;
        }
        setOverflowActive(false);
    }

    useEffect(() => {
        detectOverflow();
    },[]) // detect the overflow when page loaded

    useEffect(() => {
        window.addEventListener("resize", detectOverflow)
    }); // detect overflow whenever the screen gets resized



    return (
        <article css={QuoteItem}>
            <ul css={MoviePoster}>
                <Image src={`${BASE_URL}${poster_path}`} alt={title} layout="fill" objectFit="cover"/>
                <Link href={`/movie/${title}/${movieId}`}>
                    <a css={FindAboutButton}>About Movie</a>
                </Link>
            </ul>
            <ul css={Content}>     
                <li css={MovieList}>
                    <p css={MovieTitle}>{title}</p>
                </li>
                <li css={TextContent}>
                    <p css={QuoteText} ref={overflowingText}>{quote} </p>  
                    {/* if ellipsis is applied, show more button and when you click it, you can read full post with modal or go to a separate page   */}
                    { overflowActive ? <button type="button" css={MoreButton}>More</button> : "" }
                    <div css={Buttons}>
                        <p>Posted by {userNickname}</p>
                        { currentUser === userId ?
                            <div>
                                <button type="submit" css={Button} onClick={handleEdit} value={id}>Edit</button>
                                <button type="submit" css={Button} onClick={handleDelete} value={id}>Delete</button>
                            </div>: "" }
                    </div>
                </li>
            </ul>
            {<EditDeleteModal 
                movieId={movieId}
                editClicked={editClicked}
                setEditClicked={setEditClicked} 
                deleteClicked={deleteClicked}
                setDeleteClicked={setDeleteClicked}
                status={status}
                setStatus={setStatus}
                postId={postId}
            />}
        </article>
    )
}

const QuoteItem = css`
    position: relative;
    width: 100%;
    min-height: 150px;
    max-height: 180px;
    display: flex;
    justify-content: space-between;
    margin: 2rem auto;
    border-radius: 10px;
    padding: 10px;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;
    &:after {
        content: "";
        position: absolute;
        top: 0;
        right: 0;
        width: 100%;
        height: 100%;
        padding: 10px;
        background-color: white;
        opacity: 0.68;
        z-index: -20;
    }
`

const MoviePoster = css`
    position: relative;
    min-height: 160px;
    min-width: 100px;
    border-radius: 5px;
    overflow: hidden;
`

const FindAboutButton = css`
    position: absolute;
    width: 100%;
    bottom: 0;
    left: 0;
    text-align: center;
    line-height: 18px;
    cursor: pointer;
    font-size: ${Common.fontSize.extraSmall};
    background-color: ${Common.colors.backgroundBlack}; 
    color: ${Common.colors.text};
    &:hover {
        background-color: ${Common.colors.point};
    }
`

const Content = css`
    position: relative;
    width: 100%;
    min-width: 0; // this is to prevent flex item breaking flex layout
    padding-left: 1rem;
`


const MovieList = css`
    display: flex;
    margin-bottom: 0.4rem;
`
const MovieTitle = css`
    font-family: ${Common.fonts.point};
    font-size: ${Common.fontSize.basicStrong};
    font-weight: ${Common.fontWeight.medium};
`

const TextContent = css `
    display: flex;
    flex-direction: column;
`

const QuoteText = css`
    display: -webkit-box;
    max-height: 100px;
    max-width: 100%;
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 4; // limit the number of line
    font-size: ${Common.fontSize.basic};

    @media(max-width: 490px) {
        -webkit-line-clamp: 5;
        font-size: ${Common.fontSize.extraSmall};
    }
`

const MoreButton = css`
    width: fit-content;
    border: none;
    border-radius: 4px;
    padding: 4px 8px;
    cursor: pointer;
    margin: 2px 0;
    background-color: ${Common.colors.backgroundBlack};
    color: ${Common.colors.text};
    font-size: ${Common.fontSize.extraSmall};
    &:hover {
        background-color: ${Common.colors.point};
    }
`

const Buttons = css`
    width: 100%;
    display: flex;
    align-items: baseline;
    p {
        font-size: ${Common.fontSize.extraSmall};
        position: absolute;
        bottom: 0;
        left: 16px;
    }
    div {
        position: absolute;
        right: 0;
        bottom: 0;
    }
`

const Button = css`
    background-color: transparent;
    border: none;
    cursor: pointer;
    font-size: ${Common.fontSize.small};
    font-family: ${Common.fonts.point};
    &:hover {
        color: white;
        background-color: black;
        border-radius: 4px;
    }
`