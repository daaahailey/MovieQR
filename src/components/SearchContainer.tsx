/** @jsxRuntime classic */
/** @jsx jsx */
import { usePopularMovies } from "../hooks/usePopularMovies";
import { Error } from "./Error";
import { SearchBox } from "./SearchBox";
import { jsx, css } from '@emotion/react';
import { Common } from "../styles/common";

export const SearchContainer = () => {
    const { data, error } : any = usePopularMovies("/api/popular-movies");
    let randomMovieUrl;  

    if(data) {
        const movieLength : number = data.results.length;
        const randomNum = Math.floor(Math.random() * movieLength);  
        randomMovieUrl = data.results[randomNum].backdrop_path;
    }
    if(error) {
        return <Error/>
    }

    const background = randomMovieUrl ? 
        `linear-gradient(rgba(0, 0, 0, 1), rgba(0, 0, 0, 0.1)), url(https://image.tmdb.org/t/p/original/${randomMovieUrl})`
        : ""; 
    
    return (
        <section css={SearchBoxContainer} style={{ backgroundImage: `${background}` }}>
            <h1 css={Heading}>Welcome to Movie QR</h1>
            <h2 css={SubHeading}>Search movies you are interested!</h2>
            <SearchBox />
        </section>
    )
}

const SearchBoxContainer = css`
    width: 100%;
    height:40rem;
    background-repeat: no-repeat;
    background-size: cover; 
    background-position: top center;
    background-color: ${Common.colors.backgroundBlack};
    padding: 5rem;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;   
    color: ${Common.colors.text};
    font-weight: ${Common.fontWeight.extraBold};
`

const Heading = css`
    font-size: ${Common.fontSize.extraLarge};
    margin-bottom: 1rem;
`
const SubHeading = css`
    font-size: ${Common.fontSize.medium};
    margin-bottom: 2rem;
`
