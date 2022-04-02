import { useRouter } from "next/router";
import { Movies } from "../../components/Movies";
import styled from "@emotion/styled";

const Movie = ({ movieId, clicked }: any) => {
    console.log("searched movie list")
    console.log("clicked", clicked)

    const router = useRouter();
    const { title } = router.query;
    // console.log(router)
    // console.log(title)
    if(movieId) {
        // console.log("movieid:",movieId)
        router.push({pathname: `movie/${movieId}`})
    };


    return (
        <main>
            <StyledSectionForMovieCard>
                <h2 className="text-hide">Movie cards by search result</h2>
                <Movies title={title}/>
            </StyledSectionForMovieCard>
        </main>
    )

}

export default Movie;


const StyledSectionForMovieCard = styled.section`
    display: grid;
    justify-content: center;
    grid-template-columns: repeat(auto-fit, minmax(260px, 2fr));
    gap: 2.25rem;
    width: 100%;
    margin: 0 auto;
    padding: 5rem 3rem;

    @media (max-width: 690px)  {
        grid-template-columns: repeat(auto-fit, minmax(260px, 370px));
    }
`
