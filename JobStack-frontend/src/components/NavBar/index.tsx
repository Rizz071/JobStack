import React, { useContext } from "react";
// import { Disclosure, Menu, Transition } from "@headlessui/react";
// import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { ChevronDoubleUpIcon } from "@heroicons/react/24/outline";
import { Navigate } from "react-router-dom";
import UserContext from "../Contexts/UserContext";
import serviceLogin from "../../../services/serviceLogin";

export default function NavBar() {
    /* Access to global context UserContext */
    const { user, setUser } = useContext(UserContext);

    if (!user) return <Navigate to="/" />;

    return (
        <>
            <div className="navbar sticky mx-auto w-full bg-neutral text-neutral-content shadow lg:hidden">
                <div className="navbar-start">
                    {/* <div className="dropdown"> */}
                    {/* <div
                            tabIndex={0}
                            role="button"
                            className="btn btn-ghost fill-white text-white lg:hidden"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h8m-8 6h16"
                                />
                            </svg>
                        </div> */}
                    {/* <ul
                            tabIndex={0}
                            className="menu dropdown-content menu-sm z-[1] mt-3 w-52 rounded-md bg-neutral-content p-2"
                        >
                            <li>
                                <a>Home</a>
                            </li>
                            <li>
                                <a>Parent</a>
                                <ul className="p-2">
                                    <li>
                                        <a>Submenu 1</a>
                                    </li>
                                    <li>
                                        <a>Submenu 2</a>
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <a>Item 3</a>
                            </li>
                        </ul> */}
                    {/* </div> */}
                    <div className="btn btn-ghost flex justify-start">
                        <ChevronDoubleUpIcon className="w-12" />
                        <div className="flex flex-col justify-start">
                            <div className="mr-auto text-xl font-light">
                                Job Stack
                            </div>
                            <div className="mr-auto font-light">
                                Hello,{" "}
                                {user.fullname !== "null"
                                    ? user.fullname
                                    : user.username}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        <li>
                            <a>Home</a>
                        </li>
                        {/* <li>
            <details>
              <summary>Statistic</summary>
              <ul className="p-2">
                <li>
                  <a>Submenu 1</a>
                </li>
                <li>
                  <a>Submenu 2</a>
                </li>
              </ul>
            </details>
          </li> */}
                        <li>
                            <a>Settings</a>
                        </li>
                    </ul>
                </div>
                <div className="navbar-end">
                    {user && (
                        <button
                            className="btn btn-sm mr-4 rounded-md"
                            onClick={() => serviceLogin.logoutUser(setUser)}
                        >
                            Logout
                        </button>
                    )}
                </div>
            </div>
        </>
    );
}
