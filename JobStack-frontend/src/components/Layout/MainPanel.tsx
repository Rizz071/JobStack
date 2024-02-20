import React from "react";

interface Props {
    children: JSX.Element;
}

const MainPanel = ({ children }: Props) => {
    return (
        <div id="main-panel" className="flex flex-col w-full h-screen bg-base-200">
            {children}
        </div>
    );
};

export default MainPanel;