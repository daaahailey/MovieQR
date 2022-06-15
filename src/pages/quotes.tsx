/** @jsxRuntime classic */
/** @jsx jsx */
import React from "react";
import type { NextPage } from "next";
import useSWR from "swr";
import { fetcher } from "../utils/fetcher";
import { jsx, css } from '@emotion/react';
import { Common } from "../styles/common";
import { useEffect, useState } from "react";
import { QuoteItemCard } from "../components/QuoteItemCard";
import { useAuth } from "../../context/AuthContext";
import jwt from "jsonwebtoken";


const Quotes: NextPage = () => {
    const { data, error } = useSWR(`/api/quote?all=true`, fetcher);
    const { cookie } = useAuth();
    const [ currentUser, setCurrentUser ] = useState("");

    

    interface JwtPayload {
        issuer: string;
        email: string;
    }

    useEffect(() => {
        if(cookie) {
            const decodedToken = jwt.verify(cookie, process.env.NEXT_PUBLIC_JWT_SECRET as string) as JwtPayload;   
            setCurrentUser(decodedToken.issuer);
        }
    }, []);



    return (
        <main css={MainArea}>
            <h1 className="text-hide">Quotes page</h1>
            <section>
                <h2 className="text-hide">Search or filter quote</h2>
                {/* <input type="search" placeholder="Search quote"/>
                <input type="submit" value="Search"/> */}
                {/* <div>
                    sort by - newest / oldest 
                </div> */}
            </section>
            <section css={QuotesContainer}>
                <h2 className="text-hide">Quotes posted on MovieQR</h2>
                { data ? data.map((item:any) => 
                    <QuoteItemCard key={item.id} quote={item.quote} userId={item.userId} movieId={item.movieId} email={item.userEmail} currentUser={currentUser}/> ) 
                : ""}
            </section>
        </main>
    )
}

export default Quotes;

const MainArea = css`
    min-height: 100vh;
    // background-color: ${Common.colors.backgroundGray};
    height: 100%;
`

const QuotesContainer = css`
    // display: flex;
`