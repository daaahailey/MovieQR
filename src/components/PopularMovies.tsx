/** @jsxRuntime classic */
/** @jsx jsx */
import { usePopularMovies } from "../hooks/usePopularMovies";
import { Error } from "./Error";
import { PopularMovieCard } from "./PopularMovieCard";
import { jsx, css } from '@emotion/react';
import { Common } from "../styles/common";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Pagination, Navigation } from "swiper";

export const PopularMovies = () => {
    const {data, error} : any = usePopularMovies("/api/popular-movies");
    let movieData;

    if (error) return <Error />
    if(!data) {
        return <Error />
    }
    if(data) {
        movieData = data.results;
    }
    return (
        <section css={PopularMovieSection}>
            <h2 className="text-hide">Currently Popular Movies</h2>
            <p css={PopularSectionTitle}>Popular Now</p>
            <Swiper 
                modules={[Pagination, Navigation]}
                slidesPerView={1}
                spaceBetween={30}
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
                className="mySwiper"
            >
            <div>
                {movieData.map((item : any) => 
                    <SwiperSlide key={`slide-${item.id}`}> 
                        <PopularMovieCard key={`movie-data${item.id}`} movieItems={item} />
                    </SwiperSlide> 
                )}
            </div>
            </Swiper> 
        </section>
    )
}


const PopularMovieSection = css`
    padding: 1.2rem;
    background-color: ${Common.colors.backgroundBlack}; 
`

const PopularSectionTitle = css`
    margin-top: 1.2rem;
    color: ${Common.colors.text};
    font-family: ${Common.fonts.point};
    font-size: ${Common.fontSize.medium};
    font-weight: ${Common.fontWeight.bold};
`