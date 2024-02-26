import React from "react";

interface Props {
    children: JSX.Element;
}

const MainPanel = ({ children }: Props) => {
    return (
        <div id="main-panel" className="flex flex-col w-full h-screen bg-base-200">
            <div id="main-field-with-margins" className="md:m-8 xl:w-5/6 shrink-0 xl:mx-auto flex justify-center">
                {children}
            </div>
        </div>
    );
};

export default MainPanel;