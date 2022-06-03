import React, { useState, createContext, useContext, ReactNode } from "react";

// context type
type authContextType = {
    user: string;
    isLoggedIn: boolean;
    login: (user) => void;
    logout: () => void;
}

// create context default values
const authContextDefaultValue:authContextType = {
    user: "",
    isLoggedIn: false,
    login: (user:"") => {},
    logout: () => {},
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

    const login = (email:string) => {
        setUser(email);
        setIsLoggedIn(true);
    }

    const logout = () => {
        setUser("");
        setIsLoggedIn(false);
    }

    const value = {
        user,
        isLoggedIn,
        login,
        logout,
    };

    return (
    <>
        <AuthContext.Provider value={value}>
        {children}
        </AuthContext.Provider>
    </>
    );
}