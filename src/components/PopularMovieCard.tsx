/** @jsxRuntime classic */
/** @jsx jsx */
import Image from 'next/image'
import { useRouter } from 'next/router';
import { jsx, css } from '@emotion/react';
import { Common } from "../styles/common";

export const PopularMovieCard = (movieItems : any) => {

    const { poster_path, id} = movieItems.movieItems;
    const BASE_URL = "https://image.tmdb.org/t/p/original";
    const router = useRouter();
    const movie = movieItems.movieItems;
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        router.push({pathname: `movie/${id}`})
    }

    return (
        <article css={PopularMovieCardItem}  onClick={handleClick}> 
            { movie["poster_path"] === null ? <Image src="/images/movie_fallback.png" alt={`${movie.title}`} width={200} height={300} />
            : <Image src={`${BASE_URL}${poster_path}`} alt={`${movie.title}`} width={200} height={300} /> }
        </article>
    )
}


const PopularMovieCardItem = css`
    height: 100%;
    color: ${Common.colors.text};
    transition: transform 0.3s ease-in-out;
    &: hover {
        transform: scale(1.08)
    }
`