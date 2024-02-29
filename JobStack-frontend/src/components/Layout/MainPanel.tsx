import React from "react";

interface Props {
    children: JSX.Element;
}

const MainPanel = ({ children }: Props) => {
    return (
        <div
            id="main-panel"
            className="flex h-screen w-full flex-col bg-base-200"
        >
            <div
                id="main-field-with-margins"
                className="flex shrink-0 justify-center md:m-8 xl:mx-auto xl:w-5/6"
            >
                {children}
            </div>
        </div>
    );
};

export default MainPanel;
