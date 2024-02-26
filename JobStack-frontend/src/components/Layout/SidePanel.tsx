import { ChevronDoubleUpIcon } from "@heroicons/react/24/outline";
import React from "react";
import { useNavigate } from "react-router-dom";

const SidePanel = () => {
    const navigate = useNavigate();


    return (
        <div className="hidden grow-0 shrink-0 flex-col md:w-1/4 lg:w-1/5 xl:w-1/6 h-screen bg-neutral text-neutral-content font-light lg:flex">

            <div id="menu-content" className="mx-10 flex flex-col h-full gap-y-10">

                <div id="logo" className="mt-10 mb-10">
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

                <div id="setting" className="text-lg mr-auto mt-auto">
                    Settings
                </div>
                <div id="setting" className="text-lg mr-auto mb-10">
                    Logout
                </div>

            </div>
        </div>
    );
};

export default SidePanel;