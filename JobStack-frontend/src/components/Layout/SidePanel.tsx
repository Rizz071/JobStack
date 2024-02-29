import { ChevronDoubleUpIcon } from "@heroicons/react/24/outline";
import React from "react";
import { useNavigate } from "react-router-dom";

const SidePanel = () => {
    const navigate = useNavigate();

    return (
        <div className="hidden h-screen shrink-0 grow-0 flex-col bg-neutral font-light text-neutral-content md:w-1/4 lg:flex lg:w-1/5 xl:w-1/6">
            <div
                id="menu-content"
                className="mx-10 flex h-full flex-col gap-y-10"
            >
                <div id="logo" className="mb-10 mt-10">
                    <div
                        className="flex flex-col items-center"
                        onClick={() => navigate("/")}
                    >
                        <ChevronDoubleUpIcon className="w-14" />
                        <p className="text-2xl font-light">Job Stack</p>
                    </div>
                </div>

                {/* <div id="menu" className="text-lg justify-center mt-10 mx-auto flex flex-col gap-y-6">
                    <div id="menu-item-1">
                        Home
                    </div>
                    <div id="menu-item-1">
                        Projects
                    </div>
                    <div id="menu-item-1">
                        Calendar
                    </div>
                </div> */}

                <div id="setting" className="mr-auto mt-auto text-lg">
                    Settings
                </div>
                <div id="setting" className="mb-10 mr-auto text-lg">
                    Logout
                </div>
            </div>
        </div>
    );
};

export default SidePanel;
