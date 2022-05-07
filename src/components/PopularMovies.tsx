import { useRandomMovie } from "../hooks/useRandomMovie";
import { Error } from "./Error";
import { Loading } from "./Loading";
import { PopularMovieCard } from "./PopularMovieCard";


export const PopularMovies = () => {
    const baseURL = "https://api.themoviedb.org/3/movie/popular";
    const {data, error} : any = useRandomMovie(baseURL);
    let movieData;

    if (error) return <Error />
    if(data) {
        movieData = data.results;
        
        return (
            <section>
                <h2 className="text-hide">Currently Popular Movies</h2>
                <p>Popular Now</p>
                {movieData.map((item : any) => <PopularMovieCard key={`movie-data${item.id}`} movieItems={item} />)}
            </section>
        )
    } else if(!data) {
        return <Loading />
    }
}