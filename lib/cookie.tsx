import cookie from "cookie";

const MAX_AGE =  7 * 24 * 60 * 60; // 7days in sec.
export const setTokenCookie = (token:any, res:any) => {
    const setCookie = cookie.serialize("token", token, {
        maxAge: MAX_AGE,
        expires: new Date(Date.now() + MAX_AGE * 1000), // in 7days from current date
        // secure: process.env.NODE_ENV = "production",
        path: "/",
    });
    res.setHeader("Set-Cookie", setCookie);
}

export const removeTokenCookie = (res) => {
    const savedCookie = cookie.serialize("token", "", {  // give empty value for cookie(token) because it's to delete
        maxAge: -1, // it makes there's no time left 
        path: "/",
    });
    res.setHeader("Set-Cookie", savedCookie);
}