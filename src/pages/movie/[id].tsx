import React, { useState } from "react";
import { MOVIE_DETAIL_URL } from "../../constants";
import Image from "next/image";
import styled from "@emotion/styled";
import { RateChart } from "../../components/RateChart";
import { Trailer } from "../../components/Trailer";
import { BsPlayBtnFill } from "react-icons/bs";


const MovieDetail = ({ movieData, movieCredits } :any) => {
    // console.log("clicked movie card")
    // console.log(movieCredits)
    const BASE_URL = "https://image.tmdb.org/t/p/original/"
    const { title, vote_average, runtime, release_date, genres, production_countries, overview, backdrop_path } = movieData;
    const { cast }  = movieCredits;
    const movieId = movieData.id;
    // console.log(movieId);
    
    const genreArr:any = [];
    genres.map((genre:any) => genreArr.push(genre["name"]));
    const genreStr = genreArr.join(", ");
    // console.log("genres:",genreStr)
       // console.log(movieData)
    // console.log(genres)

    // console.log(id)
    const [watchTrailer, setWatchTrailer] = useState(false);

    const handleWatchTrailer = (isClicked: boolean) => {
        setWatchTrailer(isClicked);
    }

    console.log(watchTrailer)

 

    return (

        <Container>
            <MovieDetailContainer>

                    <ImageContainer>
                        <Image src={`${BASE_URL}${backdrop_path}`} layout="fill" objectFit="cover" alt={movieData.original_title} />
                        <WatchTrailerBtn type="button" onClick={() => handleWatchTrailer(true)}><BsPlayBtnFill style={{marginRight: "10px"}} />Watch Trailer</WatchTrailerBtn>     
                        {watchTrailer && <Trailer handleTrailer={setWatchTrailer} movieId={movieId} />}
        
                    </ImageContainer>
                    <ContentArticle>
                    <MovieTitle>{title}</MovieTitle>
                    <RateChart rate={vote_average}/>
                    <p>Runtime: {runtime} min</p>
                    <p>Release Date: {release_date}</p>
                    { genreStr ? <p>Genres: {genreStr}</p> : ""}
                    {/* 
                    { production_countries ?
                        <p>production countries: 
                            {production_countries.length > 1 ? production_countries.map((country:any)=> `${country["name"]} ` ) : production_countries[0]["name"]}
                        </p> : <></>
                    } */}

                    <p>{overview}</p>
                    <p>{cast.map((person:any) => person.name)}</p>

                    </ContentArticle>
        
                
            </MovieDetailContainer>
        </Container>
    )
}


export const getServerSideProps = async ({ params }: any) => {
    const movieId = params.id;
    const res = await fetch(`${MOVIE_DETAIL_URL}/${movieId}?${process.env.NEXT_PUBLIC_API_KEY as string}`);
    const credit = await fetch(`${MOVIE_DETAIL_URL}/${movieId}/credits?${process.env.NEXT_PUBLIC_API_KEY as string}`);
    const movieData = await res.json();
    const movieCredits = await credit.json();
    console.log(movieData)

    return {
        props: { 
            movieData,
            movieCredits
        }
    }
}


export default MovieDetail;


const Container = styled.div`
    margin-top: 0;
    height: 1600px;
`
const MovieDetailContainer = styled.section`
    position: relative;
    height: 1200px;
    // background-color: black;
`

const ImageContainer = styled.div`
    position: relative;
    height: 100%;
    max-height: 600px;
`

const WatchTrailerBtn = styled.button`
    position: absolute;
    left: 2rem;
    top: 1.5rem;
    background: transparent;
    border: none;
    color: white;
    font-size: 1.4rem;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 800;
    position: relative;
    z-index: 10;
    cursor: pointer;
    &:after {
        content: "";
        position: absolute;
        width: 100%;
        height: 100%;
        padding: 5px 10px;
        background-color: #000000;
        opacity: 0.7;
        z-index: -10;
        border-radius: 10px;
    }
`

const ContentArticle = styled.article`
    // position: static;
    // z-index: 20;
    color: white;
    // margin-top: 24rem;
    padding: 2rem;
    background-color: black;
    // bottom: 0;
    line-height: 1.35rem;
`

const MovieTitle = styled.h2`
    font-size: 2.75rem;
    font-weight: 700;
    margin: 2rem 0;
`








