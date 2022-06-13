import React from "react";
import { Navigation, Footer } from ".";

type LayoutProps = {
    children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
    return (
    <>
        <header>
            <h1 className="text-hide">Movie QR is where you can find famous quotes from movies and share your opinions about movies!</h1>
            <Navigation />
        </header>
        { children }
        <Footer />
    </>
    )
}