import { useRandomMovie } from "../hooks/useRandomMovie";
import { Error } from "./Error";
import { Loading } from "./Loading";
import { PopularMovieCard } from "./PopularMovieCard";
import styled from "@emotion/styled";

import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Pagination, Navigation } from "swiper";


export const PopularMovies = () => {
    const baseURL = "https://api.themoviedb.org/3/movie/popular";
    const {data, error} : any = useRandomMovie(baseURL);
    let movieData;

    if (error) return <Error />
    if(data) {
        movieData = data.results;

        return (
            <>
                <PopularMovieSection>
                    <PopularSectionTitle>Popular Now</PopularSectionTitle>
                    <Swiper
                        modules={[Pagination, Navigation]}
                        slidesPerView={1}
                        spaceBetween={30}
                        // slidesPerGroup={3}
                        loop={true}
                        loopFillGroupWithBlank={true}
                        pagination={{
                        clickable: true,
                        }}

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
                        navigation={true}
                        // modules={[Pagination, Navigation]}
                        className="mySwiper"
                    >         
                    <h2 className="text-hide">Currently Popular Movies</h2>
                    <div>
                        {movieData.map((item : any) => 
                            <SwiperSlide key={`movie-data${item.id}`}> 
                                <PopularMovieCard key={`movie-data${item.id}`} movieItems={item} />
                            </SwiperSlide> 
                        )}
                     </div>
                    </Swiper> 
                </PopularMovieSection>        
            </>
        )
    } else if(!data) {
        return <Loading />
    }
}


const PopularMovieSection = styled.section`
    display: flex;
    flex-direction: column;
    padding: 1.2rem;
`

const PopularSectionTitle =styled.p`
    font-size: 2rem;
    font-weight: 700;
    margin-top: 1.2rem;
    margin-bottom: 0.8rem;
`

