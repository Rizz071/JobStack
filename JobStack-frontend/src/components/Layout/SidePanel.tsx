import { ChevronDoubleUpIcon } from "@heroicons/react/24/outline";
import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import UserContext from "../Contexts/UserContext";

const SidePanel = () => {
    /* Access to global context UserContext */
    const { user, setUser } = useContext(UserContext);

    const logoutUser = () => {
        window.localStorage.removeItem("loggedUser");
        setUser(null);
    };

    return (
        <div className="hidden h-screen shrink-0 grow-0 flex-col bg-neutral font-light text-neutral-content md:w-1/4 lg:flex lg:w-1/5 xl:w-1/6">
            <div
                id="menu-content"
                className="mx-auto flex h-full flex-col gap-y-10"
            >
                <div id="logo" className="mx-auto mb-10 mt-10">
                    <button
                        className="flex flex-col items-center"
                        onClick={() => <Navigate to="/dashboard" />}
                    >
                        <ChevronDoubleUpIcon className="w-14" />
                        <p className="text-2xl font-light">Job Stack</p>
                    </button>
                </div>
                {user && (
                    <div className="text-lg">
                        {
                            ["Greetings", "Welcome", "Good day", "Hello"][
                                Math.floor(Math.random() * 4)
                            ]
                        }
                        ,{" "}
                        {user.fullname !== "null"
                            ? user.fullname
                            : user.username}
                    </div>
                )}

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

                {/* <div id="setting" className="mx-auto mt-auto text-lg">
                    Settings
                </div> */}
                {user && (
                    <div id="setting" className="mx-auto mb-10 mt-auto text-lg">
                        <button onClick={logoutUser}>Logout</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SidePanel;
