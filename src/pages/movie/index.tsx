/** @jsxRuntime classic */
/** @jsx jsx */
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Movies } from "../../components/Movies";
import { jsx, css } from '@emotion/react';
import { useData } from "../../hooks/useData";
import { Error } from "../../components/Error";
import Link from "next/link";
import { Common } from "../../styles/common";
import { Seo } from "../../components/Seo";

const Movie = () => {
    const router = useRouter();
    const { title } = router.query;
    let searchQuery:any;
    title === "" ? searchQuery = "" : searchQuery = title;
    const { data, error }: any = useData(searchQuery);
    const [ isNothingFound, setIsNothingFound ] = useState(false);

    useEffect(() => {
        if(data) {
            let receivedData = data.results;
            if(receivedData.length === 0) {
                setIsNothingFound(true);
            }
        }
    }, [data]);


    return (
        <>
            <Seo title="Search Results" description={`Search result of ${title}`} url={`https://movie-qr.vercel.app/movie?title=${title}`}/>
            <main css={Main}>
                <section css={isNothingFound ? StyledSectionDefault : StyledSectionForMovieCard}>
                    <h2 className="text-hide">Movie cards by search result</h2>
                    <Movies title={title} /> 
                    { data ? 
                        data.results.length > 0 ?
                            <Movies title={title} data={data.results}/> :
                            <div css={NotFoundMessage}>
                                <p>Search result of <span css={Title}>{title}</span></p>
                                <p>Nothing Found. Please search something else.</p>
                                <Link href="/"> 
                                    <a css={GoBack}>Go back to main page</a>
                                </Link>
                            </div> 
                        : <div>Loading...</div>}
                </section>
            </main>
        </>
    )
}

export default Movie;

const Main = css`
    min-height: 80vh;
`

const StyledSectionForMovieCard = css`
    display: grid;
    justify-content: center;
    grid-template-columns: repeat(auto-fill, minmax(240px, 320px));
    grid-auto-rows: minmax(auto, 480px);
    gap: 2.8rem;
    margin: 0 auto;
    padding: 5rem 3rem;

    @media (max-width: 490px) {
        padding: 3rem 1.5rem ;
    }
    @media (max-width: 400px) {
        padding: 2.4rem 1rem ;
    }
`

const StyledSectionDefault = css`
    position: absolute;
    width: 100%;
    right: 50%;
    top: 50%;
    transform: translate(50%, -50%);
    text-align: center;
    padding: 2rem;
`

const NotFoundMessage = css`
    line-height: 1.5rem;
`
const Title = css`
    font-weight: ${Common.fontWeight.medium};
`

const GoBack = css`
    cursor: pointer;
    font-weight: ${Common.fontWeight.medium};
    color: ${Common.colors.point};
`