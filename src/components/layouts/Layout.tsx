import React from "react";
import { Navigation, Footer } from ".";

type LayoutProps = {
    children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
    return (
    <>
        <Navigation />
        { children }
        <Footer />
    </>
    )
}



// export const Layout = ({ children }: LayoutProps): JSX.Element => {
//     return (
//     <>
//         <Navigation />
//             {children}
//         <Footer />
//     </>
//     )
// }