import { magicAdmin } from "../../../lib/magic";
import jwt from "jsonwebtoken";
import { removeTokenCookie } from "../../../lib/cookie";

export default async function logout(req:any, res:any) {
    const token = req.cookies.token;

    interface JwtPayload {
        issuer: string;
        email: string;
    }

    try {
        if(!token) {
            // if there is no token (user not signed in)
            return res.status(401).json({ message: "User has not signed in"});
        }
        const decodedToken = jwt.verify(token, process.env.NEXT_PUBLIC_JWT_SECRET as string) as JwtPayload;  
        const currentUser = decodedToken.issuer;
        removeTokenCookie(res);
        try {
            await magicAdmin.users.logoutByIssuer(currentUser);
        } catch(error) {
            console.log("session with magic already expired");
            console.log("error occurred while signing out", error);
        }
        // redirect to login page (if user has signed out)
        res.writeHead(302, { Location: "/login" }); // 302 - is commanding browser to move page
        res.end(); // ending response 
    } catch(error) {
        console.log({error});
        res.status(401).json({ message: "User has not signed in" })
    }
}