import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import UserContext from "../Contexts/UserContext";
import serviceLogin from "../../../services/serviceLogin";

const SidePanel = () => {
    /* Access to global context UserContext */
    const { user, setUser } = useContext(UserContext);

    return (
        <div className="hidden shrink-0 grow-0 flex-col bg-neutral font-light text-neutral-content md:w-1/4 lg:flex lg:w-1/5 xl:w-1/6">
            <div
                id="menu-content"
                className="mx-auto flex h-full flex-col gap-y-10"
            >
                <div id="logo" className="mx-auto mt-8">
                    <button
                        className="flex flex-col items-center"
                        onClick={() => <Navigate to="/dashboard" />}
                    >
                        {/* <ChevronDoubleUpIcon className="w-14" /> */}
                        <img
                            src="src\assets\images\Logo-6.jpeg"
                            alt="JobStack Application Logo"
                            className="h-40 rounded "
                        />
                        {/* <p className="text-2xl font-light">Job Stack</p> */}
                    </button>
                </div>
                {user && (
                    <div className="prose prose-xl mx-auto text-base-100">
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
                        <button
                            className="prose prose-xl mx-auto text-base-100"
                            onClick={() => serviceLogin.logoutUser(setUser)}
                        >
                            Logout
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SidePanel;
