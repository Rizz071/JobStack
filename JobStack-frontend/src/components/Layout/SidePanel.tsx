import { ChevronDoubleUpIcon } from "@heroicons/react/24/outline";
import React from "react";
import { useNavigate } from "react-router-dom";

const SidePanel = () => {
    const navigate = useNavigate();


    return (
        <div className="flex flex-col w-1/6 h-screen bg-primary text-primary-content gap-10 font-light">

            <div id="logo" className="mt-10 mx-auto">
                <a
                    className="btn btn-ghost text-2xl"
                    onClick={() => navigate("/")}>

                    <ChevronDoubleUpIcon className="w-10" />
                    <span className="font-light">Job Stack</span>
                </a>
            </div>

            <div id="menu" className="text-lg justify-center mx-auto mt-10 flex flex-col gap-y-6">
                <div id="menu-item-1">
                    Home
                </div>
                <div id="menu-item-1">
                    Projects
                </div>
                <div id="menu-item-1">
                    Calendar
                </div>
            </div>

            <div id="setting" className="text-lg mt-auto mx-auto">
                Settings
            </div>
            <div id="setting" className="text-lg mx-auto mb-10">
                Logout
            </div>

        </div>
    );
};

export default SidePanel;