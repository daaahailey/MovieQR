import Image from 'next/image'
import { useRouter } from 'next/router';

export const PopularMovieCard = (movieItems : any) => {

    const { original_title, release_date, poster_path, id} = movieItems.movieItems;
    const orderedDate = release_date.split("-").reverse().join("-");
    const BASE_URL = "https://image.tmdb.org/t/p/original";
    const router = useRouter();

    console.log(movieItems)
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        router.push({pathname: `movie/${id}`})
    }

    return (
        <article onClick={handleClick}>
            {/* <h2>Popular Now</h2> */}
            { movieItems.movieItems["poster_path"] === null ? <Image src="/images/movie_fallback.png" alt={`${movieItems.title}`} width={200} height={300} />
            : <Image src={`${BASE_URL}${poster_path}`} alt={`${movieItems.title}`} width={200} height={300}/> } 
            <h3>{original_title}</h3>
            <p>{orderedDate}</p>
        </article>
    )
}