import { magicAdmin } from "../../../lib/magic";

export default async function login(req, res) {
    if(req.method === "POST") {
        try {
            const auth = req.headers.authorization;
            // console.log({auth});
            const didToken = auth ? auth.substr(7) : "";
            // console.log({didToken});
      
            // Retrieves user information by DID token
            const metadata = await magicAdmin.users.getMetadataByToken(didToken);
            console.log({ metadata });
            // invoke magic here
            res.send({ done: true }); 

        } catch(error) {
            console.log("Something went wrong logging in", error);
            res.status(500).send({ done: false });
        }
    } else {
        res.send({ done: false });
    }
}