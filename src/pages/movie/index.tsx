import { useRouter } from "next/router";

const Movie = ({ movieId, clicked }: any) => {
    // console.log(movieId)
    const router = useRouter();
    if(movieId) {
        router.push({pathname: `movie/${movieId}`})
    };

    return (
        <div></div>
    )
}

  export default Movie;
