import { magicAdmin } from "../../../lib/magic";
import jwt from "jsonwebtoken";
import { isNewUser, createNewUser } from "../../../lib/db/hasura";
import { setTokenCookie } from "../../../lib/cookie";

export default async function login(req :any , res :any) {
    if(req.method === "POST") {
        try {
            const auth = req.headers.authorization;
            const didToken = auth ? auth.substr(7) : "";

            // invoke magic 
            // Retrieves user information by DID token
            const metadata = await magicAdmin.users.getMetadataByToken(didToken);

            // create jwt
            const token = jwt.sign({
                ...metadata,
                "iat": Math.floor(Date.now() / 1000),
                "exp": Math.floor(Date.now() / 1000 + 7 * 24 * 60 * 60), // token expires in 7 days
                "https://hasura.io/jwt/claims": {
                    "x-hasura-allowed-roles": ["user", "admin"],
                    "x-hasura-default-role": "user",
                    "x-hasura-user-id": `${metadata.issuer}`,
                },
            }, 
            // process.env.NEXT_PUBLIC_HASURA_ADMIN_SECRET as string);
            process.env.JWT_SECRET as string);

            // check if a user exists
            const isNewUserQuery = await isNewUser(token, metadata.issuer);

            // if it's a new user create a new user 
            isNewUserQuery && (await createNewUser(token, metadata));
            // set the cookie
            setTokenCookie(token, res);     
            res.send({ done: true, message: "a new user" }); 
        } catch(error) {
            console.log("Something went wrong logging in", error);
            res.status(500).send({ done: false });
        }
    } else {
        res.send({ done: false });
    }
}