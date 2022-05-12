import { magicAdmin } from "../../../lib/magic";
import jwt from "jsonwebtoken";
import { isNewUser, createNewUser } from "../../../lib/db/hasura";

export default async function login(req :any , res :any) {
    if(req.method === "POST") {
        try {
            const auth = req.headers.authorization;
            const didToken = auth ? auth.substr(7) : "";
            // console.log({didToken});
            
            // invoke magic 
            // Retrieves user information by DID token
            const metadata = await magicAdmin.users.getMetadataByToken(didToken);
            // console.log({ metadata });

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

            // check if user exists
            const isNewUserQuery = await isNewUser(token, metadata.issuer);

            if(isNewUserQuery) {
                // create a new user 
                const createNewUserMutation = await createNewUser(token, metadata);
                console.log({ createNewUserMutation });

                res.send({ done: true, message: "a new user" }); 
            } else {
                res.send({ done: true, message: "not a new user" }); 
            }

        } catch(error) {
            console.log("Something went wrong logging in", error);
            res.status(500).send({ done: false });
        }
    } else {
        res.send({ done: false });
    }
}