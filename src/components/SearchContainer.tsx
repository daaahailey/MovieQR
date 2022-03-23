import React from "react";
import styled from "@emotion/styled";
import { useRandomMovie } from "../hooks/useRandomMovie";
import { Error } from "./Error";
import { SearchBox } from "./SearchBox";

export const SearchContainer = () => {

    const baseURL = "https://api.themoviedb.org/3/movie/popular";
    const {data, error} : any = useRandomMovie(baseURL);
    let randomMovieUrl;

    if(data) {
        const movieLength : number = data.results.length;
        const randomNum = Math.floor(Math.random() * movieLength);
        randomMovieUrl = data.results[randomNum].backdrop_path;
    }
    if(error) {
        return <Error/>
    }

    return (
        <SearchBoxContainer style={{backgroundImage:`linear-gradient(rgba(0, 0, 0, 1), rgba(0, 0, 0, 0.1)), url(https://image.tmdb.org/t/p/original/${randomMovieUrl})`}}>
            <Heading>Welcome to Movie QR</Heading>
            <SubHeading>Search movies you are interested!</SubHeading>
            <SearchBox />
        </SearchBoxContainer>
    )
}

const SearchBoxContainer = styled.div`
    background-repeat: no-repeat;
    width: 100%;
    height:40rem;
    background-size: cover;
    background-position: top center;
    padding: 5rem;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;   
`

const Heading = styled.h1`
    font-size: 3rem;
    font-weight: 900;
    color: #ffffff;
    margin-bottom: 1rem;
`
const SubHeading = styled.h2`
    font-size: 1.5rem;
    font-weight: 900;
    color: #ffffff;
    margin-bottom: 2rem;
`
