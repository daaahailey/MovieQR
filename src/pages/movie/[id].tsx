/** @jsxRuntime classic */
/** @jsx jsx */
import { useState } from "react";
import { MOVIE_DETAIL_URL } from "../../constants";
import Image from "next/image";
import { jsx, css } from '@emotion/react';
import { Common } from "../../styles/common";
import { RateChart } from "../../components/RateChart";
import { Trailer } from "../../components/Trailer";
import { BsPlayBtnFill } from "react-icons/bs";
import { QuotesAndReviews } from "../../components/QuotesAndReviews";
import { Cast } from "../../components/Cast";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";


const MovieDetail = ({ movieData, movieCredits } :any) => {
    // console.log("clicked movie card")
    // console.log(movieCredits)
    const BASE_URL = "https://image.tmdb.org/t/p/original/"
    const { title, vote_average, runtime, release_date, genres, production_countries, overview, backdrop_path } = movieData;
    const { cast } = movieCredits;
    const movieId = movieData.id;
    // console.log(movieId);
    // console.log(cast);

    const genreArr:any = [];
    genres.map((genre:any) => genreArr.push(genre["name"]));
    const genreStr = genreArr.join(", ");
    const relDate = release_date.replace(/-/g, "/").split("/").reverse().join("/");
    const [watchTrailer, setWatchTrailer] = useState(false);

    const handleWatchTrailer = (isClicked: boolean) => {
        setWatchTrailer(isClicked);
    }

    // console.log(watchTrailer)


    return (

        <div css={Container}>
            <section css={MovieDetailContainer}>
                    <div css={ImageContainer}>
                        <Image src={`${BASE_URL}${backdrop_path}`} layout="fill" objectFit="cover" alt={movieData.original_title} />
                        <button css={WatchTrailerBtn} type="button" onClick={() => handleWatchTrailer(true)}><BsPlayBtnFill style={{marginRight: "10px"}} />Watch Trailer</button>     
                        {watchTrailer && <Trailer handleTrailer={setWatchTrailer} movieId={movieId} />}
                    </div>
                    <article css={ContentArticle}>
                        <h2 css={MovieTitle}>{title}</h2>
                        <RateChart rate={vote_average}/>
                        <p css={InfoText}><span css={InfoTitle}>Runtime</span> {runtime} min</p>
                        <p css={InfoText}><span css={InfoTitle}>Release Date</span>{relDate}</p>
                        { genreStr ? <p css={InfoText}><span css={InfoTitle}>Genres</span> {genreStr}</p> : ""}
                        {/* 
                        { production_countries ?
                            <p>production countries: 
                                {production_countries.length > 1 ? production_countries.map((country:any)=> `${country["name"]} ` ) : production_countries[0]["name"]}
                            </p> : <></>
                        } */}
                        <p css={InfoText}><span css={InfoTitle}>Summary</span>{overview}</p>
                        {/* <Cast fullCast={cast}/> */}
                        <h3 css={InfoTitle}>Cast</h3>
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
                    </article>     
                    <QuotesAndReviews movieId={movieId} /> 
            </section>
        </div>
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
`

const WatchTrailerBtn = css`
    position: absolute;
    left: 2rem;
    top: 1.5rem;
    background: transparent;
    border: none;
    color: ${Common.colors.text};
    font-size: ${Common.fontSize.medium};
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: ${Common.fontWeight.bold};
    z-index: 10;
    cursor: pointer;
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
    }
`

const ContentArticle = css`
    padding: 2rem;
    line-height: 1.45rem;
`

const MovieTitle = css`
    font-size: ${Common.fontSize.extraLarge};
    font-weight: ${Common.fontWeight.bold};
    margin: 2rem 0;
    line-height: 3rem;
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
    flex-direction: row;
    border-bottom: 1px solid white;
    margin:0;
`








