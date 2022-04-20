import React from "react";
import { MOVIE_DETAIL_URL } from "../../constants";
import Image from "next/image";
import styled from "@emotion/styled";
import { RateChart } from "../../components/RateChart";

const MovieDetail = ({ movieData, movieCredits } :any) => {
    // console.log("clicked movie card")
    // const id = movieId;
    // console.log(movieData)
    // console.log(movieCredits)
    const BASE_URL = "https://image.tmdb.org/t/p/original/"
    const { title, vote_average, runtime, release_date, genres, production_countries, overview, backdrop_path } = movieData;
    const { cast }  = movieCredits;
    
    const genreArr:any = [];
    genres.map((genre:any) => genreArr.push(genre["name"]));
    const genreStr = genreArr.join(", ");
    // console.log("genres:",genreStr)

    console.log(movieData)
    // console.log(genres)

    return (

        <Container>
            <MovieDetailContainer>

                    <ImageContainer>
                        <Image src={`${BASE_URL}${backdrop_path}`} layout="fill" objectFit="cover" alt={movieData.original_title} />
                                
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
    // console.log(movieData)

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

    // top: 0;
    // opacity: 0.8;
    // &:span {
    //     position: absolute;
    //     top: 20px;
    // }
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






