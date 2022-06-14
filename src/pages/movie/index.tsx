/** @jsxRuntime classic */
/** @jsx jsx */
import { useRouter } from "next/router";
import { Movies } from "../../components/Movies";
import { jsx, css } from '@emotion/react';


const Movie = () => {
    const router = useRouter();
    const { title } = router.query;

    return (
        <main>
            <section css={StyledSectionForMovieCard}>
                <h2 className="text-hide">Movie cards by search result</h2>
                <Movies title={title}/>
            </section>
        </main>
    )
}

export default Movie;


const StyledSectionForMovieCard = css`
    display: grid;
    justify-content: center;
    grid-template-columns: repeat(auto-fill, minmax(240px, 320px));
    grid-auto-rows: minmax(480px, auto);
    gap: 2.8rem;
    margin: 0 auto;
    padding: 5rem 3rem;
`
