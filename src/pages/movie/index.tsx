import { useRouter } from "next/router";

// const Movie = ({ movieId, clicked }: any) => {
const Movie = () => {
    // console.log(movieId)


    const router = useRouter();
    const { title } = router.query;
    console.log(router)
    console.log(title)



    // if(movieId) {
    //     router.push({pathname: `movie/${movieId}`})
    // };

    return (
        <div></div>
    )
}

  export default Movie;
