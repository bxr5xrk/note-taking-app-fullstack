import React, { FC, ReactNode } from "react";
import Header from "./header/Header";

interface LayoutProps {
    children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
    return (
        <>
            <Header />

            {children}
        </>
    );
};

export default Layout;
