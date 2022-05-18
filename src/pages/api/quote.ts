import jwt from "jsonwebtoken";
import { findMovieIdByUser, updateQuotes, insertQuotes } from "../../../lib/db/hasura";

export default async function quote(req:any, res:any) {
    if(req.method === "POST") {
        // console.log({ cookies : req.cookies });
        try {
            const token = req.cookies.token;
            if(!token) {
                // if there isn't token
                res.status(403).send({}); // forbidden for user that doesn't have right token
            } else {
                const movieId = req.query.movieId;
                const decodedToken = jwt.verify(token, process.env.JWT_SECRET as string);
                // console.log({ decodedToken });       
                const userId = decodedToken.issuer;
                const doesQuotesExist = await findMovieIdByUser(token, userId, movieId);
                // console.log({findMovieId});

                if(doesQuotesExist) {
                    // update it
                    const response = await updateQuotes(token, { 
                        userId, 
                        movieId: "577922", 
                        quote: "What's Happened, Happened, It's An Expression Of Faith In The Mechanics Of The World, It's Not An Excuse For Doing Nothing.",
                    });
                    res.send({ message: "it works", response });
                } else {
                    // add it
                    const response = await insertQuotes(token, { 
                        userId,
                        movieId: "335787", 
                        quote: "test test ~~ this is for a test",
                    });
                    res.send({ message: "it works", response });
                }
            }
        } catch(error) {
            console.log("error occurred /quote", error);
            res.status(500).send({ done: false, error: error?.message });
        }
    } 
}