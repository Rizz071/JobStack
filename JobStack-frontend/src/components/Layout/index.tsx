import React from "react";
import SidePanel from "./SidePanel";
import MainPanel from "./MainPanel";

const Layout = () => {
    return (
        <div
            id="full-screen-base"
            className="flex h-screen w-screen bg-base-200"
        >
            <SidePanel />
            <MainPanel />
        </div>
    );
};

export default Layout;
