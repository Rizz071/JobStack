import React from "react";
import NavBar from "../NavBar";

interface Props {
    children: JSX.Element;
}

const MainPanel = ({ children }: Props) => {
    return (
        <div id="main-panel" className="flex h-fit w-full flex-col bg-base-200">
            <div className="flex shrink-0 flex-col md:mx-8 xl:mx-auto xl:w-5/6">
                <NavBar />
            </div>

            <div
                id="main-field-with-margins"
                className="flex shrink-0 flex-col justify-center md:m-8 xl:mx-auto xl:w-5/6"
            >
                {children}
            </div>
        </div>
    );
};

export default MainPanel;
