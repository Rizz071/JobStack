import React from "react";
import SidePanel from "./SidePanel";
import MainPanel from "./MainPanel";


interface Props {
    children: JSX.Element;
}

const Layout = ({ children }: Props) => {

    return (
        <div id="full-screen-base" className="w-screen h-screen flex">
            <SidePanel />
            <MainPanel>
                {children}
            </MainPanel>
        </div>
    );
};

export default Layout;