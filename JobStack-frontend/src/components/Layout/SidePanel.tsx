import { ChevronDoubleUpIcon } from "@heroicons/react/24/outline";
import React from "react";
import { useNavigate } from "react-router-dom";

const SidePanel = () => {
    const navigate = useNavigate();


    return (
        <div className="hidden flex-col w-1/6 h-screen bg-neutral text-neutral-content font-light md:flex">

            <div id="menu-content" className="mx-10 flex flex-col h-full gap-y-10">

                <div id="logo" className="mt-10 mb-10">
                    <a
                        className="btn btn-ghost text-2xl"
                        onClick={() => navigate("/")}>

                        <ChevronDoubleUpIcon className="w-16" />
                        <span className="font-light">Job Stack</span>
                    </a>
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

                <div id="setting" className="text-lg mx-auto mt-auto">
                    Settings
                </div>
                <div id="setting" className="text-lg mx-auto mb-10">
                    Logout
                </div>

            </div>
        </div>
    );
};

export default SidePanel;