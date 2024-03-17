import React, { useContext, useEffect } from "react";
import DetailJobView from "./components/DetailJobView";
import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./components/Dashboard";
import Hero from "./components/Hero";
import { LoggedUser } from "./types";
import UserContext from "./components/Contexts/UserContext";
import Registration from "./components/Registration";

function App() {
    /* Access to global context UserContext */
    const { user, setUser } = useContext(UserContext);

    useEffect(() => {
        const loggedUser: string | null =
            window.localStorage.getItem("loggedUser");

        if (loggedUser) {
            const user: LoggedUser = JSON.parse(loggedUser);
            setUser(user);
            // noteService.setToken(user.token);
        }
    }, [setUser]);

    return (
        <>
            {user ? <Navigate to="/dashboard" /> : <Navigate to="/login" />}
            <Routes>
                <Route path="/" element={<Layout />}>
                    {/* <Route
                        index
                        element={
                            user ? (
                                <Navigate to="/dashboard" />
                            ) : (
                                <Navigate to="/login" />
                            )
                        }
                    /> */}
                    <Route path="/login" element={<Hero />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/registration" element={<Registration />} />
                    <Route
                        path="detailview/:id"
                        element={
                            <div className="flex w-full flex-row justify-center gap-x-6">
                                <DetailJobView />
                            </div>
                        }
                    />
                    <Route path="*" element={<p>404 page not found</p>} />
                </Route>
            </Routes>
        </>
    );
}

export default App;
