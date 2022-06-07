import React, { useState, createContext, useContext, ReactNode } from "react";

// context type
type authContextType = {
    cookie: string,
    didToken: string,
    saveCookie: (cookie:string) => void;
    saveDidToken: (didToken:string) => void;
}

// create context default values
const authContextDefaultValue:authContextType = {
    cookie: "",
    didToken: "",
    saveCookie: (cookie) => {},
    saveDidToken: (didToken) => {},
}

// createContext , useContext
const AuthContext = createContext<authContextType>(authContextDefaultValue);

export function useAuth() {
    return useContext(AuthContext);
}

// create provider function
type Props = {
    children: ReactNode;
}

export function AuthProvider({ children }:Props) {
    const [ cookie, setCookie ] = useState<string>("");
    const [ didToken, setDidToken ] = useState<string>("");

    const saveCookie = (cookie:string) => {
        setCookie(cookie);
    }

    const saveDidToken = (didToken:string) => {
        setDidToken(didToken);
    }

    const value = {
        cookie,
        didToken,
        saveCookie,
        saveDidToken,
    };

    return (
    <>
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    </>
    );
}