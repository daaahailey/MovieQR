import jwt from "jsonwebtoken";
import { findMovieIdByUser, fetchMovieQuotes, updateQuotes, insertQuotes, deleteQuotes } from "../../../lib/db/hasura";

// get quotes from all user (but you cannot edit them because you don't have token. this is only to read them)
export default async function quote(req:any, res:any) {
    const token = req.cookies.token;
    try {
        const { movieId, quote } = req.query;
        const admin = process.env.NEXT_PUBLIC_HASURA_ADMIN_SECRET as string;
        const findMovie = await fetchMovieQuotes(admin, movieId);
        const quotesExist = findMovie?.length > 0;
        // const inputParams = req.method === "POST" ? req.body : req.query;

        if(req.method === "GET") {
            // get request - render all quotes (user can read quotes without sign in as well)
             if(quotesExist) {
                 // if there is any quote, send
                 res.send(findMovie);
            } else {
                // there isn't any quote - need to add default message 
                // res.status(404);
                res.send({ message: "Quote not found" });
            }

        } else if(req.method === "POST") {
            // post request - if user has signed in, user can post quote
            if(!token) {
                // if there isn't token, user cannot leave quote (user must sign in)
                // add modal saying  - please sign in to leave quote
                res.status(403).send({message: "there isn't token"}); // forbidden for user that doesn't have right token
            } else {
                // if there is token, user can leave quote
                const inputParams = req.body;
                const { movieId, quote, status, postId } = inputParams;
                // console.log(inputParams)
                const id = parseInt(postId);

                interface JwtPayload {
                    issuer: string;
                    email: string;
                }

                if(movieId) {
                    const decodedToken = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;     
                    const userId = decodedToken.issuer;
                    const userEmail = decodedToken.email;
                    const findMovie = await findMovieIdByUser(token, userId, movieId);
                    const quotesExist = findMovie?.length > 0;  // quote I wrote exist

                    if (quotesExist && status === "create") {
                        // create a new quote
                        const response = await insertQuotes(token, { 
                            userId,
                            movieId, 
                            quote,
                            userEmail,
                        });
                        res.send({ message: "it works", response });
                    } else if(quotesExist && status === "edit") {
                        // if the quote is what current user wrote, update it
                        const response = await updateQuotes(token, { 
                            userId, 
                            movieId,
                            quote,
                            userEmail,
                            id,
                        });
                        res.send({ message: "it works", response });
                    } else if(quotesExist && status === "delete") {
                        // delete quote
                        const response = await deleteQuotes(token, {
                            userId,
                            movieId,
                            userEmail,
                            id,
                        });
                        res.send({ message: "it works", response });
                    }

                } else {
                    res.status(500).send({ message: "movieId is required" });
                }
            }
        }
    } catch(error) {    
        if(error instanceof Error) {
            console.log("error occurred /quote", error);
            res.status(500).send({ done: false, error: error?.message });
        } else {
            console.log("Unexpected Error", error);
        }
    }
}