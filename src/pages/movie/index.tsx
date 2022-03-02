import { useRouter } from "next/router";
import { Movies } from "../../components/Movies";

const Movie = ({ movieId, clicked }: any) => {
    console.log("movieid:",movieId)
    const router = useRouter();
    const { title } = router.query;
    // console.log(router)
    // console.log(title)

    if(movieId) {
        router.push({pathname: `movie/${movieId}`})
    };

    return (
        <div>
            <Movies title={title}/>
        </div>
    )
}

  export default Movie;
