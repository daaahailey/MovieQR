/** @jsxRuntime classic */
/** @jsx jsx */
import React, { useState } from "react";
import { MOVIE_DETAIL_URL } from "../../constants";
import Image from "next/image";
import { jsx, css } from '@emotion/react';
import { Common } from "../../styles/common";
import { RateChart } from "../../components/RateChart";
import { Trailer } from "../../components/Trailer";
import { BsPlayBtnFill } from "react-icons/bs";
import { QuotesAndReviews } from "../../components/QuotesAndReviews";
import { Cast } from "../../components/Cast";
import jwt from "jsonwebtoken";

// Swiper / Swiper styles
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Seo } from "../../components/Seo";



const MovieDetail = ({ movieId, movieData, movieCredits, token } :any) => {
    interface JwtPayload {
        issuer: string;
        email: string;
    }

    const BASE_URL = "https://image.tmdb.org/t/p/original/"
    const { title, vote_average, runtime, release_date, genres, production_countries, overview, backdrop_path } =  movieData;
    const { cast } = movieCredits;
    const genreArr:any = [];
    genres.map((genre:any) => genreArr.push(genre["name"]));
    const genreStr = genreArr.join(", ");
    const relDate = release_date.replace(/-/g, "/").split("/").reverse().join("/");
    const [ watchTrailer, setWatchTrailer ] = useState(false);

    let currentUser;

    if(token) {
        const decodedToken = jwt.verify(token, process.env.NEXT_PUBLIC_JWT_SECRET as string) as JwtPayload;   
        currentUser = decodedToken.issuer;
    }
    
    const handleWatchTrailer = (isClicked: boolean) => {
        setWatchTrailer(true);
    }

    return (
        <>
        <Seo title={title} description={`Movie detail page: ${title}`} url={`https://movie-qr.vercel.app/${title}/${movieId}`} />
        <main css={Container}>
            <section css={MovieDetailContainer}>
                    <h1 className="text-hide">Movie Detail Page</h1>
                    <div css={ImageContainer} style={ !backdrop_path ? {backgroundColor: "white"} : { backgroundColor:"black"}}>
                        { backdrop_path ? <Image src={`${BASE_URL}${backdrop_path}`} layout="fill" objectFit="cover" alt={title} /> 
                        : <Image src="/images/movie_fallback.png" alt={`${title}`} layout="fill" objectFit="contain"/>}
                        <button css={WatchTrailerBtn} type="button" onClick={() => handleWatchTrailer(true)}>
                            <BsPlayBtnFill />Watch Trailer
                        </button>    
                        {watchTrailer && <Trailer handleTrailer={setWatchTrailer} movieId={movieId} />}
                    </div>
                    <article css={ContentArticle}>
                        <h2 css={MovieTitle}>{title}</h2>
                        <RateChart rate={vote_average}/>
                        <p css={InfoText}><span css={InfoTitle}>Runtime</span> {runtime} min</p>
                        <p css={InfoText}><span css={InfoTitle}>Release Date</span>{relDate}</p>
                        { genreStr ? <p css={InfoText}><span css={InfoTitle}>Genres</span> {genreStr}</p> : ""}
                        <p css={InfoText}><span css={InfoTitle}>Summary</span>{overview}</p>
                        { cast.length !== 0 ? 
                        <>
                        <strong css={InfoTitle}>Cast</strong>
                        <Swiper
                            slidesPerView={1}
                            spaceBetween={30}
                            loop={true}
                            loopFillGroupWithBlank={true}
                            navigation={true}
                            modules={[Navigation]}
                            className="mySwiper"
                            breakpoints={{
                                0: {
                                    slidesPerView: 2,
                                    slidesPerGroup: 2,
                                },
                                540: {
                                    slidesPerView: 3,
                                    slidesPerGroup: 3,
                                },
                                720: {
                                    slidesPerView: 4,
                                    slidesPerGroup: 4,
                                },
                                1024: {
                                    slidesPerView: 6,
                                    slidesPerGroup: 6,
                                },
                                1440: {
                                    slidesPerView: 9,
                                    slidesPerGroup: 9, 
                                },
                            }}
                        >
                            <ul css={AllCast}>
                                {cast.map((person:any) => 
                                    <SwiperSlide key={person.cast_id}>
                                        <Cast castAll={person} key={person.cast_id} />
                                    </SwiperSlide>
                                )}
                            </ul>
                        </Swiper>
                        </> : "" }
                    </article>     
                    
            </section>
            <QuotesAndReviews movieId={movieId} title={title} currentUser={currentUser} token={token} /> 
        </main>
        </>
    )
}


export const getServerSideProps = async (context:any) => {
    const params = context.params;
    const movieId = params.id[1];
    const res = await fetch(`${MOVIE_DETAIL_URL}/${movieId}?${process.env.NEXT_PUBLIC_API_KEY as string}`);
    const credit = await fetch(`${MOVIE_DETAIL_URL}/${movieId}/credits?${process.env.NEXT_PUBLIC_API_KEY as string}`);
    const movieData = await res.json();
    const movieCredits = await credit.json();

    const cookies = context.req.headers.cookie;
    let token = null;

    if(cookies) {
        token = context.req.headers.cookie.split("token=")[1];
    }

    return {
        props: { 
            movieId,
            token,
            movieData,
            movieCredits,
        }
    }
}


export default MovieDetail;


const Container = css`
    margin-top: 0;
    display: flex;
    flex-direction: column;
    background-color: ${Common.colors.backgroundBlack};
    color: ${Common.colors.text};
`

const MovieDetailContainer = css`
    position: relative;
`

const ImageContainer = css`
    position: relative;
    max-height: 600px;
    height: 1200px;

    @media(max-width: 490px) {
        max-height: 460px;
    }
`

const WatchTrailerBtn = css`
    position: absolute;
    left: 2rem;
    top: 1.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
    background: transparent;
    font-family: ${Common.fonts.point};
    color: ${Common.colors.text};
    font-size: ${Common.fontSize.medium};
    font-weight: ${Common.fontWeight.medium};
    z-index: 10;
    cursor: pointer;
    
    svg {
        margin-right: 10px;
        @media(max-width: 490px) {
            font-size: 3.6rem;
            margin-right: 4px;
            overflow:hidden;
            background: transparent
        }
    }

    @media(max-width: 490px) {
        left: 0.95rem;
        top: 0.95rem;
        width: 90px;
        height: 40px;
        font-size: ${Common.fontSize.extraSmall};
    }


    &:after {
        content: "";
        position: absolute;
        width: 100%;
        height: 100%;
        padding: 5px 10px;
        background-color: ${Common.colors.backgroundBlack};
        opacity: 0.7;
        z-index: -10;
        border-radius: 10px;
        @media(max-width: 490px) {
            padding: 3px;
        }
    }
`

const ContentArticle = css`
    padding: 2rem;
    line-height: 1.45rem;
`

const MovieTitle = css`
    margin: 0.5rem 0 2rem 0;
    line-height: 3rem;
    font-family: ${Common.fonts.point};
    font-size: ${Common.fontSize.extraLarge};
    font-weight: ${Common.fontWeight.bold};
`

const InfoText = css`
    display: flex;
    flex-direction: column;
    margin-bottom: 1.25rem;
`
const InfoTitle = css`
    margin-right: 0.5rem;
    margin-bottom: 0.25rem;
    font-size: ${Common.fontSize.medium};
    font-weight: ${Common.fontWeight.medium};
`

const AllCast = css`
    display: flex;
    border-bottom: 1px solid white;
    margin:0;
`
