import React, { useState, createContext, useContext, ReactNode } from "react";

// context type
type authContextType = {
    user: string;
    isLoggedIn: boolean;
    cookie: string;
    login: (user:any) => void;
    logout: () => void;
    saveCookie: (cookie:any) => void;
}

// create context default values
const authContextDefaultValue:authContextType = {
    user: "",
    isLoggedIn: false,
    cookie: "",
    login: (user) => {},
    logout: () => {},
    saveCookie: (cookie) => {},
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
    const [user, setUser] = useState<string>("");
    const [ isLoggedIn, setIsLoggedIn ] = useState<boolean>(false);
    const [ cookie, setCookie ] = useState<string>("");

    const login = (email:string) => {
        setUser(email);
        setCookie("")
        setIsLoggedIn(true);
    }

    const logout = () => {
        setUser("");
        setCookie("")
        setIsLoggedIn(false);
    }

    const saveCookie = (cookieStr:string) => {
        setCookie(cookieStr);
    }

    const value = {
        user,
        isLoggedIn,
        cookie,
        login,
        logout,
        saveCookie,
    };

    return (
    <>
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    </>
    );
}